import { projetoFormData } from '@/pages/clientForm/projeto/ProjetoSchema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FunilItem from './FunilItem'
import { Button } from './ui/button'
import { Trash } from '@phosphor-icons/react'
import { AddNewButton } from './AddNewButton'

export default function FunilList() {
  const form = useFormContext<projetoFormData>()
  const { fields, append, remove } = useFieldArray<projetoFormData>({
    control: form.control,
    name: 'funis',
  })

  function addNewFunil() {
    append({
      nome: [{ title: '', value: '' }],
      formatos: [{ formato: '', titulo: '' }],
      tipos: [{ value: '' }],
      faseTambem: [{ value: '' }],
    })
  }
  const handleDeleteItem = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex flex-row gap-4 items-start w-full border-[1px] border-zinc-300 rounded-lg p-4 py-8"
          >
            <FunilItem name={`funis.${index}`} index={index} />
            {index >= 1 && (
              <Button
                title="Excluir funil"
                type="button"
                variant={'ghost'}
                size={'icon'}
                onClick={() => handleDeleteItem(index)}
              >
                <Trash size={28} weight="bold" className="text-destructive " />
              </Button>
            )}
          </div>
        )
      })}
      <div className="w-full flex items-center justify-start">
        <AddNewButton onClick={addNewFunil} />
      </div>
    </div>
  )
}
