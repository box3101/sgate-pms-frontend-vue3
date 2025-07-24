// @ts-ignore
// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ui: {
    prefix: 'N', // Nuxt UI 컴포넌트에 접두사 지정
    global: false // 자동 전역 등록 비활성화
  },
  // 라우터 경고 제거용 플러그인 추가
  plugins: ['~/plugins/router-warnings.client.js'],
  // 컴포넌트 자동 import 설정
  components: [
    {
      path: '~/components/common/Layout',
      global: true
    },
    {
      path: '~/components/common/UI',
      global: true
    },
    {
      path: '~/components/domain',
      global: false // domain 컴포넌트는 명시적 import 필요
    },
    {
      path: '~/components/user',
      global: false
    }
  ],
  // CSS 파일 전역 등록
  css: [
    '~/assets/scss/_reset.scss', // 리셋 CSS
    '~/assets/scss/_utilities.scss', // 유틸리티 클래스
    '~/assets/scss/_icon.scss',
    '~/assets/scss/_common.scss',
    '~/assets/scss/pages/_task.scss',
    '~/assets/scss/pages/_hr.scss'
  ],
  // 변수, 믹스인 등을 모든 컴포넌트에서 사용할 수 있도록 설정
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    },
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
    baseURL: '/ispark-sgate/', // GitHub 저장소 이름으로 변경하세요
    buildAssetsDir: '/assets/', // GitHub Pages에 최적화된 에셋 경로
    head: {
      viewport: 'width=1500, initial-scale=0.5, maximum-scale=3, user-scalable=yes',
      meta: [
        {
          name: 'viewport',
          content: 'width=1500, initial-scale=0.5, maximum-scale=3, user-scalable=yes'
        }
      ]
    },
    // TinyMCE CDN 스크립트 추가
    script: [
      {
        src: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js',
        referrerpolicy: 'origin'
      }
    ]
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    preset: 'github-pages'
  }
});
