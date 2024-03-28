import SimpleList from '@/components/SimpleList'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomTable from '@/components/CustomTable'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

const testSchema = z.object({
  diagnostico: z.array(
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
})
export type testForm = z.infer<typeof testSchema>
export default function DiagnosticoPage() {
  const form = useForm<testForm>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      diagnostico: [{ value: '' }],
      pontosFortes: [{ value: '' }],
      pontosFracos: [{ value: '' }],
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
              <SimpleList listType="input" />
              <CustomTable />
            </FormProvider>
          </div>
        </section>
        <section id="diferenciais">
          <div id="diferenciais__title" className="flex flex-col w-full gap-8">
            <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
              Diferenciais
            </h2>
            <Textarea placeholder="Os principais diferenciais do expert são..." />
          </div>
        </section>
        <section id="objetivos">
          <div id="objetivos__title" className="flex flex-col w-full gap-8">
            <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
              Objetivos do <b>projeto</b>
            </h2>
            <FormProvider {...form}>
              <SimpleList listType="textArea" />
            </FormProvider>
          </div>
        </section>
        <section id="analiseConcorrencia">
          {' '}
          <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
            Análise de <b>concorrência</b>
          </h2>
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
