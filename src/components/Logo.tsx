import { cn } from '~/lib/utils'

export function Logo({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn('overflow-hidden rounded-[22%] shadow-paper-lg bg-[#3d5c4a] shrink-0 select-none', className)}
    >
      <img
        src="/logo.png"
        alt="Листок"
        className="h-full w-full object-cover"
        width={size}
        height={size}
      />
    </div>
  )
}
