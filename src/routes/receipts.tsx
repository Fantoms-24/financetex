import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Package,
  Plus,
  Receipt as ReceiptIcon,
  ScanLine,
  Search,
  Store,
  Trash2,
  TrendingDown,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useApp } from '~/lib/app-state'
import { CATEGORIES, categoryLabel, dateRu, money, moneyShort, plural } from '~/lib/format'
import { addReceipt, deleteReceipt, getReceipt, listReceipts, setReceiptHouse } from '~/server/functions/receipts'
import type { Receipt, ReceiptItem } from '~/server/functions/bootstrap'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/receipts')({
  component: Receipts,
})

const VERDICT: Record<string, { label: string; color: string }> = {
  good: { label: 'норма', color: 'bg-sage/10 text-sage border-sage/20' },
  fair: { label: 'терпимо', color: 'bg-amber-500/10 text-amber-800 border-amber-500/20' },
  overpriced: { label: 'дорого', color: 'bg-stamp/10 text-stamp border-stamp/20' },
  impulse: { label: 'импульс', color: 'bg-stamp/10 text-stamp border-stamp/20' },
}

const QUICK_STORES = ['Пятёрочка', 'ВкусВилл', 'Магнит', 'Самокат', 'Озон', 'Аптека']

function Receipts() {
  const { user, boot, refresh } = useApp()
  const [items, setItems] = React.useState<Array<Receipt>>(boot.receipts || [])
  const [open, setOpen] = React.useState(false)
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

  React.useEffect(() => {
    if (!user) return
    listReceipts({ data: { limit: 120 } })
      .then((r) => setItems((r as any)?.receipts ?? []))
      .catch(() => {})
  }, [user])

  async function updateReceiptHouse(receiptId: string, nextHouseId: string | null) {
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
      setOpen(false)
      await refresh()
      const r = await listReceipts({ data: { limit: 120 } })
      setItems((r as any)?.receipts ?? [])
    } finally {
      setBusy(false)
    }
  }

  async function toggle(id: string) {
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
    await deleteReceipt({ data: { id } })
    setOpenId(null)
    await refresh()
    const r = await listReceipts({ data: { limit: 120 } })
    setItems((r as any)?.receipts ?? [])
  }

  // Фильтрация по поиску и категории
  const filtered = React.useMemo(() => {
    return items.filter((r) => {
      const matchSearch =
        !search.trim() ||
        (r.store || '').toLowerCase().includes(search.toLowerCase()) ||
        (r.note || '').toLowerCase().includes(search.toLowerCase())
      const matchCategory = selectedCategory === 'all' || r.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [items, search, selectedCategory])

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

  const monthTotal = boot.month.spent
  const avgCheck = items.length > 0 ? Math.round(monthTotal / items.length) : 0

  return (
    <div className="space-y-4 px-4 pb-32 pt-2 sm:px-5">
      {/* Шапка раздела */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <ReceiptIcon size={14} className="text-sage" />
            <span>Учёт расходов</span>
          </div>
          <h1 className="t-display mt-0.5 text-[26px] font-semibold leading-tight text-ink">
            Чеки и покупки
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/scan"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rule/80 bg-paper text-ink shadow-sm transition-all hover:border-sage/40 active:scale-95"
            title="Сканировать чек"
            aria-label="Сканировать чек"
          >
            <ScanLine size={18} className="text-sage" />
          </Link>
          <Button
            size="sm"
            variant={open ? 'ghost' : 'sage'}
            onClick={() => setOpen(!open)}
            className="gap-1.5"
          >
            {open ? <X size={16} /> : <Plus size={16} />}
            <span>{open ? 'Закрыть' : 'Вписать'}</span>
          </Button>
        </div>
      </header>

      {/* Сводная карточка аналитики */}
      <section className="grid grid-cols-3 gap-2.5 rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper">
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-[11px] text-muted">
            <TrendingDown size={12} className="text-sage" />
            За месяц
          </span>
          <span className="t-num mt-1 text-[16px] font-semibold text-ink">
            {money(monthTotal)}
          </span>
          <span className="text-[10.5px] text-muted">всего трат</span>
        </div>

        <div className="flex flex-col border-x border-rule/60 px-2.5">
          <span className="flex items-center gap-1 text-[11px] text-muted">
            <Package size={12} className="text-sage" />
            Чеков
          </span>
          <span className="t-num mt-1 text-[16px] font-semibold text-ink">
            {items.length}
          </span>
          <span className="text-[10.5px] text-muted">
            {plural(items.length, 'запись', 'записи', 'записей')}
          </span>
        </div>

        <div className="flex flex-col pl-1">
          <span className="flex items-center gap-1 text-[11px] text-muted">
            <Wallet size={12} className="text-sage" />
            Средний
          </span>
          <span className="t-num mt-1 text-[16px] font-semibold text-ink">
            {money(avgCheck)}
          </span>
          <span className="text-[10.5px] text-muted">за один чек</span>
        </div>
      </section>

      {/* Форма ручной записи чека */}
      {open ? (
        <form
          onSubmit={save}
          className="relative overflow-hidden rounded-[20px] border border-rule/80 bg-paper p-4 shadow-paper-lg"
        >
          <div className="mb-3 flex items-center justify-between border-b border-rule/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Store size={17} className="text-sage" />
              <p className="t-display text-[16px] font-medium text-ink">Вписать чек вручную</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {/* Магазин */}
            <div>
              <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Магазин / Сервис
              </label>
              <Input
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder="Пятёрочка, ВкусВилл, Аптека…"
                required
              />
              {/* Быстрые чипы магазинов */}
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {QUICK_STORES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStore(s)}
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[11px] transition-colors',
                      store === s
                        ? 'border-sage bg-sage text-onsage'
                        : 'border-rule/80 bg-black/[0.02] text-muted hover:bg-black/[0.05]',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Сумма */}
            <div>
              <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Сумма чека, ₽
              </label>
              <Input
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="1 250"
                inputMode="numeric"
                required
              />
            </div>

            {/* Категория */}
            <div>
              <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Категория
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'rounded-xl border px-2.5 py-1 text-[11.5px] font-medium transition-all',
                      category === cat.id
                        ? 'border-sage bg-sage text-onsage shadow-sm'
                        : 'border-rule/80 bg-paper text-muted hover:text-ink',
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Заметка */}
            <div>
              <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                Заметка (необязательно)
              </label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Например: кофе на прогулке, подарок"
              />
            </div>

            {/* Назначение чека: личный или в кассу */}
            {boot.houses && boot.houses.length > 0 ? (
              <div>
                <label className="mb-1 block text-[11.5px] font-medium uppercase tracking-wider text-muted">
                  Куда записать чек
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFormHouseId(null)}
                    className={cn(
                      'rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition',
                      formHouseId === null ? 'bg-sage text-onsage shadow-xs' : 'bg-cream text-muted hover:text-ink',
                    )}
                  >
                    Личный
                  </button>
                  {boot.houses.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setFormHouseId(h.id)}
                      className={cn(
                        'flex items-center gap-1 rounded-[10px] px-2.5 py-1 text-[12px] font-medium transition',
                        formHouseId === h.id ? 'bg-amber-800 text-onsage shadow-xs' : 'bg-cream text-muted hover:text-ink',
                      )}
                    >
                      <Users size={12} />
                      <span>{h.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <Button
              type="submit"
              variant="sage"
              size="md"
              className="w-full"
              disabled={busy}
            >
              {busy ? 'Сохранение…' : 'Положить чек в ящик'}
            </Button>
          </div>
        </form>
      ) : null}

      {/* Поиск и фильтр по категориям */}
      <div className="space-y-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по магазину или заметке…"
          startIcon={<Search size={16} />}
          endIcon={
            search ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-muted hover:text-ink"
              >
                <X size={15} />
              </button>
            ) : undefined
          }
        />

        {/* Чипы категорий */}
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 py-0.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'relative shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors',
              selectedCategory === 'all'
                ? 'border-sage text-onsage'
                : 'border-rule/80 bg-paper text-muted hover:text-ink',
            )}
          >
            {selectedCategory === 'all' ? (
              <motion.div
                layoutId="receiptCatPill"
                className="absolute inset-0 -z-10 rounded-full bg-sage shadow-sm"
                transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              />
            ) : null}
            Все ({items.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = items.filter((r) => r.category === cat.id).length
            if (count === 0 && selectedCategory !== cat.id) return null
            const active = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'relative shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors',
                  active
                    ? 'border-sage text-onsage'
                    : 'border-rule/80 bg-paper text-muted hover:text-ink',
                )}
              >
                {active ? (
                  <motion.div
                    layoutId="receiptCatPill"
                    className="absolute inset-0 -z-10 rounded-full bg-sage shadow-sm"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                ) : null}
                {cat.label} {count > 0 ? `(${count})` : ''}
              </button>
            )
          })}
        </div>
      </div>

      {/* Список чеков */}
      {grouped.length === 0 ? (
        <div className="rounded-[20px] border border-rule/80 bg-paper p-8 text-center shadow-paper">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <ReceiptIcon size={24} />
          </div>
          <p className="t-display mt-3 text-[17px] font-medium text-ink">
            {search || selectedCategory !== 'all' ? 'Ничего не найдено' : 'В ящике пока нет чеков'}
          </p>
          <p className="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-snug text-muted">
            {search || selectedCategory !== 'all'
              ? 'Попробуйте изменить поисковый запрос или сбросить фильтр.'
              : 'Отсканируйте бумажный чек, загрузите фото или впишите сумму вручную.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Link to="/scan">
              <Button size="sm" variant="sage">
                <ScanLine size={16} /> Сканировать
              </Button>
            </Link>
            <Button size="sm" variant="paper" onClick={() => setOpen(true)}>
              <Plus size={16} /> Вписать вручную
            </Button>
          </div>
        </div>
      ) : (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          {grouped.map(([day, list]) => {
            const daySum = list.reduce((s, r) => s + r.total, 0)
            return (
              <section key={day} className="space-y-2">
                {/* Дата и дневной итог */}
                <div className="flex items-center justify-between px-1">
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-muted">
                    <Calendar size={13} className="text-sage" />
                    <span>{dateRu(day)}</span>
                  </span>
                  <span className="t-num text-[12.5px] font-semibold text-ink/80">
                    {money(daySum)}
                  </span>
                </div>

                {/* Карточки чеков дня */}
                <div className="divide-y divide-rule-soft overflow-hidden rounded-[18px] border border-rule/80 bg-paper shadow-paper">
                  {list.map((r) => {
                    const isOpen = openId === r.id
                    const verdictInfo = r.verdict ? VERDICT[r.verdict] : null

                    return (
                      <div key={r.id} className="transition-colors hover:bg-black/[0.015]">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between p-3.5 text-left active:bg-black/[0.03] transition-colors"
                          onClick={() => toggle(r.id)}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage font-semibold text-[13.5px]">
                              {(r.store || 'Ч')[0].toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-[15px] font-semibold text-ink">
                                  {r.store || 'Без названия'}
                                </span>
                                {r.house_name ? (
                                  <span className="flex items-center gap-1 rounded-full bg-sage/15 px-2 py-0.5 text-[10.5px] font-semibold text-sage">
                                    <Users size={11} />
                                    {r.house_name}
                                  </span>
                                ) : null}
                                {verdictInfo ? (
                                  <span
                                    className={cn(
                                      'rounded-full border px-2 py-0.5 text-[10.5px] font-medium leading-none',
                                      verdictInfo.color,
                                    )}
                                  >
                                    {verdictInfo.label}
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-1 flex items-center gap-2 text-[12px] text-muted">
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
                            <span className="t-num text-[15.5px] font-semibold text-ink">
                              {money(r.total)}
                            </span>
                            <div className="text-muted/70">
                              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </button>

                        {/* Раскрытый список позиций */}
                        {isOpen ? (
                          <div className="border-t border-rule/60 bg-black/[0.015] px-4 py-3">
                            {loadingDetail ? (
                              <p className="py-2 text-[12.5px] text-muted">Загрузка позиций…</p>
                            ) : detail.length > 0 ? (
                              <div className="space-y-1.5">
                                <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                                  Позиции из чека ({detail.length}):
                                </p>
                                <ul className="divide-y divide-rule/40 rounded-xl border border-rule/60 bg-paper p-2">
                                  {detail.map((it) => (
                                    <li
                                      key={it.id}
                                      className="flex items-baseline justify-between gap-3 py-1.5 text-[13px]"
                                    >
                                      <span className="min-w-0 truncate text-ink">
                                        {it.name}
                                        {it.qty ? (
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
                                Отдельные позиции не были распознаны или записаны.
                              </p>
                            )}

                            {/* Назначение чека: личный или в кассу */}
                            {boot.houses && boot.houses.length > 0 ? (
                              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-rule/50 pt-2.5">
                                <span className="flex items-center gap-1 text-[12px] font-medium text-muted">
                                  <Users size={13} className="text-amber-800" />
                                  Куда отнесён:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  <button
                                    type="button"
                                    onClick={() => updateReceiptHouse(r.id, null)}
                                    className={cn(
                                      'rounded-[8px] px-2 py-1 text-[11px] font-medium transition',
                                      !r.house_id ? 'bg-sage text-onsage shadow-xs' : 'bg-cream text-muted hover:text-ink',
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
                                        'flex items-center gap-1 rounded-[8px] px-2 py-1 text-[11px] font-medium transition',
                                        r.house_id === h.id ? 'bg-amber-800 text-onsage shadow-xs' : 'bg-cream text-muted hover:text-ink',
                                      )}
                                    >
                                      <Users size={10} />
                                      <span>{h.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                            <div className="mt-3 flex items-center justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => drop(r.id)}
                                className="gap-1.5 text-stamp hover:bg-stamp/10 hover:text-stamp"
                              >
                                <Trash2 size={14} />
                                <span>Удалить чек</span>
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}

