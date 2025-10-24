import type { Metadata } from 'next'

import CheckoutPage from '@public/pages/checkout/CheckoutPage'

export const metadata: Metadata = {
  title: 'Proceso de pago',
}

export default function Page() {
  return <CheckoutPage />
}
