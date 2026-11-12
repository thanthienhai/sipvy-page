import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"

import { Providers } from "@/components/providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import ClientOnlyHtml from "@/components/ClientOnlyHtml"
import { Toaster } from "@/components/ui/toaster"
import { SITE_URL, withBase } from "@/lib/config"

const inter = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SIPVY - Trà Việt cho người trẻ | Cổ Thụ, Oolong, Sen Tây Hồ",
    template: "%s | SIPVY",
  },
  description:
    "SIPVY - Trà Việt cho người trẻ: dễ pha, dễ uống, hợp nhịp sống mỗi ngày. Trà cổ thụ, oolong, sen Tây Hồ, trà lài. Giao hàng toàn quốc, miễn phí từ 500.000₫.",
  authors: [{ name: "SIPVY" }],
  creator: "SIPVY",
  publisher: "SIPVY",
  applicationName: "SIPVY",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "SIPVY",
    title: "SIPVY - Trà Việt cho người trẻ",
    description: "Trà Việt dễ pha, dễ uống, hợp nhịp sống mỗi ngày: trà cổ thụ, oolong, sen Tây Hồ. Giao hàng toàn quốc.",
    images: [{ url: withBase("/og.png"), width: 1200, height: 630, alt: "SIPVY - Trà Việt cho người trẻ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIPVY - Trà Việt cho người trẻ",
    description: "Trà Việt dễ pha, dễ uống: cổ thụ, oolong, sen Tây Hồ.",
    images: [withBase("/og.png")],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <div className="storefront-shell min-h-screen flex flex-col scroll-smooth mdl-js">
            <ClientOnlyHtml />
            <a
              href="#main-content"
              className="skip-link rounded-md bg-white px-4 py-3 font-medium text-green-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              Bỏ qua đến nội dung chính
            </a>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  )
}
