import path from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  output: "export", // xuất HTML tĩnh vào thư mục /out để đưa lên GitHub Pages
  trailingSlash: true, // /san-pham/ -> san-pham/index.html, GitHub Pages phục vụ đúng
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
