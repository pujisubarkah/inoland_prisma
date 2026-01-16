import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'id', iso: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    langDir: 'locales',
    defaultLocale: 'id',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
  css: [
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
    './assets/css/main.css'
  ],
  runtimeConfig: {
    public: {
      googleAnalyticsId: 'G-VC72L85980'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  vite: {
    plugins: [],
    optimizeDeps: {
      include: ['xlsx'],
      exclude: ['xlsx/dist/cpexcel.js']
    },
    define: {
      global: 'globalThis'
    },
    ssr: {
      noExternal: ['axios', 'form-data']
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  nitro: {
    ignore: ['.prisma'],
    esbuild: {
      options: {
        define: {
          global: 'globalThis'
        }
      }
    }
  }
})