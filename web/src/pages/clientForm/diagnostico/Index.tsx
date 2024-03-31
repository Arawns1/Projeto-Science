import { AddNewButton } from '@/components/AddNewButton'
import CustomTable from '@/components/CustomTable'
import DiscardDialog from '@/components/DiscardDialog'
import SimpleList from '@/components/SimpleList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { diagnosticoFormData, diagnosticoSchema } from './DiagnosticoSchema'

export default function DiagnosticoPage() {
  const form = useForm<diagnosticoFormData>({
    resolver: zodResolver(diagnosticoSchema),
    mode: 'all',
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

  const navigate = useNavigate()

  const { handleSubmit } = form

  function onSubmit(values: diagnosticoFormData) {
    console.log(values)
    // navigate('/novo-cliente/projeto')
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  function handleDiscard() {
    setIsDialogOpen(true)
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <form
          id="diagnosticoForm"
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
                  listType="textArea"
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
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Os principais diferenciais do expert são..."
                  {...form.register('diferencial')}
                />
                {form.formState.errors.diferencial && (
                  <span className="text-destructive">
                    {form.formState.errors.diferencial.message}
                  </span>
                )}
              </div>
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
                <ConcorrenteAccordion />
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
              data-formid="diagnosticoForm"
              form="diagnosticoForm"
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

const ConcorrenteAccordion = () => {
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
                    render={({ field, formState }) => (
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
                    render={({ field, formState }) => (
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
