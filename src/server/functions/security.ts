import { createServerFn } from '@tanstack/react-start'
import { createHash, randomBytes } from 'node:crypto'
import { hashPassword, verifyPassword } from 'better-auth/crypto'
import { guarded } from '../session'
import { q, q1, transaction } from '../db'

export const createRecoveryCode=createServerFn({method:'POST'}).validator((d:{password:string})=>d)
.handler(async({data})=>guarded(async user=>transaction(async()=>{
 const account=await q1<any>('SELECT password FROM "account" WHERE "userId"=$1 AND "providerId"=$2',[user.id,'credential'])
 if(!account?.password||!await verifyPassword({hash:account.password,password:String(data.password||'')}))throw new Error('Проверьте текущий пароль')
 const code=randomBytes(24).toString('hex')
 await q('UPDATE profiles SET recovery_code_hash=$1 WHERE user_id=$2',[createHash('sha256').update(code).digest('hex'),user.id])
 return {ok:true,code}
})))

export const recoverWithCode=createServerFn({method:'POST'}).validator((d:{code:string;password:string})=>d)
.handler(async({data})=>{
 try {
  const code=String(data.code||'').replace(/\s/g,'').toLowerCase()
  if(!/^[a-f0-9]{48}$/.test(code))throw new Error('Проверьте код восстановления')
  if(typeof data.password!=='string'||data.password.length<8||data.password.length>128)throw new Error('Новый пароль — от 8 до 128 символов')
  await transaction(async()=>{
   const profile=await q1<any>('SELECT user_id FROM profiles WHERE recovery_code_hash=$1 FOR UPDATE',[createHash('sha256').update(code).digest('hex')])
   if(!profile)throw new Error('Код не найден или уже использован')
   const updated=await q('UPDATE "account" SET password=$1,"updatedAt"=now() WHERE "userId"=$2 AND "providerId"=$3 RETURNING id',[await hashPassword(data.password),profile.user_id,'credential'])
   if(!updated.length)throw new Error('Не удалось изменить пароль')
   await q('UPDATE profiles SET recovery_code_hash=NULL WHERE user_id=$1',[profile.user_id])
   await q('DELETE FROM "session" WHERE "userId"=$1',[profile.user_id])
  })
  return {ok:true}
 }catch(e:any){return {error:e.message||'Не удалось восстановить доступ'}}
})
