import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const UserResponseSchema = z.object({
  userId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  firebaseUid: z.string(),
  authProvider: z.string(),
  emailVerified: z.boolean(),
  photoUrl: z.string().nullable(),
  createdAt: z.string(),
})

export const UserCreateRequestSchema = z.object({
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    ),
  phone: z.string().regex(/^9\d{8}$/, 'Phone number must have 9 digits and start with 9'),
  address: z.string().max(255),
})

export const UserUpdateRequestSchema = z.object({
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  phone: z.string().regex(/^9\d{8}$/, 'Phone number must have 9 digits and start with 9'),
  address: z.string().max(255),
})

export const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    ),
})

export type UserResponse = z.infer<typeof UserResponseSchema>
export type UserCreateRequest = z.infer<typeof UserCreateRequestSchema>
export type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>
