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
  css: [
    "~/assets/scss/_reset.scss",    // 리셋 CSS
    "~/assets/scss/_utilities.scss", // 유틸리티 클래스
    "~/assets/scss/_form.scss",
  ],
  // 변수, 믹스인 등을 모든 컴포넌트에서 사용할 수 있도록 설정
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },
  ssr: false, // 클라이언트 전용 모드
  app: {
    baseURL: "/ispark-sgate/", // GitHub 저장소 이름으로 변경하세요
    buildAssetsDir: "/assets/", // GitHub Pages에 최적화된 에셋 경로
    head: {
      viewport: 'width=1280, initial-scale=0.5, maximum-scale=3, user-scalable=yes',
      meta: [
        { name: 'viewport', content: 'width=1280, initial-scale=0.5, maximum-scale=3, user-scalable=yes' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  nitro: {
    preset: "github-pages",
  },
});
