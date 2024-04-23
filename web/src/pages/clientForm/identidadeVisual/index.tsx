import DiscardDialog from "@/components/DiscardDialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FilePlus, Trash } from "@phosphor-icons/react"
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import {
  IdentidadeVisualFormData,
  IdentidadeVisualSchema,
} from "./IdentidadeVisualSchema"
import { useToast } from "@/components/ui/use-toast"
import { useSaveIdentidadeVisualImage } from "@/queries/clients/identidadeVisual"
import { getSessionItem } from "@/lib/storage"
import { useNavigate } from "react-router-dom"

export default function IdentidadeVisualPage() {
  const form = useForm<IdentidadeVisualFormData>({
    resolver: zodResolver(IdentidadeVisualSchema),
  })
  const { control } = form
  const { toast } = useToast()
  const navigate = useNavigate()
  const saveIdentidadeVisual = useSaveIdentidadeVisualImage()

  const imagesList = useFieldArray<IdentidadeVisualFormData>({
    control: control,
    name: "files",
  })

  function onSubmit(values: IdentidadeVisualFormData) {
    const formData = new FormData()
    const clientId = getSessionItem("clientId")

    if (!clientId || clientId == null) {
      return navigate("/dashboard")
    }
    values.files.forEach((file) => {
      if (file.file) {
        formData.append("files", file.file)
      }
    })

    const valuesComClientId = {
      formData: formData,
      clientId: clientId,
    }

    saveIdentidadeVisual.mutate(valuesComClientId, {
      onSuccess: () => {
        navigate("/novo-cliente/cronograma")
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Não foi possível salvar as imagens",
        })
      },
    })
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleDiscard() {
    setIsDialogOpen(true)
  }

  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleAddFile(e: MouseEvent) {
    e.preventDefault()
    if (inputFileRef) {
      inputFileRef.current?.click()
    }
  }

  async function appendNewPhoto(file: File) {
    const imagesListLength = form.getValues("files").length
    if (imagesListLength < 5) {
      imagesList.append({ file: file })
    } else {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Limite de 5 imagens alcançado",
      })
    }
  }
  function handleInputFileChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    if (e.target && e.target.files) {
      const fileList = Array.from(e.target.files)
      fileList.forEach(appendNewPhoto)
    }
  }

  function handleDeletePhoto(index: number) {
    imagesList.remove(index)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.items) {
      ;[...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile()
          if (file) {
            appendNewPhoto(file)
          }
        }
      })
    } else {
      ;[...e.dataTransfer.files].forEach((file) => {
        appendNewPhoto(file)
      })
    }
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault()
  }
  function handleDragOver(e: DragEvent) {
    e.preventDefault()
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
          Identidade Visual
        </h2>
        <div className="flex flex-row py-12 w-full ">
          <FormProvider {...form}>
            <form
              id="identidadeVisualForm"
              className="w-full min-h-[420px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {imagesList.fields.length > 0 ? (
                <div
                  className="flex flex-col gap-4"
                  onDrop={(e) => e.preventDefault()}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                >
                  {imagesList.fields.map((field, index) => {
                    return (
                      <div
                        className="w-full flex flex-row border-2 border-zinc-200 rounded-lg p-2 justify-around items-center gap-4 bg-zinc-50"
                        key={field.id}
                      >
                        <div className="flex flex-row gap-2 w-full">
                          <img
                            src={field.file && URL.createObjectURL(field.file)}
                            alt={`Imagem ${index}`}
                            className="aspect-video object-cover w-32 rounded-md"
                          />
                          <div className="flex flex-col  text-zinc-500 items-start justify-center text-sm">
                            <span>
                              <b>Nome: </b> {field.file && field.file.name}
                            </span>
                            <span>
                              <b>Tamanho: </b>
                              {field.file &&
                                (field.file.size / (1024 * 1024)).toFixed(
                                  2,
                                )}{" "}
                              MB
                            </span>
                          </div>
                        </div>

                        <Button
                          title="Excluir item da lista"
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => handleDeletePhoto(index)}
                        >
                          <Trash
                            size={24}
                            weight="bold"
                            className="text-destructive "
                          />
                        </Button>
                      </div>
                    )
                  })}
                  {imagesList.fields.length < 5 && (
                    <div className="w-full flex justify-end items-center">
                      <Button
                        variant={"outline"}
                        onClick={handleAddFile}
                        className="gap-2"
                      >
                        <FilePlus size={24} />
                        <span> Adicionar mais imagens</span>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  id="drop_zone"
                  className="flex flex-col gap-4 items-center justify-center w-full h-full border-dashed border-2 border-Light-primary bg-background"
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <h3 className="text-primaryScale-600 font-semibold text-3xl">
                    Arraste e solte imagens aqui
                  </h3>
                  <span className="text-2xl text-zinc-500">ou</span>
                  <Button className="h-14 w-80" onClick={handleAddFile}>
                    Selecione um arquivo
                  </Button>

                  <div className="flex flex-col text-base text-zinc-400 items-center justify-center text-center">
                    <span>Formatos suportados: png, jpg, jpeg e webp</span>
                    <span>Tamanho recomendado: 1280 x 720px</span>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only hidden"
                onChange={handleInputFileChange}
                ref={inputFileRef}
              />
            </form>
          </FormProvider>
        </div>
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
            data-formid="identidadeVisualForm"
            form="identidadeVisualForm"
            type="submit"
            size={"lg"}
          >
            Próxima Etapa
          </Button>
        </div>
      </div>
      <DiscardDialog />
    </AlertDialog>
  )
}
