export interface FiltersModel {
  page?: number
  limit?: number
  sort_by_price?: string | (string | null)[]
  category_id?: number
  sort_by_date?: string | (string | null)[]
  category_name?: string
  min_price?: number
  max_price?: number
  is_promotion?: boolean
  is_freeship?: boolean
  keyword?: string | (string | null)[]
}
