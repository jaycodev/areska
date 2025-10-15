import { ProductCard } from '@public/pages/products/detail/product-card'

import { products } from '@/lib/data'

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 9)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Productos destacados</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Descubre nuestros artículos más populares, cuidadosamente seleccionados por su calidad
            excepcional y satisfacción del cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
