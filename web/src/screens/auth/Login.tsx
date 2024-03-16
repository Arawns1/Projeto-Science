import Logo from '@/assets/science-logo.svg'
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
import { User, LockKey, Eye, EyeSlash } from '@phosphor-icons/react'
import { loginSchema, LoginSchemaType } from './LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

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
    console.log(values)
    alert("You're logged in!")
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const getPasswordIcon = () => {
    const passwordIcon = showPassword ? (
      <EyeSlash aria-label="Ocultar senha" />
    ) : (
      <Eye aria-label="Mostrar senha" />
    )

    return React.cloneElement(passwordIcon, {
      key: 'passwordIcon',
      onClick: handleShowPassword,
      className: 'text-zinc-400 cursor-pointer hover:brightness-90',
      size: 24,
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
        }
      },
      onKeyUp: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleShowPassword()
          e.preventDefault()
        }
      },
    })
  }
  return (
    <div className="w-full h-screen bg-gradient-to-tl from-Light-primary to-Light-accent">
      <main className="bg-Light-background w-1/2 h-screen flex flex-col items-start py-14 px-24 gap-12  ">
        <header>
          <img
            src={Logo}
            width={160}
            alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
          />
        </header>
        <section className="flex flex-col w-full h-full justify-between pb-4">
          <div>
            <h1 className="text-3xl font-bold ">Bem-vindo de volta!</h1>
            <p className="text-zinc-500 text-base">
              Insira suas credenciais para acessar a plataforma
            </p>
          </div>
          <Form {...form}>
            <form
              id="loginForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4 "
              autoComplete="on"
            >
              <fieldset>
                <legend className="sr-only">Formulário de Login</legend>
                <div className="flex flex-col gap-8 ">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="userInput"
                          className="text-zinc-700 font-medium text-base"
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
                          className="text-zinc-700 font-medium text-base"
                        >
                          Senha
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="passwordInput"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            error={!!formState.errors.password}
                            leftIcon={
                              <LockKey size={28} className="text-zinc-600" />
                            }
                            rightIcon={getPasswordIcon()}
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
            className="h-16 font-semibold text-lg text-primaryScale-50"
          >
            Entrar
          </Button>
        </section>
      </main>
    </div>
  )
}
