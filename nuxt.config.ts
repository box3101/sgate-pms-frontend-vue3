// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/ui"],
  // 컴포넌트 자동 가져오기 설정 추가
  components: {
    dirs: [
      "~/components",
      {
        path: "~/components/Layout",
        global: true,
      },
    ],
  },
  // CSS 파일 전역 등록
  css: ["~/assets/scss/_utilities.scss"],
  // 변수만 additionalData로 제공
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/_variables.scss" as *; @use "~/assets/scss/_form.scss" as *; @use "~/assets/scss/_reset.scss" as *;`,
        },
      },
    },
  },
  ssr: false, // 클라이언트 전용 모드
  app: {
    baseURL: "/ispark-sgate/", // GitHub 저장소 이름으로 변경하세요
    buildAssetsDir: "/assets/", // GitHub Pages에 최적화된 에셋 경로
  },
  nitro: {
    preset: "github-pages",
  },
});
