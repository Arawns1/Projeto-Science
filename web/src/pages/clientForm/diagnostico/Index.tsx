import SimpleList from '@/components/SimpleList'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomTable from '@/components/CustomTable'

const testSchema = z.object({
  techs: z.array(
    z.object({
      value: z.string(),
    })
  ),
})
type testForm = z.infer<typeof testSchema>
export default function DiagnosticoPage() {
  const form = useForm<testForm>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      techs: [{ value: '' }],
    },
  })

  const { handleSubmit } = form

  function onSubmit(values: testForm) {
    console.log(values)
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <div id="diferenciais__title">
            <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
              Diferenciais
            </h2>
          </div>
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
