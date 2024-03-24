import { PasswordInput } from '@/components/PasswordInput'
import UserPhoto from '@/components/UserPhoto'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
import { Textarea } from '@/components/ui/textarea'
import { normalizePhoneNumber } from '@/lib/masks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Envelope, Phone, User, Warning } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  ApresentacaoSchemaType,
  apresentacaoSchema,
} from './ApresentacaoSchema'

export default function ApresentacaoPage() {
  const form = useForm<ApresentacaoSchemaType>({
    resolver: zodResolver(apresentacaoSchema),
    mode: 'onTouched',
    defaultValues: {
      nome: '',
      contato: '',
      email: '',
      senha: '',
      sobre: '',
    },
  })

  const contatoValue = form.watch('contato')
  const navigate = useNavigate()

  useEffect(() => {
    form.setValue('contato', normalizePhoneNumber(contatoValue))
  }, [contatoValue])

  function onSubmit(values: ApresentacaoSchemaType) {
    navigate('diagnostico')
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  function handleDiscard() {
    setIsDialogOpen(true)
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
          Apresentação
        </h2>
        <div className="flex flex-row py-12">
          <FormProvider {...form}>
            <div className="w-[280px] flex items-start justify-start px-8">
              <UserPhoto
                editable
                className="border-primaryScale-300 w-48 h-48"
              />
            </div>
          </FormProvider>

          <Form {...form}>
            <form
              id="apresentacaoForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 w-full xl:h-auto sm:h-full flex flex-col gap-4 "
              autoComplete="on"
            >
              <FormField
                name="nome"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="nameInput">Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="nameInput"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        error={!!formState.errors.nome}
                        placeholder="Nome do Cliente"
                        leftIcon={<User size={28} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="contato"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="contatoInput"
                      className="text-zinc-800 font-semibold text-base"
                    >
                      Contato
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="contatoInput"
                        type="tel"
                        autoComplete="tel"
                        error={!!formState.errors.contato}
                        placeholder="(99) 99999-9999"
                        leftIcon={<Phone size={28} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="emailInput">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="emailInput"
                        type="email"
                        autoComplete="email"
                        placeholder="email@email.com"
                        error={!!formState.errors.email}
                        leftIcon={<Envelope size={28} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="senha"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="senhaInput">Senha de acesso</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="passwordInput"
                        autoComplete="current-password"
                        placeholder="Sua senha"
                        error={!!formState.errors.senha}
                        className="caret-accent "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="sobre"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sobreInput">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        id="sobreInput"
                        className="text-base"
                        placeholder="Um breve descrição"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
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
            data-formid="apresentacaoForm"
            form="apresentacaoForm"
            type="submit"
            size={'lg'}
          >
            Próxima Etapa
          </Button>
        </div>
      </div>
      <DiscardDialog />
    </AlertDialog>
  )
}

const DiscardDialog = () => {
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
