import { cn } from '@/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface SimpleListItemProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  index: number
  variant?: 'input' | 'textArea' | 'both'
}

export default function SimpleListItem({
  className,
  index,
  variant = 'input',
  ...props
}: SimpleListItemProps) {
  const { register } = useFormContext()

  const getItemType = () => {
    switch (variant) {
      case 'input':
        return (
          <Input
            placeholder="O expert possui uma técnica única que..."
            {...register(`techs.${index}.value`)}
          />
        )
      case 'textArea':
        return (
          <Textarea
            placeholder="O expert possui uma técnica única que..."
            {...register(`techs.${index}.value`)}
          />
        )
      case 'both':
        return (
          <div className="w-full flex flex-col gap-4">
            <Input
              placeholder="O expert possui uma técnica única que..."
              {...register(`techs.${index}.title`)}
            />
            <Textarea
              placeholder="O expert possui uma técnica única que..."
              {...register(`techs.${index}.value`)}
            />
          </div>
        )
    }
  }

  return (
    <div className={cn('w-full flex flex-row gap-6 ', className)} {...props}>
      <div className="w-12 h-12 rounded-full gradient-button flex flex-row items-center justify-center text-white font-semibold text-xl">
        {index + 1}
      </div>

      {getItemType()}
    </div>
  )
}
