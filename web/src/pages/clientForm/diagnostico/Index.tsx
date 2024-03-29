import SimpleList from '@/components/SimpleList'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomTable from '@/components/CustomTable'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AddNewButton } from '@/components/AddNewButton'
import { Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import DiscardDialog from '@/components/DiscardDialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { useState } from 'react'

const testSchema = z.object({
  diagnosticos: z.array(
    z.object({
      value: z.string().min(1, 'O diagnóstico não pode estar vazio'),
    })
  ),
  pontosFortes: z.array(
    z.object({
      value: z.string().min(1, 'Adicione pelo menos um ponto forte'),
    })
  ),
  pontosFracos: z.array(
    z.object({
      value: z.string().min(1, 'Adicione pelo menos um ponto fraco'),
    })
  ),
  diferencial: z.string(),
  objetivos: z.array(
    z.object({
      value: z.string(),
    })
  ),
  concorrentes: z.array(
    z.object({
      nome: z.string(),
      redeSocial: z.string(),
      linkRedeSocial: z.string().optional(),
      descricao: z.string(),
      pontosFortes: z
        .array(
          z.object({
            value: z.string(),
          })
        )
        .optional(),
      pontosFracos: z
        .array(
          z.object({
            value: z.string(),
          })
        )
        .optional(),
    })
  ),
})
export type testForm = z.infer<typeof testSchema>
export default function DiagnosticoPage() {
  const form = useForm<testForm>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      diagnosticos: [{ value: '' }],
      pontosFortes: [{ value: '' }],
      pontosFracos: [{ value: '' }],
      diferencial: '',
      objetivos: [{ value: '' }],
      concorrentes: [
        {
          nome: '',
          redeSocial: '',
          linkRedeSocial: '',
          descricao: '',
          pontosFortes: [{ value: '' }],
          pontosFracos: [{ value: '' }],
        },
      ],
    },
  })

  const { handleSubmit } = form

  function onSubmit(values: testForm) {
    console.log(values)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  function handleDiscard() {
    setIsDialogOpen(true)
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <section id="diagnostico">
            <div
              id="diagnostico__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                Diagnóstico do <b>projeto</b>
              </h2>
              <FormProvider {...form}>
                <SimpleList
                  listType="input"
                  name="diagnosticos"
                  itemPlaceholder="Diagnostico"
                />
                <CustomTable />
              </FormProvider>
            </div>
          </section>
          <section id="diferenciais">
            <div
              id="diferenciais__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                Diferenciais
              </h2>
              <Textarea
                placeholder="Os principais diferenciais do expert são..."
                {...form.register('diferencial')}
              />
            </div>
          </section>
          <section id="objetivos">
            <div id="objetivos__wrapper" className="flex flex-col w-full gap-8">
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                Objetivos do <b>projeto</b>
              </h2>
              <FormProvider {...form}>
                <SimpleList
                  listType="textArea"
                  name="objetivos"
                  itemPlaceholder="Objetivo"
                />
              </FormProvider>
            </div>
          </section>
          <section id="analiseConcorrencia">
            <div
              id="analiseConcorrencia__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                Análise de <b>concorrência</b>
              </h2>
              <Form {...form}>
                <ConcorrenteAccordeon />
              </Form>
            </div>
          </section>
          <div className="w-full flex justify-end items-center gap-8">
            <Button
              variant={'ghost'}
              type="button"
              className="font-semibold text-lg"
              size={'lg'}
              onClick={handleDiscard}
            >
              Descartar
            </Button>
            <Button
              data-formid="apresentacaoForm"
              form="apresentacaoForm"
              type="submit"
              size={'lg'}
            >
              Próxima Etapa
            </Button>
          </div>
        </form>
      </div>
      <DiscardDialog />
    </AlertDialog>
  )
}

const ConcorrenteAccordeon = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'concorrentes',
  })

  const handleNewConcorrente = () => {
    append({
      nome: '',
      redeSocial: '',
      linkRedeSocial: '',
      descricao: '',
      pontosFortes: [{ value: '' }],
      pontosFracos: [{ value: '' }],
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
                      render={({ field, formState }) => (
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
                      render={({ field, formState }) => (
                        <FormItem className="w-full">
                          <FormLabel htmlFor="nameInput">
                            Rede Social do concorrente
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="nameInput"
                              type="text"
                              autoComplete="name"
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
                    render={({ field, formState }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="nameInput">
                          Link da rede social do concorrente
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="nameInput"
                            autoComplete="name"
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
                    render={({ field, formState }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="nameInput">Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            id="nameInput"
                            placeholder="Descrição do Concorrente"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CustomTable
                    pontosFortesName={`concorrentes.${index}.pontosFortes`}
                    pontosFracosName={`concorrentes.${index}.pontosFracos`}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            {index > 0 && (
              <div className="flex items-center justify-center py-1">
                <Button
                  size="icon"
                  variant={'ghost'}
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
