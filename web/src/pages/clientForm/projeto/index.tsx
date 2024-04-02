import DiscardDialog from '@/components/DiscardDialog'
import PalavraChaveInput from '@/components/PalavraChaveInput'
import PersonasList from '@/components/PersonasList'
import SimpleList from '@/components/SimpleList'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { projetoFormData, projetoSchema } from './ProjetoSchema'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { AddNewButton } from '@/components/AddNewButton'

export default function ProjetoPage() {
  const form = useForm<projetoFormData>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      dna: {
        estilo: '',
        valores: '',
        personalidade: '',
        comunicação: '',
      },
      propositos: [{ title: '', value: '' }],
      conteudos: [{ title: '', value: '' }],
      linkPlanilhaPalavras: '',
      redesSociais: [
        { nome: '', objetivo: '', frequencia: '', estruturaLinguagem: '' },
      ],
    },
  })

  const { handleSubmit } = form

  function onSubmit(values: any) {
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
          id="projetoForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <section id="dnaDoProjeto">
            <div
              id="dnaDoProjeto__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                dna do <b>projeto</b>
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="dna.estilo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="dnaEstilo"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Estilo
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="dnaEstilo"
                            type="text"
                            autoFocus
                            placeholder="O cliente possui um estilo..."
                            className="caret-accent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dna.valores"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="dnaValores"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Valores
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="dnaValores"
                            type="text"
                            placeholder="O cliente possui valores..."
                            className="caret-accent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dna.personalidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="dnaPersonalidade"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Personalidade
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="dnaPersonalidade"
                            type="text"
                            placeholder="O cliente possui uma personalidade..."
                            className="caret-accent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dna.comunicação"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="dnaComunicacao"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Comunicação
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="dnaComunicacao"
                            type="text"
                            placeholder="O cliente possui uma comunicação..."
                            className="caret-accent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </div>
          </section>
          <section id="propositos">
            <div
              id="propositos__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <Form {...form}>
                <SimpleList
                  listType="both"
                  name="propositos"
                  itemPlaceholder="Proposito"
                  bothTextAreaPlaceholder="O proposito do projeto é..."
                />
              </Form>
            </div>
          </section>
          <section id="personas">
            <div id="personas__wrapper" className="flex flex-col w-full gap-8">
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                personas
              </h2>
              <div>
                <Form {...form}>
                  <PersonasList />
                </Form>
              </div>
            </div>
          </section>
          <section id="setupDeConteudo">
            <div
              id="setupDeConteudo__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                setup de <b>conteúdo</b>
              </h2>
              <Form {...form}>
                <SimpleList
                  listType="both"
                  name="conteudos"
                  itemPlaceholder="Conteúdo"
                  bothTextAreaPlaceholder="Descrição sobre o setup de conteudo..."
                />
              </Form>
            </div>
          </section>
          <section id="palavrasChave">
            <div
              id="palavrasChave__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                palavras <b>chave</b>
              </h2>
              <Form {...form}>
                <PalavraChaveInput />
                <FormField
                  control={form.control}
                  name="linkPlanilhaPalavras"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="linkPlanilhaPalavrasInput"
                        className="text-zinc-800 font-semibold text-base"
                      >
                        Link para a planilha
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="linkPlanilhaPalavrasInput"
                          type="text"
                          leftIcon={
                            <Link size={28} className="text-zinc-600" />
                          }
                          placeholder="http://url.com"
                          className="caret-accent "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          </section>
          <section id="objetivosRedes">
            <div
              id="objetivosRedes__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                objetivos <b>redes sociais</b>
              </h2>
              <Form {...form}>
                <RedeSocialAccordion />
              </Form>
            </div>
          </section>
          <section id="funilConteudo">
            <div
              id="funilConteudo__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                funil de <b>conteúdos</b>
              </h2>
            </div>
          </section>
          <section id="camposGenericos">
            <div
              id="camposGenericos__wrapper"
              className="flex flex-col w-full gap-8"
            >
              <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
                campos <b>genéricos</b>
              </h2>
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
              data-formid="projetoForm"
              form="projetoForm"
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
const RedeSocialAccordion = () => {
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
                    render={({ field, formState }) => (
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
                    render={({ field, formState }) => (
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
                    render={({ field, formState }) => (
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
                    render={({ field, formState }) => (
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
