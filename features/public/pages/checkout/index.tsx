'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { useCartStore } from '@/stores/cart-store'

const checkoutSchema = z.object({
  email: z.string().email('Por favor, ingresa un correo electrónico válido'),
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  state: z.string().min(1, 'La provincia/estado es requerida'),
  zipCode: z.string().min(5, 'El código postal debe tener al menos 5 caracteres'),
  cardNumber: z.string().min(16, 'El número de tarjeta debe tener al menos 16 dígitos'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Por favor ingresa el formato MM/AA'),
  cvv: z.string().min(3, 'El CVV debe tener al menos 3 dígitos'),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Pedido realizado:', data)
    }
    clearCart()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-card shadow-sm p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CreditCard className="size-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">¡Pedido realizado con éxito!</h2>
          <p className="mb-4 text-muted-foreground">
            Gracias por tu compra. Recibirás un correo de confirmación pronto.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-transparent"
          >
            Realizar otro pedido
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Proceso de pago</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Form {...form}>
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg">Información de contacto</h2>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      {fieldState.error && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="mb-4 text-lg">Dirección de envío</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Nombre</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ingrese un nombre" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Apellido</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ingrese un apellido" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Dirección</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Calle y número" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 items-start">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Ciudad</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ciudad" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Provincia / Estado</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Provincia" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Código postal</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="12345" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-lg">Información de pago</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel required>Número de tarjeta</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel required>Fecha de expiración</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="MM/AA" {...field} />
                          </FormControl>
                          {fieldState.error && <FormMessage />}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel required>CVV</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="123" {...field} />
                          </FormControl>
                          {fieldState.error && <FormMessage />}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                <CreditCard />
                {form.formState.isSubmitting ? 'Procesando...' : 'Realizar pedido'}
              </Button>
            </div>
          </Form>
        </div>

        <div>
          <div className="sticky top-18 rounded-xl bg-card border shadow-sm p-6">
            <h2 className="mb-4 text-xl">Resumen del pedido</h2>

            <div className="mb-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image || '/images/placeholder.svg'}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-muted-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-muted-foreground">
                  {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impuestos</span>
                <span className="text-muted-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
