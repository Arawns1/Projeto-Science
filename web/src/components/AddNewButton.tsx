import { cn } from '@/lib/utils'
import { Plus } from '@phosphor-icons/react'
import React from 'react'
import { Button, ButtonProps } from './ui/button'

interface AddNewButtonProps
  extends ButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddNewButton = React.forwardRef<HTMLButtonElement, AddNewButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        type="button"
        variant={'ghost'}
        className={cn('gap-4 px-3', className)}
        ref={ref}
        {...props}
      >
        <Plus size={24} weight="bold" />
        <span>Adicionar novo</span>
      </Button>
    )
  }
)
export { AddNewButton }
