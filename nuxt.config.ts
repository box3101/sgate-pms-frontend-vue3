// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  // 정적 사이트 생성 모드를 명시적으로 설정
  ssr: false,
  target: 'static',
  // 또는 SSR 모드를 명시적으로 설정
  // ssr: true,
  nitro: {
    preset: 'netlify'
  }
})