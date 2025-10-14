import { Categories } from '@/components/sections/categories'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { Hero } from '@/components/sections/hero'
import { Newsletter } from '@/components/sections/newsletter'
import { Testimonials } from '@/components/sections/testimonials'

export default function Page() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
