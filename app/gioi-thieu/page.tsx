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
  title: "Về SIPVY | Trà Việt cho người trẻ",
  description: "Câu chuyện SIPVY: mang trà Việt đến gần hơn với người trẻ, dễ pha, dễ uống, hợp nhịp sống mỗi ngày.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    title: "Về SIPVY | Trà Việt cho người trẻ",
    description: "Câu chuyện thương hiệu trà Việt SIPVY.",
    url: "/gioi-thieu",
  },
}

const coreValues = [
  { icon: Leaf, title: "Chất Lượng", description: "Chọn lọc kỹ, mô tả đúng sản phẩm, nói đúng những gì mình có" },
  { icon: Heart, title: "Tận Tâm", description: "Lắng nghe, tư vấn gần gũi, hỗ trợ khi bạn cần" },
  { icon: Users, title: "Gần Gũi", description: "Nói chuyện đơn giản, dễ hiểu, không cần rành về trà" },
  { icon: Award, title: "Minh Bạch", description: "Thông tin sản phẩm, giá và chính sách rõ ràng" },
]

const sourcingProcess = [
  { title: "Tìm hiểu vùng trà", description: "Tìm hiểu và lựa chọn các vùng trà Việt Nam" },
  { title: "Chọn lọc nguyên liệu", description: "Kiểm tra và chọn lọc nguyên liệu theo tiêu chí của SIPVY" },
  { title: "Chế biến", description: "Chế biến theo từng dòng trà, từ trà sao đến trà ướp hương" },
  { title: "Kiểm định chất lượng", description: "Kiểm tra lại trước khi đóng gói và giao đến bạn" },
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
        description="Câu chuyện về việc mang hương vị trà Việt đến gần hơn với người trẻ"
      />

      {/* ============ STORY ============ */}
      <StorySection className="bg-white">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Hành trình của SIPVY" className="mb-6" />
            <p className="mb-4 leading-relaxed text-stone-700">
              SIPVY được thành lập với mong muốn mang trà Việt đến gần hơn với người trẻ: dễ pha, dễ uống và hợp với
              nhịp sống mỗi ngày. Chúng tôi tin trà không cần nghi thức cầu kỳ, chỉ cần một khoảng nghỉ nhỏ để bạn
              nhấp một ngụm và kết nối với người bên cạnh.
            </p>
            <p className="mb-6 leading-relaxed text-stone-700">
              Từ trà cổ thụ ở Hà Giang đến trà búp ở Thái Nguyên, mỗi sản phẩm của SIPVY được chọn lọc từ các vùng
              trà Việt Nam, kèm hướng dẫn pha rõ ràng để bạn tự pha được tách trà vừa gu.
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
              alt="Đồi trà xanh"
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
                Mang trà Việt đến gần hơn với người trẻ bằng sản phẩm dễ pha, dễ uống và cách nói chuyện
                gần gũi, để thưởng trà trở thành một thói quen nhẹ nhàng mỗi ngày.
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
                Trở thành thương hiệu trà Việt được người trẻ chọn uống mỗi ngày, góp phần để trà Việt
                có chỗ đứng trong thói quen của thế hệ mới.
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
              Có câu hỏi về trà hay về đơn hàng? Nhắn SIPVY, tụi mình trả lời bạn sớm nhất có thể
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
