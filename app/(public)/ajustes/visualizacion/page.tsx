import type { Metadata } from 'next'

import { SettingsDisplayPage } from '@public/pages/settings/pages/display'

export const metadata: Metadata = {
  title: 'Visualización',
}

export default function Page() {
  return <SettingsDisplayPage />
}
