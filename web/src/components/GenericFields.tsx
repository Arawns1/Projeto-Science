import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Plus, Trash } from '@phosphor-icons/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  fieldFormData,
  projetoFormData,
} from '@/pages/clientForm/projeto/ProjetoSchema'
import { useRef, useState } from 'react'
import { Textarea } from './ui/textarea'
import SimpleList from './SimpleList'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function GenericFields() {
  const form = useFormContext<projetoFormData>()
  const { control, register } = form
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'genericFields',
  })

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const saveField = (option: string) => {
    append({ type: option })
    setIsPopoverOpen(false)
  }

  const deleteField = (index: number) => {
    remove(index)
  }

  const inputFileRef = useRef<HTMLInputElement>(null)

  const getComponent = (field: fieldFormData, index: number) => {
    switch (field.type) {
      case 'CampoTexto':
        return (
          <Textarea
            placeholder="Campo de texto simples"
            {...register(`genericFields.${index}.data.content.0.value`)}
          />
        )
      case 'Imagem':
        const handleClick = () => {
          if (inputFileRef.current) {
            inputFileRef.current.click()
          }
        }
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (file) {
            form.setValue(`genericFields.${index}.data.file`, file)
          }
        }

        const file = form.watch(`genericFields.${index}.data.file`)

        return (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center justify-start">
                <Button
                  type="button"
                  onClick={handleClick}
                  className="w-72 h-12"
                >
                  Selecionar um arquivo
                </Button>
                {file && file.size > 0 ? (
                  <span>{file?.name}</span>
                ) : (
                  <span>Nenhum arquivo selecionado</span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-400 text-sm">
                  Formatos suportados: png, jpg, jpeg e webp
                </span>
                <span className="text-zinc-400 text-sm">
                  Tamanho recomendado: 1280 x 720px
                </span>
              </div>
            </div>

            <Input
              ref={inputFileRef}
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="sr-only hidden"
            />
          </div>
        )
      case 'Lista Simples':
        return (
          <SimpleList
            name={`genericFields.${index}.data.content`}
            listType="textArea"
          />
        )
      case 'Lista Complexa':
        return (
          <SimpleList
            name={`genericFields.${index}.data.content`}
            listType="both"
          />
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-12">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <Input
                  placeholder="Titulo"
                  {...register(`genericFields.${index}.title`)}
                />
                {getComponent(field, index)}
              </div>
              <Button
                title="Excluir item da lista"
                type="button"
                variant={'ghost'}
                size={'icon'}
                onClick={() => deleteField(index)}
              >
                <Trash size={24} weight="bold" className="text-destructive " />
              </Button>
            </div>
          )
        })}
      </div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger className="flex flex-row h-14 bg-primaryScale-100 items-center justify-center gap-2 p-3 hover:brightness-95 rounded-lg">
          <Plus size={24} weight="bold" className=" text-Light-primary" />
          <span className="font-semibold text-Light-primary text-lg">
            Adicionar novo campo
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          className="bg-background border border-zinc-200 shadow-md p-0"
        >
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer"
            onClick={() => saveField('CampoTexto')}
          >
            <span>Campo de Texto</span>
          </button>
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer "
            onClick={() => saveField('Imagem')}
          >
            <span>Imagem</span>
          </button>
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer "
            onClick={() => saveField('Lista Simples')}
          >
            <span>Lista Simples</span>
          </button>
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer "
            onClick={() => saveField('Lista Complexa')}
          >
            <span>Lista Complexa</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
