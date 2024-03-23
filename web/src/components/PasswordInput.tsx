import { Eye, EyeSlash, LockKey } from '@phosphor-icons/react'
import React, { cloneElement, forwardRef, useState } from 'react'
import { Input, InputProps } from './ui/input'

interface PasswordInput extends InputProps {
  error?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInput>(
  ({ error = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    function handleShowPassword() {
      setShowPassword(!showPassword)
    }

    const getPasswordIcon = () => {
      const passwordIcon = showPassword ? (
        <EyeSlash aria-label="Ocultar senha" />
      ) : (
        <Eye aria-label="Mostrar senha" />
      )

      return cloneElement(passwordIcon, {
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
      <Input
        type={showPassword ? 'text' : 'password'}
        error={error}
        className="caret-accent "
        leftIcon={<LockKey size={28} className="text-zinc-600" />}
        rightIcon={getPasswordIcon()}
        ref={ref}
        {...props}
      />
    )
  }
)
export { PasswordInput }
