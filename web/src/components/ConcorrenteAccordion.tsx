import { AddNewButton } from "@/components/AddNewButton"
import CustomTable from "@/components/CustomTable"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "@phosphor-icons/react"
import { useFieldArray, useFormContext } from "react-hook-form"
export default function ConcorrenteAccordion() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "concorrentes",
  })

  const handleNewConcorrente = () => {
    append({
      nome: "",
      redeSocial: "",
      linkRedeSocial: "",
      descricao: "",
      pontosFortes: [{ value: "" }],
      pontosFracos: [{ value: "" }],
    })
  }

  const handleDeleteConcorrente = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <Accordion type="multiple" className="w-full flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full flex flex-row gap-2 items-start justify-center"
          >
            <AccordionItem
              className="flex-1 bg-zinc-100 px-2 rounded-lg shadow-sm space-y-4"
              value={`item-${index}`}
            >
              <AccordionTrigger className="border-b-2 border-zinc-200 hover:cursor-pointer text-zinc-700 text-base px-2">
                Concorrente {index + 1}
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <div className="flex-1 w-full xl:h-auto sm:h-full flex flex-col gap-8 ">
                  <div className="w-full flex flex-row gap-8">
                    <FormField
                      name={`concorrentes.${index}.nome`}
                      control={control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel htmlFor="nameInput">Nome</FormLabel>
                          <FormControl>
                            <Input
                              id="nameInput"
                              type="text"
                              autoComplete="name"
                              placeholder="Nome do Cliente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`concorrentes.${index}.redeSocial`}
                      control={control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel htmlFor="redeSocialInput">
                            Rede Social do concorrente
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="redeSocialInput"
                              type="text"
                              placeholder="@Concorrente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name={`concorrentes.${index}.linkRedeSocial`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="linkRedeSocialInput">
                          Link da rede social do concorrente
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="linkRedeSocialInput"
                            placeholder="http://url.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`concorrentes.${index}.descricao`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="descricaoInput">
                          Descrição
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="descricaoInput"
                            placeholder="Descrição do Concorrente"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CustomTable
                    pontosFortesName={`concorrentes.[${index}].pontosFortes`}
                    pontosFracosName={`concorrentes.[${index}].pontosFracos`}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            {index > 0 && (
              <div className="flex items-center justify-center py-1">
                <Button
                  size="icon"
                  variant={"ghost"}
                  onClick={() => handleDeleteConcorrente(index)}
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
        ))}
      </Accordion>
      <AddNewButton onClick={handleNewConcorrente} />
    </div>
  )
}
