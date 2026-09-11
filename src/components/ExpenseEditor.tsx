import { showInAppNotification } from './NotificationBanner'
import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ScanLine } from 'lucide-react'
import { BottomSheet } from './BottomSheet'
import { useApp } from '~/lib/app-state'
import { CATEGORIES } from '~/lib/format'
import { localDate, assertSaved, newRequestId } from '~/lib/finance'
import { addReceipt, updateReceipt } from '~/server/functions/receipts'

export function ExpenseEditor({open,onClose,onSaved,initialHouseId=null,receipt,draft}: {
  open:boolean; onClose:()=>void; onSaved?:(id?:string)=>void; initialHouseId?:string|null; receipt?:any; draft?:any
}) {
  const {boot,user,refresh}=useApp()
  const [form,setForm]=React.useState<any>({})
  const [busy,setBusy]=React.useState(false)
  const [error,setError]=React.useState('')
  const [restored,setRestored]=React.useState(false)
  const key=`listok:expense-draft:${user?.id}:${initialHouseId || 'personal'}`
  const requestId=React.useRef('')
  const hydrating=React.useRef(true)
  React.useEffect(()=>{
    if(!open)return
    hydrating.current=true
    let cached:any=null
    try { if(!receipt&&!draft)cached=JSON.parse(localStorage.getItem(key)||'null') } catch {}
    requestId.current=cached?.requestId || newRequestId()
    setForm({total:'',store:'',category:'other',purchased_at:localDate(),houseId:initialHouseId,note:'',
      ...(cached?.form || {}),...(draft || {}),...(receipt || {}),
      ...(receipt?{houseId:receipt.house_id,purchased_at:receipt.purchased_at?.slice(0,10)||localDate()}: {})})
    setRestored(!!cached);setError('')
  },[open,receipt,draft,key,initialHouseId])
  React.useEffect(()=>{
    if(hydrating.current){hydrating.current=false;return}
    if(!open||receipt||draft||!form.total)return
    try{localStorage.setItem(key,JSON.stringify({form,requestId:requestId.current}))}catch{}
  },[form,open,receipt,draft,key])
  const field=(name:string,value:any)=>setForm((f:any)=>({...f,[name]:value}))
  async function save(e:React.FormEvent){
    e.preventDefault();if(busy)return
    setBusy(true);setError('')
    try{
      const data={...form,total:Number(String(form.total).replace(',','.')),requestId:requestId.current}
      const result=assertSaved(receipt ? await updateReceipt({data:{...data,id:receipt.id}}) : await addReceipt({data}))
      if('duplicate' in result && result.duplicate)showInAppNotification({title:'Чек уже в истории',body:'Повторная копия не создана',icon:'sparkles'})
      if('restored' in result && result.restored)showInAppNotification({title:'Чек восстановлен',body:'Ранее удалённый расход возвращён в историю',icon:'sparkles'})
      try{localStorage.removeItem(key)}catch{}
      await refresh();onSaved?.('id' in result?String(result.id):receipt?.id);onClose()
    }catch(e:any){setError(e?.message || 'Не удалось сохранить. Данные остались в форме — попробуйте ещё раз.')}
    finally{setBusy(false)}
  }
  return <BottomSheet open={open} onClose={()=>{if(!busy)onClose()}} title={receipt?'Изменить расход':draft?'Проверить чек':'Новый расход'}>
    {!receipt&&!draft&&<Link to="/scan" search={{houseId:form.houseId || undefined}} onClick={onClose} className="scan-entry"><ScanLine size={24}/><span><strong>Сканировать чек</strong><small>Или введите сумму ниже</small></span></Link>}
    {restored&&<p className="form-hint" role="status">Восстановлен несохранённый расход.</p>}
    <form className="expense-form" onSubmit={save}>
      <label>Сумма, ₽<input inputMode="decimal" required value={form.total??''} onChange={e=>field('total',e.target.value)} placeholder="0" className="amount-input"/></label>
      <p className="form-hint">Суммы учитываются в целых рублях, копейки округляются.</p>
      <label>Название покупки<input value={form.store||''} onChange={e=>field('store',e.target.value)} maxLength={200} placeholder="Например, продукты"/></label>
      <div className="form-two-columns"><label>Дата<input type="date" required value={form.purchased_at||''} onChange={e=>field('purchased_at',e.target.value)}/></label><label>Категория<select value={form.category||'other'} onChange={e=>field('category',e.target.value)}>{CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></label></div>
      {boot.houses.length>0&&<label>Бюджет<select value={form.houseId||''} onChange={e=>field('houseId',e.target.value||null)}><option value="">Личный</option>{boot.houses.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</select></label>}
      <details open={!!form.note||undefined}><summary>Комментарий и подробности</summary><label>Комментарий<textarea value={form.note||''} onChange={e=>field('note',e.target.value)} maxLength={2000} placeholder="Необязательно"/></label></details>
      {draft?.items?.length>0&&<details><summary>Позиции чека · {form.items?.length}</summary><div className="scan-items-editor">{(form.items||[]).map((it:any,i:number)=><div key={i}><input aria-label={`Название позиции ${i+1}`} value={it.name} onChange={e=>field('items',form.items.map((v:any,j:number)=>j===i?{...v,name:e.target.value}:v))}/><input aria-label={`Стоимость позиции ${i+1}`} type="number" min="0" value={it.price} onChange={e=>field('items',form.items.map((v:any,j:number)=>j===i?{...v,price:Number(e.target.value)}:v))}/></div>)}</div><p className="form-hint">Проверьте итоговую сумму отдельно: скидки могут не входить в позиции.</p></details>}
      {error&&<p className="form-error" role="alert">{error}</p>}
      <button className="primary-action" disabled={busy}>{busy?'Сохраняем…':receipt?'Сохранить изменения':'Сохранить расход'}</button>
      {!receipt&&!draft&&<p className="form-hint">Если закрыть форму, заполненный черновик останется на этом устройстве.</p>}
    </form>
  </BottomSheet>
}
