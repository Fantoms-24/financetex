import * as React from 'react'
import { cn } from '~/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, style, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return (
        <div className="relative flex w-full items-center">
          {startIcon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center justify-center text-muted">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn('field', className)}
            style={{
              paddingLeft: startIcon ? '42px' : undefined,
              paddingRight: endIcon ? '42px' : undefined,
              ...style,
            }}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 flex items-center justify-center text-muted">
              {endIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        className={cn('field', className)}
        style={style}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('field resize-none leading-relaxed', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('block text-[12px] uppercase tracking-[0.09em] text-muted', className)} {...props} />
}
