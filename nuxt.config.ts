// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@nuxt/icon', '@nuxt/scripts', '@nuxtjs/sitemap'],

  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: 'G-QV2E7L8324',
        }
      }
    }
  },

  site: { 
    url: 'https://95gabor.me', 
    name: 'Gábor Pichner\'s CV | TypeScript Full-Stack Developer' 
  }, 

  runtimeConfig: {
    public: {
      siteUrl: 'https://95gabor.me'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Experienced TypeScript Full-Stack Developer specializing in modern web technologies, cloud architecture, and DevOps. Expert in NestJS, Angular, and cloud platforms (AWS, Azure, GCP). Passionate about clean code, infrastructure as code, and building scalable applications.' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  content: {
    // Enable content source maps
    experimental: {
      nativeSqlite: true
    }
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_variables.scss" as *;'
        }
      }
    }
  },

  nitro: {
    preset: 'static'
  }
})