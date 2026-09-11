import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, ScanLine, Search, SlidersHorizontal, BarChart3, Share2, ChevronDown, Pencil, Trash2, Users } from 'lucide-react'
import { ExpenseEditor } from '~/components/ExpenseEditor'
import { ShareMonthModal } from '~/components/ShareMonthModal'
import { SplitCreateModal } from '~/components/SplitCreateModal'
import { useApp } from '~/lib/app-state'
import { CATEGORIES, categoryLabel, dateRu, money, monthKey, monthLabelRu, prevMonthKey } from '~/lib/format'
import { assertSaved, localDate } from '~/lib/finance'
import { listReceipts, getReceipt, deleteReceipt, restoreReceipt } from '~/server/functions/receipts'

export const Route=createFileRoute('/receipts')({component:Receipts})
function Receipts(){
 const {boot,refresh}=useApp()
 const [period,setPeriod]=React.useState('current')
 const [search,setSearch]=React.useState('')
 const [category,setCategory]=React.useState('all')
 const [scope,setScope]=React.useState('all')
 const [from,setFrom]=React.useState('')
 const [to,setTo]=React.useState('')
 const [filters,setFilters]=React.useState(false)
 const [analytics,setAnalytics]=React.useState(false)
 const [rows,setRows]=React.useState<any[]>([])
 const [stats,setStats]=React.useState({total:0,count:0,categories:[] as any[],hasMore:false})
 const [busy,setBusy]=React.useState(true)
 const [error,setError]=React.useState('')
 const [adding,setAdding]=React.useState(false)
 const [editing,setEditing]=React.useState<any>(null)
 const [expanded,setExpanded]=React.useState<string|null>(null)
 const [detail,setDetail]=React.useState<any>(null)
 const [detailBusy,setDetailBusy]=React.useState(false)
 const [undo,setUndo]=React.useState<string|null>(null)
 const [acting,setActing]=React.useState(false)
 const [split,setSplit]=React.useState<any>(null)
 const [report,setReport]=React.useState<any[]|null>(null)
 const [exporting,setExporting]=React.useState(false)
 const [revision,setRevision]=React.useState(0)
 const seq=React.useRef(0),detailSeq=React.useRef(0)
 const current=monthKey(),previous=prevMonthKey()
 const month=period==='prev'?previous:current
 const monthEnd=localDate(new Date(Number(month.slice(0,4)),Number(month.slice(5,7)),0))
 const query=React.useMemo(()=>({from:period==='custom'?from:period==='all'?undefined:month+'-01',to:period==='custom'?to:period==='all'?undefined:monthEnd,search,category,houseId:scope}),[period,month,monthEnd,from,to,search,category,scope])
 const label=period==='all'?'Вся история':period==='custom'?'Выбранные даты':monthLabelRu(month)
 React.useEffect(()=>{
   const ticket=++seq.current;setBusy(true);setError('')
   const timer=setTimeout(async()=>{
     try{
       if(query.from&&query.to&&query.from>query.to)throw new Error('Начало периода должно быть раньше его конца')
       const r=assertSaved(await listReceipts({data:{...query,limit:50}}))
       if(ticket!==seq.current)return
       setRows(r.receipts);setStats(r)
     }catch(e:any){if(ticket===seq.current)setError(e.message||'Не удалось загрузить расходы')}
     finally{if(ticket===seq.current)setBusy(false)}
   },200)
   return()=>{clearTimeout(timer);seq.current++}
 },[query,revision,boot.receipts])
 async function more(){
   const ticket=seq.current;setBusy(true);setError('')
   try{const r=assertSaved(await listReceipts({data:{...query,limit:50,offset:rows.length}}));if(ticket===seq.current){setRows(v=>[...v,...r.receipts]);setStats(r)}}
   catch(e:any){setError(e.message||'Не удалось загрузить ещё')}
   finally{if(ticket===seq.current)setBusy(false)}
 }
 async function toggle(id:string){
   const ticket=++detailSeq.current
   if(expanded===id){setExpanded(null);return}
   setExpanded(id);setDetail(null);setDetailBusy(true)
   try{const r=assertSaved(await getReceipt({data:{id}}));if(ticket===detailSeq.current)setDetail(r)}
   catch(e:any){setError(e.message||'Не удалось открыть покупку')}
   finally{if(ticket===detailSeq.current)setDetailBusy(false)}
 }
 async function remove(id:string){
   if(acting)return;setActing(true);setError('')
   try{assertSaved(await deleteReceipt({data:{id}}));setUndo(id);setExpanded(null);await refresh();setRevision(v=>v+1)}
   catch(e:any){setError(e.message||'Не удалось удалить')}
   finally{setActing(false)}
 }
 async function restore(){
   if(!undo||acting)return;setActing(true)
   try{assertSaved(await restoreReceipt({data:{id:undo}}));setUndo(null);await refresh();setRevision(v=>v+1)}
   catch(e:any){setError(e.message||'Не удалось восстановить')}
   finally{setActing(false)}
 }
 async function exportAll(){
   setExporting(true);setError('')
   try{const all:any[]=[];let more=true
     while(more){const r=assertSaved(await listReceipts({data:{...query,limit:300,offset:all.length}}));all.push(...r.receipts);more=r.hasMore}
     setReport(all)
   }catch(e:any){setError(e.message||'Не удалось подготовить отчёт')}
   finally{setExporting(false)}
 }
 return <div className="app-page receipts-page">
  <header className="page-heading receipts-heading"><div><h1>Расходы<span>.</span></h1><p className="page-description">{label}</p></div><div className="flex items-center gap-2"><Link to="/scan" className="icon-action" aria-label="Сканировать чек"><ScanLine size={22}/></Link><button className="primary-action" onClick={()=>setAdding(true)}><Plus size={19}/>Добавить</button></div></header>
  <div className="page-toolbar receipts-toolbar"><div className="period-control" aria-label="Период">{[['current','Этот месяц'],['prev','Прошлый'],['all','Всё время']].map(([id,text])=><button key={id} aria-pressed={period===id} onClick={()=>setPeriod(id)}>{text}</button>)}</div><div className="receipts-quick-actions"><button className="receipt-icon-action" aria-label="Поиск и фильтры" aria-expanded={filters} onClick={()=>setFilters(!filters)}><SlidersHorizontal size={20}/></button><button className="receipt-icon-action" aria-label="Категории расходов" aria-expanded={analytics} onClick={()=>setAnalytics(!analytics)}><BarChart3 size={20}/></button><button className="receipt-icon-action" disabled={exporting||busy||!!error} aria-label="Отчёт и CSV" onClick={exportAll}><Share2 size={20}/></button></div></div>
  {filters&&<section className="surface history-filters expense-form"><label>Поиск по названию и комментарию<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Например, продукты"/></label><div className="form-two-columns"><label>Категория<select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">Все категории</option>{CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></label><label>Бюджет<select value={scope} onChange={e=>setScope(e.target.value)}><option value="all">Все мои расходы</option><option value="personal">Личный</option>{boot.houses.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</select></label></div><details open={period==='custom'||undefined}><summary>Свой период</summary><div className="form-two-columns"><label>С<input type="date" value={from} onChange={e=>{setFrom(e.target.value);setPeriod('custom')}}/></label><label>По<input type="date" value={to} onChange={e=>{setTo(e.target.value);setPeriod('custom')}}/></label></div></details><button className="text-action" onClick={()=>{setSearch('');setCategory('all');setScope('all');setFrom('');setTo('');setPeriod('current')}}>Сбросить фильтры</button></section>}
  {error&&<div className="form-error" role="alert">{error}<button onClick={()=>setRevision(v=>v+1)}>Повторить</button></div>}
  {undo&&<div className="sync-banner" role="status"><span>Расход удалён из истории</span><button disabled={acting} onClick={restore}>Отменить удаление</button><button onClick={()=>setUndo(null)} aria-label="Скрыть сообщение">×</button></div>}
  <section className="surface receipts-summary receipts-summary--compact" aria-busy={busy}><div className="receipts-summary-topline"><span>{busy?'Обновляем…':error?'Последние загруженные данные':'Потрачено за выбранный период'}</span><span>{stats.count} записей</span></div><p className="t-display t-num receipts-summary-amount">{money(stats.total)}</p>{stats.count>0&&<div className="receipts-summary-details"><span>В среднем <strong>{money(stats.total/stats.count)}</strong></span></div>}</section>
  {analytics&&<section className="surface history-analytics"><h2>На что ушли деньги</h2>{stats.categories.length?stats.categories.map(c=><div key={c.category}><div className="flex justify-between gap-3"><span>{categoryLabel(c.category)}</span><strong>{money(c.total)}</strong></div><progress max={Math.max(stats.total,1)} value={c.total}/></div>):<p className="form-hint">Категории появятся после первой записи.</p>}</section>}
  {exporting&&<p role="status">Готовим полную историю за выбранный период…</p>}
  {!busy&&!error&&!rows.length?<section className="surface history-empty"><ScanLine size={40}/><h2>{search||category!=='all'||scope!=='all'?'Ничего не найдено':'Здесь будет история расходов'}</h2><p>{search||category!=='all'?'Попробуйте другие условия поиска.':'Добавьте покупку: достаточно суммы. Остальное можно указать позже.'}</p></section>:<div className="history-list" aria-busy={busy}>{rows.map((r,i)=>{
    const linked=/^(bill|goal):/.test(r.source_key||'')
    return <React.Fragment key={r.id}>{(i===0||rows[i-1].purchased_at!==r.purchased_at)&&<h2 className="history-date">{dateRu(r.purchased_at)}</h2>}<article className="surface history-row"><button className="history-row-main" onClick={()=>toggle(r.id)} aria-expanded={expanded===r.id}><span className="history-avatar">{(r.store||'П')[0]}</span><span className="history-row-label"><strong>{r.store||'Покупка'}</strong><small>{categoryLabel(r.category)}{r.house_name?' · '+r.house_name:''}</small></span><strong className="t-num">{money(r.total)}</strong><ChevronDown size={17}/></button>{expanded===r.id&&<div className="history-detail">{r.note&&<p>{r.note}</p>}{linked&&<p className="form-hint">Связано с платежом или целью. Отменить операцию можно в <Link to="/bills">«Плане»</Link>.</p>}{detailBusy?<p role="status">Открываем подробности…</p>:<>{detail?.receipt?.image&&<details><summary>Фото чека</summary><img src={detail.receipt.image} alt="Сохранённый чек" className="history-receipt-image"/></details>}{detail?.items?.length>0&&<details><summary>Позиции · {detail.items.length}</summary>{detail.items.map((it:any)=><div key={it.id} className="flex justify-between gap-3"><span>{it.name}{it.qty>1?' × '+it.qty:''}</span><strong>{money(it.price)}</strong></div>)}</details>}</>}<div className="history-row-actions">{!linked&&<><button className="secondary-action" onClick={()=>setEditing(r)}><Pencil size={16}/>Изменить</button><button className="text-action" disabled={acting} onClick={()=>remove(r.id)}><Trash2 size={16}/>Удалить</button></>}{!linked&&<button className="text-action" disabled={detailBusy||!detail} onClick={()=>setSplit({receipt:r,items:detail?.items||[]})}><Users size={16}/>Разделить чек</button>}</div></div>}</article></React.Fragment>
  })}</div>}
  {stats.hasMore&&<button className="secondary-action history-more" disabled={busy} onClick={more}>{busy?'Загрузка…':`Показать ещё · ${rows.length} из ${stats.count}`}</button>}
  <ExpenseEditor open={adding||!!editing} receipt={editing} onClose={()=>{setAdding(false);setEditing(null)}} onSaved={()=>setRevision(v=>v+1)}/>
  <ShareMonthModal open={!!report} onClose={()=>setReport(null)} receipts={report||[]} monthLabel={label} budget={period==='current'&&scope==='all'&&category==='all'&&!search?boot.settings.monthly_budget:0} spent={report?.reduce((s,r)=>s+r.total,0)||0}/>
  <SplitCreateModal open={!!split} onClose={()=>setSplit(null)} receiptId={split?.receipt.id} storeName={split?.receipt.store} totalAmount={split?.receipt.total} items={split?.items}/>
 </div>
}
