import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function ForgotPasswordPage({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Restablece la contraseña</CardTitle>
          <CardDescription>
            Escribe la dirección de correo electrónico vinculada a tu cuenta de BookStudio y te
            enviaremos un mensaje.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
              </Field>
              <Button type="submit">Enviar enlace</Button>
              <Button variant="outline" asChild>
                <Link href="/iniciar-sesion">Volver al inicio de sesión</Link>
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
