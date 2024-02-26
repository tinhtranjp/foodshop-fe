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
  shipping_date: string
  cart_items: cart_items[]
}

export interface cart_items {
  product_id: number | undefined
  total_money: number
  quantity: number
}


export interface OrderResponse {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  note?: string
  totalMoney: number
  shippingMethod: string
  shippingAddress: string
  paymentMethod: string
  shippingDate: string
  discount: number
  status: string
  trackingNumber?: string
  orderDate: string
  orderDetails: orderDetails
  user: {
    id: number
  }
}

interface orderDetails {
  map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
  id: number 
  price: number 
  quantity: number 
  totalMone: number
  product: {
    id: number
  }
}