import Link from 'next/link'
import { ShoppingBag, ArrowRight, Heart, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function EmptyCart() {
  const featuredCategories = [
    {
      name: 'Trà Cổ Thụ',
      description: 'Hương vị đậm đà từ những cây trà hàng trăm năm tuổi',
      href: '/san-pham?category=tra-co-thu',
      icon: '🌿'
    },
    {
      name: 'Trà Oolong',
      description: 'Trà bán lên men với hương vị độc đáo',
      href: '/san-pham?category=tra-oolong',
      icon: '🍃'
    },
    {
      name: 'Trà Sen',
      description: 'Hương thơm tinh tế của hoa sen Tây Hồ',
      href: '/san-pham?category=tra-sen',
      icon: '🪷'
    },
    {
      name: 'Trà cho GenZ',
      description: 'Hương vị hiện đại cho thế hệ trẻ',
      href: '/tra-cho-genz',
      icon: '🧋'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-green-600" />
        </div>
        
        <h2 id="cart-empty-heading" tabIndex={-1} className="text-2xl font-sans text-green-900 font-medium tracking-tight mb-3 focus:outline-none">
          Giỏ hàng của bạn đang trống
        </h2>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Hãy khám phá bộ sưu tập trà thượng hạng của SIPVY và thêm những sản phẩm yêu thích vào giỏ hàng
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button asChild className="bg-green-800 hover:bg-green-900 text-white">
            <Link href="/san-pham">
              Khám phá sản phẩm
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
            <Link href="/qua-tang">Xem quà tặng</Link>
          </Button>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <h3 className="text-xl font-sans text-green-900 font-medium tracking-tight mb-6">
          Danh mục nổi bật
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCategories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="h-full hover:shadow-md transition-shadow border-green-200 hover:border-green-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h4 className="font-medium text-green-900 mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-green-900 mb-4">
          Tại sao chọn SIPVY?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-1">Chất lượng cao cấp</h4>
            <p className="text-gray-600 text-center">
              Trà được chọn lọc kỹ lưỡng từ những vùng trồng trà nổi tiếng
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-1">Giao hàng nhanh</h4>
            <p className="text-gray-600 text-center">
              Phí vận chuyển được tính và hiển thị khi thanh toán
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-1">Hỗ trợ tận tâm</h4>
            <p className="text-gray-600 text-center">
              Đội ngũ tư vấn chuyên nghiệp, hỗ trợ 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Cần hỗ trợ? Liên hệ với chúng tôi:</p>
        <p className="mt-1">
          📞 <span className="font-medium">0362 023 048</span> | 
          ✉️ <span className="font-medium">sipvy@sipvy.com</span>
        </p>
      </div>
    </div>
  )
}
