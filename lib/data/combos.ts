// Bản tĩnh chưa bán combo riêng: danh sách rỗng (trang hiện trạng thái "đang cập nhật").
export interface StorefrontCombo {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  originalPrice: number
  inStock: boolean
  availableQuantity: number
  featured: boolean
}
export const getPublishedCombos = (_limit = 6): StorefrontCombo[] => []
