'use client'

import { CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form'
import { CheckoutSchema } from '@/lib/schemas'
import { useCartStore } from '@/stores/cart-store'

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(CheckoutSchema)

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)
            }}
            className="space-y-6"
          >
            <div>
              <h2 className="mb-4 text-lg">Información de contacto</h2>
              <div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={data.email || ''}
                  onChange={(e) => setValue('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg">Dirección de envío</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={data.firstName || ''}
                    onChange={(e) => setValue('firstName', e.target.value)}
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Apellido"
                    value={data.lastName || ''}
                    onChange={(e) => setValue('lastName', e.target.value)}
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  placeholder="Dirección"
                  value={data.address || ''}
                  onChange={(e) => setValue('address', e.target.value)}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-destructive">{errors.address}</p>
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Input
                    type="text"
                    placeholder="Ciudad"
                    value={data.city || ''}
                    onChange={(e) => setValue('city', e.target.value)}
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Provincia / Estado"
                    value={data.state || ''}
                    onChange={(e) => setValue('state', e.target.value)}
                    className={errors.state ? 'border-destructive' : ''}
                  />
                  {errors.state && <p className="mt-1 text-sm text-destructive">{errors.state}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Código postal"
                    value={data.zipCode || ''}
                    onChange={(e) => setValue('zipCode', e.target.value)}
                    className={errors.zipCode ? 'border-destructive' : ''}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-destructive">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg">Información de pago</h2>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Número de tarjeta"
                    value={data.cardNumber || ''}
                    onChange={(e) => setValue('cardNumber', e.target.value)}
                    className={errors.cardNumber ? 'border-destructive' : ''}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-destructive">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      value={data.expiryDate || ''}
                      onChange={(e) => setValue('expiryDate', e.target.value)}
                      className={errors.expiryDate ? 'border-destructive' : ''}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-destructive">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="CVV"
                      value={data.cvv || ''}
                      onChange={(e) => setValue('cvv', e.target.value)}
                      className={errors.cvv ? 'border-destructive' : ''}
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-destructive">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              <CreditCard />
              {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
            </Button>
          </form>
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
                    className="h-16 w-16 rounded-lg object-cover"
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
