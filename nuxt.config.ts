import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
  ],
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
  },  vite: {
    plugins: [
      // tailwindcss(), // Remove this line, Tailwind is handled by '@nuxtjs/tailwindcss' module
    ],
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
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },  nitro: {
    // Ignore .prisma folder during build
    ignore: ['.prisma'],
    // Add polyfills for Node.js globals
    esbuild: {
      options: {
        define: {
          global: 'globalThis'
        }
      }
    }
  }
})