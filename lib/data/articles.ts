// Bản tĩnh chưa có mục tin tức: trả về rỗng để các trang liên quan hiện trạng thái trống.
export interface ArticleSummary {
  slug: string
  title: string
  excerpt?: string | null
  image: string
  category: string
  readTime: number
  publishedAt?: string | null
}
export const getRecentArticles = (_limit = 3): ArticleSummary[] => []
