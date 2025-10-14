'use client'

import { useEffect, useState } from 'react'

import { useCartStore } from '@/stores/cart-store'

export function CartCount() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || itemCount === 0) {
    return null
  }

  return (
    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
      {itemCount}
    </span>
  )
}
