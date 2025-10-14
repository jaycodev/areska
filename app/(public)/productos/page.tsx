import type { Metadata } from 'next'

import { ProductsPage } from '@public/pages/products'

export const metadata: Metadata = {
  title: 'Catálogo de productos',
}
export default function Page() {
  return <ProductsPage />
}
