import type { Metadata } from 'next'
import YapePage from '@public/pages/checkout/YapePage'

export const metadata: Metadata = {
  title: 'Pago con Yape',
}

export default function Page() {
  return <YapePage />
}
