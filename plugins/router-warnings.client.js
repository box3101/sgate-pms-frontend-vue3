// plugins/console-warnings.client.js
export default defineNuxtPlugin(() => {
  if (process.dev) {
    const originalWarn = console.warn
    const originalError = console.error
    // const originalLog = console.log;

    // console.warn 완전 오버라이드
    console.warn = function (...args) {
      const message = args[0]

      if (typeof message === 'string') {
        // Vue Router 경고 차단
        if (
          message.includes('[Vue Router warn]') ||
          message.includes('No match found for location')
        ) {
          return
        }

        // Vue 일반 경고 차단
        if (
          message.includes('[Vue warn]') ||
          message.includes('Property "') ||
          message.includes('was accessed during render') ||
          message.includes('is not defined on instance')
        ) {
          return
        }

        // Hydration 관련 경고 차단
        if (message.includes('Hydration') || message.includes('hydration')) {
          return
        }

        // Nuxt 관련 경고 차단
        if (message.includes('[nuxt]') || message.includes('Nuxt')) {
          return
        }
      }

      // 나머지 경고는 정상 출력
      originalWarn.apply(console, args)
    }

    console.error = function (...args) {
      const message = args[0]

      if (typeof message === 'string') {
        // Vue 에러 메시지 차단
        if (message.includes('[Vue warn]') || message.includes('Vue received')) {
          return
        }
      }

      originalError.apply(console, args)
    }
  }
})
