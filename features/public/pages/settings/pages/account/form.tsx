'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/stores/auth-store'

const passwordSchema = z
  .object({
    currentPassword: z.string().trim().min(8, {
      message: 'La contraseña actual debe tener al menos 8 caracteres.',
    }),
    newPassword: z
      .string()
      .trim()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .max(50, {
        message: 'La contraseña no puede tener más de 50 caracteres.',
      })
      .regex(/^\S+$/, { message: 'La contraseña no puede contener espacios en blanco.' })
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

type PasswordFormValues = z.infer<typeof passwordSchema>

export function AccountForm() {
  const { user, changePassword, isLoading } = useAuthStore()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  })

  const onSubmit = async (data: PasswordFormValues) => {
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await changePassword(data.currentPassword, data.newPassword)
      setSuccessMessage('Contraseña actualizada exitosamente')
      form.reset()
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string }
      if (err?.code === 'auth/invalid-credential') {
        setErrorMessage('La contraseña actual no es correcta')
      } else {
        setErrorMessage('Error al cambiar la contraseña')
      }
    }
  }

  if (!user) {
    return <p className="text-muted-foreground">Usuario no autenticado</p>
  }

  if (user.authProvider !== 'password') {
    return (
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Cambio de contraseña no disponible</AlertTitle>
        <AlertDescription>
          <p>
            Esta función requiere cuenta con contraseña.
            <br />
            Tu cuenta actual es de {user.authProvider}.
          </p>
          <ul className="list-inside list-disc text-sm">
            <li>Contacta con soporte para más ayuda</li>
            <li>Usa las opciones de tu proveedor de autenticación</li>
          </ul>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {successMessage && (
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Contraseña actual"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center sm:justify-start">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}
            {isLoading ? 'Cambiando contraseña' : 'Cambiar contraseña'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
