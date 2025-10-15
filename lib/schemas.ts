import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string(),
  value: z.string(),
  description: z.string(),
})

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string(),
  category: z.string().optional(),
  badge: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  colors: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  sizes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
})

export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  image: z.string(),
  quantity: z.number().min(1),
})

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type User = z.infer<typeof UserSchema>
