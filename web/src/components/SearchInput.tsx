import React, { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchInputProps extends InputProps {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    const [search, setSearch] = useState('')
    return (
      <Input
        className={cn('caret-accent  h-12', className)}
        type="search"
        placeholder="Buscar por Cliente"
        leftIcon={<MagnifyingGlass size={24} className="text-zinc-600" />}
        onChange={(e) => setSearch(e.target.value)}
        ref={ref}
        {...props}
      />
    )
  }
)

export { SearchInput }
