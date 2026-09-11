import { Link } from '@tanstack/react-router'
import { ArrowDownLeft, ArrowUpRight, CalendarDays, ChevronRight, Plus, Receipt, Sparkles, Users, Wallet } from 'lucide-react'
import { useApp } from '~/lib/app-state'
import { categoryLabel, dateRu, greeting, money } from '~/lib/format'
import { PersonalGoals } from './PersonalGoals'
import { PwaInstallPrompt } from './PwaInstallPrompt'
import { PushNudge } from './PushNudge'

export function Overview() {
  const { user, boot, refresh } = useApp()
  const budget = boot.settings.monthly_budget
  const spent = boot.month.spent
  const left = budget - spent
  const now = new Date()
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daily = Math.max(0, Math.floor(left / (days - now.getDate() + 1)))
  const used = budget > 0 ? Math.min(100, Math.max(0, spent / budget * 100)) : 0
  const month = now.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
  const cats = boot.month.byCategory.slice(0, 5)
  const colors = ['#b8ef66', '#68c9ac', '#899df0', '#e8b36e', '#bba6d9']
  const unpaid = boot.bills.filter(b => !b.paid_cycle).sort((a,b) => a.day_of_month - b.day_of_month)
  return <div className="overview-page">
    <div className="page-heading"><div><p className="eyebrow">{greeting()}, {(user?.displayName || user?.name || 'друг').split(' ')[0]}</p><h1>Деньги под контролем<span>.</span></h1></div><span className="date-chip"><CalendarDays size={16}/>{month}</span></div>
    <div className="overview-grid">
      <section className="balance-panel"><div className="panel-kicker"><span><Wallet size={17}/>Ваш бюджет</span><span>Этот месяц</span></div><p className="balance-label">{left < 0 ? 'Сверх бюджета' : 'Осталось на месяц'}</p><div className="balance-number">{money(Math.abs(left))}</div><div className="balance-track" role="progressbar" aria-label="Бюджет израсходован" aria-valuenow={Math.round(used)} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${used}%`}}/></div><div className="budget-pair"><div><span>Потрачено</span><strong>{money(spent)}</strong></div><div><span>Бюджет</span><strong>{money(budget)}</strong></div></div><div className="balance-bottom"><span>Комфортно на день <strong>{money(daily)}</strong></span><Link to="/settings" aria-label="Настроить бюджет"><ArrowUpRight size={21}/></Link></div></section>
      <section className="surface categories-panel"><div className="section-heading"><h2>На что уходят деньги</h2><Link to="/receipts" aria-label="Все расходы"><ArrowUpRight size={20}/></Link></div>{cats.length ? <><div className="category-stack">{cats.map((c,i) => <span key={c.category} style={{flex:Math.max(1,c.total),background:colors[i]}} title={`${categoryLabel(c.category)}: ${money(c.total)}`}/>)}</div><div className="category-list">{cats.map((c,i) => <div key={c.category}><span className="category-dot" style={{background:colors[i]}}/><span>{categoryLabel(c.category)}</span><strong>{money(c.total)}</strong><small>{spent ? Math.round(c.total/spent*100) : 0}%</small></div>)}</div></> : <div className="empty-inline"><Receipt size={30}/><h3>У каждого расхода — своё место</h3><p>Добавьте первую покупку. Здесь появится распределение по категориям.</p><button className="text-action" onClick={() => window.dispatchEvent(new Event('listok:add'))}>Добавить расход <Plus size={16}/></button></div>}</section>
      <section className="surface recent-panel"><div className="section-heading"><div><p className="eyebrow">ВАША ИСТОРИЯ</p><h2>Последние расходы</h2></div><Link className="text-action" to="/receipts">Все расходы <ChevronRight size={16}/></Link></div><div className="transaction-heading"><span>Операция</span><span>Категория</span><span>Сумма</span></div>{boot.receipts.slice(0,5).map((r,i) => <Link to="/receipts" className="transaction-row" key={r.id}><span className={`transaction-icon tone-${i%3}`}><ArrowDownLeft size={21}/></span><span className="transaction-name"><strong>{r.store || 'Покупка'}</strong><small>{dateRu(r.purchased_at || r.created_at)}{r.house_name ? ` · ${r.house_name}` : ''}</small></span><span className="transaction-category">{categoryLabel(r.category)}</span><strong className="transaction-amount">−{money(r.total)}</strong></Link>)}{!boot.receipts.length && <div className="empty-inline"><p>Пока здесь чистый лист. Начнём с первой покупки?</p><button className="primary-action" onClick={() => window.dispatchEvent(new Event('listok:add'))}><Plus size={17}/>Записать покупку</button></div>}</section>
      <section className="surface upcoming-panel"><div className="section-heading"><h2>Ближайшие платежи</h2><Link to="/bills" aria-label="План платежей"><ArrowUpRight size={20}/></Link></div>{unpaid.slice(0,3).map(b => <Link to="/bills" key={b.id} className="bill-preview"><span className="bill-date">{b.day_of_month}<small>числа</small></span><span><strong>{b.title}</strong><small>Ожидает оплаты</small></span><strong>{money(b.amount)}</strong></Link>)}{!unpaid.length && <div className="empty-inline"><CalendarDays size={27}/><p>{boot.bills.length ? 'Все платежи месяца отмечены оплаченными.' : 'Добавьте регулярные платежи — будем помнить о них вместе.'}</p><Link to="/bills" className="text-action">Открыть план <ChevronRight size={16}/></Link></div>}</section>
      <section className="together-preview"><div className="section-heading"><span className="feature-icon"><Users size={23}/></span><Link to="/groups" aria-label="Открыть совместные бюджеты"><ArrowUpRight size={22}/></Link></div><p className="eyebrow">ОБЩИЕ ПЛАНЫ</p><h2>{boot.houses[0]?.name || 'Вместе проще.'}</h2><p>{boot.houses.length ? `${boot.houses.length} общих бюджетов. Расходы и цели — в одном пространстве.` : 'Один бюджет для дома, путешествий и всего, что вас объединяет.'}</p><Link className="text-action" to="/groups">{boot.houses.length ? 'Перейти к бюджетам' : 'Создать общий бюджет'}<ChevronRight size={17}/></Link></section>
      <section className="assistant-panel"><Sparkles size={24}/><div><p className="eyebrow">ВАШ ПОМОЩНИК</p><h2>Посмотрим на деньги по-новому?</h2><p>Задайте вопрос о своих расходах и общих платежах.</p></div><Link to="/agent" className="secondary-action">Обсудить расходы <ArrowUpRight size={17}/></Link></section>
      <section className="overview-goals"><PersonalGoals goals={boot.goals} onRefresh={refresh} dailyLeft={daily}/></section>
      <section className="overview-goals"><PwaInstallPrompt /><PushNudge /></section>
    </div>
  </div>
}
