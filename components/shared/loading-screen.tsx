'use client'

import { Logo } from '@/components/shared/logo'

export function LoadingScreen() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background">
      <Logo className="size-20" />
    </div>
  )
}
