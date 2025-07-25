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
    - 쉽게 말해, 여러 컴포넌트가 함께 쓰는 데이터를 한 곳에 모아두는 것!

    [ 현실 비유]

    ❌ 상태관리 없이:
    - 엄마: "아들아, 우유 있어?"
    - 아들: "아빠한테 물어봐!"
    - 아빠: "딸한테 물어봐!"
    - 딸: "엄마한테 물어봐!"
    → 결국 아무도 모름... 😅

    ✅ 상태관리 있을 때:
    - 냉장고에 메모지: "우유 2개, 계란 10개, 김치 1통"
    - 누구든 냉장고만 보면 바로 알 수 있음!
    - 뭔가 사용하면 메모지 업데이트!
    → 모든 가족이 실시간으로 상황 파악! 👍

    [ 컴포넌트로 비유 하면 ]

    Hedaer.vue : "로그인된 사용자 이름 표시해야 함"
    Sidebar.vue  : "사용자 프로필 사진 보여줘야 함"
    Cart.vue : "이 사용자의 장바구니 보여줘야 함"

    Props/Emit으로 하면?
    App -> Header -> ... -> Cart (깊은 전달 지옥)

    상태관리로 하면?
    모든 컴포넌트가 "사용자 스토어"에 직접 접근! 간단!

    [ 언제 사용하나? ]
     1. 로그인한 사용자 정보 (모든 페이지에서 필요)

    [ Props vs Emit vs 상태관리 비교 ]

    Props: 부모가 자식에게 "이거 써!"
    → 한 방향으로만 데이터 흘러감 ⬇️

    Emit: 자식이 부모에게 "이런 일 일어났어요!"
    → 이벤트를 위로 올려보냄 ⬆️

    상태관리: "우리 모두 이 데이터 공유해요!"
    → 중앙 창고에서 모두가 접근 🏪

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
    - 냉장고 안의 실제 음식들!

    const users = ref([])
    const currentUser = ref(null)

    2. Getters (계산된 값)
    - 상태를 가공해서 보여주는 값들
    - "냉장고에 있는 재료로 뭘 만들 수 있지?" 같은 계산!

    const userCount = computed(() => users.value.length)
    const activeUsers = computed(() => users.value.filter(u => u.isActive))

    3. Actions (액션)
    - 상태를 변경하는 함수들
    - "냉장고에 우유 넣기", "계란 꺼내기" 같은 행동들!

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

    [ 왜 이렇게 만들었을까? ]

    컴포넌트가 많아질수록 Props/Emit만으로는 한계가 있으니까!

    예시: 10단계 깊이로 데이터 전달하기
    App → A → B → C → D → E → F → G → H → I → J

    이런 "Props Drilling" 지옥을 피하고,
    모든 컴포넌트가 필요한 데이터에 직접 접근할 수 있도록!


  */
</script>
<style scoped></style>
