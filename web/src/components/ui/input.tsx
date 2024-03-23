import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="relative flex">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-12 w-full rounded-md border  bg-background ${
              leftIcon ? 'pl-12 ' : 'pl-3'
            } 
            ${
              rightIcon ? 'pr-12 ' : 'pr-3'
            }py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1   disabled:cursor-not-allowed disabled:opacity-50 text-base caret-accent  ${
              error
                ? 'border-red-500 focus-visible:ring-red-500'
                : 'border-input focus-visible:ring-ring'
            }`,
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-600">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
