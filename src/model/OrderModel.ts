export interface OrderModel {
  full_name?: string
  email?: string
  phone_number: string
  note?: string
  total_money?: string
  shipping_method: string
  shipping_address?: string
  tracking_number?: string
  payment_method: string
  user_id?: string
  year: string
  month: string
  day: string
  cart_items: cart_items[]
}

export interface cart_items {
  product_id: string
  total_money: number
  quantity: number
}
