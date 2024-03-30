import { Trash } from '@phosphor-icons/react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'
import { AddNewButton } from './AddNewButton'
import { Button } from './ui/button'

interface CustomTableProps {
  pontosFortesName?: string
  pontosFracosName?: string
}
export default function CustomTable({
  pontosFortesName = 'pontosFortes',
  pontosFracosName = 'pontosFracos',
}: CustomTableProps) {
  const { control } = useFormContext()

  return (
    <section className="flex flex-row w-full justify-start items-start gap-4">
      <div id="customTable__column_1" className="flex-1 flex flex-col gap-4">
        <PontosFortes control={control} name={pontosFortesName} />
      </div>
      <div id="customTable__column_2" className="flex-1 flex flex-col gap-4">
        <PontosFracos control={control} name={pontosFracosName} />
      </div>
    </section>
  )
}

interface PontosListProps {
  control: Control<any>
  name: string
}

const PontosFracos = ({ control, name }: PontosListProps) => {
  const fieldArray = useFieldArray({ control, name: name })

  const { register } = useFormContext()

  const handleDeleteCell = (index: number) => {
    fieldArray.remove(index)
  }

  const addNewPontoForteCell = () => {
    fieldArray.append({ value: '' })
  }

  return (
    <div>
      <div
        id="customTable__header_PontosFracos"
        className=" bg-zinc-600 text-zinc-50 font-semibold text-lg h-14 text-center flex items-center justify-center"
      >
        <h3>Pontos a Melhorar</h3>
      </div>
      <div id="customTable__items_pontosFracos" className="flex flex-col gap-4">
        {fieldArray.fields.map((item, index) => (
          <div
            className="bg-zinc-200 h-14 flex flex-row gap-4 w-full px-2"
            key={item.id}
          >
            <input
              placeholder="Adicione um ponto a melhorar..."
              type="text"
              className="bg-transparent w-full h-full text-left text-black text-lg flex items-center justify-center pl-2"
              {...register(`${name}.${index}.value`)}
            />
            <div className="h-full flex items-center justify-center gap-px w-20">
              <Button
                title="Excluir item da lista"
                type="button"
                size="icon"
                variant={'ghost'}
                onClick={() => handleDeleteCell(index)}
              >
                <Trash
                  size={24}
                  className="text-gray-400 hover:text-destructive"
                />
              </Button>
            </div>
          </div>
        ))}
        <div className="text-center flex items-center justify-center ">
          <AddNewButton onClick={addNewPontoForteCell} />
        </div>
      </div>
    </div>
  )
}

const PontosFortes = ({ control, name }: PontosListProps) => {
  const fieldArray = useFieldArray({ control, name: name })

  const { register } = useFormContext()

  const handleDeleteCell = (index: number) => {
    fieldArray.remove(index)
  }

  const addNewPontoForteCell = () => {
    fieldArray.append({ value: '' })
  }

  return (
    <div>
      <div
        id="customTable__header_PontosForte"
        className=" bg-zinc-600 text-zinc-50 font-semibold text-lg h-14 text-center flex items-center justify-center"
      >
        <h3>Pontos Fortes</h3>
      </div>
      <div id="customTable__items_PontosForte" className="flex flex-col gap-4">
        {fieldArray.fields.map((item, index) => (
          <div
            className="bg-zinc-200 h-14 flex flex-row gap-4 w-full px-2"
            key={item.id}
          >
            <input
              placeholder="Adicione um ponto forte..."
              type="text"
              className="bg-transparent w-full h-full text-left text-black text-lg flex items-center justify-center pl-2"
              {...register(`${name}.${index}.value`)}
            />
            <div className="h-full flex items-center justify-center gap-px w-20">
              <Button
                title="Excluir item da lista"
                type="button"
                size="icon"
                variant={'ghost'}
                onClick={() => handleDeleteCell(index)}
              >
                <Trash
                  size={24}
                  className="text-gray-400 hover:text-destructive"
                />
              </Button>
            </div>
          </div>
        ))}
        <div className="text-center flex items-center justify-center ">
          <AddNewButton onClick={addNewPontoForteCell} />
        </div>
      </div>
    </div>
  )
}
