// @ts-check
import alpinejs from "@astrojs/alpinejs"
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import AstroPWA from "@vite-pwa/astro"
import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypeMermaid from "rehype-mermaid"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkSmartypants from "remark-smartypants"
import remarkWikiLink from "remark-wiki-link"

// https://astro.build/config
export default defineConfig({
  site: "https://yashagarwal.in",
  output: "static",
  devToolbar: {
    enabled: false,
  },

  // Redirect old blog URLs to new notes structure
  redirects: {
    // Generic blog redirect with dynamic slug
    "/blog/[slug]": {
      status: 301,
      destination: "/notes/[slug]",
    },

    // Specific old blog post redirects
    "/posts/2022/12/2022-the-year-of-plentiful":
      "/notes/2022-the-year-of-plentiful",
    "/posts/2022/08/i-got-engaged": "/notes/i-got-engaged",
    "/posts/2022/01/isro-interview-experience-and-takeaways":
      "/notes/isro-interview-experience-and-takeaways",
    "/posts/2022/01/why-i-decided-to-not-join-isro":
      "/notes/why-i-decided-to-not-join-isro",
    "/posts/2022/01/things-i-learned-in-cisco":
      "/notes/things-i-learned-in-cisco",
    "/posts/2022/01/2021-a-bullish-year": "/notes/2021-a-bullish-year",
    "/posts/2021/06/25-it-is": "/notes/25-it-is",
    "/posts/2021/06/thoughts-on-the-family-man-2":
      "/notes/thoughts-on-the-family-man-2",
    "/posts/2021/01/looking-back-at-2020": "/notes/looking-back-at-2020",
    "/posts/2020/09/two-years-at-cisco": "/notes/two-years-at-cisco",
    "/posts/2020/05/cassandra-a-decentralized-structured-storage-system":
      "/notes/cassandra-a-decentralized-structured-storage-system",
    "/posts/2020/04/epidemic/gossip-protocols":
      "/notes/epidemic-gossip-protocol",
    "/posts/2020/03/2019-year-in-review": "/notes/2019-year-in-review",
    "/posts/2019/07/automatic-https-certs-using-godaddy-and-gitlab-apis":
      "/notes/automatic-https-certs-using-godaddy-and-gitlab-apis",
    "/posts/2019/07/setting-up-modsecurity-on-ubuntu":
      "/notes/setting-up-modsecurity-on-ubuntu",
    "/posts/2019/06/travelogue-chikmagalur": "/notes/travelogue-chikmagalur",
    "/posts/2019/02/go-grpc-opa-a-perfect-union-part-3":
      "/notes/go-grpc-opa-a-perfect-union-part-3",
    "/posts/2019/02/go-grpc-opa-a-perfect-union-part-2":
      "/notes/go-grpc-opa-a-perfect-union-part-2",
    "/posts/2019/02/go-grpc-opa-a-perfect-union-part-1":
      "/notes/go-grpc-opa-a-perfect-union-part-1",
    "/posts/2018/12/2018-year-in-review": "/notes/2018-year-in-review",
    "/posts/2018/08/beginning-a-new-journey": "/notes/beginning-a-new-journey",
    "/posts/2018/06/the-good-and-bad-about-csed-of-nit-c":
      "/notes/the-good-and-bad-about-csed-of-nit-c",
    "/posts/2018/06/battery-notifications-in-i3":
      "/notes/battery-notifications-in-i3",
    "/posts/2018/06/mistakes-that-i-made-in-nitc":
      "/notes/mistakes-that-i-made-in-nitc",
    "/posts/2018/05/proxy-your-requests-to-the-backend-server-with-grunt":
      "/notes/proxy-your-requests-to-the-backend-server-with-grunt",
    "/posts/2018/05/writing-drozer-modules": "/notes/writing-drozer-modules",
    "/posts/2018/03/so-i-applied-for-gsoc": "/notes/so-i-applied-for-gsoc",
    "/posts/2018/03/fossmeet18": "/notes/fossmeet-18",
    "/posts/2018/03/deactivated-my-facebook-account":
      "/notes/deactivated-my-facebook-account",
    "/posts/2018/03/develop-a-theme-for-hugo":
      "/notes/develop-a-theme-for-hugo",
    "/posts/2018/02/my-new-domain": "/notes/my-new-domain",
    "/posts/2018/02/syncing-time-on-windows-gnu/linux-dual-boot-setups":
      "/notes/syncing-time-on-windows-gnu-linux-dual-boot-setups",
    "/posts/2018/01/why-a-sanskrit-shloka": "/notes/why-a-sanskrit-shloka",
    "/posts/2018/01/arch-linux-installation-guide-part-2":
      "/notes/arch-linux-installation-guide-part-2",
    "/posts/2018/01/arch-linux-installation-guide-part-1":
      "/notes/arch-linux-installation-guide-part-1",
    "/posts/2018/01/my-own-configuration-manager":
      "/notes/my-own-configuration-manager",
    "/posts/2017/12/2017-the-best-till-now": "/notes/2017-the-best-till-now",
    "/posts/2017/12/setting-up-ssh-agent-in-i3":
      "/notes/setting-up-ssh-agent-in-i3",
    "/posts/2017/12/setting-up-alm-octane-with-docker-compose":
      "/notes/setting-up-alm-octane-with-docker-compose",
    "/posts/2017/10/fixing-hindi-fonts-in-arch-linux":
      "/notes/fixing-hindi-fonts-in-arch-linux",
    "/posts/2017/03/mounting-ntfs-partitions-on-arch-linux":
      "/notes/mounting-ntfs-partitions-on-arch-linux",
    "/posts/2017/03/fossmeet17": "/notes/fossmeet-17",
    "/posts/2017/02/setting-up-hugo-automatic-deployment-to-github-with-wercker":
      "/notes/setting-up-hugo-automatic-deployment-to-github-with-wercker",
    "/posts/2016/10/setting-up-python-development-environments":
      "/notes/setting-up-python-development-environments",
    "/posts/2016/06/custom-arch-linux-setup-with-openbox":
      "/notes/custom-arch-linux-setup-with-openbox",
    "/posts/2016/04/a-good-sublime-text-setup":
      "/notes/a-good-sublime-text-setup",
    "/posts/2016/04/searching-the-goal": "/notes/searching-the-goal",
    "/posts/2016/04/wanna-get-insulted-by-sudo":
      "/notes/wanna-get-insulted-by-sudo",
  },

  integrations: [
    alpinejs({
      entrypoint: "/src/alpine-plugins.ts",
    }),
    react(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [remarkSmartypants, { quotes: false, dashes: "oldschool" }],
        [
          remarkWikiLink,
          {
            hrefTemplate: (/** @type {string} */ permalink) =>
              `/notes/${permalink}`,
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeKatex,
        [
          rehypeMermaid,
          {
            background: "transparent",
            className: "mermaid-diagram",
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark-dimmed",
              light: "github-light",
            },
            defaultLang: {
              block: "plaintext",
              inline: "plaintext",
            },
            onVisitLine(/** @type {any} */ node) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }]
              }
              node.properties.className = [""]
            },
            onVisitHighlightedLine(/** @type {any} */ node) {
              if (!node.properties.className) {
                node.properties.className = []
              }
              node.properties.className.push("line--highlighted")
            },
            onVisitHighlightedChars(/** @type {any} */ node) {
              if (!node.properties.className) {
                node.properties.className = []
              }
              node.properties.className.push("word--highlighted")
            },
          },
        ],
      ],
    }),
    sitemap(),
    AstroPWA({
      mode: "production",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.svg", "favicon.ico", "apple-icon.png"],
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Yash Agarwal",
        short_name: "Yash",
        description: "Personal blog and portfolio of Yash Agarwal.",
        theme_color: "#faf7f5",
        background_color: "#faf7f5",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        lang: "en",
        dir: "ltr",
        categories: ["education", "lifestyle"],
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: [
          "**/*.{css,js,html,svg,png,ico,txt,woff,woff2,jpg,jpeg,webp,avif}",
        ],
        globIgnores: ["**/og-image.png", "**/404", "**/404.html"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
        navigateFallbackDenylist: [/^\/404/],
      },
      devOptions: {
        enabled: true,
        navigateFallback: "/",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@resvg/resvg-js", "sharp", "fs", "path"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js", "sharp"],
    },
  },

  // Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol 'astro:'
  // Not sure why this is happening, but cloudflare adapter seems to fix it.
  adapter: cloudflare({
    imageService: "compile",
  }),
})
