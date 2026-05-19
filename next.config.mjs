/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep native Node packages external for API route (Puppeteer, Formidable, Nodemailer)
  serverExternalPackages: [
    "puppeteer",
    "puppeteer-core",
    "@sparticuz/chromium",
    "formidable",
    "nodemailer",
    "@vercel/blob",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "1gb",
    },
    // Local multipart uploads — up to ~800 MB total (8 × 100 MB files)
    middlewareClientMaxBodySize: "1gb",
  },
}

export default nextConfig
