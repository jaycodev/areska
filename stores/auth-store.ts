'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { create } from 'zustand'

import { usersApi } from '@/lib/api/users'
import {
  changeEmail,
  changePassword,
  loginWithEmail,
  loginWithGoogle as loginWithGoogleFn,
  logoutFirebase,
  requestPasswordReset,
  signupWithEmail,
  updateProfileAndSync,
} from '@/lib/firebase/auth'
import { getAuthClient } from '@/lib/firebase/client'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  firebaseUid: string
  authProvider: string
  emailVerified: boolean
  photoUrl: string | null
  createdAt: string
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
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  changeEmail: (currentPassword: string, newEmail: string) => Promise<void>
  updateProfile: (
    firstName: string,
    lastName: string,
    phone: string,
    address?: string
  ) => Promise<void>
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
            const userFromDB = await usersApi.getByFirebaseUid(u.uid)
            set({
              user: {
                id: userFromDB.id,
                firstName: userFromDB.firstName,
                lastName: userFromDB.lastName,
                email: userFromDB.email,
                phone: userFromDB.phone,
                address: userFromDB.address,
                firebaseUid: userFromDB.firebaseUid,
                authProvider: userFromDB.authProvider,
                emailVerified: userFromDB.emailVerified,
                photoUrl: userFromDB.photoUrl,
                createdAt: userFromDB.createdAt,
              },
              isLoadingInitial: false,
            })
          } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('[Auth] Error al cargar datos del usuario desde BD:', e)
            }
            set({ user: null, isLoadingInitial: false })
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

      let userFromDB: User | null = null
      let attempts = 0
      const maxAttempts = 5

      while (!userFromDB && attempts < maxAttempts) {
        try {
          const data = await usersApi.getByFirebaseUid(u.uid)
          userFromDB = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            firebaseUid: data.firebaseUid,
            authProvider: data.authProvider,
            emailVerified: data.emailVerified,
            photoUrl: data.photoUrl,
            createdAt: data.createdAt,
          }
        } catch {
          attempts++
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 500 * attempts))
          }
        }
      }

      if (!userFromDB) {
        await logoutFirebase()
        set({ user: null })
        throw new Error('No se pudo cargar los datos del usuario después de varias tentativas')
      }

      set({ user: userFromDB })
    } catch (error) {
      set({ user: null })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async (email: string, password: string, name?: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await signupWithEmail(email, password, name)

      let userFromDB: User | null = null
      let attempts = 0
      const maxAttempts = 5

      while (!userFromDB && attempts < maxAttempts) {
        try {
          const data = await usersApi.getByFirebaseUid(u.uid)
          userFromDB = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            firebaseUid: data.firebaseUid,
            authProvider: data.authProvider,
            emailVerified: data.emailVerified,
            photoUrl: data.photoUrl,
            createdAt: data.createdAt,
          }
        } catch {
          attempts++
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 500 * attempts))
          }
        }
      }

      if (!userFromDB) {
        await logoutFirebase()
        set({ user: null })
        throw new Error('No se pudo cargar los datos del usuario después de varias tentativas')
      }

      set({ user: userFromDB })
    } catch (error) {
      set({ user: null })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  loginWithGoogle: async (): Promise<void> => {
    set({ isLoading: true })
    try {
      const u = await loginWithGoogleFn()

      let userFromDB: User | null = null
      let attempts = 0
      const maxAttempts = 5

      while (!userFromDB && attempts < maxAttempts) {
        try {
          const data = await usersApi.getByFirebaseUid(u.uid)
          userFromDB = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            firebaseUid: data.firebaseUid,
            authProvider: data.authProvider,
            emailVerified: data.emailVerified,
            photoUrl: data.photoUrl,
            createdAt: data.createdAt,
          }
        } catch {
          attempts++
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 500 * attempts))
          }
        }
      }

      if (!userFromDB) {
        await logoutFirebase()
        set({ user: null })
        throw new Error('No se pudo cargar los datos del usuario después de varias tentativas')
      }

      set({ user: userFromDB })
    } catch (error) {
      set({ user: null })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  resetPasswordEmail: async (email: string): Promise<void> => {
    await requestPasswordReset(email)
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    set({ isLoading: true })
    try {
      await changePassword(currentPassword, newPassword)
    } finally {
      set({ isLoading: false })
    }
  },

  changeEmail: async (currentPassword: string, newEmail: string): Promise<void> => {
    set({ isLoading: true })
    try {
      const auth = getAuthClient()
      const currentUser = auth.currentUser
      if (!currentUser) throw new Error('Usuario no autenticado')

      await changeEmail(currentPassword, newEmail)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      await currentUser.reload()

      const userFromDB = await usersApi.updateEmail(currentUser.uid, { email: newEmail })
      const updatedUser: User = {
        id: userFromDB.id,
        firstName: userFromDB.firstName,
        lastName: userFromDB.lastName,
        email: userFromDB.email,
        phone: userFromDB.phone,
        address: userFromDB.address,
        firebaseUid: userFromDB.firebaseUid,
        authProvider: userFromDB.authProvider,
        emailVerified: userFromDB.emailVerified,
        photoUrl: userFromDB.photoUrl,
        createdAt: userFromDB.createdAt,
      }
      set({ user: updatedUser })
    } finally {
      set({ isLoading: false })
    }
  },

  updateProfile: async (
    firstName: string,
    lastName: string,
    phone: string,
    address?: string
  ): Promise<void> => {
    set({ isLoading: true })
    try {
      const auth = getAuthClient()
      const currentUser = auth.currentUser
      if (!currentUser) throw new Error('Usuario no autenticado')

      const displayName = `${firstName} ${lastName}`.trim()
      await updateProfileAndSync(displayName, phone, address)

      const userFromDB = await usersApi.updateProfile(currentUser.uid, {
        firstName,
        lastName,
        phone,
        address,
      })

      const updatedUser: User = {
        id: userFromDB.id,
        firstName: userFromDB.firstName,
        lastName: userFromDB.lastName,
        email: userFromDB.email,
        phone: userFromDB.phone,
        address: userFromDB.address,
        firebaseUid: userFromDB.firebaseUid,
        authProvider: userFromDB.authProvider,
        emailVerified: userFromDB.emailVerified,
        photoUrl: userFromDB.photoUrl,
        createdAt: userFromDB.createdAt,
      }
      set({ user: updatedUser })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async (): Promise<void> => {
    await logoutFirebase()
    set({ user: null })
  },
}))
