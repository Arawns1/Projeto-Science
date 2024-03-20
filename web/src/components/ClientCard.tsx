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
  Check,
  Copy,
  Gear,
  PaperPlaneTilt,
  Pencil,
  Trash,
} from '@phosphor-icons/react'
import { useState } from 'react'

export default function ClientCard() {
  return (
    <Card className="w-full  gradient-button pt-20 relative rounded-lg hover:shadow-shadows/2 transition-shadow duration-500 ease-in-out">
      <div className=" bg-card h-52 ">
        <div className="-translate-y-20 ">
          <CardHeader className="text-center flex flex-col items-center justify-center ">
            <div className="w-24 h-24 border-4 border-white bg-zinc-200 rounded-full " />
            <div className="flex flex-col gap-2">
              <CardTitle className="font-semibold text-xl">John Doe</CardTitle>
              <CardDescription className="text-center text-ellipsis line-clamp-2 ">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardDescription>
            </div>
          </CardHeader>

          <CardFooter className="flex justify-center items-center gap-8 ">
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
          <DropdownMenuItem className=" text-destructive gap-2 focus:bg-destructive hover:text-destructive cursor-pointer">
            <Trash size={24} />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
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
