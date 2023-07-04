const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
}

module.exports = withContentlayer(nextConfig)
