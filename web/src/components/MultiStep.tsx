import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MultiStepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function MultiStepRoot({ children, className, ...props }: MultiStepProps) {
  return (
    <div className={cn('flex flex-row gap-4', className)} {...props}>
      {children}
    </div>
  )
}

interface MultiStepItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  label: string
}

function MultiStepItem({
  className,
  isActive,
  label,
  ...props
}: MultiStepItemProps) {
  if (isActive) {
    return (
      <div
        className={cn(
          'flex flex-col gap-2 w-full items-start justify-start hover:cursor-pointer',
          className
        )}
        title={`Clique para retornar para esta etapa`}
        {...props}
      >
        <p className={'text-base font-semibold text-primary'}>{label}</p>
        <div className="w-full h-2 bg-primary"></div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full items-start justify-start hover:cursor-pointer',
        className
      )}
      title={`Clique para avançar para esta etapa`}
      {...props}
    >
      <p className={'text-base font-semibold text-zinc-300'}>{label}</p>
      <div className="w-full h-2 bg-zinc-300"></div>
    </div>
  )
}

export const MultiStep = {
  Root: MultiStepRoot,
  Item: MultiStepItem,
}
