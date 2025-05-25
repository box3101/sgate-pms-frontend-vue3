<template>
  <div>
    <!-- 🔥 v-model로 데이터 연결 -->
    <UiMultiSelect v-model="selectedUsers" :options="allOptions" />
  </div>

  <div>
    <!-- 🔥 v-model로 연결 -->
    <OrganizationUserSelector v-model="orgSelectedUsers" />
  </div>

  <UiButton @click="saveData">저장</UiButton>
</template>

<script setup>
  import OrganizationUserSelector from '~/components/user/OrganizationUserSelector.vue'

  const selectedUsers = ref([]) // UiMultiSelect 선택값
  const orgSelectedUsers = ref([]) // 조직에서 선택한 직원들

  const basicOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  // 🔥 모든 옵션 (기본 + 선택된 직원들)
  const allOptions = computed(() => [
    ...basicOptions,
    ...orgSelectedUsers.value.map(user => ({
      label: `${user.name} [${user.rank}]`,
      value: user.id.toString()
    }))
  ])

  const saveData = () => {
    console.log('저장 버튼 클릭')
    console.log('UiMultiSelect 선택된 값:', selectedUsers.value)
    console.log('조직에서 선택된 직원:', orgSelectedUsers.value)

    // 🔥 선택된 직원들을 UiMultiSelect에 자동으로 선택상태로 만들기
    const userValues = orgSelectedUsers.value.map(user => user.id.toString())
    selectedUsers.value = [...new Set([...selectedUsers.value, ...userValues])]
  }
</script>
