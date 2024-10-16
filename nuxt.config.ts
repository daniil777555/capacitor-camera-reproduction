// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    baseURL: '/',
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },
  vite: {
    define: {
      'window.global': {}
    }
  }
})
