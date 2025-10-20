import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'

import { getAuthClient, getGoogleProvider } from './client'

export type AuthUser = Pick<FirebaseUser, 'uid' | 'email' | 'displayName' | 'photoURL'>

export async function loginWithEmail(email: string, password: string): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const u = cred.user
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
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL }
}

export async function loginWithGoogle(): Promise<AuthUser> {
  const auth = getAuthClient()
  const cred = await signInWithPopup(auth, getGoogleProvider())
  const u = cred.user
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
