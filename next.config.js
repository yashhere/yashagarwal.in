const path = require("path")
const fsp = require("fs/promises")
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // allow next/image to serve remote images from safelisted domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/yashagarwal/**",
      },
    ],
  },
  headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return Redirects
  },
}

const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

// redirect old blog urls to new blog
const Redirects = [
  {
    source: "/posts/2022/12/2022-the-year-of-plentiful",
    destination: "/blog/2022-the-year-of-plentiful",
    permanent: true,
  },
  {
    source: "/posts/2022/08/i-got-engaged",
    destination: "/blog/i-got-engaged",
    permanent: true,
  },
  {
    source: "/posts/2022/01/isro-interview-experience-and-takeaways",
    destination: "/blog/isro-interview-experience-and-takeaways",
    permanent: true,
  },
  {
    source: "/posts/2022/01/why-i-decided-to-not-join-isro",
    destination: "/blog/why-i-decided-to-not-join-isro",
    permanent: true,
  },
  {
    source: "/posts/2022/01/things-i-learned-in-cisco",
    destination: "/blog/things-i-learned-in-cisco",
    permanent: true,
  },
  {
    source: "/posts/2022/01/2021-a-bullish-year",
    destination: "/blog/2021-a-bullish-year",
    permanent: true,
  },
  {
    source: "/posts/2021/06/25-it-is",
    destination: "/blog/25-it-is",
    permanent: true,
  },
  {
    source: "/posts/2021/06/thoughts-on-the-family-man-2",
    destination: "/blog/thoughts-on-the-family-man-2",
    permanent: true,
  },
  {
    source: "/posts/2021/01/looking-back-at-2020",
    destination: "/blog/looking-back-at-2020",
    permanent: true,
  },
  {
    source: "/posts/2020/09/two-years-at-cisco",
    destination: "/blog/two-years-at-cisco",
    permanent: true,
  },
  {
    source:
      "/posts/2020/05/cassandra-a-decentralized-structured-storage-system",
    destination: "/blog/cassandra-a-decentralized-structured-storage-system",
    permanent: true,
  },
  {
    source: "/posts/2020/04/epidemic/gossip-protocols",
    destination: "/blog/epidemic-gossip-protocol",
    permanent: true,
  },
  {
    source: "/posts/2020/03/2019-year-in-review",
    destination: "/blog/2019-year-in-review",
    permanent: true,
  },
  {
    source:
      "/posts/2019/07/automatic-https-certs-using-godaddy-and-gitlab-apis",
    destination: "/blog/automatic-https-certs-using-godaddy-and-gitlab-apis",
    permanent: true,
  },
  {
    source: "/posts/2019/07/setting-up-modsecurity-on-ubuntu",
    destination: "/blog/setting-up-modsecurity-on-ubuntu",
    permanent: true,
  },
  {
    source: "/posts/2019/06/travelogue-chikmagalur",
    destination: "/blog/travelogue-chikmagalur",
    permanent: true,
  },
  {
    source: "/posts/2019/02/go-grpc-opa-a-perfect-union-part-3",
    destination: "/blog/go-grpc-opa-a-perfect-union-part-3",
    permanent: true,
  },
  {
    source: "/posts/2019/02/go-grpc-opa-a-perfect-union-part-2",
    destination: "/blog/go-grpc-opa-a-perfect-union-part-2",
    permanent: true,
  },
  {
    source: "/posts/2019/02/go-grpc-opa-a-perfect-union-part-1",
    destination: "/blog/go-grpc-opa-a-perfect-union-part-1",
    permanent: true,
  },
  {
    source: "/posts/2018/12/2018-year-in-review",
    destination: "/blog/2018-year-in-review",
    permanent: true,
  },
  {
    source: "/posts/2018/08/beginning-a-new-journey",
    destination: "/blog/beginning-a-new-journey",
    permanent: true,
  },
  {
    source: "/posts/2018/06/the-good-and-bad-about-csed-of-nit-c",
    destination: "/blog/the-good-and-bad-about-csed-of-nit-c",
    permanent: true,
  },
  {
    source: "/posts/2018/06/battery-notifications-in-i3",
    destination: "/blog/battery-notifications-in-i3",
    permanent: true,
  },
  {
    source: "/posts/2018/06/mistakes-that-i-made-in-nitc",
    destination: "/blog/mistakes-that-i-made-in-nitc",
    permanent: true,
  },
  {
    source:
      "/posts/2018/05/proxy-your-requests-to-the-backend-server-with-grunt",
    destination: "/blog/proxy-your-requests-to-the-backend-server-with-grunt",
    permanent: true,
  },
  {
    source: "/posts/2018/05/writing-drozer-modules",
    destination: "/blog/writing-drozer-modules",
    permanent: true,
  },
  {
    source: "/posts/2018/03/so-i-applied-for-gsoc",
    destination: "/blog/so-i-applied-for-gsoc",
    permanent: true,
  },
  {
    source: "/posts/2018/03/fossmeet18",
    destination: "/blog/fossmeet-18",
    permanent: true,
  },
  {
    source: "/posts/2018/03/deactivated-my-facebook-account",
    destination: "/blog/deactivated-my-facebook-account",
    permanent: true,
  },
  {
    source: "/posts/2018/03/develop-a-theme-for-hugo",
    destination: "/blog/develop-a-theme-for-hugo",
    permanent: true,
  },
  {
    source: "/posts/2018/02/my-new-domain",
    destination: "/blog/my-new-domain",
    permanent: true,
  },
  {
    source: "/posts/2018/02/syncing-time-on-windows-gnu/linux-dual-boot-setups",
    destination: "/blog/syncing-time-on-windows-gnu-linux-dual-boot-setups",
    permanent: true,
  },
  {
    source: "/posts/2018/01/why-a-sanskrit-shloka",
    destination: "/blog/why-a-sanskrit-shloka",
    permanent: true,
  },
  {
    source: "/posts/2018/01/arch-linux-installation-guide-part-2",
    destination: "/blog/arch-linux-installation-guide-part-2",
    permanent: true,
  },
  {
    source: "/posts/2018/01/arch-linux-installation-guide-part-1",
    destination: "/blog/arch-linux-installation-guide-part-1",
    permanent: true,
  },
  {
    source: "/posts/2018/01/my-own-configuration-manager",
    destination: "/blog/my-own-configuration-manager",
    permanent: true,
  },
  {
    source: "/posts/2017/12/2017-the-best-till-now",
    destination: "/blog/2017-the-best-till-now",
    permanent: true,
  },
  {
    source: "/posts/2017/12/setting-up-ssh-agent-in-i3",
    destination: "/blog/setting-up-ssh-agent-in-i3",
    permanent: true,
  },
  {
    source: "/posts/2017/12/setting-up-alm-octane-with-docker-compose",
    destination: "/blog/setting-up-alm-octane-with-docker-compose",
    permanent: true,
  },
  {
    source: "/posts/2017/10/fixing-hindi-fonts-in-arch-linux",
    destination: "/blog/fixing-hindi-fonts-in-arch-linux",
    permanent: true,
  },
  {
    source: "/posts/2017/03/mounting-ntfs-partitions-on-arch-linux",
    destination: "/blog/mounting-ntfs-partitions-on-arch-linux",
    permanent: true,
  },
  {
    source: "/posts/2017/03/fossmeet17",
    destination: "/blog/fossmeet-17",
    permanent: true,
  },
  {
    source:
      "/posts/2017/02/setting-up-hugo-automatic-deployment-to-github-with-wercker",
    destination:
      "/blog/setting-up-hugo-automatic-deployment-to-github-with-wercker",
    permanent: true,
  },
  {
    source: "/posts/2016/10/setting-up-python-development-environments",
    destination: "/blog/setting-up-python-development-environments",
    permanent: true,
  },
  {
    source: "/posts/2016/06/custom-arch-linux-setup-with-openbox",
    destination: "/blog/custom-arch-linux-setup-with-openbox",
    permanent: true,
  },
  {
    source: "/posts/2016/04/a-good-sublime-text-setup",
    destination: "/blog/a-good-sublime-text-setup",
    permanent: true,
  },
  {
    source: "/posts/2016/04/searching-the-goal",
    destination: "/blog/searching-the-goal",
    permanent: true,
  },
  {
    source: "/posts/2016/04/wanna-get-insulted-by-sudo",
    destination: "/blog/wanna-get-insulted-by-sudo",
    permanent: true,
  },
]

module.exports = withContentlayer(nextConfig)
