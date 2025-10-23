'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { create } from 'zustand'

import { usersApi } from '@/lib/api/users'
import {
  loginWithEmail,
  loginWithGoogle as loginWithGoogleFn,
  logoutFirebase,
  requestPasswordReset,
  signupWithEmail,
} from '@/lib/firebase/auth'
import { getAuthClient } from '@/lib/firebase/client'

type User = {
  // Firebase data
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  // Backend database data
  userId?: number
  firstName: string | null
  lastName: string | null
  phone?: string | null
  address?: string | null
  firebaseUid?: string
  authProvider?: string
  emailVerified?: boolean
  photoUrl?: string | null
  createdAt?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  isLoadingInitial: boolean
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
  isLoadingInitial: true,
  initialized: false,

  init: (): void => {
    if (get().initialized) return
    set({ initialized: true, isLoadingInitial: true })
    try {
      const auth = getAuthClient()
      onAuthStateChanged(auth, async (u) => {
        if (!u) {
          set({ user: null, isLoadingInitial: false })
        } else {
          try {
            // Cargar datos completos del usuario desde la BD
            const userFromDB = await usersApi.getByFirebaseUid(u.uid)
            set({
              user: {
                uid: u.uid,
                email: u.email,
                displayName: u.displayName,
                photoURL: u.photoURL,
                userId: userFromDB.userId,
                firstName: userFromDB.firstName || null,
                lastName: userFromDB.lastName || null,
                phone: userFromDB.phone || null,
                address: userFromDB.address || null,
                firebaseUid: userFromDB.firebaseUid,
                authProvider: userFromDB.authProvider,
                emailVerified: userFromDB.emailVerified,
                photoUrl: userFromDB.photoUrl || null,
                createdAt: userFromDB.createdAt,
              },
              isLoadingInitial: false,
            })
          } catch {
            // Si no existe en BD, usar datos de Firebase
            const [firstName, ...lastNameParts] = (u.displayName || '').split(' ')
            const lastName = lastNameParts.join(' ')
            set({
              user: {
                uid: u.uid,
                email: u.email,
                displayName: u.displayName,
                photoURL: u.photoURL,
                firstName: firstName || null,
                lastName: lastName || null,
              },
              isLoadingInitial: false,
            })
          }
        }
      })
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[Auth] Inicialización omitida (posible falta de variables de entorno).', e)
      }
      set({ isLoadingInitial: false })
    }
  },

  login: async (email: string, password: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await loginWithEmail(email, password)
      try {
        // Cargar datos completos del usuario desde la BD
        const userFromDB = await usersApi.getByFirebaseUid(u.uid)
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            userId: userFromDB.userId,
            firstName: userFromDB.firstName || null,
            lastName: userFromDB.lastName || null,
            phone: userFromDB.phone || null,
            address: userFromDB.address || null,
            firebaseUid: userFromDB.firebaseUid,
            authProvider: userFromDB.authProvider,
            emailVerified: userFromDB.emailVerified,
            photoUrl: userFromDB.photoUrl || null,
            createdAt: userFromDB.createdAt,
          },
        })
      } catch {
        // Si no existe en BD, usar datos de Firebase
        const [firstName, ...lastNameParts] = (u.displayName || '').split(' ')
        const lastName = lastNameParts.join(' ')
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            firstName: firstName || null,
            lastName: lastName || null,
          },
        })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async (email: string, password: string, name?: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await signupWithEmail(email, password, name)
      try {
        // Cargar datos completos del usuario desde la BD
        const userFromDB = await usersApi.getByFirebaseUid(u.uid)
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            userId: userFromDB.userId,
            firstName: userFromDB.firstName || null,
            lastName: userFromDB.lastName || null,
            phone: userFromDB.phone || null,
            address: userFromDB.address || null,
            firebaseUid: userFromDB.firebaseUid,
            authProvider: userFromDB.authProvider,
            emailVerified: userFromDB.emailVerified,
            photoUrl: userFromDB.photoUrl || null,
            createdAt: userFromDB.createdAt,
          },
        })
      } catch {
        // Si no existe en BD, usar datos de Firebase
        const [firstName, ...lastNameParts] = (u.displayName || '').split(' ')
        const lastName = lastNameParts.join(' ')
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            firstName: firstName || null,
            lastName: lastName || null,
          },
        })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  loginWithGoogle: async (): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await loginWithGoogleFn()
      try {
        // Cargar datos completos del usuario desde la BD
        const userFromDB = await usersApi.getByFirebaseUid(u.uid)
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            userId: userFromDB.userId,
            firstName: userFromDB.firstName || null,
            lastName: userFromDB.lastName || null,
            phone: userFromDB.phone || null,
            address: userFromDB.address || null,
            firebaseUid: userFromDB.firebaseUid,
            authProvider: userFromDB.authProvider,
            emailVerified: userFromDB.emailVerified,
            photoUrl: userFromDB.photoUrl || null,
            createdAt: userFromDB.createdAt,
          },
        })
      } catch {
        // Si no existe en BD, usar datos de Firebase
        const [firstName, ...lastNameParts] = (u.displayName || '').split(' ')
        const lastName = lastNameParts.join(' ')
        set({
          user: {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            photoURL: u.photoURL ?? null,
            firstName: firstName || null,
            lastName: lastName || null,
          },
        })
      }
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
