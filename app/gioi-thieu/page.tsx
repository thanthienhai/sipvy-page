import Image from "next/image"
import type { Metadata } from "next"
import { Heart, Leaf, Users, Award, MapPin, Phone, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CERTIFICATIONS, PROOF_STATS, SITE_CONTACT, TEAM_MEMBERS, publishable } from "@/lib/site-config"
import PageHeader from "@/components/storefront/page-header"
import NewsletterSection from "@/components/storefront/newsletter-section"
import SectionHeading from "@/components/storefront/section-heading"
import StorefrontContainer from "@/components/storefront/storefront-container"
import StorySection from "@/components/storefront/story-section"
import TrustSection from "@/components/storefront/trust-section"
import { MarketingButtonLink } from "@/components/storefront/marketing-link"

export const metadata: Metadata = {
  title: "Về SIPVY | Trà Việt thượng hạng",
  description: "Câu chuyện SIPVY và hành trình tuyển chọn trà Việt thượng hạng từ những vùng trà đặc sản.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    title: "Về SIPVY | Trà Việt thượng hạng",
    description: "Câu chuyện thương hiệu trà Việt SIPVY.",
    url: "/gioi-thieu",
  },
}

const coreValues = [
  { icon: Leaf, title: "Chất Lượng", description: "Cam kết mang đến sản phẩm trà chất lượng cao nhất" },
  { icon: Heart, title: "Tận Tâm", description: "Phục vụ khách hàng với sự tận tâm và chuyên nghiệp" },
  { icon: Users, title: "Đoàn Kết", description: "Xây dựng đội ngũ đoàn kết và hỗ trợ lẫn nhau" },
  { icon: Award, title: "Uy Tín", description: "Xây dựng thương hiệu uy tín và đáng tin cậy" },
]

const sourcingProcess = [
  { title: "Khảo sát vùng trồng", description: "Tìm hiểu và lựa chọn những vùng trồng trà chất lượng cao" },
  { title: "Chọn lọc nguyên liệu", description: "Kiểm tra và chọn lọc từng lá trà theo tiêu chuẩn nghiêm ngặt" },
  { title: "Chế biến truyền thống", description: "Áp dụng phương pháp chế biến truyền thống kết hợp công nghệ" },
  { title: "Kiểm định chất lượng", description: "Kiểm tra chất lượng cuối cùng trước khi đưa ra thị trường" },
]

