import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '@auth/schemas/user-schema'

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const emailName = email.split('@')[0]
        const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1)

        const mockUser: User = {
          id: Math.floor(Math.random() * 1000) + 1,
          firstName,
          lastName: 'Usuario',
          email,
          password,
          phone: '+51 999 999 999',
          address: 'Av. Los Olivos 123, Lima, Perú',
          createdAt: new Date().toISOString(),
        }

        set({ user: mockUser, isLoading: false })
      },

      signup: async (email, password, firstName, lastName) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser: User = {
          id: Math.floor(Math.random() * 1000) + 1,
          firstName,
          lastName,
          email,
          password,
          phone: '',
          address: '',
          createdAt: new Date().toISOString(),
        }

        set({ user: mockUser, isLoading: false })
      },

      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
