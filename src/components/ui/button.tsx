import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,box-shadow] duration-150 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-45 select-none',
  {
    variants: {
      variant: {
        sage: 'bg-sage text-onsage shadow-paper-lg hover:brightness-[1.06]',
        paper:
          'bg-paper text-ink border border-rule shadow-paper hover:bg-[#fffdf7]',
        ghost: 'text-ink hover:bg-[rgba(28,25,21,0.05)]',
        stamp: 'border border-stamp/45 text-stamp bg-transparent hover:bg-stamp/8',
        link: 'text-sage underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-[13px] rounded-[10px]',
        md: 'min-h-[46px] px-4 text-[15px] rounded-[12px]',
        lg: 'min-h-[54px] px-5 text-[16px] rounded-[14px]',
        icon: 'h-11 w-11 rounded-[12px]',
      },
    },
    defaultVariants: { variant: 'paper', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  },
)
Button.displayName = 'Button'

export { buttonVariants }
