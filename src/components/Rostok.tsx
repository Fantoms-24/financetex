import { motion, useReducedMotion } from 'motion/react'
import { cn } from '~/lib/utils'

export function Rostok({
  className,
  priority = false,
  label,
}: {
  className?: string
  priority?: boolean
  label?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('rostok', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: -2, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -4, rotate: 1.5, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span className="rostok-glow" />
      <span className="rostok-spark rostok-spark--one" />
      <span className="rostok-spark rostok-spark--two" />
      <span className="rostok-spark rostok-spark--three" />
      <img
        src="/assets/rostok-coin.png"
        alt={label || ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </motion.div>
  )
}
