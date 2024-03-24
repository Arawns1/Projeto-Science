import React from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

interface SimpleListItemProps extends React.InputHTMLAttributes<HTMLLIElement> {
  index: number
}

export default function SimpleListItem({
  className,
  index,
  ...props
}: SimpleListItemProps) {
  const { register } = useFormContext()
  return (
    <li className={cn('w-full flex flex-row gap-6 ', className)} {...props}>
      <div className="w-12 h-12 rounded-full gradient-button flex flex-row items-center justify-center text-white font-semibold text-xl">
        {index + 1}
      </div>
      <Input
        placeholder="O expert possui uma técnica única que..."
        {...register(`techs.${index}.value`)}
      />
    </li>
  )
}
