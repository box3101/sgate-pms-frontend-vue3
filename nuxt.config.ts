// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ssr: false, // 클라이언트 전용 모드
  spa: true, // SPA 모드 활성화
  nitro: {
    preset: 'netlify-static'
  }
})