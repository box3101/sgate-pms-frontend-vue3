import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStore = defineStore('users', () => {

  /*
    간단한 사용자 Store! 🎯
    - 로컬 JSON Server에서 users 데이터만 가져오기
    - http://localhost:3002/users
  */

  // ====== 상태 (State) ======
  const users = ref([])

  // ====== API 기본 설정 ======
  const API_URL = 'http://localhost:3002'

  // ====== 사용자 목록 가져오기 ======
  const fetchUsers = async () => {
    console.log('사용자 목록 가져오기 시작');

    try {
      const response = await fetch(`${API_URL}/users`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 데이터를 가져올 수 없습니다`)
      }

      const data = await response.json()

      // 상태 업데이트
      users.value = data

      console.log('✅ 성공! 사용자 수:', data)
    } catch (err) {
      console.error('❌ 사용자 조회 실패:', err)

    } finally {
      console.log('로딩딩');
    }

  }

  // 사용자 수
  const userCount = computed(() => users.value.length)

  return {
    // state
    users,
    userCount,

    // actions
    fetchUsers
  }
})


