import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Client } from "@/dtos/ClientDTO"
import { useDeleteClientById } from "@/queries/clients"
import {
  Check,
  Copy,
  Gear,
  PaperPlaneTilt,
  Pencil,
  Trash,
  Warning,
} from "@phosphor-icons/react"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import UserPhoto from "./UserPhoto"

interface ClientCardProps {
  client?: Client
  isLoading?: boolean
}
export default function ClientCard({ client, isLoading }: ClientCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteClient = () => {
    setIsOpen(true)
  }

  if (isLoading) {
    return (
      <div className="border-2 border-gray-200 rounded-lg w-full h-72 relative">
        <div className="bg-zinc-200 w-full h-20"></div>
        <div className="flex flex-col justify-center items-center space-y-3 absolute -top-8 w-full h-full ">
          <Skeleton className="w-24 h-24 rounded-full  border-4 border-white" />
          <div className="space-y-4 flex flex-col justify-center items-center  w-full">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-1  flex flex-col justify-center items-center">
              <Skeleton className="h-2 w-[250px]" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-8 absolute bottom-4 px-6">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    )
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="w-full max-w-[380px] gradient-button pt-20 relative rounded-lg hover:shadow-shadows/2 transition-shadow duration-500 ease-in-out">
        <div className=" bg-card h-52 ">
          <div className="-translate-y-20 ">
            <CardHeader className="text-center flex flex-col items-center justify-center ">
              <UserPhoto client={client} />
              <div className="flex flex-col gap-2">
                <CardTitle className="font-semibold text-xl capitalize">
                  {client?.nome}
                </CardTitle>
                <CardDescription className="text-center text-ellipsis line-clamp-2 h-10">
                  {client?.sobre}
                </CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-center items-center gap-4 ">
              <EmailSenderButton />
              <Button className="w-full flex flex-row gap-x-2 text-base  ">
                <Pencil size={22} />
                <span>Editar</span>
              </Button>
            </CardFooter>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-2 top-2 bg-black/40 w-8 h-8 rounded-full text-white flex items-center justify-center">
            <Gear size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-none opacity-95 absolute -right-4 w-max">
            <CopyLinkButton />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className=" text-destructive gap-2 focus:bg-destructive hover:text-destructive cursor-pointer"
                onClick={handleDeleteClient}
              >
                <Trash size={24} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      <ConfirmExclusionDialog
        clientName={client?.nome}
        clientId={client?.id}
        setIsOpen={setIsOpen}
      />
    </AlertDialog>
  )
}

const EmailSenderButton = () => {
  const [isSent, setIsSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (isSending || isSent) {
      return // Retorna se já está enviando ou se já foi enviado
    }

    setIsSending(true)

    // Alguma lógica para enviar um email
    setTimeout(() => {
      setIsSent(true)
      setTimeout(() => {
        setIsSent(false)
        setIsSending(false)
      }, 2000)
    }, 2000)
  }

  return (
    <Button
      type="button"
      variant={"outline"}
      className="w-full flex flex-row gap-x-2 text-base"
      onClick={handleClick}
      disabled={isSending || isSent}
    >
      {isSent ? (
        <>
          <Check size={22} />
          <span>Enviado</span>
        </>
      ) : (
        <>
          <PaperPlaneTilt size={22} />
          <span>Email</span>
        </>
      )}
    </Button>
  )
}

const CopyLinkButton = () => {
  const [isCopied, setIsCopied] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <DropdownMenuItem
      className="gap-2 cursor-pointer"
      onClick={handleClick}
      disabled={isCopied}
    >
      {isCopied ? (
        <>
          <Check size={24} />
          Copiado
        </>
      ) : (
        <>
          <Copy size={24} />
          Copiar Link
        </>
      )}
    </DropdownMenuItem>
  )
}

interface ConfirmExclusionDialogProps {
  clientName?: string
  clientId?: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmExclusionDialog = ({
  clientName,
  clientId,
  setIsOpen,
}: ConfirmExclusionDialogProps) => {
  const { mutate, isPending } = useDeleteClientById()
  const { toast } = useToast()
  function handleDeleteClient() {
    if (clientId) {
      mutate(clientId, {
        onSuccess: () => {
          setIsOpen(false)
          toast({
            variant: "success",
            title: "Cliente excluído com sucesso!",
          })
        },
        onError: () => {
          setIsOpen(true)
          toast({
            variant: "destructive",
            title: "Erro ao excluir cliente",
            description: "Tente novamente mais tarde",
          })
        },
      })
    }
  }

  return (
    <AlertDialogContent className="flex flex-col gap-8">
      <AlertDialogHeader className="flex flex-col w-full items-center justify-items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-primaryScale-200 text-primaryScale-700 flex items-center justify-center">
          <Warning size={36} />
        </div>
        <AlertDialogTitle className="font-semibold text-xl ">
          Confirmar exclusão de <span className="capitalize">{clientName}</span>
          ?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          Esta ação não pode ser desfeita. Se continuar os dados do cliente
          serão deletados permanentemente dos nossos servidores.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="w-full flex flex-row items-center justify-center gap-8">
        <AlertDialogCancel
          className="w-full h-14 text-base"
          disabled={isPending}
        >
          Cancelar
        </AlertDialogCancel>
        <Button
          type="button"
          className="w-full h-14 text-base"
          onClick={handleDeleteClient}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className=" h-8 w-8 animate-spin" />
          ) : (
            "Excluir Cliente"
          )}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
