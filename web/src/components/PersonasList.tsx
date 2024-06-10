import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  personaFormData,
  personaSchema,
  projetoFormData,
} from "@/pages/clientForm/projeto/ProjetoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "@phosphor-icons/react"
import { useState } from "react"
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form"
import userImagePlaceholder from "../assets/images/img_placeholder.png"
import UserPhoto from "./UserPhoto"
import { Button } from "./ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useDeletePersona, useSavePersona, useSavePersonaImage } from "@/queries/clients/persona"
import { useToast } from "./ui/use-toast"

export default function PersonasList() {
  const contextForm = useFormContext<projetoFormData>()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { control } = contextForm
  const savePersona = useSavePersona()
  const deletePersona = useDeletePersona()
  const savePersonaImage = useSavePersonaImage()
  const { append, remove, fields } = useFieldArray({
    control,
    name: "personas",
  })

  const personaForm = useForm<personaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      nome: "",
      idade: 0,
      profissao: "",
      sobre: "",
    },
  })

  const onSubmit = () => {
    const formData = personaForm.getValues()

    const mappedFormData = {
      ...formData,
      idade: parseInt(formData.idade.toString()),
    }

    const personaPhotoForm = new FormData()
    if (formData.userPhoto) {
      personaPhotoForm.append("file", formData.userPhoto)
    }

    savePersona.mutate(mappedFormData, {
      onSuccess: async (data) => {
        if (formData.userPhoto) {
          const form = {
            personaId: data.id,
            formData: personaPhotoForm,
          }
          savePersonaImage.mutate(form)
        }
        const personaForm = {
          ...formData,
          personaId: data.id,
        }
        append(personaForm)
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Erro ao salvar persona",
        })
      },
    })

    personaForm.reset()
    setIsDialogOpen(false)
  }

  const handleDiscard = () => {
    personaForm.reset()
    setIsDialogOpen(false)
  }

  const handleRemove = (index: number) => {
    const personaId = fields[index].personaId
    if (personaId) {
      deletePersona.mutate(personaId, {
        onSuccess: () => {
          remove(index)
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Erro ao deletar persona",
          })
        },
      })
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="w-full flex flex-row gap-16 flex-wrap">
          {fields.map((item, index) => {
            return (
              <div
                className="w-52 h-60 relative bg-primaryScale-100 rounded-lg flex flex-col items-center justify-center hover:cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-500 ease-in-out"
                key={item.id}
              >
                <DialogTrigger>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <img
                      src={
                        item.userPhoto && item.userPhoto?.size > 0
                          ? URL.createObjectURL(item.userPhoto)
                          : userImagePlaceholder
                      }
                      alt="Imagem do usuário"
                      className="rounded-full w-24 h-24 border-2 border-primaryScale-500"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-primaryScale-700">{item.nome}</h3>
                      <span className="text-sm text-primaryScale-600">{item.profissao}</span>
                      {item.idade != 0 && (
                        <span className="text-sm text-primaryScale-600">{item.idade} anos</span>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <div className="absolute top-1 right-1">
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => handleRemove(index)}
                  >
                    <Trash size={24} className="text-zinc-400" />
                  </Button>
                </div>
              </div>
            )
          })}
          <div className="w-52 h-60 relative border-2 bg-background border-primaryScale-100 rounded-lg flex flex-col items-center justify-center  hover:cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-500 ease-in-out">
            <DialogTrigger>
              <div className="flex flex-col gap-2 items-center justify-center">
                <img
                  src={userImagePlaceholder}
                  alt="imagem de placeholder cinza para adição de nova persona"
                  className="rounded-full w-24 h-24 "
                />
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium text-primaryScale-700">+ Adicionar Persona</h3>
                </div>
              </div>
            </DialogTrigger>
          </div>
        </div>

        <DialogContent className="flex flex-col gap-4 max-h-[560px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex flex-col gap-2">
              <span>Adicionar Nova Persona</span>
              <div className="h-1 bg-Light-primary rounded-lg w-24"></div>
            </DialogTitle>
          </DialogHeader>
          <FormProvider {...personaForm}>
            <form className="flex flex-col gap-8" id="personaForm">
              <div id="personaModalPhoto">
                <UserPhoto
                  editable
                  hasRecommendedSize={false}
                  name="userPhoto"
                  className="w-36 h-36"
                />
              </div>
              <div id="personaModalInputs" className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 w-full ">
                  <FormField
                    control={personaForm.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="nomeInput"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Nome*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="nomeInput"
                            placeholder="Nome"
                            required
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            className="w-80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personaForm.control}
                    name="idade"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel
                          htmlFor="idadeInput"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Idade*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            id="idadeInput"
                            required
                            placeholder="Idade"
                            min={0}
                            max={100}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={personaForm.control}
                  name="profissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="profissaoInput"
                        className="text-zinc-800 font-semibold text-base"
                      >
                        Profissão*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="profissaoInput"
                          placeholder="Profissão"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personaForm.control}
                  name="sobre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="sobreInput"
                        className="text-zinc-800 font-semibold text-base"
                      >
                        Sobre*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="sobreInput"
                          placeholder="Sobre a persona"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-4">
                <Button
                  variant={"outline"}
                  className="w-full h-12"
                  onClick={handleDiscard}
                  type="button"
                >
                  Descartar
                </Button>
                <Button
                  className="w-full h-12"
                  data-formid="personaForm"
                  form="personaForm"
                  type="button"
                  onClick={personaForm.handleSubmit(onSubmit)}
                >
                  Salvar
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
