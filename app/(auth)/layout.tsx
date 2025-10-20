'use client'

import { ReactNode, useEffect } from 'react'

import { AuthLayout } from '@auth/layout'

import { useAuthStore } from '@/stores/auth-store'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const init = useAuthStore((s) => s.init)
  useEffect(() => {
    init()
  }, [init])
  return <AuthLayout>{children}</AuthLayout>
}
