/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MagnifyingGlass } from "@phosphor-icons/react"
import React, { useState } from "react"

interface SearchInputProps extends InputProps {
  iconPosition?: "left" | "right"
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, iconPosition = "left", ...props }, ref) => {
    const [search, setSearch] = useState("")
    return (
      <Input
        className={cn("caret-accent h-12", className)}
        type="text"
        placeholder="Buscar por Cliente"
        leftIcon={
          iconPosition === "left" ? (
            <MagnifyingGlass size={24} className="text-zinc-600" />
          ) : (
            false
          )
        }
        rightIcon={
          iconPosition === "right" ? (
            <MagnifyingGlass size={24} className="text-zinc-600" />
          ) : (
            false
          )
        }
        onChange={(e) => setSearch(e.target.value)}
        ref={ref}
        {...props}
      />
    )
  },
)

export { SearchInput }
