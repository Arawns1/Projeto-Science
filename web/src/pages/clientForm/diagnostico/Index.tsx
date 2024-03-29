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

const testSchema = z.object({
  diagnosticos: z.array(
    z.object({
      value: z.string(),
    })
  ),
  pontosFortes: z.array(
    z.object({
      value: z.string(),
    })
  ),
  pontosFracos: z.array(
    z.object({
      value: z.string(),
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
      linkRedeSocial: z.string(),
      descricao: z.string(),
      pontosFortes: z.array(
        z.object({
          value: z.string(),
        })
      ),
      pontosFracos: z.array(
        z.object({
          value: z.string(),
        })
      ),
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

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
        <section id="diagnostico">
          <div id="diagnostico__title" className="flex flex-col w-full gap-8">
            <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
              Diagnóstico do <b>projeto</b>
            </h2>
            <FormProvider {...form}>
              <SimpleList listType="input" name="diagnosticos" />
              <CustomTable />
            </FormProvider>
          </div>
        </section>
        <section id="diferenciais">
          <div id="diferenciais__title" className="flex flex-col w-full gap-8">
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
          <div id="objetivos__title" className="flex flex-col w-full gap-8">
            <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
              Objetivos do <b>projeto</b>
            </h2>
            <FormProvider {...form}>
              <SimpleList listType="textArea" name="objetivos" />
            </FormProvider>
          </div>
        </section>
        <section id="analiseConcorrencia">
          <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
            Análise de <b>concorrência</b>
          </h2>
          <Form {...form}>
            <ConcorrenteAccordeon />
          </Form>
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const ConcorrenteAccordeon = () => {
  const { control } = useFormContext()
  const { fields } = useFieldArray({ control, name: 'concorrentes' })

  return (
    <>
      <Accordion type="multiple" className="w-full">
        {fields.map((field, index) => (
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>Concorrente {index + 1}</AccordionTrigger>
            <AccordionContent>
              <form className="flex-1 w-full xl:h-auto sm:h-full flex flex-col gap-4 ">
                <div className="w-full flex flex-row gap-8">
                  <FormField
                    name="nome"
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
                    name="nome"
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
                            placeholder="@concorrente"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="nome"
                  control={control}
                  render={({ field, formState }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="nameInput">
                        Rede Social do concorrente
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
                  name="nome"
                  control={control}
                  render={({ field, formState }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="nameInput">
                        Rede Social do concorrente
                      </FormLabel>
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
                <CustomTable />
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <AddNewButton />
    </>
  )
}
