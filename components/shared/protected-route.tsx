'use client'

import { ReactNode, useEffect } from 'react'

import { LogIn, LucideIcon } from 'lucide-react'

import { EmptyState } from '@/components/shared/empty-state'
import { useAuthStore } from '@/stores/auth-store'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  title?: string
  message?: string
  icon?: LucideIcon
}

export function ProtectedRoute({
  children,
  fallback,
  title = 'Debes iniciar sesión',
  message = 'Por favor, inicia sesión para acceder a este contenido.',
  icon = LogIn,
}: Props) {
  const { init, user } = useAuthStore()

  useEffect(() => {
    init()
  }, [init])

  if (!user) {
    return (
      fallback || (
        <EmptyState
          title={title}
          description={message}
          icon={icon}
          action={{
            label: 'Iniciar sesión',
            href: '/iniciar-sesion',
            icon: LogIn,
          }}
        />
      )
    )
  }

  return <>{children}</>
}
