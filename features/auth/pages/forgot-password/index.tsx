'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Correo electrónico inválido' }).trim(),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.warn('Enviar enlace a:', data)
    router.push('/iniciar-sesion')
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Restablece la contraseña</CardTitle>
          <CardDescription>
            Escribe la dirección de correo electrónico vinculada a tu cuenta de Areska y te
            enviaremos un mensaje.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
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
                <Button type="submit">Enviar enlace</Button>
                <Button variant="outline" asChild>
                  <Link href="/iniciar-sesion">Volver al inicio de sesión</Link>
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
