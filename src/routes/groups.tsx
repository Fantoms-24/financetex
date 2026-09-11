import * as React from 'react'
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, Hash, KeyRound, Plus, ReceiptText, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { BottomSheet } from '~/components/BottomSheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { money, plural } from '~/lib/format'
import { createHouse, joinHouse, listHouses } from '~/server/functions/houses'
import { cn, haptic } from '~/lib/utils'
import { showInAppNotification } from '~/components/NotificationBanner'

export const Route = createFileRoute('/groups')({ component: Groups })

interface HouseRow {
  id: string
  name: string
  code: string
  owner_id: string
  members: number
  monthly_budget?: number
  total_spent?: number
  receipts_count?: number
  bills_count?: number
}

const PRESET_NAMES = ['Семья', 'Квартира', 'Отпуск', 'Ремонт']

function houseCover(name: string) {
  const value = name.toLowerCase()
  if (/отпуск|поезд|путеш|море|trip|travel/.test(value)) return '/assets/visual-kit-v1/together-trip.webp'
  if (/празд|событ|проект|свадьб|день рожд/.test(value)) return '/assets/visual-kit-v1/together-event.webp'
  return '/assets/visual-kit-v1/together-home.webp'
}

function Groups() {
  const { user, boot, refresh } = useApp()
  const [houses, setHouses] = React.useState<Array<HouseRow>>((boot.houses as Array<HouseRow>) || [])
  const [mode, setMode] = React.useState<'none' | 'actions' | 'create' | 'join'>('none')
  const [name, setName] = React.useState('Семья')
  const [code, setCode] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => { setHouses((boot.houses as Array<HouseRow>) || []) }, [boot.houses])
  const reload = React.useCallback(async () => {
    const result = await listHouses().catch(() => null)
    if (result && 'houses' in result) setHouses(result.houses as Array<HouseRow>)
  }, [])
  React.useEffect(() => { if (user && !boot.houses.length) reload() }, [user, boot.houses, reload])

  const childActive = useRouterState({ select: s => s.matches.some(m => m.routeId !== '/groups' && (m.routeId || '').startsWith('/groups')) })
  if (childActive) return <Outlet />

  async function create(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !name.trim()) return
    setBusy(true); setError(null)
    try {
      const result = await createHouse({ data: { name: name.trim() } })
      if ('error' in result) return setError(result.error || 'Не удалось присоединиться')
      showInAppNotification({ title: 'Пространство создано', body: `«${name.trim()}» готово`, icon: 'users' })
      setMode('none'); await reload(); await refresh()
    } catch(e:any){setError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally { setBusy(false) }
  }

  async function join(e: React.FormEvent) {
    e.preventDefault()
    if (busy || !code.trim()) return
    setBusy(true); setError(null)
    try {
      const result = await joinHouse({ data: { code: code.trim() } })
      if ('error' in result) return setError(result.error || 'Не удалось присоединиться')
      showInAppNotification({ title: 'Вы присоединились', body: 'Общий бюджет появился в вашем пространстве', icon: 'users' })
      setCode(''); setMode('none'); await reload(); await refresh()
    } catch(e:any){setError(e.message||'Не удалось сохранить. Попробуйте ещё раз')} finally { setBusy(false) }
  }

  return <div className="together-index">
    <header className="together-index-header">
      <div><p className="eyebrow">ОБЩИЕ ДЕНЬГИ</p><h1>Вместе<span>.</span></h1><p>Расходы, платежи и планы с близкими.</p></div>
      <button className="together-plus" onClick={() => setMode('actions')} aria-label="Действия с общими бюджетами"><Plus size={22}/></button>
    </header>

    {error && <p role="alert" className="together-error">{error}</p>}

    {houses.length === 0 ? <section className="together-empty">
      <img className="empty-state-art empty-state-art--large" src="/assets/visual-kit-v1/empty-create.webp" alt="" aria-hidden="true" />
      <h2>Деньги, о которых легко договориться</h2>
      <p>Соберите домашние расходы, поездку или общий проект в одном спокойном пространстве.</p>
      <button className="primary-action" onClick={() => setMode('create')}><Plus size={18}/>Создать пространство</button>
      <button className="text-action" onClick={() => setMode('join')}>У меня есть код <ArrowRight size={16}/></button>
    </section> : <div className="together-list">
      <div className="together-list-heading"><h2>Ваши пространства</h2><span>{houses.length}</span></div>
      {houses.map((house, index) => {
        const spent = Number(house.total_spent || 0)
        const budget = Number(house.monthly_budget || 0)
        const left = budget > 0 ? budget - spent : 0
        const percent = budget > 0 ? Math.min(100, Math.round(spent / budget * 100)) : 0
        return <motion.article key={house.id} className="together-card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:index*.04}}>
          <Link to="/groups/$id" params={{id:house.id}} className="together-card-main">
            <img className="together-card-cover" src={houseCover(house.name)} alt="" aria-hidden="true" />
            <div className="together-card-top"><div className="together-avatar"><Users size={21}/></div><div><h3>{house.name}</h3><p>{house.members} {plural(house.members,'участник','участника','участников')}</p></div><ChevronRight size={20}/></div>
            <div className="together-amount"><span>{budget > 0 ? 'Осталось на месяц' : 'Потрачено за месяц'}</span><strong>{money(budget > 0 ? Math.max(0,left) : spent)}</strong></div>
            {budget > 0 ? <><div className="together-progress"><span style={{width:`${percent}%`}}/></div><div className="together-progress-labels"><span>Потрачено {money(spent)}</span><span>из {money(budget)}</span></div></> : <p className="together-no-limit">Лимит можно установить внутри пространства</p>}
            <div className="together-status"><span><ReceiptText size={15}/>{house.receipts_count || 0} {plural(house.receipts_count || 0,'чек','чека','чеков')}</span><span>{house.bills_count ? `${house.bills_count} ${plural(house.bills_count,'счёт','счёта','счетов')}` : 'Нет ближайших счетов'}</span></div>
          </Link>
        </motion.article>
      })}
    </div>}

    <BottomSheet open={mode === 'actions'} onClose={() => setMode('none')} title="Вместе">
      <div className="together-action-list"><button onClick={() => setMode('create')}><span><Plus size={20}/></span><div><strong>Создать пространство</strong><small>Для дома, поездки или проекта</small></div><ChevronRight size={18}/></button><button onClick={() => setMode('join')}><span><KeyRound size={20}/></span><div><strong>Войти по коду</strong><small>Присоединиться к близким</small></div><ChevronRight size={18}/></button></div>
    </BottomSheet>

    <BottomSheet open={mode === 'create'} onClose={() => setMode('none')} title="Новое пространство">
      <form onSubmit={create} className="expense-form"><label>Название<Input value={name} onChange={e => setName(e.target.value)} placeholder="Например, Семья" autoFocus required /></label><div className="together-presets">{PRESET_NAMES.map(preset => <button key={preset} type="button" className={cn(name === preset && 'is-active')} onClick={() => setName(preset)}>{preset}</button>)}</div>{error && <p className="text-stamp">{error}</p>}<Button type="submit" variant="sage" size="lg" disabled={busy || !name.trim()}>{busy ? 'Создаём…' : 'Создать пространство'}</Button></form>
    </BottomSheet>

    <BottomSheet open={mode === 'join'} onClose={() => setMode('none')} title="Войти по коду">
      <form onSubmit={join} className="expense-form"><label>Код приглашения<Input value={code} onChange={e => setCode(e.target.value.toUpperCase().slice(0,7))} placeholder="A2B3C4D" autoCapitalize="characters" autoComplete="off" startIcon={<Hash size={18}/>} className="together-code-input" autoFocus required /></label><p className="together-form-help">Семь символов из приглашения вашего близкого.</p>{error && <p className="text-stamp">{error}</p>}<Button type="submit" variant="sage" size="lg" disabled={busy || code.length < 7}>{busy ? 'Проверяем…' : 'Присоединиться'}</Button></form>
    </BottomSheet>

  </div>
}
