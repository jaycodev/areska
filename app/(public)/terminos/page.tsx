import type { Metadata } from 'next'

import { TermsOfServicePage } from '@public/pages/terms'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
}
export default function Page() {
  return <TermsOfServicePage />
}
