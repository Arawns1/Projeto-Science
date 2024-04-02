import { AddNewButton } from '@/components/AddNewButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { projetoFormData } from '@/pages/clientForm/projeto/ProjetoSchema'
import { Trash } from '@phosphor-icons/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
export default function RedeSocialAccordion() {
  const { control } = useFormContext<projetoFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'redesSociais',
  })

  const handleNewRede = () => {
    append({
      nome: '',
      objetivo: '',
      frequencia: '',
      estruturaLinguagem: '',
    })
  }

  const handleDeleteRede = (index: number) => {
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
                Rede social {index + 1}
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <div className="flex-1 w-full xl:h-auto sm:h-full flex flex-col gap-8 ">
                  <FormField
                    name={`redesSociais.${index}.nome`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="nameInput">Nome</FormLabel>
                        <FormControl>
                          <Input
                            id="nameInput"
                            type="text"
                            autoComplete="name"
                            placeholder="Nome da rede social"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`redesSociais.${index}.objetivo`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="objetivoInput">Objetivos</FormLabel>
                        <FormControl>
                          <Textarea
                            id="objetivoInput"
                            placeholder="Objetivos da Rede Social"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`redesSociais.${index}.frequencia`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="redeSocialFrequencia">
                          Frequencia
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="redeSocialFrequencia"
                            type="text"
                            placeholder="Frequencia de posts"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`redesSociais.${index}.estruturaLinguagem`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="estruturaInput">
                          Estratura de Linguagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="estruturaInput"
                            placeholder="Estrutura de linguagem da rede social"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            {index > 0 && (
              <div className="flex items-center justify-center py-1">
                <Button
                  size="icon"
                  variant={'ghost'}
                  onClick={() => handleDeleteRede(index)}
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
      <AddNewButton onClick={handleNewRede} />
    </div>
  )
}
