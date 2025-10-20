'use client'

import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
      .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
    email: z.email({ message: 'Correo electrónico inválido' }).trim(),
    password: z
      .string()
      .trim()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .max(50, { message: 'La contraseña no puede tener más de 50 caracteres' })
      .regex(/^\S+$/, { message: 'La contraseña no puede contener espacios en blanco' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          'La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un carácter especial (@$!%*?&)',
      }),
    confirmPassword: z.string().trim().min(8, { message: 'Debes confirmar la contraseña' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignUpPage({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter()
  const { signup, init, isLoading } = useAuthStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    init()
  }, [init])

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setError(null)
    try {
      await signup(data.email, data.password, data.name)
      router.push('/')
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo crear la cuenta')
    }
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
          <CardDescription>Ingresa tu correo electrónico para crear tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ingrese un nombre"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Contraseña</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Contraseña"
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
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirmar Contraseña"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <Field>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                  <FieldDescription className="text-center">
                    ¿Ya tienes una cuenta? <a href="/iniciar-sesion">Inicia sesión</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al continuar, aceptas nuestros <a href="/terminos">Términos de servicio</a> y{' '}
        <a href="/privacidad">Política de privacidad</a>.
      </FieldDescription>
    </div>
  )
}
