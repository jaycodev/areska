import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'

import { getAuthClient, getGoogleProvider, getGithubProvider } from './client'
import { usersApi } from '@/lib/api/users'

export type AuthUser = Pick<FirebaseUser, 'uid' | 'email' | 'displayName' | 'photoURL'>

function splitName(displayName?: string): { firstName: string; lastName: string } {
  const name = (displayName ?? '').trim()
  if (!name) return { firstName: 'Usuario', lastName: 'Firebase' }
  const parts = name.split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function detectProviderFromUser(u: FirebaseUser, fallback: string): string {
  // Si hay providerData, tomamos el primero; si no, usamos fallback
  const p = u.providerData?.[0]?.providerId
  if (p) {
    if (p.includes('google')) return 'google'
    if (p.includes('github')) return 'github'
    if (p.includes('facebook')) return 'facebook'
    if (p.includes('apple')) return 'apple'
    if (p.includes('password')) return 'password'
    return p
  }
  return fallback
}

async function syncUserToBackend(u: FirebaseUser, authProvider: string) {
  // Construye el payload esperado por /users/firebase
  const { firstName, lastName } = splitName(u.displayName ?? undefined)
  const payload = {
    firebaseUid: u.uid,
    email: u.email ?? '',
    firstName,
    lastName,
    phone: undefined as string | undefined,
    address: undefined as string | undefined,
    authProvider: detectProviderFromUser(u, authProvider),
    emailVerified: !!u.emailVerified,
    photoUrl: u.photoURL ?? undefined,
  }

  // Sólo intentamos si tenemos email; el backend valida @NotBlank email
  if (!payload.email) return

  try {
    await usersApi.createFromFirebase(payload)
  } catch (err) {
    // No bloqueamos el flujo de autenticación del front si el backend falla; log únicamente
    console.error('usersApi.createFromFirebase failed:', err)
  }
}

export async function loginWithEmail(email: string, password: string): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const u = cred.user
  // Sincroniza (crea/actualiza) usuario en backend en primer login o subsiguientes (idempotente)
  await syncUserToBackend(u, 'password')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function signupWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  const u = cred.user
  // Registra inmediatamente el usuario creado en el backend
  await syncUserToBackend(u, 'password')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function loginWithGoogle(): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithPopup(auth, getGoogleProvider())
  const u = cred.user
  // Sincroniza usuario en backend con proveedor google
  await syncUserToBackend(u, 'google')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function loginWithGithub(): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithPopup(auth, getGithubProvider())
  const u = cred.user
  // Sincroniza usuario en backend con proveedor github
  await syncUserToBackend(u, 'github')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const auth = getAuthClient()
  await sendPasswordResetEmail(auth, email)
}

export async function logoutFirebase(): Promise<void> {
  const auth = getAuthClient()
  await signOut(auth)
}

// Sincroniza el usuario actualmente autenticado con el backend (útil tras updateProfile)
export async function syncCurrentUserWithBackend(fallbackProvider: string = 'password'): Promise<void> {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await syncUserToBackend(u, fallbackProvider)
}

// Helper para actualizar displayName y sincronizar con backend en un solo paso
export async function updateProfileAndSync(displayName: string, fallbackProvider: string = 'password') {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await updateProfile(u, { displayName })
  await syncUserToBackend(u, fallbackProvider)
}

// Helper para actualizar photoURL y sincronizar con backend
export async function updatePhotoAndSync(photoURL: string, fallbackProvider: string = 'password') {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await updateProfile(u, { photoURL })
  await syncUserToBackend(u, fallbackProvider)
}
