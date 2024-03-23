import { Client } from '@/dtos/ClientDTO'
import { cn } from '@/lib/utils'
import { CameraPlus } from '@phosphor-icons/react'
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useFormContext } from 'react-hook-form'

interface UserPhotoProps extends HtmlHTMLAttributes<HTMLImageElement> {
  client?: Client
  editable?: boolean
}
export default function UserPhoto({
  client,
  className,
  editable = false,
  ...props
}: UserPhotoProps) {
  const [userImage, setUserImage] = useState(
    'src/assets/images/img_placeholder.png'
  )
  const formContext = useFormContext()

  const fileInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    formContext.setValue('userPhoto', file)
    if (file) {
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
        title={editable ? 'Clique para adicionar uma foto' : ''}
        className={cn(
          `w-24 h-24 border-4 border-white bg-zinc-200 rounded-full flex items-center justify-center text-gray-400 relative ${
            editable ? 'hover:brightness-95 cursor-pointer' : ''
          }`,
          className
        )}
      >
        <img
          className={cn(
            `w-full h-full aspect-square object-cover ${
              editable ? 'border-4' : 'border-1'
            } border-white bg-zinc-200 rounded-full `
          )}
          src={client?.photoURL ? client?.photoURL : userImage}
          alt={`Imagem do cliente ${client?.fullName}`}
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
        // ref={(e) => {
        //   ref(e)
        //   fileInput.current = e
        // }}
        // onChange={() => {

        // }}
        // {...register('userPhoto', {
        //   onChange: (e) => handleFileChange(e),
        // })}
      />
      {editable && (
        <span className="text-xs text-zinc-400">
          Tamanho Recomendado: 500x500
        </span>
      )}
    </div>
  )
}
