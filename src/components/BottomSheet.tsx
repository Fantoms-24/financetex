import * as React from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import { X } from 'lucide-react'
import { cn, haptic } from '~/lib/utils'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef(onClose)
  closeRef.current = onClose
  const dragControls = useDragControls()

  React.useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('input,button,a,select,textarea')?.focus(), 60)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); return }
      if (event.key !== 'Tab') return
      const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]') || []).filter(el => el.getClientRects().length)
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { clearTimeout(timer); document.removeEventListener('keydown', onKey); previous?.focus() }
  }, [open])
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <div className="sheet-dialog fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={title || 'Действие'}>
          {/* Полупрозрачный фон с размытием */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          {/* Выезжающая шторка с пружинной физикой и возможностью свайпа вниз */}
          <motion.div
            initial={{ y: '100%' }}
            ref={panelRef}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.55 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 70 || info.velocity.y > 300) {
                haptic(10)
                onClose()
              }
            }}
            className={cn(
              'sheet-dialog-panel relative z-10 mx-auto w-full max-w-[440px] max-h-[90dvh] overflow-y-auto rounded-t-[26px] border-t border-rule bg-paper p-5 pb-[calc(max(env(safe-area-inset-bottom,0px),16px)+20px)] shadow-paper-lg no-scrollbar',
              className,
            )}
          >
            {/* Полоска-хэндл для перетаскивания (с широкой областью захвата) */}
            <div
              className="sheet-handle-zone flex flex-col items-center justify-center pt-1 pb-3 -mt-2 -mx-5 px-5 cursor-grab active:cursor-grabbing touch-none select-none"
              onPointerDown={(e) => dragControls.start(e)}
              role="button"
              tabIndex={-1}
              aria-label="Потяните вниз, чтобы закрыть"
            >
              <div className="h-1.5 w-12 rounded-full bg-rule/90 hover:bg-muted/70 transition-colors pointer-events-none" />
            </div>

            {title ? (
              <div
                className="mb-4 flex items-center justify-between border-b border-rule/60 pb-2.5 cursor-grab active:cursor-grabbing select-none"
                onPointerDown={(e) => {
                  const target = e.target as HTMLElement
                  if (target.tagName !== 'BUTTON' && !target.closest('button')) {
                    dragControls.start(e)
                  }
                }}
              >
                <h3 className="t-display text-[17px] font-semibold text-ink leading-tight pointer-events-none">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={() => { haptic(6); onClose() }}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-ink transition active:scale-95"
                  aria-label="Закрыть"
                >
                  <X size={17} />
                </button>
              </div>
            ) : null}

            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
