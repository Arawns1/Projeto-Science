import ConcorrenteAccordion from '@/components/ConcorrenteAccordion'
import CustomTable from '@/components/CustomTable'
import DiscardDialog from '@/components/DiscardDialog'
import SimpleList from '@/components/SimpleList'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { diagnosticoFormData, diagnosticoSchema } from './DiagnosticoSchema'
import { useSaveDiagnostico } from '@/queries/clients/diagnostico'
import { saveDiagnosticoDTO } from '@/dtos/saveDiagnosticoDTO'
import { getSessionItem } from '@/lib/storage'

export default function DiagnosticoPage() {
  const saveDiagnostico = useSaveDiagnostico()
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

  function onSubmit(values: saveDiagnosticoDTO) {
    const clientId = getSessionItem('clientId')
    if (!clientId || clientId == null) {
      return navigate('/dashboard')
    }

    const valuesComClientId = {
      ...values,
      clientId: clientId,
    }

    saveDiagnostico.mutate(valuesComClientId, {
      onSuccess: () => {
        navigate('/novo-cliente/projeto')
      },
      onError: (error) => {
        console.error(error)
      },
    })
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
