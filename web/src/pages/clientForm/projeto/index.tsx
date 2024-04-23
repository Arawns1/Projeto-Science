/* eslint-disable jsx-a11y/no-autofocus */
import DiscardDialog from "@/components/DiscardDialog"
import FunilList from "@/components/FunilList"
import GenericFields from "@/components/GenericFields"
import PalavraChaveInput from "@/components/PalavraChaveInput"
import PersonasList from "@/components/PersonasList"
import RedeSocialAccordion from "@/components/RedeSocialAccordion"
import SimpleList from "@/components/SimpleList"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { saveProjetoDTO } from "@/dtos/saveProjetoDTO"
import { getSessionItem } from "@/lib/storage"
import { useSaveProjeto } from "@/queries/clients/projeto"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@phosphor-icons/react"
import { KeyboardEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { projetoFormData, projetoSchema } from "./ProjetoSchema"

export default function ProjetoPage() {
  const navigate = useNavigate()
  const saveProjeto = useSaveProjeto()
  const form = useForm<projetoFormData>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      dna: {
        estilo: "",
        valores: "",
        personalidade: "",
        comunicacao: "",
      },
      propositos: [{ title: "", value: "" }],
      conteudos: [{ title: "", value: "" }],
      linkPlanilhaPalavras: "",
      redesSociais: [
        { nome: "", objetivo: "", frequencia: "", estruturaLinguagem: "" },
      ],
      funis: [
        {
          nome: { title: "", value: "" },
          formatos: [{ formato: "", titulo: "" }],
          tipos: [{ value: "" }],
          faseTambem: [{ value: "" }],
        },
      ],
    },
  })

  const { handleSubmit } = form

  function onSubmit(values: saveProjetoDTO) {
    const clientId = getSessionItem("clientId")
    if (!clientId || clientId == null) {
      return navigate("/dashboard")
    }

    const valuesComClientId = {
      ...values,
      clientId: clientId,
    }
    saveProjeto.mutate(valuesComClientId, {
      onSuccess: () => {
        navigate("/novo-cliente/identidade-visual")
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
  const checkKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault()
  }
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <form
          id="projetoForm"
          aria-hidden="true"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
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
                    name="dna.comunicacao"
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
              <Form {...form}>
                <FunilList />
              </Form>
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
              <Form {...form}>
                <GenericFields />
              </Form>
            </div>
          </section>
          <div className="w-full flex justify-end items-center gap-8">
            <Button
              variant={"ghost"}
              type="button"
              className="font-semibold text-lg"
              size={"lg"}
              onClick={handleDiscard}
            >
              Descartar
            </Button>
            <Button
              data-formid="projetoForm"
              form="projetoForm"
              type="submit"
              size={"lg"}
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
