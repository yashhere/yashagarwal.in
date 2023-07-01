const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
}

module.exports = withContentlayer(nextConfig)
