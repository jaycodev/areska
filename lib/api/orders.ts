import { apiClient } from './client' // <--- Asegúrate de que esta importación sea correcta para tu cliente HTTP

// -----------------------------------------------------
// TIPOS DE DATOS (Ajusta estos tipos para que coincidan con tu backend OrderResponse)
// -----------------------------------------------------
export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  subTotal: number
}

export interface OrderResponse {
  id: number
  userId: number // Nota: Este es el ID numérico interno, pero lo obtendremos por firebaseUid
  orderDate: string
  status: string
  total: number
  pickupMethod: string
  items: OrderItem[]
}

// -----------------------------------------------------
// FUNCIÓN DE PETICIÓN
// -----------------------------------------------------
/**
 * Obtiene la lista de órdenes para un usuario específico usando su UID de Firebase.
 * @param firebaseUid El UID de Firebase del usuario logueado.
 * @returns Una promesa con la lista de órdenes.
 */
export async function fetchOrdersByFirebaseUid(firebaseUid: string): Promise<OrderResponse[]> {
  try {
    // Usamos el endpoint que creamos en el backend que acepta el String UID
    return await apiClient.get<OrderResponse[]>(
      `/orders/user-by-firebase-uid/${firebaseUid}`
    )
  } catch (error) {
    // Captura el error para manejar el caso de "no hay órdenes" o problemas de red
    if (error instanceof Error) {
      throw new Error(`Error al cargar las órdenes: ${error.message}`)
    }
    // Si la API devuelve un estado 204 (NO CONTENT), la promesa se puede resolver con []
    // o el cliente API debe manejarlo. Aquí asumimos que lanza un error si falla.
    throw new Error('No se pudieron cargar las órdenes. Inténtalo de nuevo.')
  }
}
