import React from 'react'
import { Button, ButtonProps } from './ui/button'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Plus } from '@phosphor-icons/react'

const newClientButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'font-medium text-base h-14 w-44 text-primaryScale-50',
        collapsed: 'text-primaryScale-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface NewClientButtonProps
  extends VariantProps<typeof newClientButtonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const NewClientButton = React.forwardRef<
  HTMLButtonElement,
  NewClientButtonProps
>(({ className, variant, ...props }, ref) => {
  const isCollapsed = variant === 'collapsed'
  return (
    <Button
      type="button"
      className={cn(newClientButtonVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {isCollapsed ? <Plus size={24} weight="bold" /> : 'Novo Cliente'}
    </Button>
  )
})

export { NewClientButton }
