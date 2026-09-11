import { budgetNumbers, dueDay } from '~/lib/finance'
import { Link } from '@tanstack/react-router'
import { ArrowDownLeft, ArrowUpRight, CalendarDays, ChevronRight, Plus, Receipt, Wallet } from 'lucide-react'
import { useApp } from '~/lib/app-state'
import { billDueLabel, dateRu, greeting, money } from '~/lib/format'

export function Overview() {
  const { user, boot } = useApp()
  const budget = boot.settings.monthly_budget
  const spent = boot.month.spent
  const { left, reserved, available, daily } = budgetNumbers(budget, spent, boot.bills)
  const now = new Date()
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = Math.max(1, days - now.getDate() + 1)
  const used = budget > 0 ? Math.min(100, Math.max(0, spent / budget * 100)) : 0
  const month = now.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
  const unpaid = boot.bills
    .filter((bill) => !bill.paused && !bill.paid_cycle)
    .sort((a, b) => dueDay(a.day_of_month) - dueDay(b.day_of_month))
  const nextBill = unpaid[0]
  const focus = !boot.settings.seen_welcome || budget <= 0
    ? { title: 'Укажите бюджет на месяц', body: 'Так мы подскажем безопасную сумму на день.', action: 'Настроить бюджет', to: '/settings' }
    : left < 0
      ? { title: 'Бюджет превышен', body: `Сверх лимита ${money(Math.abs(left))}. Посмотрите расходы и скорректируйте план.`, action: 'Открыть расходы', to: '/receipts' }
      : nextBill
        ? { title: `Ближайший платёж — ${nextBill.title}`, body: `${billDueLabel(nextBill.day_of_month).label} · ${money(nextBill.amount)}`, action: 'Открыть план', to: '/bills' }
        : { title: `Сегодня можно потратить ${money(daily)}`, body: 'Это комфортный ориентир, чтобы спокойно дойти до конца месяца.', action: 'Добавить расход', to: null }

  return <div className="overview-page">
    <div className="page-heading"><div><p className="eyebrow">{greeting()}, {(user?.displayName || user?.name || 'друг').split(' ')[0]}</p><h1>Деньги под контролем<span>.</span></h1></div><span className="date-chip"><CalendarDays size={16}/>{month}</span></div>
    <div className="overview-grid overview-grid--focused">
      <section className="balance-panel"><div className="panel-kicker"><span><Wallet size={17}/>Ваш бюджет</span><span>Этот месяц</span></div><p className="balance-label">{left < 0 ? 'Сверх бюджета' : 'Осталось на месяц'}</p><div className="balance-number">{money(Math.abs(left))}</div><div className="balance-track" role="progressbar" aria-label="Бюджет израсходован" aria-valuenow={Math.round(used)} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${used}%`}}/></div><div className="budget-pair"><div><span>Потрачено</span><strong>{money(spent)}</strong></div><div><span>Бюджет</span><strong>{money(budget)}</strong></div></div><div className="balance-reserve"><span>На неоплаченные счета <strong>{money(reserved)}</strong></span><span>Свободно после счетов <strong>{money(available)}</strong></span></div><div className="balance-bottom"><span>Доступно на день <strong>{money(daily)}</strong></span><Link to="/settings" aria-label="Настроить бюджет"><ArrowUpRight size={21}/></Link></div></section>

      <section className="surface today-panel">
        <div className="today-panel-icon" aria-hidden="true">{nextBill && budget > 0 && left >= 0 ? <CalendarDays size={22}/> : <Wallet size={22}/>}</div>
        <p className="eyebrow">СЕГОДНЯ</p>
        <h2>{focus.title}</h2>
        <p>{focus.body}</p>
        {focus.to ? <Link to={focus.to} className="today-panel-action">{focus.action}<ArrowUpRight size={17}/></Link> : <button className="today-panel-action" onClick={() => window.dispatchEvent(new Event('listok:add'))}>{focus.action}<Plus size={17}/></button>}
      </section>

      <section className="surface recent-panel"><div className="section-heading"><div><p className="eyebrow">ВАША ИСТОРИЯ</p><h2>Последние расходы</h2></div><Link className="text-action" to="/receipts">Все расходы <ChevronRight size={16}/></Link></div><div className="transaction-heading"><span>Операция</span><span>Категория</span><span>Сумма</span></div>{boot.receipts.slice(0,3).map((receipt, index) => <Link to="/receipts" className="transaction-row" key={receipt.id}><span className={`transaction-icon tone-${index % 3}`}><ArrowDownLeft size={21}/></span><span className="transaction-name"><strong>{receipt.store || 'Покупка'}</strong><small>{dateRu(receipt.purchased_at || receipt.created_at)}{receipt.house_name ? ` · ${receipt.house_name}` : ''}</small></span><strong className="transaction-amount">−{money(receipt.total)}</strong></Link>)}{!boot.receipts.length && <div className="overview-empty-history"><span className="empty-state-mark empty-state-mark--categories" aria-hidden="true"><Receipt size={27}/></span><div><h3>Первая покупка — и появится история</h3><p>Добавьте расход, чтобы начать отслеживать бюджет.</p></div><button className="primary-action" onClick={() => window.dispatchEvent(new Event('listok:add'))}><Plus size={17}/>Добавить расход</button></div>}</section>
    </div>
  </div>
}
