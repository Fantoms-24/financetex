// Focused regressions. Real PGlite schema/transactions; request identity and delivery are isolated doubles.
// Never opens the project database, reads .env, or sends notifications.
import assert from 'node:assert/strict'
import { readFileSync, existsSync, mkdtempSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import ts from 'typescript'
const req=createRequire(import.meta.url)
process.env.DATABASE_URL=''
process.env.PGLITE_DIR=mkdtempSync(join(tmpdir(),'listok-regression-'))
let actor={id:'u1',name:'Test',displayName:'Test',role:'user'}
let cookies=new Map()
const cache=new Map()
const serverFn=()=>{let validate=d=>d;const builder={validator(fn){validate=fn;return builder},handler(fn){return options=>fn({data:validate(options?.data)})}};return builder}
const noop=async()=>({sent:0,failed:0})
function load(path){
 path=resolve(path);if(cache.has(path))return cache.get(path).exports
 const module={exports:{}};cache.set(path,module)
 const localRequire=spec=>{
  if(spec==='@tanstack/react-start')return {createServerFn:serverFn}
  if(spec==='@tanstack/react-start/server')return {getCookie:key=>cookies.get(key),setCookie:(key,value)=>cookies.set(key,value),getRequestHeader:()=>undefined}
  let file=spec.startsWith('~/')?resolve('src',spec.slice(2)):spec.startsWith('.')?resolve(dirname(path),spec):null
  if(file){
   if(file===resolve('src/server/session'))return {getSessionUser:async()=>actor,guarded:async fn=>{try{if(!actor)throw new Error('Войдите');return await fn(actor)}catch(e){return {error:e.message}}}}
   if(file===resolve('src/server/tick'))return {startBackgroundScheduler(){}}
   if(file===resolve('src/server/push'))return {notifyHouseExcept:noop,sendToUser:noop}
   if(file===resolve('src/server/telegram'))return {getBotInfo:async()=>({username:null}),saveTelegramConfig:noop}
   if(file===resolve('src/server/config'))return {getLlmConfig:async()=>({})}
   const found=[file,file+'.ts',join(file,'index.ts')].find(p=>existsSync(p)&&p.endsWith('.ts'))
   if(found)return load(found)
  }
  return req(spec)
 }
 const js=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText
 new Function('require','module','exports',js)(localRequire,module,module.exports)
 return module.exports
}
let passed=0
async function test(name,fn){await fn();passed++;console.log('PASS '+name)}
function ok(r){if(r?.error||r?.ok===false)throw new Error(r.error||'Expected success');return r}
const db=load('src/server/db/index.ts')
const finance=load('src/lib/finance.ts')
const receipt=load('src/server/functions/receipts.ts')
const bill=load('src/server/functions/bills.ts')
const goal=load('src/server/functions/goals.ts')
const house=load('src/server/functions/houses.ts')
const split=load('src/server/functions/split.ts')
const telegram=load('src/server/functions/telegram.ts')
try{
 await db.getDB()
 for(const id of ['u1','u2']){
  await db.q('INSERT INTO "user" (id,name,email) VALUES ($1,$1,$2)',[id,id+'@test.invalid'])
  await db.q('INSERT INTO profiles(user_id) VALUES ($1)',[id])
  await db.q('INSERT INTO user_settings(user_id) VALUES ($1)',[id])
 }
 await db.q("INSERT INTO houses(id,name,code,owner_id) VALUES ('h1','One','TEST1','u1'),('h2','Two','TEST2','u2')")
 await db.q("INSERT INTO house_members(id,house_id,user_id) VALUES ('m1','h1','u1'),('m2','h1','u2'),('m3','h2','u2')")
 await test('one daily formula includes today, reservations and paused bills',()=>{
  const r=finance.budgetNumbers(45000,0,[{amount:1200},{amount:1000,paused:true}],new Date(2026,8,11))
  assert.equal(r.daysLeft,20);assert.equal(r.daily,2190);assert.equal(r.reserved,1200)
  assert.equal(finance.dueDay(31,new Date(2026,1,1)),28)
  assert.equal(finance.dueDay(31,new Date(2028,1,1)),29)
 })
 await test('transaction rolls back a partial mutation',async()=>{
  await assert.rejects(()=>db.transaction(async()=>{await db.q("INSERT INTO receipts(id,user_id,total) VALUES ('rollback','u1',1)");throw new Error('abort')}))
  assert.equal(await db.q1("SELECT id FROM receipts WHERE id='rollback'"),null)
 })
 await test('foreign budget, invalid date and negative amount rejected',async()=>{
  assert.ok((await receipt.addReceipt({data:{total:10,houseId:'h2'}})).error)
  assert.ok((await receipt.addReceipt({data:{total:10,purchased_at:'2026-02-31'}})).error)
  assert.ok((await receipt.addReceipt({data:{total:-10}})).error)
 })
 let rid
 await test('manual retry is idempotent; past-date editing works',async()=>{
  const data={total:100,store:'Bread',purchased_at:'2026-08-20',requestId:'manual-1'}
  const [a,b]=await Promise.all([receipt.addReceipt({data}),receipt.addReceipt({data})]);ok(a);ok(b);assert.equal(a.id,b.id);rid=a.id
  ok(await receipt.updateReceipt({data:{id:rid,total:150,store:'Food',purchased_at:'2026-08-21'}}))
  const r=ok(await receipt.getReceipt({data:{id:rid}}));assert.equal(r.receipt.total,150);assert.equal(r.receipt.purchased_at,'2026-08-21')
 })
 await test('deletion removes totals and can be restored',async()=>{
  ok(await receipt.deleteReceipt({data:{id:rid}}));assert.equal(ok(await receipt.listReceipts()).count,0)
  ok(await receipt.restoreReceipt({data:{id:rid}}));assert.equal(ok(await receipt.listReceipts()).total,150)
 })
 await test('full history totals are independent of page size',async()=>{
  await db.q("INSERT INTO receipts(id,user_id,store,total,purchased_at) SELECT 'bulk-'||n,'u1','Bulk',1,'2026-08-10'::date FROM generate_series(1,130) n")
  const a=ok(await receipt.listReceipts({data:{limit:50,from:'2026-08-01',to:'2026-08-31'}}))
  assert.equal(a.receipts.length,50);assert.equal(a.count,131);assert.equal(a.total,280);assert.equal(a.hasMore,true)
  const b=ok(await receipt.listReceipts({data:{limit:50,offset:100,from:'2026-08-01',to:'2026-08-31'}}));assert.equal(b.receipts.length,31);assert.equal(b.hasMore,false)
 })
 let bid
 await test('bill pay, retry, undo produce exactly one expense',async()=>{
  const r=ok(await bill.addBill({data:{title:'Internet',amount:1200,day_of_month:31}}));bid=r.bills[0].id
  ok(await bill.setBillPaid({data:{billId:bid,paid:true}}));ok(await bill.setBillPaid({data:{billId:bid,paid:true}}))
  assert.equal(Number((await db.q1("SELECT count(*) n FROM receipts WHERE source_key LIKE 'bill:%' AND deleted_at IS NULL")).n),1)
  ok(await bill.setBillPaid({data:{billId:bid,paid:false}}));assert.equal(Number((await db.q1("SELECT count(*) n FROM receipts WHERE source_key LIKE 'bill:%' AND deleted_at IS NULL")).n),0)
  ok(await bill.updateBill({data:{id:bid,title:'Internet',amount:1300,day_of_month:5,paused:true}}));assert.equal(ok(await bill.listBills()).bills[0].paused,true)
 })
 await test('linking an existing purchase avoids double counting and undo preserves it',async()=>{
  ok(await bill.updateBill({data:{id:bid,title:'Internet',amount:1300,day_of_month:5,paused:false}}))
  const cycle=finance.localDate().slice(0,7)
  const r=ok(await receipt.addReceipt({data:{store:'Already paid',total:1300,purchased_at:cycle+'-02',requestId:'existing-bill'}}))
  const before=ok(await receipt.listReceipts()).total
  ok(await bill.setBillPaid({data:{billId:bid,paid:true,receiptId:r.id}}))
  assert.equal(ok(await receipt.listReceipts()).total,before)
  assert.ok((await receipt.deleteReceipt({data:{id:r.id}})).error)
  ok(await bill.setBillPaid({data:{billId:bid,paid:false}}))
  assert.equal(ok(await receipt.listReceipts()).total,before)
 })
 await test('scanned duplicate is not repeated; deleted photo can be restored',async()=>{
  const data={store:'Scan',total:10,image:'data:image/png;base64,aGVsbG8=',requestId:'scan1'}
  const r=ok(await receipt.addReceipt({data}));assert.equal(ok(await receipt.addReceipt({data})).duplicate,true)
  ok(await receipt.deleteReceipt({data:{id:r.id}}))
  const restored=ok(await receipt.addReceipt({data}));assert.equal(restored.restored,true)
  assert.equal(ok(await receipt.getReceipt({data:{id:r.id}})).receipt.total,10)
 })
 await test('foreign personal bill cannot be marked paid',async()=>{
  actor={...actor,id:'u2'};assert.ok((await bill.setBillPaid({data:{billId:bid,paid:true}})).error);actor={...actor,id:'u1'}
 })
 await test('parallel goal deposits do not lose updates; repeat and undo are safe',async()=>{
  const g=ok(await goal.createGoal({data:{title:'Trip',amount:1000}}))
  const a=await Promise.all([goal.depositToGoal({data:{goalId:g.id,amount:100,requestId:'dep-a',recordExpense:true}}),goal.depositToGoal({data:{goalId:g.id,amount:200,requestId:'dep-b',recordExpense:true}})]);a.forEach(ok)
  ok(await goal.depositToGoal({data:{goalId:g.id,amount:100,requestId:'dep-a',recordExpense:true}}))
  assert.equal(Number((await db.q1('SELECT collected FROM user_goals WHERE id=$1',[g.id])).collected),300)
  assert.equal(Number((await db.q1("SELECT count(*) n FROM receipts WHERE source_key LIKE 'goal:%' AND purchased_at IS NOT NULL")).n),2)
  const h=ok(await goal.goalHistory({data:{goalId:g.id}}));const dep=h.deposits[0]
  ok(await goal.reverseGoalDeposit({data:{id:dep.id}}));ok(await goal.reverseGoalDeposit({data:{id:dep.id}}))
  assert.equal(Number((await db.q1('SELECT collected FROM user_goals WHERE id=$1',[g.id])).collected),300-Number(dep.amount))
 })
 await test('family payment checks bill budget and counts only paid shares',async()=>{
  await db.q("INSERT INTO house_bills(id,house_id,title,amount,split) VALUES ('hb1','h1','Rent',1000,'equal'),('hb2','h2','Other',2000,'equal')")
  assert.ok((await house.payHouseBill({data:{houseId:'h1',billId:'hb2',paid:true}})).error)
  ok(await house.payHouseBill({data:{houseId:'h1',billId:'hb1',paid:true}}))
  const snapshot=ok(await house.getHouse({data:{houseId:'h1'}}))
  const snap=snapshot.snapshot||snapshot
  assert.equal(snap.analytics.totalSpent,500)
  assert.equal(ok(await house.listHouses()).houses.find(h=>h.id==='h1').total_spent,500)
 })
 await test('family goal retries count one deposit',async()=>{
  await db.q("INSERT INTO house_wishes(id,house_id,title,amount,by_user) VALUES ('wish','h1','Trip',1000,'u1')")
  const data={houseId:'h1',wishId:'wish',amount:100,requestId:'house-dep-1'}
  ok(await house.depositGoal({data}));ok(await house.depositGoal({data}))
  assert.equal(Number((await db.q1("SELECT collected FROM house_wishes WHERE id='wish'")).collected),100)
 })
 await test('normal account cannot configure global bot',async()=>{assert.ok((await telegram.saveBotSettings({data:{botName:'x'}})).error)})
 await test('split member cannot impersonate another or change shared items',async()=>{
  const s=ok(await split.createSplit({data:{title:'Dinner',total:100,organizerName:'Organizer',items:[{name:'Soup',price:100}]}}))
  actor=null;const a=ok(await split.joinSplit({data:{code:s.code,name:'Alice'}}));const aliceCookies=cookies;cookies=new Map()
  const b=ok(await split.joinSplit({data:{code:s.code,name:'Bob'}}));const view=(await split.getSplitPublic({data:{code:s.code}})).data
  const item=view.items[0].id
  assert.ok((await split.claimSplitItem({data:{code:s.code,memberId:a.memberId,itemId:item,claimed:true}})).error)
  assert.ok((await split.joinSplit({data:{code:s.code,name:'Alice'}})).error)
  assert.ok((await split.toggleSplitShared({data:{code:s.code,itemId:item,isShared:true}})).error)
  ok(await split.claimSplitItem({data:{code:s.code,memberId:b.memberId,itemId:item,claimed:true}}))
  cookies=aliceCookies;ok(await split.claimSplitItem({data:{code:s.code,memberId:a.memberId,itemId:item,claimed:true}}))
 })
 await test('recovery code needs current password, works once and revokes sessions',async()=>{
  actor={id:'u1',name:'Test',displayName:'Test',role:'user'}
  const crypto=await import('better-auth/crypto')
  await db.q('INSERT INTO "account"(id,"userId","accountId","providerId",password) VALUES ($1,$2,$2,$3,$4)',['account1','u1','credential',await crypto.hashPassword('before-password')])
  await db.q('INSERT INTO "session"(id,"userId",token,"expiresAt") VALUES ($1,$2,$3,now()+interval \'1 day\')',['session1','u1','test-session'])
  const security=load('src/server/functions/security.ts')
  assert.ok((await security.createRecoveryCode({data:{password:'wrong'}})).error)
  const code=ok(await security.createRecoveryCode({data:{password:'before-password'}})).code
  actor=null
  ok(await security.recoverWithCode({data:{code,password:'after-password'}}))
  assert.ok((await security.recoverWithCode({data:{code,password:'second-password'}})).error)
  assert.equal(Number((await db.q1('SELECT count(*) n FROM "session" WHERE "userId"=$1',['u1'])).n),0)
  const account=await db.q1('SELECT password FROM "account" WHERE id=$1',['account1'])
  assert.equal(await crypto.verifyPassword({hash:account.password,password:'after-password'}),true)
 })
 console.log('\n'+passed+' regression groups passed. Isolated data: '+process.env.PGLITE_DIR)
 process.exit(0)
}catch(error){console.error('FAIL',error);process.exit(1)}
