import { useNavigate } from 'react-router-dom'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Warning } from '@phosphor-icons/react'
import { Button } from './ui/button'

export default function DiscardDialog() {
  const navigate = useNavigate()

  const handleModalDiscard = () => {
    navigate('/dashboard')
  }

  return (
    <AlertDialogContent className="flex flex-col gap-8">
      <AlertDialogHeader className="flex flex-col w-full items-center justify-items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-primaryScale-200 text-primaryScale-700 flex items-center justify-center">
          <Warning size={36} />
        </div>
        <AlertDialogTitle className="font-semibold text-xl text-center">
          Você possui alterações não salvas. Tem certeza que deseja sair e
          descartar as alterações?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter className="w-full flex flex-row items-center justify-center gap-8">
        <AlertDialogCancel className="w-full h-14 text-base">
          Ficar
        </AlertDialogCancel>
        <Button
          type="button"
          className="w-full h-14 text-base"
          onClick={handleModalDiscard}
        >
          Descartar e Sair
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
