import { z } from 'zod'

export const apresentacaoSchema = z
  .object({
    nome: z.string().min(1, 'Insira um nome válido'),
    contato: z.string().min(1, 'Insira um contato válido'),
    email: z.string().email('Insira um email válido').min(1, 'Insira um email'),
    userPhoto: z.instanceof(Object).optional(),
    senha: z
      .string()
      .min(
        8,
        'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um caracter especial'
      ),
    sobre: z.string().optional(),
  })
  .superRefine(({ senha }, checkPassComplexity) => {
    const containsUppercase = (ch: any) => /[A-Z]/.test(ch)
    const containsLowercase = (ch: any) => /[a-z]/.test(ch)
    const containsSpecialChar = (ch: any) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfSpecialChar = 0

    for (let i = 0; i < senha.length; i++) {
      let ch = senha.charAt(i)
      if (containsUppercase(ch)) countOfUpperCase++
      else if (containsLowercase(ch)) countOfLowerCase++
      else if (containsSpecialChar(ch)) countOfSpecialChar++
    }

    let errObj = {
      upperCase: {
        pass: true,
        message: 'A senha deve conter ao menos uma letra maiúscula',
      },
      lowerCase: {
        pass: true,
        message: 'A senha deve conter ao menos uma letra minúscula',
      },
      specialCh: {
        pass: true,
        message:
          'A senha deve conter ao menos um caracter especial Ex.: (!$%&@#*)',
      },
    }

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } }
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } }
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } }
    }

    const errMessage = (errObj: any): string => {
      let message = ''
      if (!errObj.upperCase.pass) message = errObj.upperCase.message
      if (!errObj.lowerCase.pass) message = errObj.lowerCase.message
      if (!errObj.specialCh.pass) message = errObj.specialCh.message
      return message
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['senha'],
        message: errMessage(errObj),
      })
    }
  })

export type ApresentacaoSchemaType = z.infer<typeof apresentacaoSchema>
