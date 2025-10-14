import { Backpack, Camera, Gamepad2, Headphones, Smartphone, Watch } from 'lucide-react'
import Link from 'next/link'

import { categories } from '@/lib/data'

const categoryIcons = {
  Audio: Headphones,
  Wearables: Watch,
  Accessories: Backpack,
  Mobile: Smartphone,
  Photography: Camera,
  Gaming: Gamepad2,
} as const

export function Categories() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">
            Find exactly what you&#39;re looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name as keyof typeof categoryIcons]
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-xl bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                  <Icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
