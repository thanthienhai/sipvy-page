// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  origin?: string
  shelfLife?: string
  storageInstructions?: string
  images: ProductImage[]
  category: ProductCategory
  weight: ProductWeight[]
  variants?: ProductVariant[]
  inStock: boolean
  stockQuantity: number
  specifications: ProductSpecification[]
  brewingInstructions: BrewingInstruction[]
  reviews: ProductReview[]
  relatedProducts: string[]
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface ProductVariant {
  id: string
  weight: string
  boxType: string
  sku: string
  price: number
  originalPrice?: number
  stockQuantity: number
  inStock: boolean
  status: 'ACTIVE' | 'INACTIVE' | string
}

/** @deprecated Use ProductVariant. Kept for compatibility with existing storefront components. */
export type ProductWeight = ProductVariant

export interface ProductSpecification {
  label: string
  value: string
  unit?: string
}

export interface BrewingInstruction {
  step: number
  instruction: string
  temperature?: string
  time?: string
}

export interface ProductReview {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  variantId: string
  /** @deprecated Legacy carts are normalized to variantId at the API boundary. */
  productWeightId?: string
  slug?: string
  name: string
  image: string
  price: number
  weight: string
  boxType?: string
  sku?: string
  comboId?: string
  comboSlug?: string
  comboItems?: { variantId: string; quantity: number }[]
  stockQuantity?: number
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  promoCode?: string
  discount?: number
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  addresses: Address[]
  preferences: UserPreferences
  createdAt: string
}

export interface Address {
  id: string
  name: string
  phone: string
  street: string
  ward: string
  district: string
  province: string
  isDefault: boolean
}

export interface UserPreferences {
  language: 'vi' | 'en'
  notifications: {
    email: boolean
    sms: boolean
    promotions: boolean
  }
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: CartItem[]
  shippingAddress: Address
  paymentMethod: PaymentMethod
  status: OrderStatus
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: string
  estimatedDelivery: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cod' | 'bank_transfer' | 'momo' | 'zalopay' | 'vnpay'

// Blog/News Types
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: Author
  category: ArticleCategory
  tags: string[]
  publishedAt: string
  featured: boolean
}

export interface Author {
  name: string
  avatar?: string
  bio?: string
}

export interface ArticleCategory {
  id: string
  name: string
  slug: string
}

// Contact Types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  productCount?: number
}

// Gift Types
export interface GiftProduct extends Product {
  giftWrapping: boolean
  customMessage: boolean
  deliveryDate?: string
  giftCategory: 'premium' | 'family' | 'corporate'
}
