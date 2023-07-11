const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // allow next/image to serve remote images from safelisted domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/yashagarwal/**",
      },
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
}

module.exports = withContentlayer(nextConfig)
