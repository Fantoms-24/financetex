import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Package,
  Plus,
  Receipt as ReceiptIcon,
  ScanLine,
  Search,
  Share2,
  Store,
  Trash2,
  Users,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { BottomSheet } from '~/components/BottomSheet'
import { ShareMonthModal } from '~/components/ShareMonthModal'
import { SplitCreateModal } from '~/components/SplitCreateModal'
import { CategoryAnalytics } from '~/components/CategoryAnalytics'
import { useApp } from '~/lib/app-state'
import { CATEGORIES, categoryLabel, dateRu, money, moneyShort, monthKey, monthLabelRu, plural, prevMonthKey } from '~/lib/format'
import { addReceipt, deleteReceipt, getReceipt, listReceipts, setReceiptHouse } from '~/server/functions/receipts'
import type { Receipt, ReceiptItem } from '~/server/functions/bootstrap'
import { cn, haptic } from '~/lib/utils'

export const Route = createFileRoute('/receipts')({
  component: Receipts,
})

const VERDICT: Record<string, { label: string; color: string }> = {
  good: { label: 'норма', color: 'bg-sage/12 text-sage border-sage/25' },
  fair: { label: 'терпимо', color: 'bg-amber-600/12 text-amber-800 border-amber-500/25' },
  overpriced: { label: 'дорого', color: 'bg-stamp/10 text-stamp border-stamp/25' },
  impulse: { label: 'импульс', color: 'bg-stamp/10 text-stamp border-stamp/25' },
}

const CATEGORY_COLORS: Record<string, string> = {
  food: 'bg-sage',
  prepared: 'bg-[#d97736]',
  household: 'bg-[#4f6d7a]',
  hygiene: 'bg-[#5b8266]',
  health: 'bg-[#c06c84]',
  drinks: 'bg-[#b38647]',
  snacks: 'bg-[#e09f3e]',
  other: 'bg-[#7d7461]',
}

const QUICK_STORES = ['Пятёрочка', 'ВкусВилл', 'Магнит', 'Самокат', 'Озон', 'Аптека']

