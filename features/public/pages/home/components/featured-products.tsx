import { ProductCard } from '@public/pages/products/components/product-card'

import { products } from '@/lib/data'

export function FeaturedProducts() {
  // Take first 6 products as featured
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Products</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover our most popular items, carefully selected for their exceptional quality and
            customer satisfaction.
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
