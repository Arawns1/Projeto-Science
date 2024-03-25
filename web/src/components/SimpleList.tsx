import { Plus, Trash } from '@phosphor-icons/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import SimpleListItem from './SimpleListItem'
import { Button } from './ui/button'

interface SimpleListProps extends React.InputHTMLAttributes<HTMLUListElement> {
  listType?: 'input' | 'textArea' | 'both'
}

export default function SimpleList({ listType = 'input' }: SimpleListProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  function addNew() {
    append({ value: '' })
  }
  const handleDeleteItem = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-6">
        {fields.map((field, index) => {
          return (
            <li key={field.id} className="flex flex-row gap-8">
              <SimpleListItem index={index} variant={listType} />
              {index >= 1 && (
                <Button
                  title="Excluir item da lista"
                  type="button"
                  variant={'ghost'}
                  size={'icon'}
                  onClick={() => handleDeleteItem(index)}
                >
                  <Trash
                    size={24}
                    weight="bold"
                    className="text-destructive "
                  />
                </Button>
              )}
            </li>
          )
        })}
      </ul>

      <div className="w-full flex items-center justify-start">
        <Button
          type="button"
          variant={'ghost'}
          onClick={addNew}
          className="gap-4 px-3"
        >
          <Plus size={24} weight="bold" />
          <span>Adicionar novo</span>
        </Button>
      </div>
    </div>
  )
}
