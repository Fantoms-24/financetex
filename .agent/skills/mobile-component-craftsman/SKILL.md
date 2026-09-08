---
name: mobile-component-craftsman
description: Мастер мобильных компонентов (Principal Mobile UI Component Craftsman). Создание выверенных атомарных компонентов: InsetGroup, BalanceHeroCard, SegmentedTabs, ReceiptRow, QuickActionGrid, BillCard с идеальной эргономикой, тактильным откликом и доступностью.
---

# Скилл: Principal Mobile Component Craftsman («Листок»)

Данный скилл определяет паттерны и анатомию переиспользуемых мобильных компонентов для «Листка».

## 1. Базовые UI-компоненты «Листка»

### 1.1 Inset Grouped Card
Группированная карточка в стиле iOS Settings:
```tsx
<div className="overflow-hidden rounded-[20px] border border-rule/70 bg-paper shadow-paper">
  <div className="divide-y divide-rule-soft">
    {/* Дочерние строки */}
  </div>
</div>
```

### 1.2 Action Cell (Строка действия)
Интерактивный элемент списка с шевроном и моментальным откликом:
```tsx
<Link
  to={href}
  className="flex min-h-[52px] items-center justify-between px-4 py-3 transition-colors active:bg-black/[0.03]"
>
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/12 text-sage">
      <Icon size={18} />
    </div>
    <span className="text-[14.5px] font-medium text-ink">{title}</span>
  </div>
  <ChevronRight size={17} className="text-muted/60" />
</Link>
```

### 1.3 Segmented Pill Selector (Таббар с нулевым переполнением)
Переключатель режимов и вкладок:
- Контейнер: `relative flex items-center rounded-[16px] border border-rule/80 bg-paper p-1 shadow-paper select-none overflow-x-auto no-scrollbar`
- Активный индикатор: `layoutId` со spring-анимацией (`stiffness: 450, damping: 32`)
- Кнопка: `min-h-[36px] px-1.5 py-1 text-[11.5px] whitespace-nowrap`

### 1.4 Floating Elevated Nav Bar
Нижняя панель навигации:
- Внешний контейнер: `fixed bottom-0 left-0 right-0 z-40 border-t border-rule/70 bg-paper/95 pb-[max(env(safe-area-inset-bottom),10px)] pt-1.5 backdrop-blur-xl shadow-[0_-4px_24px_rgba(28,25,21,0.05)]`
- Центральная кнопка «Скан»: приподнята на `-mt-6`, `h-[52px] w-[52px] rounded-2xl bg-sage text-onsage shadow-md` с анимацией активного пульсара.
