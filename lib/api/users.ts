import type {
  ChangePasswordRequest,
  UserCreateRequest,
  UserResponse,
  UserUpdateRequest,
} from '@public/schemas/user-schema'

import { apiClient } from './client'

export interface UserCreateFromFirebaseRequest {
  firebaseUid: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  authProvider: string
  emailVerified: boolean
  photoUrl?: string
}

export const usersApi = {
  async getAll(): Promise<UserResponse[]> {
    return apiClient.get<UserResponse[]>('/users')
  },

  async getById(id: number): Promise<UserResponse> {
    return apiClient.get<UserResponse>(`/users/${id}`)
  },

  async create(payload: UserCreateRequest): Promise<void> {
    return apiClient.post<void>('/users', payload)
  },

  async createFromFirebase(payload: UserCreateFromFirebaseRequest): Promise<void> {
    return apiClient.post<void>('/users/firebase', payload)
  },

  async update(id: number, payload: UserUpdateRequest): Promise<void> {
    return apiClient.put<void>(`/users/${id}`, payload)
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`)
  },

  async changePassword(id: number, payload: ChangePasswordRequest): Promise<void> {
    return apiClient.put<void>(`/users/${id}/change-password`, payload)
  },
}
