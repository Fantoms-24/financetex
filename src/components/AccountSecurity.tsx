import * as React from 'react'
import { createRecoveryCode, recoverWithCode } from '~/server/functions/security'
import { assertSaved } from '~/lib/finance'

export function AccountSecurity({recovery=false}:{recovery?:boolean}){
 const [password,setPassword]=React.useState(''),[code,setCode]=React.useState('')
 const [generated,setGenerated]=React.useState(''),[busy,setBusy]=React.useState(false),[message,setMessage]=React.useState(''),[error,setError]=React.useState('')
 async function submit(e:React.FormEvent){
  e.preventDefault();if(busy)return;setBusy(true);setError('');setMessage('')
  try{
   if(recovery){assertSaved(await recoverWithCode({data:{code,password}}));setCode('');setPassword('');setMessage('Пароль изменён. Войдите с вашим логином и новым паролем. Код использован; новый можно создать в настройках.')}
   else {const r=assertSaved(await createRecoveryCode({data:{password}}));setGenerated(r.code);setPassword('')}
  }catch(e:any){setError(e.message||'Не удалось выполнить действие')}
  finally{setBusy(false)}
 }
 return <details className={recovery?'account-recovery':'surface account-security'}><summary>{recovery?'Не получается войти?':'Защита доступа к аккаунту'}</summary><p className="form-hint">{recovery?'Если вы заранее сохранили код восстановления в настройках, он позволит задать новый пароль. Без сохранённого кода самостоятельное восстановление недоступно.':'Код позволит восстановить пароль без почты. Создание нового кода отменяет предыдущий. Достаточно одного действующего кода.'}</p><form className="expense-form" onSubmit={submit}>
 {recovery&&<label>Код восстановления<input value={code} onChange={e=>setCode(e.target.value)} autoComplete="off" required/></label>}
 <label>{recovery?'Новый пароль':'Текущий пароль'}<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete={recovery?'new-password':'current-password'} minLength={recovery?8:undefined} maxLength={128} required/></label>
 {error&&<p role="alert" className="form-error">{error}</p>}{message&&<p role="status">{message}</p>}
 <button className="secondary-action" disabled={busy}>{busy?'Подождите…':recovery?'Изменить пароль':'Создать код восстановления'}</button></form>
 {generated&&<div className="recovery-code"><p>Код показывается только сейчас. Храните его отдельно от устройства и никому не отправляйте.</p><code>{generated}</code><button className="text-action" onClick={async()=>{try{await navigator.clipboard.writeText(generated);setMessage('Код скопирован')}catch{setError('Не удалось скопировать. Код можно выделить и сохранить вручную.')}}}>Скопировать код</button></div>}
 </details>
}