function Receipts() {
  const { user, boot, refresh } = useApp()
  const [items, setItems] = React.useState<Array<Receipt>>(boot.receipts || [])
  const [period, setPeriod] = React.useState<'current' | 'prev' | 'all'>('current')
  const [openShareModal, setOpenShareModal] = React.useState(false)
  const [openAddSheet, setOpenAddSheet] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')

  // Поля формы добавления чека
  const [store, setStore] = React.useState('')
  const [total, setTotal] = React.useState('')
  const [category, setCategory] = React.useState('food')
  const [note, setNote] = React.useState('')
  const [formHouseId, setFormHouseId] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  // Раскрытый чек и его позиции
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [detail, setDetail] = React.useState<Array<ReceiptItem>>([])
  const [loadingDetail, setLoadingDetail] = React.useState(false)

  // Сплит счёта по ссылке
  const [splitTarget, setSplitTarget] = React.useState<{
    id?: string
    store: string
    total: number
    items: Array<{ name: string; qty?: number; price: number }>
  } | null>(null)

  React.useEffect(() => {
    if (boot.receipts && boot.receipts.length > 0) {
      setItems(boot.receipts)
    }
  }, [boot.receipts])

  React.useEffect(() => {
    if (!user) return
    if (!boot.receipts || boot.receipts.length === 0) {
      listReceipts({ data: { limit: 120 } })
        .then((r) => setItems((r as any)?.receipts ?? []))
        .catch(() => {})
    }
  }, [user, boot.receipts])

  async function updateReceiptHouse(receiptId: string, nextHouseId: string | null) {
    haptic(6)
    await setReceiptHouse({ data: { id: receiptId, houseId: nextHouseId } })
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== receiptId) return it
        const targetH = boot.houses.find((h) => h.id === nextHouseId)
        return {
          ...it,
          house_id: nextHouseId,
          house_name: targetH?.name || null,
        }
      }),
    )
    await refresh()
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    const amount = Math.round(Number(total.replace(/[^\d.,]/g, '').replace(',', '.') || 0))
    if (!amount) return
    setBusy(true)
    try {
      await addReceipt({
        data: {
          store: store.trim() || 'Без названия',
          total: amount,
          category,
          note: note.trim() || undefined,
          houseId: formHouseId,
        },
      })
      setStore('')
      setTotal('')
      setNote('')
      setCategory('food')
      setFormHouseId(null)
      setOpenAddSheet(false)
      haptic(10)
      await refresh()
      const r = await listReceipts({ data: { limit: 120 } })
      setItems((r as any)?.receipts ?? [])
    } finally {
      setBusy(false)
    }
  }

  async function toggle(id: string) {
    haptic(6)
    if (openId === id) {
      setOpenId(null)
      return
    }
    setOpenId(id)
    setDetail([])
    setLoadingDetail(true)
    try {
      const r = await getReceipt({ data: { id } }).catch(() => null)
      setDetail((r as any)?.items ?? [])
    } finally {
      setLoadingDetail(false)
    }
  }

  async function drop(id: string) {
    if (!confirm('Удалить этот чек из истории?')) return
    haptic(10)
    await deleteReceipt({ data: { id } })
    setOpenId(null)
    await refresh()
    const r = await listReceipts({ data: { limit: 120 } })
    setItems((r as any)?.receipts ?? [])
  }

  const currentMonthKey = React.useMemo(() => monthKey(new Date()), [])
  const previousMonthKey = React.useMemo(() => prevMonthKey(new Date()), [])

  // Фильтрация чеков по выбранному периоду
  const periodItems = React.useMemo(() => {
    if (period === 'all') return items
    const targetKey = period === 'current' ? currentMonthKey : previousMonthKey
    return items.filter((r) => {
      const d = r.purchased_at || r.created_at || ''
      return d.startsWith(targetKey)
    })
  }, [items, period, currentMonthKey, previousMonthKey])

  // Фильтрация по поиску и категории внутри выбранного периода
  const filtered = React.useMemo(() => {
    return periodItems.filter((r) => {
      const matchSearch =
        !search.trim() ||
        (r.store || '').toLowerCase().includes(search.toLowerCase()) ||
        (r.note || '').toLowerCase().includes(search.toLowerCase())
      const matchCategory = selectedCategory === 'all' || r.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [periodItems, search, selectedCategory])

  // Группировка по дням
  const grouped = React.useMemo(() => {
    const map = new Map<string, Array<Receipt>>()
    for (const r of filtered) {
      const key = r.purchased_at || 'без даты'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(r)
    }
    return Array.from(map.entries())
  }, [filtered])

  const periodTotal = React.useMemo(() => {
    return periodItems.reduce((acc, it) => acc + (Number(it.total) || 0), 0)
  }, [periodItems])

  const periodAvgCheck = periodItems.length > 0 ? Math.round(periodTotal / periodItems.length) : 0

  return (
    <div className="space-y-5 px-4 pb-44 pt-3 sm:px-5">
      {/* 1. Шапка раздела: чистая и сбалансированная */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <ReceiptIcon size={14} className="text-sage" />
            <span>Архив покупок</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            Чеки и расходы
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/scan"
            onClick={() => haptic(8)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rule/80 bg-paper text-sage shadow-xs transition hover:border-sage/50 active:scale-95"
            title="Сканировать чек"
          >
            <ScanLine size={19} strokeWidth={2.2} />
          </Link>
          <Button
            size="sm"
            variant="sage"
            onClick={() => {
              haptic(8)
              setOpenAddSheet(true)
            }}
            className="gap-1.5 rounded-full px-4 h-10 shadow-paper"
          >
            <Plus size={16} strokeWidth={2.4} />
            <span className="font-semibold text-[13.5px]">Вписать</span>
          </Button>
        </div>
      </header>

      {/* 2. Панель периода и кнопка отчёта */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-full border border-rule/80 bg-paper/90 p-1 shadow-xs">
          {(
            [
              { id: 'current', label: 'Этот месяц' },
              { id: 'prev', label: 'Прошлый' },
              { id: 'all', label: 'Всё время' },
            ] as const
          ).map((tab) => {
            const active = period === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  haptic(6)
                  setPeriod(tab.id)
                }}
                className={cn(
                  'relative rounded-full px-3.5 py-1 text-[12px] font-medium transition cursor-pointer select-none',
                  active ? 'text-onsage font-semibold' : 'text-muted hover:text-ink',
                )}
              >
                {active && (
                  <motion.div
                    layoutId="receiptPeriodPill"
                    className="absolute inset-0 rounded-full bg-sage shadow-xs"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            haptic(8)
            setOpenShareModal(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-rule/80 bg-paper px-3.5 py-1.5 text-[12px] font-medium text-muted shadow-xs transition hover:border-sage/40 hover:text-ink active:scale-95 cursor-pointer"
          title="Поделиться отчетом и скачать CSV"
        >
          <Share2 size={13} className="text-sage" />
          <span>Отчёт</span>
        </button>
      </div>

      {/* 3. Премиальная карточка сводки за выбранный период */}
      <section className="relative overflow-hidden rounded-[24px] border border-rule/80 bg-paper p-5 shadow-paper space-y-3.5">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted">
          <span>
            {period === 'current'
              ? monthLabelRu(currentMonthKey)
              : period === 'prev'
              ? monthLabelRu(previousMonthKey)
              : 'Все покупки'}
          </span>
          <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-[11px] font-semibold text-sage">
            {periodItems.length} {plural(periodItems.length, 'чек', 'чека', 'чеков')}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <p className="t-display t-num text-[36px] font-bold text-ink leading-none tracking-tight">
            {money(periodTotal)}
          </p>
          <div className="text-right">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted block">
              Средний чек
            </span>
            <span className="t-num text-[14.5px] font-semibold text-ink">
              {money(periodAvgCheck)}
            </span>
          </div>
        </div>
      </section>

      {/* 3.1 Детальная интерактивная аналитика категорий трат (Кольцо + Полосы + Подсказка Листка) */}
      <CategoryAnalytics
        items={periodItems}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. Поиск и фильтрация по категориям */}
      <div className="space-y-2.5">
        {/* Поисковая строка с startIcon (исправлен наезд на текст) */}
        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по магазину или заметке…"
            startIcon={<Search size={16} className="text-muted" />}
            className="h-11 rounded-[16px] border-rule/70 bg-paper shadow-xs text-[14px]"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Чипы категорий */}
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 py-0.5">
          <button
            type="button"
            onClick={() => {
              haptic(6)
              setSelectedCategory('all')
            }}
            className={cn(
              'relative shrink-0 rounded-full border px-3.5 py-1 text-[12px] font-medium transition-colors cursor-pointer',
              selectedCategory === 'all'
                ? 'border-sage text-onsage font-semibold'
                : 'border-rule/70 bg-paper text-muted hover:text-ink',
            )}
          >
            {selectedCategory === 'all' ? (
              <motion.div
                layoutId="receiptCatPill"
                className="absolute inset-0 -z-10 rounded-full bg-sage shadow-xs"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            Все ({periodItems.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = periodItems.filter((r) => r.category === cat.id).length
            if (count === 0 && selectedCategory !== cat.id) return null
            const active = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  haptic(6)
                  setSelectedCategory(cat.id)
                }}
                className={cn(
                  'relative shrink-0 rounded-full border px-3.5 py-1 text-[12px] font-medium transition-colors cursor-pointer',
                  active
                    ? 'border-sage text-onsage font-semibold'
                    : 'border-rule/70 bg-paper text-muted hover:text-ink',
                )}
              >
                {active ? (
                  <motion.div
                    layoutId="receiptCatPill"
                    className="absolute inset-0 -z-10 rounded-full bg-sage shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {cat.label} {count > 0 ? `(${count})` : ''}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Список чеков или сбалансированное пустое состояние */}
      {grouped.length === 0 ? (
        <div className="rounded-[24px] border border-rule/70 bg-paper p-6 text-center shadow-paper space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <ReceiptIcon size={24} />
          </div>
          <div>
            <h3 className="t-display text-[17px] font-semibold text-ink">
              {search || selectedCategory !== 'all' ? 'Ничего не найдено' : 'В этом периоде пока нет чеков'}
            </h3>
            <p className="mx-auto mt-1 max-w-[260px] text-[12.5px] leading-relaxed text-muted">
              {search || selectedCategory !== 'all'
                ? 'Попробуйте изменить поисковый запрос или сбросить категорию.'
                : 'Отсканируйте чек камерой или запишите расход вручную.'}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2.5">
            <Link to="/scan" onClick={() => haptic(8)}>
              <Button size="sm" variant="sage" className="rounded-full gap-1.5 px-4">
                <ScanLine size={15} />
                <span>Сканировать</span>
              </Button>
            </Link>
            <Button
              size="sm"
              variant="paper"
              onClick={() => {
                haptic(8)
                setOpenAddSheet(true)
              }}
              className="rounded-full gap-1.5 px-4"
            >
              <Plus size={15} />
              <span>Вписать</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(([day, list]) => {
            const daySum = list.reduce((s, r) => s + r.total, 0)
            return (
              <section key={day} className="space-y-1.5">
                {/* Дата и дневной итог */}
                <div className="flex items-center justify-between px-1 text-[11.5px] text-muted">
                  <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                    <Calendar size={12} className="text-sage" />
                    <span>{dateRu(day)}</span>
                  </span>
                  <span className="t-num font-medium text-ink/80">
                    {list.length} {plural(list.length, 'чек', 'чека', 'чеков')} • {money(daySum)}
                  </span>
                </div>

                {/* Карточки чеков дня */}
                <div className="divide-y divide-rule-soft overflow-hidden rounded-[20px] border border-rule/70 bg-paper shadow-paper">
                  {list.map((r) => {
                    const isOpen = openId === r.id
                    const verdictInfo = r.verdict ? VERDICT[r.verdict] : null

                    return (
                      <div key={r.id} className="transition-colors hover:bg-black/[0.015]">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-4 py-3.5 text-left active:bg-black/[0.03] transition-colors"
                          onClick={() => toggle(r.id)}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-sage/12 text-sage font-bold text-[13.5px]">
                              {(r.store || 'Ч')[0].toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-[15px] font-semibold text-ink">
                                  {r.store || 'Без названия'}
                                </span>
                                {r.house_name ? (
                                  <span className="flex items-center gap-1 rounded-full bg-sage/15 px-2 py-0.2 text-[10px] font-semibold text-sage">
                                    <Users size={10} />
                                    {r.house_name}
                                  </span>
                                ) : null}
                                {verdictInfo ? (
                                  <span
                                    className={cn(
                                      'rounded-full border px-1.5 py-0.2 text-[10px] font-semibold leading-none',
                                      verdictInfo.color,
                                    )}
                                  >
                                    {verdictInfo.label}
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted">
                                <span>{categoryLabel(r.category)}</span>
                                {r.note ? (
                                  <>
                                    <span>•</span>
                                    <span className="truncate text-ink/70">{r.note}</span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="t-num text-[15.5px] font-bold text-ink">
                              {money(r.total)}
                            </span>
                            <div className="text-muted/60">
                              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </button>

                        {/* Раскрытые детали чека: Перфорация и список позиций */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-dashed border-rule/70 bg-cream/30 px-4 py-3.5 space-y-3"
                            >
                              {loadingDetail ? (
                                <p className="py-2 text-[12.5px] text-muted">Загрузка позиций…</p>
                              ) : detail.length > 0 ? (
                                <div className="space-y-1.5">
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                                    Товары из чека ({detail.length}):
                                  </p>
                                  <ul className="divide-y divide-rule/40 rounded-[14px] border border-rule/60 bg-paper p-2.5">
                                    {detail.map((it) => (
                                      <li
                                        key={it.id}
                                        className="flex items-baseline justify-between gap-3 py-1.5 text-[12.5px]"
                                      >
                                        <span className="min-w-0 truncate text-ink">
                                          {it.name}
                                          {it.qty && it.qty > 1 ? (
                                            <span className="text-muted"> ×{it.qty}</span>
                                          ) : null}
                                        </span>
                                        <span className="t-num shrink-0 font-medium text-ink">
                                          {moneyShort(it.price)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <p className="py-1 text-[12px] text-muted">
                                  Отдельные позиции не были зафиксированы при сканировании.
                                </p>
                              )}

                              {/* Переключение назначения: Личный расход или во «Вместе» */}
                              {boot.houses && boot.houses.length > 0 ? (
                                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule/50 pt-2.5">
                                  <span className="flex items-center gap-1 text-[12px] font-medium text-muted">
                                    <Users size={13} className="text-sage" />
                                    Бюджет:
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    <button
                                      type="button"
                                      onClick={() => updateReceiptHouse(r.id, null)}
                                      className={cn(
                                        'rounded-full px-2.5 py-0.5 text-[11px] font-medium transition active:scale-95',
                                        !r.house_id ? 'bg-sage text-onsage shadow-xs' : 'bg-paper border border-rule/70 text-muted hover:text-ink',
                                      )}
                                    >
                                      Личные
                                    </button>
                                    {boot.houses.map((h) => (
                                      <button
                                        key={h.id}
                                        type="button"
                                        onClick={() => updateReceiptHouse(r.id, h.id)}
                                        className={cn(
                                          'flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition active:scale-95',
                                          r.house_id === h.id ? 'bg-sage text-onsage shadow-xs font-semibold' : 'bg-paper border border-rule/70 text-muted hover:text-ink',
                                        )}
                                      >
                                        <Users size={10} />
                                        <span>«{h.name}»</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : null}

                              {/* Кнопки действий: Разделить счёт и Удалить */}
                              <div className="flex items-center justify-between pt-1">
                                <Button
                                  size="sm"
                                  variant="paper"
                                  onClick={() => {
                                    haptic(8)
                                    setSplitTarget({
                                      id: r.id,
                                      store: r.store || 'Чек',
                                      total: r.total,
                                      items: detail.map((it) => ({
                                        name: it.name,
                                        qty: it.qty || 1,
                                        price: it.price,
                                      })),
                                    })
                                  }}
                                  className="gap-1.5 rounded-full border border-sage/40 bg-sage/8 text-sage hover:bg-sage/15 text-[12px] h-8 px-3.5 font-medium shadow-xs"
                                >
                                  <Utensils size={13} />
                                  <span>Разделить чек 🍕</span>
                                </Button>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => drop(r.id)}
                                  className="gap-1.5 text-stamp hover:bg-stamp/10 hover:text-stamp text-[12px] h-8"
                                >
                                  <Trash2 size={14} />
                                  <span>Удалить чек</span>
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* 5. Шторка ручной записи чека (BottomSheet вместо смещения страницы) */}
      <BottomSheet
        open={openAddSheet}
        onClose={() => setOpenAddSheet(false)}
        title="Вписать покупку вручную"
      >
        <form onSubmit={save} className="space-y-4 pt-1">
          {/* Магазин / Сервис */}
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Магазин или сервис
            </label>
            <Input
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="Пятёрочка, ВкусВилл, Аптека…"
              className="h-11 rounded-[14px]"
              required
            />
            {/* Быстрые подсказки магазинов */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_STORES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setStore(s)
                  }}
                  className={cn(
                    'rounded-full border px-2.5 py-0.5 text-[11.5px] transition-colors',
                    store === s
                      ? 'border-sage bg-sage text-onsage font-medium'
                      : 'border-rule/70 bg-cream/50 text-muted hover:bg-cream',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Сумма */}
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Сумма покупки, ₽
            </label>
            <Input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="1 250"
              inputMode="numeric"
              className="h-12 text-[18px] font-bold rounded-[14px]"
              required
            />
          </div>

          {/* Категория */}
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Категория
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setCategory(cat.id)
                  }}
                  className={cn(
                    'rounded-full border px-3 py-1 text-[12px] font-medium transition-all active:scale-95',
                    category === cat.id
                      ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                      : 'border-rule/70 bg-paper text-muted hover:text-ink',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Заметка */}
          <div>
            <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
              Заметка (необязательно)
            </label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Кофе с круассаном, подарок маме…"
              className="h-11 rounded-[14px]"
            />
          </div>

          {/* Назначение: Личный или во «Вместе» */}
          {boot.houses && boot.houses.length > 0 && (
            <div>
              <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-muted">
                Куда записать
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    haptic(6)
                    setFormHouseId(null)
                  }}
                  className={cn(
                    'rounded-full border px-3 py-1 text-[12px] font-medium transition active:scale-95',
                    formHouseId === null
                      ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                      : 'border-rule/70 bg-paper text-muted hover:text-ink',
                  )}
                >
                  Личные расходы
                </button>
                {boot.houses.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      haptic(6)
                      setFormHouseId(h.id)
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1 text-[12px] font-medium transition active:scale-95',
                      formHouseId === h.id
                        ? 'border-sage bg-sage text-onsage shadow-xs font-semibold'
                        : 'border-rule/70 bg-paper text-muted hover:text-ink',
                    )}
                  >
                    «{h.name}»
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Кнопка сохранения */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="sage"
              size="lg"
              className="w-full h-12 rounded-[16px] text-[15px] font-semibold"
              disabled={busy}
            >
              {busy ? 'Сохранение…' : 'Записать покупку'}
            </Button>
          </div>
        </form>
      </BottomSheet>

      {/* Модальное окно красивого шеринга итогов и экспорта в CSV */}
      <ShareMonthModal
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        receipts={periodItems}
        monthLabel={
          period === 'current'
            ? monthLabelRu(currentMonthKey)
            : period === 'prev'
            ? monthLabelRu(previousMonthKey)
            : 'Всё время'
        }
        budget={boot.settings.monthly_budget || 45000}
        spent={periodTotal}
      />

      {/* Модальное окно разделения чека с друзьями по ссылке */}
      <SplitCreateModal
        open={Boolean(splitTarget)}
        onClose={() => setSplitTarget(null)}
        receiptId={splitTarget?.id}
        storeName={splitTarget?.store}
        totalAmount={splitTarget?.total}
        items={splitTarget?.items}
      />
    </div>
  )
}
