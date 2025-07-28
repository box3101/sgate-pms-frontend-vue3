<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
<script setup>
  /*

    상태관리란?
    - 사전단어: State(상태)  +  Menagement (관리)
    - 애플리케이션의 '공통 데이터'를 중앙에서 관리하는 방법
    - 쉽게 말해, '여러 컴포넌트가 함께 쓰는 데이터를 한 곳에 모아두는 것'!

     ==> Props/Emit 방식 (복잡함) ==
    App.vue
    ├── Header.vue (사용자명 표시 필요)
    ├── Main.vue
    │   ├── Sidebar.vue (프로필 표시 필요)
    │   └── Content.vue
    │       └── Cart.vue (사용자 장바구니 필요)

    // Props로 계속 전달해야 함...
    <Header :user="user" />
    <Main :user="user">
      <Sidebar :user="user" />
      <Content :user="user">
        <Cart :user="user" />

    ==> 상태관리 방식 (간단함) ==
    // 각 컴포넌트에서 바로 사용!
    const { currentUser } = useUserStore()

    [ 핵심 구성요소 ]

    1. State (상태)
    - 실제 데이터가 저장되는 곳

    const users = ref([])
    const currentUser = ref(null)

    2. Getters (계산된 값)
    - 원본 상태 데이터를 변환, 계산, 필터링하여 컴포넌트에서 사용하기 적합한 형태로해서 보여주는 값들

    const userCount = computed(() => users.value.length)
    const activeUsers = computed(() => users.value.filter(u => u.isActive))

    3. Actions (액션)
    - 상태를 변경하는 함수들

    const addUser = (user) => {
      users.value.push(user)
    }

    const deleteUser = (id) => {
      users.value = users.value.filter(u => u.id !== id)
    }

    [ 실행 흐름 ]
    1. 사용자가 "로그인" 버튼 클릭
    2. login() 액션 실행 → API 호출
    3. 성공하면 currentUser 상태 업데이트
    4. 상태가 바뀌면 관련된 모든 컴포넌트 자동 업데이트!
    5. Header, Sidebar, Cart 등이 동시에 새로운 사용자 정보 표시



  */
</script>
<style scoped></style>
