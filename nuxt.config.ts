import { siteConfig } from './config';
import { EOL } from 'node:os';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-llms',
  ],

  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: 'G-QV2E7L8324',
        },
      },
    },
  },

  site: {
    url: siteConfig.url,
    name: siteConfig.title,
  },

  runtimeConfig: {
    public: {
      siteUrl: siteConfig.url,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: siteConfig.description,
        },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `/${siteConfig.favicon}` },
      ],
    },
  },

  // Import dynamically generated LLM configuration
  llms: await import('./scripts/generate-llm-config')
    .then(({ getConfig }) => getConfig(siteConfig))
    .catch(() => ({
      domain: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
    })),

  content: {
    // Enable content source maps
    experimental: {
      nativeSqlite: true,
    },
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "~/assets/styles/_variables.scss" as *;',
            '@use "~/assets/styles/_mixins.scss" as *;',
          ].join(EOL),
        },
      },
    },
  },

  nitro: {
    preset: 'static',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'hu',
        name: 'Magyar',
        file: 'hu.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
});
