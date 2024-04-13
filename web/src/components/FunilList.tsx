import { projetoFormData } from "@/pages/clientForm/projeto/ProjetoSchema"
import { Trash } from "@phosphor-icons/react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { AddNewButton } from "./AddNewButton"
import FunilItem from "./FunilItem"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function FunilList() {
  const form = useFormContext<projetoFormData>()
  const { fields, append, remove } = useFieldArray<projetoFormData>({
    control: form.control,
    name: "funis",
  })

  const {
    formState: { errors },
  } = form

  function addNewFunil() {
    append({
      nome: { title: "", value: "" },
      formatos: [{ formato: "", titulo: "" }],
      tipos: [{ value: "" }],
      faseTambem: [{ value: "" }],
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
            <div className="w-full flex flex-col gap-8">
              <div className="w-full flex flex-row gap-6 ">
                <div className="w-12 h-12 rounded-full gradient-button flex flex-row items-center justify-center text-white font-semibold text-xl">
                  {index + 1}
                </div>

                <div className="w-full flex flex-col gap-4">
                  <Input
                    {...form.register(`funis.${index}.nome.title`)}
                    placeholder={`Ex.: Funil de atração`}
                  />
                  <Textarea
                    {...form.register(`funis.${index}.nome.value`)}
                    placeholder="Sobre o funil"
                  />
                  {errors.funis?.[index]?.nome?.value && (
                    <span className="text-destructive">
                      {errors.funis?.[index]?.nome?.value?.message}
                    </span>
                  )}
                </div>
              </div>
              <FunilItem name={`funis.${index}`} />
            </div>
            {index >= 1 && (
              <Button
                title="Excluir funil"
                type="button"
                variant={"ghost"}
                size={"icon"}
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
