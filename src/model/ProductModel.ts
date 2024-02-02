export interface ResponProduct {
  products: ProductModel[]
  pagination: PaginationModel
}

export interface ProductModel {
  id: number
  name: string
  description: string
  listedPrice: number
  price: number
  quantity: number
  category_id: number
  product_infor_id: number
  thumbnail: string
}

export interface PaginationModel {
  total: number
  page: number
  limit: number
}

export interface ProductDetail {
  category: {
    id: number
    name: string
  }
  name: string
  description: string
  discount: number
  id: number
  isFreeShip: boolean
  isPromotion: boolean
  listedPrice: number
  price: number
  quantity: number
  thumbnail: string
}

export interface listProductImgModel {
  image_url: string
  is_thumbnail: string
}
