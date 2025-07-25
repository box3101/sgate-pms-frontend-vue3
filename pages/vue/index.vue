<template>
  <div>
    <h1>사용자 목록록</h1>
    <p>총 {{ userCount }} 명</p>

    <button @click="fetchUsers">데이터 가져오기</button>

    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
    </ul>
  </div>
</template>
<script setup>
  import { useStore } from '@/stores/useStore'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  const store = useStore()
  const { users, userCount } = storeToRefs(store) // 📊 상태는 storeToRefs
  const { fetchUsers } = store // 🔧 함수는 직접 가져오기
</script>
