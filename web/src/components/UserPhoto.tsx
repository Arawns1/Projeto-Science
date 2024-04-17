import { Client } from '@/dtos/ClientDTO'
import { cn } from '@/lib/utils'
import { CameraPlus } from '@phosphor-icons/react'
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import userImagePlaceholder from '../assets/images/img_placeholder.png'
import { Button } from './ui/button'

interface UserPhotoProps extends HtmlHTMLAttributes<HTMLImageElement> {
  client?: Client
  editable?: boolean
  hasRecommendedSize?: boolean
  name?: string
}
export default function UserPhoto({
  client,
  className,
  editable = false,
  hasRecommendedSize = true,
  name = 'userPhoto',
  ...props
}: UserPhotoProps) {
  const API_URL = import.meta.env.VITE_API_URL
  const [userImage, setUserImage] = useState(userImagePlaceholder)
  const formContext = useFormContext()

  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (client?.userPhoto) {
      setUserImage(`${API_URL}${client.userPhoto}`)
    }
  }, [client, userImage, API_URL])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (file) {
      formContext.setValue(name, file)
      const newImage = URL.createObjectURL(file)
      setUserImage(newImage)
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    if (fileInput && fileInput.current) {
      fileInput.current.click()
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div
        onClick={handleClick}
        aria-hidden="true"
        title={editable ? 'Clique para adicionar uma foto' : ''}
        role="button"
        className={cn(
          `w-24 h-24 border-4 border-white bg-zinc-200 rounded-full flex items-center justify-center text-gray-400 relative ${
            editable ? 'hover:brightness-95 cursor-pointer' : ''
          }`,
          className,
        )}
      >
        <img
          className={cn(
            `w-full h-full aspect-square object-cover ${
              editable ? 'border-4' : 'border-1'
            } border-white bg-zinc-200 rounded-full `,
          )}
          src={userImage}
          alt={`Imagem do cliente ${client?.nome ?? ''}`}
          {...props}
        />

        {editable && (
          <Button
            type="button"
            size={'icon'}
            className="absolute bottom-0 right-3 rounded-full"
          >
            <CameraPlus weight={'regular'} size={'70%'} />
          </Button>
        )}
      </div>

      <input
        disabled={!editable}
        type="file"
        id="picture"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInput}
        style={{ display: 'none' }}
      />
      {editable && hasRecommendedSize && (
        <span className="text-sm text-center text-zinc-400">
          Tamanho Recomendado: 500x500
        </span>
      )}
    </div>
  )
}
