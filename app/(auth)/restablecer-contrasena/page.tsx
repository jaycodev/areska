import type { Metadata } from 'next'

import { ResetPasswordPage } from '@auth/pages/reset-password'

export const metadata: Metadata = {
  title: 'Restablecer contraseña',
}

export default function Page() {
  return <ResetPasswordPage />
}
