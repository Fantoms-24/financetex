import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '~/lib/utils'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
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
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Полупрозрачный фон с размытием */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Выезжающая шторка с пружинной физикой и возможностью свайпа вниз */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
            }}
            className={cn(
              'relative z-10 mx-auto w-full max-w-[440px] max-h-[90dvh] overflow-y-auto rounded-t-[26px] border-t border-rule bg-paper p-5 pb-[calc(env(safe-area-inset-bottom)+24px)] shadow-paper-lg no-scrollbar',
              className,
            )}
          >
            {/* Полоска-хэндл для перетаскивания */}
            <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-rule cursor-grab active:cursor-grabbing" />

            {title ? (
              <div className="mb-4 flex items-center justify-between border-b border-rule/60 pb-2.5">
                <h3 className="t-display text-[17px] font-semibold text-ink leading-tight">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-ink transition active:scale-95"
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
