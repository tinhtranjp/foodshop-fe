import { ProductDetail } from './ProductModel'

export interface CartItem {
  id: number | undefined
  product: ProductDetail | undefined
  quantity: number
}