export default function AboutPage() {
  // Figures, people and certificates are shown only once verified (lib/site-config.ts).
  const stats = publishable(Object.values(PROOF_STATS))
  const team = publishable(TEAM_MEMBERS)
  const certifications = publishable(CERTIFICATIONS)

  return (
    <>
      <PageHeader
        variant="subtle"
        breadcrumbs={[{ href: "/", label: "Trang chủ" }, { label: "Giới thiệu" }]}
        title="Về SIPVY"
        description="Câu chuyện về hành trình mang hương vị trà Việt Nam đến với thế giới"
      />

      {/* ============ STORY ============ */}
      <StorySection className="bg-white">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Hành trình của SIPVY" className="mb-6" />
            <p className="mb-4 leading-relaxed text-stone-700">
              SIPVY được thành lập với sứ mệnh mang đến những tách trà thượng hạng nhất từ các vùng đất nổi tiếng
              của Việt Nam. Chúng tôi tin rằng trà không chỉ là thức uống, mà còn là cầu nối văn hóa, là nghệ thuật
              sống và là cách để con người kết nối với nhau.
            </p>
            <p className="mb-6 leading-relaxed text-stone-700">
              Từ những cây trà cổ thụ hàng trăm năm tuổi ở Hà Giang, đến những búp trà non tơ ở Thái Nguyên,
              mỗi sản phẩm của SIPVY đều được chọn lọc kỹ lưỡng và chế biến theo phương pháp truyền thống
              kết hợp với công nghệ hiện đại.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <MarketingButtonLink
                href="/san-pham"
                label="Khám phá sản phẩm"
                location="about_hero"
                className="bg-green-800 text-white hover:bg-green-900"
              >
                Khám phá sản phẩm
              </MarketingButtonLink>
              <MarketingButtonLink
                href="/lien-he"
                label="Liên hệ với chúng tôi"
                location="about_hero"
                variant="outline"
                className="border-green-200 text-green-800 hover:bg-green-50"
              >
                Liên hệ với chúng tôi
              </MarketingButtonLink>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-lg md:h-[400px]">
            <Image
              src="/banner/hieu-ve-tra.jpg"
              alt="Vườn trà SIPVY"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </StorySection>

      {/* ============ MISSION & VISION ============ */}
      <StorySection title="Sứ mệnh & tầm nhìn" className="bg-stone-50">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-green-200">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Heart className="h-6 w-6 text-green-700" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-xl font-medium text-green-900">Sứ Mệnh</h3>
              <p className="leading-relaxed text-stone-700">
                Mang đến những sản phẩm trà chất lượng cao nhất, bảo tồn và phát huy giá trị văn hóa trà
                Việt Nam, đồng thời tạo ra những trải nghiệm thưởng trà đáng nhớ cho khách hàng trên toàn thế giới.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Leaf className="h-6 w-6 text-green-700" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-xl font-medium text-green-900">Tầm Nhìn</h3>
              <p className="leading-relaxed text-stone-700">
                Trở thành thương hiệu trà Việt Nam hàng đầu được yêu thích và tin tưởng trên thị trường quốc tế,
                góp phần nâng tầm vị thế của trà Việt Nam trên bản đồ trà thế giới.
              </p>
            </CardContent>
          </Card>
        </div>
      </StorySection>

      {/* ============ CORE VALUES ============ */}
      <TrustSection title="Giá trị cốt lõi" className="bg-white">
        <ul className="grid gap-6 md:grid-cols-4">
          {coreValues.map((value) => (
            <li key={value.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <value.icon className="h-8 w-8 text-green-700" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-medium text-green-900">{value.title}</h3>
              <p className="text-sm text-stone-600">{value.description}</p>
            </li>
          ))}
        </ul>
      </TrustSection>

      {/* ============ TEAM (only verified members) ============ */}
      {team.length > 0 && (
        <TrustSection title="Đội ngũ SIPVY" className="bg-stone-50">
          <ul className="grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <li key={member.name}>
                <Card className="h-full border-green-200 text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                      <Users className="h-12 w-12 text-green-700" aria-hidden="true" />
                    </div>
                    <h3 className="mb-1 font-medium text-green-900">{member.name}</h3>
                    <p className="mb-3 text-sm text-green-800">{member.position}</p>
                    <p className="text-sm text-stone-600">{member.description}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </TrustSection>
      )}

      {/* ============ SOURCING PROCESS ============ */}
      <TrustSection title="Quy trình chọn lọc trà" className="bg-green-50">
        <ol className="grid gap-6 md:grid-cols-4">
          {sourcingProcess.map((step, index) => (
            <li key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 font-bold text-white" aria-hidden="true">
                {index + 1}
              </div>
              <h3 className="mb-2 font-medium text-green-900">{step.title}</h3>
              <p className="text-sm text-stone-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </TrustSection>

      {/* ============ VERIFIED FIGURES / CERTIFICATES (hidden until real data exists) ============ */}
      {(stats.length > 0 || certifications.length > 0) && (
        <TrustSection title="SIPVY trong những con số" className="bg-white">
          {stats.length > 0 && (
            <dl className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dd className="mb-2 text-3xl font-bold text-green-800">{stat.value}</dd>
                  <dt className="text-sm text-stone-600">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
          {certifications.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert) => (
                <li key={cert.label}>
                  <Badge variant="outline" className="border-green-200 px-4 py-2 text-green-800">
                    <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                    {cert.label}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </TrustSection>
      )}

      <NewsletterSection source="gioi-thieu" />

      {/* ============ CONTACT CTA ============ */}
      <section className="storefront-section">
        <StorefrontContainer>
          <div className="rounded-xl bg-green-800 p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-medium">Kết nối với SIPVY</h2>
            <p className="mb-6 text-green-50">
              Hãy cùng chúng tôi lan tỏa văn hóa trà Việt Nam đến khắp nơi trên thế giới
            </p>
            <ul className="flex flex-col justify-center gap-4 sm:flex-row">
              <li className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href={SITE_CONTACT.hotlineHref} className="underline-offset-2 hover:underline">{SITE_CONTACT.hotline}</a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="underline-offset-2 hover:underline">{SITE_CONTACT.email}</a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Phường Việt Yên, Bắc Ninh</span>
              </li>
            </ul>
          </div>
        </StorefrontContainer>
      </section>
    </>
  )
}
