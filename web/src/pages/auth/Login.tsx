import Logo from '@/assets/science-logo.svg'
import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoginSchemaType, loginSchema } from './LoginSchema'
export default function Login() {
  const navigate = useNavigate()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })
  function onSubmit(values: LoginSchemaType) {
    navigate('/dashboard')
  }

  return (
    <div className="w-screen sm:w-full h-screen  bg-gradient-to-tl from-Light-primary to-Light-accent flex xl:justify-start justify-center ">
      <main className="bg-Light-background w-full md:w-5/6 xl:w-1/2 h-full flex flex-col items-start px-4 md:px-8 xl:px-16 py-2 xl:py-12 md:py-4 xl:gap-6 gap-8  ">
        <header className="w-full flex justify-center sm:justify-start items-center ">
          <img
            src={Logo}
            width={160}
            alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
          />
        </header>
        <section className="flex flex-col w-full h-full justify-start  xl:pt-4 pt-0 ">
          <div>
            <h1 className="text-2xl xl:text-3xl font-bold sm:text-left text-center">
              Bem-vindo de volta!
            </h1>
            <p className="text-zinc-500 text-base sm:text-left text-center">
              Insira suas credenciais para acessar a plataforma
            </p>
          </div>
          <Form {...form}>
            <form
              id="loginForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full xl:h-auto sm:h-full flex flex-col gap-4 pt-6"
              autoComplete="on"
            >
              <fieldset>
                <legend className="sr-only">Formulário de Login</legend>
                <div className="flex flex-col gap-8 xl:gap-8 md:gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="userInput"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Usuário
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="userInput"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            error={!!formState.errors.username}
                            placeholder="Seu usuário"
                            className="caret-accent "
                            leftIcon={
                              <User size={28} className="text-zinc-600" />
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="passwordInput"
                          className="text-zinc-800 font-semibold text-base"
                        >
                          Senha
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="passwordInput"
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            error={!!formState.errors.password}
                            className="caret-accent "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>

              <div className="flex flex-row justify-between items-center">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none h-max">
                        <FormLabel className="font-normal text-base text-zinc-600">
                          Lembrar-me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  variant={'link'}
                  type="button"
                  className="font-semibold text-base p-0"
                >
                  Esqueceu a senha?
                </Button>
              </div>
            </form>
          </Form>
          <Button
            data-formid="loginForm"
            form="loginForm"
            type="submit"
            variant={'animation'}
            className="h-16 mt-10 md:mt-4 xl:mt-6 text-primaryScale-50"
          >
            Entrar
          </Button>
        </section>
      </main>
    </div>
  )
}
