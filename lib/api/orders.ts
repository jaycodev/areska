import { apiClient } from './client'

export interface OrderItem {
  id: number
  orderId: number
  product: {
    id: number
    name: string
  }
  quantity: number
  unitPrice: number
  priceTotal: number
}

export interface OrderResponse {
  id: number
  userId: number
  orderDate: string
  status: string
  total: number
  pickupMethod: string
  items: OrderItem[]
}

export const ordersApi = {
  async getByFirebaseUid(firebaseUid: string): Promise<OrderResponse[]> {
    return apiClient.get<OrderResponse[]>(`/orders/user-by-firebase-uid/${firebaseUid}`)
  },
}
