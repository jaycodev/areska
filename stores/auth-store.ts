"use client"
import { create } from 'zustand'
import { onAuthStateChanged } from 'firebase/auth'

import { getAuthClient } from '@/lib/firebase/client'
import {
  loginWithEmail,
  signupWithEmail,
  logoutFirebase,
  loginWithGoogle as loginWithGoogleFn,
  requestPasswordReset,
} from '@/lib/firebase/auth'

type User = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  initialized: boolean
  init: () => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPasswordEmail: (email: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  isLoading: false,
  initialized: false,

  init: (): void => {
    if (get().initialized) return
    set({ initialized: true })
    try {
      const auth = getAuthClient()
      onAuthStateChanged(auth, (u) => {
        if (!u) {
          set({ user: null })
        } else {
          set({
            user: {
              uid: u.uid,
              email: u.email,
              displayName: u.displayName,
              photoURL: u.photoURL,
            },
          })
        }
      })
    } catch (e) {
      // Si faltan envs u otra causa, no bloquear la app
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[Auth] Inicialización omitida (posible falta de variables de entorno).', e)
      }
    }
  },

  login: async (email: string, password: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await loginWithEmail(email, password)
      set({
        user: {
          uid: u.uid,
          email: u.email ?? null,
          displayName: u.displayName ?? null,
          photoURL: u.photoURL ?? null,
        },
      })
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async (email: string, password: string, name?: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await signupWithEmail(email, password, name)
      set({
        user: {
          uid: u.uid,
          email: u.email ?? null,
          displayName: u.displayName ?? null,
          photoURL: u.photoURL ?? null,
        },
      })
    } finally {
      set({ isLoading: false })
    }
  },

  loginWithGoogle: async (): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await loginWithGoogleFn()
      set({
        user: {
          uid: u.uid,
          email: u.email ?? null,
          displayName: u.displayName ?? null,
          photoURL: u.photoURL ?? null,
        },
      })
    } finally {
      set({ isLoading: false })
    }
  },

  resetPasswordEmail: async (email: string): Promise<void> => {
    await requestPasswordReset(email)
  },

  logout: async (): Promise<void> => {
    await logoutFirebase()
    set({ user: null })
  },
}))
