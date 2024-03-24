import { Plus } from '@phosphor-icons/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import SimpleListItem from './SimpleListItem'
import { Button } from './ui/button'

export default function SimpleList() {
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

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => {
        return (
          <ul key={field.id}>
            <SimpleListItem index={index} />
            {/* {errors.techs?.[index]?.value && (
              <span>{errors.techs?.[index]?.value?.message}</span>
            )} */}
          </ul>
        )
      })}
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
