import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Check,
  User,
  Copy,
  Gear,
  PaperPlaneTilt,
  Pencil,
  Trash,
  Warning,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Client } from '@/dtos/ClientDTO'
import { useDeleteClientById } from '@/queries/clients'
import { Loader2 } from 'lucide-react'

interface ClientCardProps {
  client: Client
}
export default function ClientCard({ client }: ClientCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="w-full  gradient-button pt-20 relative rounded-lg hover:shadow-shadows/2 transition-shadow duration-500 ease-in-out">
        <div className=" bg-card h-52 ">
          <div className="-translate-y-20 ">
            <CardHeader className="text-center flex flex-col items-center justify-center ">
              {client.photoURL ? (
                <img
                  className="w-24 h-24 border-4 border-white bg-zinc-200 rounded-full "
                  src={client.photoURL}
                  alt={`Imagem do cliente ${client.fullName}`}
                />
              ) : (
                <div className="w-24 h-24 border-4 border-white bg-zinc-200 rounded-full flex items-center justify-center text-gray-400">
                  <User weight={'fill'} size={64} />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <CardTitle className="font-semibold text-xl capitalize">
                  {client.fullName}
                </CardTitle>
                <CardDescription className="text-center text-ellipsis line-clamp-2 h-10">
                  {client.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-end items-center gap-8 ">
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
              <DropdownMenuItem className=" text-destructive gap-2 focus:bg-destructive hover:text-destructive cursor-pointer">
                <Trash size={24} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      <ConfirmExclusionDialog
        clientName={client.fullName}
        clientId={client.id}
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
      variant={'outline'}
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
  clientName: string
  clientId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmExclusionDialog = ({
  clientName,
  clientId,
  setIsOpen,
}: ConfirmExclusionDialogProps) => {
  const { mutate, isPending, isSuccess, isError } = useDeleteClientById()

  function handleDeleteClient() {
    mutate(clientId)
    isSuccess ? setIsOpen(false) : setIsOpen(true)
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
            'Excluir Cliente'
          )}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
