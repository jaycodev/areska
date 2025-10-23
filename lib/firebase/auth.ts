import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'

import { usersApi } from '@/lib/api/users'

import { getAuthClient, getGithubProvider, getGoogleProvider } from './client'

export type AuthUser = Pick<FirebaseUser, 'uid' | 'email' | 'displayName' | 'photoURL'>

function splitName(displayName?: string): { firstName: string; lastName: string } {
  const name = (displayName ?? '').trim()
  if (!name) return { firstName: 'Usuario', lastName: 'Firebase' }
  const parts = name.split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function detectProviderFromUser(u: FirebaseUser, fallback: string): string {
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

async function syncUserToBackend(u: FirebaseUser, authProvider: string, maxRetries = 3) {
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

  if (!payload.email) return

  let lastError: unknown
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await usersApi.createFromFirebase(payload)

      try {
        const user = await usersApi.getByFirebaseUid(u.uid)
        if (user?.userId) {
          return
        }
      } catch {}
    } catch (err) {
      lastError = err
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
      }
    }
  }

  try {
    await deleteUser(u)
    console.error('Usuario borrado de Firebase debido a error en BD:', lastError)
  } catch (deleteError) {
    console.error('Error al borrar usuario de Firebase:', deleteError)
  }

  throw new Error('No se pudo crear el usuario en la base de datos')
}

export async function loginWithEmail(email: string, password: string): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const u = cred.user
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
  await syncUserToBackend(u, 'password')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function loginWithGoogle(): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithPopup(auth, getGoogleProvider())
  const u = cred.user
  await syncUserToBackend(u, 'google')
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function loginWithGithub(): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithPopup(auth, getGithubProvider())
  const u = cred.user
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

export async function syncCurrentUserWithBackend(
  fallbackProvider: string = 'password'
): Promise<void> {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await syncUserToBackend(u, fallbackProvider)
}

export async function updateProfileAndSync(
  displayName: string,
  fallbackProvider: string = 'password'
) {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await updateProfile(u, { displayName })
  await syncUserToBackend(u, fallbackProvider)
}

export async function updatePhotoAndSync(photoURL: string, fallbackProvider: string = 'password') {
  const auth = getAuthClient()
  const u = auth.currentUser
  if (!u) return
  await updateProfile(u, { photoURL })
  await syncUserToBackend(u, fallbackProvider)
}
