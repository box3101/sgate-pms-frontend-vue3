<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
<script setup></script>
<style scoped>
  /*
   Pinia란?
     - 이름 유래: Pinia = Piña (파인애플의 스페인어) 🍍
     - Vue.js 창시자 Evan You가 파인애플을 좋아해서 만들어진 이름
     - 실제로는 "가장 Vue다운 상태관리 라이브러리"라는 의미

  [ 기술적 정의 ]

   Pinia = Vue3을 위한 현대적 상태관리('공통 데이터'를 중앙에서 관리하는 방법) 라이브러리

  [ defineStore 함수 분석 ]

  const useUserStore = defineStore('user', () => {
    // 여기에 Store 로직 작성
  })

   1. defineStore의 구조
   defineStore(스토어ID , 설정함수)

   - 첫 번째 인자 : 스토어 고유 ID (문자열)
   - 두 번째 인자 : Store 설정 (함수 또는 객체)

   2. 스토어 ID의 역할
   - 전역에서 스토어를 구분하는 유일한 이름

    const useUserStore = defineStore('user', ...)      // 사용자 관련
    const useCartStore = defineStore('cart', ...)      // 장바구니 관련
    const useSettingStore = defineStore('setting', ...) // 설정 관련

    [ Pinia Store 작성 방식 ]

    1. Setup Stores
    - Composition API와 동일한 문법
    - ref() = state, computed(),= getters , 함수 = actions

    const useUserStore = defineStore('user', () => {
       // State
       const users = ref([])
       const currentUser = ref(null)

       // Getters
       const userCount = computed(() => users.value.length)

       // Actions
       const fetchUsers = async () => {
         const response = await fetch('/api/users')
         users.value = await response.json()
       }

       return { users, currentUser, userCount, fetchUsers }
     })

    [ State, Getters, Actions 자세히 ]

     1. State (상태) - 실제 데이터 저장소 🗃️

     const users = ref([])           // 배열 상태
     const currentUser = ref(null)   // 객체 상태
     const loading = ref(false)      // 불린 상태
     const count = ref(0)           // 숫자 상태

     --> ref()로 반응형 데이터 생성
     --> .value로 접근 (Store 내부에서)
     --> 컴포넌트에서는 storeToRefs() 사용

      2. Getters (계산된 값) - State 기반 계산 🧮

     const userCount = computed(() => users.value.length)
     const activeUsers = computed(() =>
       users.value.filter(user => user.isActive)
     )
     const getUserById = computed(() => {
       return (id) => users.value.find(user => user.id === id)
     })

     --> computed()로 자동 캐싱
     --> State가 변하면 자동 재계산
     --> 매개변수가 필요하면 함수 반환

       3. Actions (액션) - 비즈니스 로직 ⚙️

     const fetchUsers = async () => {
       loading.value = true
       try {
         const response = await fetch('/api/users')
         users.value = await response.json()
       } catch (error) {
         console.error('사용자 조회 실패:', error)
       } finally {
         loading.value = false
       }
     }

     const addUser = (userData) => {
       users.value.push({
         id: Date.now(),
         ...userData,
         createdAt: new Date()
       })
     }

     --> 비동기 작업 처리 (async/await)
     --> 여러 State 동시 변경 가능
     --> 복잡한 비즈니스 로직 캡슐화

     [ 컴포넌트에서 Store 사용법 ]

     1. storeToRefs() - 반응성 유지 중요! ⚡

     import { storeToRefs } from 'pinia'

     const store = useUserStore()
     const { users, userCount } = storeToRefs(store)  // ✅ 반응성 유지
     const { fetchUsers, addUser } = store            // ✅ 함수는 직접

     --> 왜 storeToRefs()가 필요한가?

     ❌ 잘못된 방법:
     const { users } = store              // 반응성 끊어짐!

     ✅ 올바른 방법:
     const { users } = storeToRefs(store) // 반응성 유지!

*/
</style>
