import { Trash } from "@phosphor-icons/react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { AddNewButton } from "./AddNewButton"
import SimpleList from "./SimpleList"
import { Button } from "./ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface FunilItemProps {
  name: string
}

export default function FunilItem({ name }: FunilItemProps) {
  const form = useFormContext()

  const formatosArray = useFieldArray({
    control: form.control,
    name: `${name}.formatos`,
  })

  const addNewFormato = () => {
    formatosArray.append({ formato: "", titulo: "" })
  }

  const deleteFormato = (index: number) => {
    formatosArray.remove(index)
  }

  return (
    <div className="w-full pl-16 flex flex-col gap-12">
      <div id="formatos" className="flex flex-col gap-4">
        <div id="formatosTitle" className="w-full">
          <h3 className="text-2xl font-semibold text-primaryScale-700">
            Formatos
          </h3>
        </div>
        {formatosArray.fields.map((field, index) => {
          return (
            <div
              className="w-full flex flex-row gap-4 justify-center items-center"
              key={field.id}
            >
              <FormField
                control={form.control}
                name={`${name}.formatos.${index}.formato`}
                render={({ field }) => (
                  <FormItem className="w-60">
                    <FormLabel>Formato</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-60">
                          <SelectValue placeholder="Selecione um formato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Reels">Reels</SelectItem>
                        <SelectItem value="Post Simples">
                          Post Simples
                        </SelectItem>
                        <SelectItem value="Carrossel">Carrossel</SelectItem>
                        <SelectItem value="Stories">Stories</SelectItem>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Shorts">Shorts</SelectItem>
                        <SelectItem value="Video Longo">Video Longo</SelectItem>
                        <SelectItem value="Video Curto">Video Curto</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${name}.formatos.${index}.titulo`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="formatoTitulo"
                      className="text-zinc-800 font-semibold text-base"
                    >
                      Titulo
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="formatoTitulo"
                        type="text"
                        placeholder="Titulo do formato"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {index >= 1 && (
                <div className="pt-6 flex items-center justify-center">
                  <Button
                    title="Excluir item da lista"
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => deleteFormato(index)}
                  >
                    <Trash
                      size={24}
                      weight="bold"
                      className="text-destructive "
                    />
                  </Button>
                </div>
              )}
            </div>
          )
        })}
        <div className="w-full flex items-center justify-start">
          <AddNewButton onClick={addNewFormato} />
        </div>
      </div>
      <div id="tiposDeConteudo" className="flex flex-col gap-4">
        <div id="tiposDeConteudoTitle" className="w-full">
          <h3 className="text-2xl font-semibold text-primaryScale-700">
            Tipos de Conteúdos
          </h3>
        </div>
        <SimpleList
          name={`${name}.tipos`}
          listType="input"
          itemPlaceholder="Tipo"
        />
      </div>
      <div id="estaFaseTambem" className="flex flex-col gap-4">
        <div id="estaFaseTambemTitle" className="w-full">
          <h3 className="text-2xl font-semibold text-primaryScale-700">
            Esta fase também deve
          </h3>
        </div>
        <SimpleList
          name={`${name}.faseTambem`}
          listType="input"
          itemPlaceholder="Objetivo"
        />
      </div>
    </div>
  )
}
