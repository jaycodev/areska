import type { Metadata } from 'next'

import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = {
  title: 'Sobre nosotros',
}

export default function Page() {
  return <ComingSoon />
}
