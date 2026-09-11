import * as React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowUpRight, CalendarDays, LayoutDashboard, Leaf, Moon, Plus, Receipt, Settings, Sparkles, Sun, Users, ScanLine } from 'lucide-react'
import { useApp } from '~/lib/app-state'
import { BottomSheet } from './BottomSheet'
import { addReceipt } from '~/server/functions/receipts'
import { CATEGORIES } from '~/lib/format'

export const sections = [
  { to: '/', label: 'Обзор', icon: LayoutDashboard },
  { to: '/receipts', label: 'Расходы', icon: Receipt },
  { to: '/groups', label: 'Вместе', icon: Users },
  { to: '/bills', label: 'План', icon: CalendarDays },
] as const

export function Workspace({ children }: { children: React.ReactNode }) {
  const { user, boot, refresh } = useApp()
  const path = useRouterState({ select: s => s.location.pathname })
  const [dark, setDark] = React.useState(false)
  const [adding, setAdding] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')
  React.useEffect(() => { setDark(localStorage.getItem('listok-theme') === 'dark') }, [])
  React.useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  React.useEffect(() => {
    const open = () => setAdding(true)
    const key = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey && !(e.target as HTMLElement).closest('input,textarea,select,[contenteditable]')) { e.preventDefault(); open() }
    }
    window.addEventListener('listok:add', open); window.addEventListener('keydown', key)
    return () => { window.removeEventListener('listok:add', open); window.removeEventListener('keydown', key) }
  }, [])
  const active = (to: string) => to === '/' ? path === '/' : path.startsWith(to)
  const contextLabel = sections.find((section) => active(section.to))?.label
    || (path === '/agent' ? 'Помощник' : path === '/settings' ? 'Настройки' : path === '/scan' ? 'Скан чека' : 'Листок')
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return
    const form = new FormData(e.currentTarget)
    setBusy(true); setError('')
    try {
      const result = await addReceipt({ data: { store: String(form.get('store')), total: Number(form.get('amount')), category: String(form.get('category')), houseId: String(form.get('house')) || null } })
      if ('error' in result) { setError(result.error); return }
      await refresh(); setAdding(false)
    } catch { setError('Не удалось сохранить расход. Попробуйте ещё раз.') } finally { setBusy(false) }
  }
  return <div className={`workspace ${path === '/agent' ? 'workspace-chat' : ''}`}>
    <aside className="workspace-sidebar">
      <Link to="/" className="brand"><span className="brand-symbol"><Leaf size={23}/></span>Листок<span className="brand-period">.</span></Link>
      <div className="sidebar-space-label">ЛИЧНОЕ ПРОСТРАНСТВО</div>
      <nav aria-label="Разделы">{sections.map(({ to, label, icon: Icon }) => <Link key={to} to={to} aria-current={active(to) ? 'page' : undefined} className={`sidebar-link ${active(to) ? 'is-active' : ''}`}><Icon size={20}/>{label}</Link>)}</nav>
      <button className="primary-action sidebar-add" onClick={() => setAdding(true)}><Plus size={19}/>Добавить расход<kbd>N</kbd></button>
      <div className="sidebar-bottom"><Link to="/agent" className="assistant-teaser"><Sparkles size={20}/><strong>Помощник</strong><ArrowUpRight size={17}/><span>Разберёмся в деньгах вместе</span></Link><Link to="/settings" className="sidebar-link"><Settings size={19}/>Настройки</Link><div className="sidebar-profile"><span className="avatar">{(user?.displayName || user?.name || 'Л').slice(0,1)}</span><div><strong>{user?.displayName || user?.name}</strong><small>Моё пространство</small></div></div></div>
    </aside>
    <div className="workspace-body"><header className="workspace-topbar"><span className="topbar-location">Моё пространство <span>/</span> {contextLabel}</span><Link to="/" className="mobile-brand"><Leaf size={21}/>Листок.</Link><div className="topbar-actions"><button className="icon-action" aria-label={dark ? 'Светлая тема' : 'Тёмная тема'} onClick={() => { localStorage.setItem('listok-theme', dark ? 'light' : 'dark'); setDark(!dark) }}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button><Link to="/agent" className="icon-action" aria-label="Помощник"><Sparkles size={19}/></Link><Link to="/settings" className="avatar" aria-label="Профиль">{(user?.displayName || user?.name || 'Л').slice(0,1)}</Link></div></header><main className={`workspace-content route-${path.split('/')[1] || 'overview'}`}>{children}</main></div>
    <nav className="mobile-navigation" aria-label="Основная навигация">{sections.slice(0,2).map(({to,label,icon:Icon}) => <Link key={to} to={to} aria-current={active(to) ? 'page' : undefined}><span className="mobile-nav-icon"><Icon size={24} strokeWidth={active(to) ? 2.25 : 1.9}/></span><span>{label}</span></Link>)}<button aria-label="Добавить расход" onClick={() => setAdding(true)} className="mobile-add"><Plus size={28} strokeWidth={2.4}/></button>{sections.slice(2).map(({to,label,icon:Icon}) => <Link key={to} to={to} aria-current={active(to) ? 'page' : undefined}><span className="mobile-nav-icon"><Icon size={24} strokeWidth={active(to) ? 2.25 : 1.9}/></span><span>{label}</span></Link>)}</nav>
    <BottomSheet open={adding} onClose={() => setAdding(false)} title="Новый расход"><Link className="scan-entry" to="/scan" onClick={() => setAdding(false)}><ScanLine size={23}/><span><strong>Сканировать чек</strong><small>Сумма и товары — с фотографии</small></span><ArrowUpRight size={19}/></Link><form onSubmit={save} className="expense-form"><label>Сумма, ₽<input name="amount" type="number" min="1" step="1" required placeholder="0" autoFocus className="amount-input"/></label><label>Где потратили<input name="store" required placeholder="Магазин, кафе или покупка"/></label><label>Категория<select name="category">{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>{boot.houses.length > 0 && <label>Бюджет<select name="house"><option value="">Личный</option>{boot.houses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>}{error && <p role="alert" className="text-stamp">{error}</p>}<button disabled={busy} className="primary-action">{busy ? 'Сохраняем…' : 'Добавить расход'}</button></form></BottomSheet>
  </div>
}
