'use client'

import { Heart, Star } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/schemas'
import { useCartStore } from '@/stores/cart-store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card opacity-0 transition-opacity group-hover:opacity-100">
          <Heart className="h-4 w-4 text-muted-foreground" />
        </button>
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-muted-foreground">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
