'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .max(50, {
        message: 'La contraseña no puede tener más de 50 caracteres.',
      })
      .regex(/^\S+$/, {
        message: 'La contraseña no puede contener espacios en blanco.',
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          'La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un carácter especial (@$!%*?&).',
      }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, { message: 'Debes confirmar la contraseña nueva.' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmNewPassword'],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.warn('Datos para crear contraseña nueva:', data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear contraseña nueva</CardTitle>
          <CardDescription>
            Ingresa la contraseña nueva para tu cuenta de Areska a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contraseña nueva</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Contraseña nueva"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña nueva</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirmar contraseña nueva"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <Button type="submit">Crear contraseña</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
