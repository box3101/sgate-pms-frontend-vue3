<template>
  <button @click="getData">데이터 가져오기</button>

  <div v-if="users">
    <div v-for="(user, idx) in users" :key="user.id">
      <p>이름 : {{ user.name }}</p>
      <p>이메일 : {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const users = ref(null)

  const getData = async () => {
    console.log('1')
    try {
      // 2. API 요청
      const response = await fetch('http://localhost:3001/users/')
      console.log(response)

      // 3. 데이터 받기
      const data = await response.json()
      console.log('3. Data:', data) // ← 이것도 확인!

      // 4. 화면 표시
      users.value = data
      console.log('4. User값:', users.value) // ← 이것도!
    } catch (error) {
      console.error('데이터 가져오기 실패:', error)
    }
  }
</script>
