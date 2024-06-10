import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  fieldFormData,
  projetoFormData,
} from "@/pages/clientForm/projeto/ProjetoSchema"
import { Plus, Trash } from "@phosphor-icons/react"
import { useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import SimpleList from "./SimpleList"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function GenericFields() {
  const form = useFormContext<projetoFormData>()
  const { control, register } = form
  const { append, remove, fields } = useFieldArray({
    control,
    name: "genericFields",
  })

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const saveField = (option: string) => {
    append({ type: option })
    setIsPopoverOpen(false)
  }

  const deleteField = (index: number) => {
    remove(index)
  }

  const getComponent = (field: fieldFormData, index: number) => {
    switch (field.type) {
      case "CampoTexto":
        return (
          <Textarea
            placeholder="Campo de texto simples"
            {...register(`genericFields.${index}.data.content.0.value`)}
          />
        )

      case "Lista Simples":
        return (
          <SimpleList
            name={`genericFields.${index}.data.content`}
            listType="textArea"
          />
        )
      case "Lista Complexa":
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
                variant={"ghost"}
                size={"icon"}
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
            onClick={() => saveField("CampoTexto")}
          >
            <span>Campo de Texto</span>
          </button>
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer "
            onClick={() => saveField("Lista Simples")}
          >
            <span>Lista Simples</span>
          </button>
          <button
            className="w-full text-black p-2 hover:bg-slate-200 hover:font-semibold cursor-pointer "
            onClick={() => saveField("Lista Complexa")}
          >
            <span>Lista Complexa</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
