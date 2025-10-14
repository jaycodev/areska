'use client'

import { Minus, Plus, Trash } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'

export function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-muted-foreground">
          Looks like you haven&#39;t added anything to your cart yet.
        </p>
        <Link href="/productos">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="overflow-hidden rounded-xl bg-card border">
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-6">
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  <Minus />
                </Button>
                <span className="w-5 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                <Trash className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-semibold">${getTotal().toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/productos" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/pago" className="flex-1">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
