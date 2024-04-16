/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFetchClients } from '@/queries/clients'
import { MagnifyingGlass } from '@phosphor-icons/react'
import React, { ChangeEvent, useState } from 'react'

interface SearchInputProps extends InputProps {
  iconPosition?: 'left' | 'right'
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, iconPosition = 'left', ...props }, ref) => {
    return (
      <Input
        className={cn('caret-accent h-12', className)}
        type="text"
        placeholder="Buscar por Cliente"
        leftIcon={
          iconPosition === 'left' ? (
            <MagnifyingGlass size={24} className="text-zinc-600" />
          ) : (
            false
          )
        }
        rightIcon={
          iconPosition === 'right' ? (
            <MagnifyingGlass size={24} className="text-zinc-600" />
          ) : (
            false
          )
        }
        ref={ref}
        {...props}
      />
    )
  },
)

export { SearchInput }
