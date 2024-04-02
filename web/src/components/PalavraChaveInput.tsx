import { cn } from '@/lib/utils'
import { projetoFormData } from '@/pages/clientForm/projeto/ProjetoSchema'
import { Plus, X } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from './ui/button'
import { Input, InputProps } from './ui/input'

interface PalavraChaveInputProps extends InputProps {}

export default function PalavraChaveInput({
  className,
  ...props
}: PalavraChaveInputProps) {
  const { control } = useFormContext<projetoFormData>()

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'palavrasChave',
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddNew = () => {
    const palavraChave = inputRef.current?.value
    if (palavraChave) {
      append({ value: palavraChave })
      inputRef.current.value = ''
    }
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-8">
        <Input
          className={cn('caret-accent h-12', className)}
          type="text"
          placeholder="Palavra-chave"
          ref={inputRef}
          {...props}
        />
        <Button
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={handleAddNew}
        >
          <Plus size={24} className="text-white" weight="bold" />
        </Button>
      </div>
      <div className="flex flex-row items-center justify-start gap-4">
        {fields.map((item, index) => {
          return (
            <div
              className="flex flex-row items-center justify-start gap-2 bg-Light-primary pl-3 rounded-lg text-white font-medium"
              key={item.id}
            >
              <span>{item.value}</span>
              <Button
                size="icon"
                variant={'ghost'}
                onClick={() => handleRemove(index)}
              >
                <X size={20} className="text-white" weight="bold" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
