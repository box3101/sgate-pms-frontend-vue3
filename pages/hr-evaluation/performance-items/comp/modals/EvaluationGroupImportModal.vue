<template>
  <UiModal v-model="showModal" title="평가항목그룹 가져오기" showFooter>
    <UiSelect v-model="selectedYear" :options="yearOptions" placeholder="기준년도" size="medium" />

    <UiTable v-model="data">
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 80px" />
      </template>
      <template #header>
        <th></th>
        <th>평가항목그룹</th>
        <th>문항수</th>
      </template>
      <template #body="{ rows }">
        <tr
          v-for="row in rows"
          :key="row.id"
          class="clickable-row"
          :class="{ 'selected-row': selectedGroupId === row.id }"
          @click="selectRow(row.id, $event)"
        >
          <td class="text-center radio-cell" @click.stop>
            <UiRadio
              v-model="selectedGroupId"
              :value="row.id"
              name="evaluation-group"
              size="medium"
            />
          </td>
          <td class="group-name">{{ row.name }}</td>
          <td class="text-center">{{ row.ratingCount }}</td>
        </tr>
      </template>
    </UiTable>

    <template #footerActions>
      <UiButton variant="primary" :disabled="!selectedGroupId" @click="handleSave">
        가져오기
      </UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  // 모달 표시 상태
  const showModal = ref(true)

  // 선택된 연도 (셀렉트박스용)
  const selectedYear = ref('')

  // 선택된 그룹 ID (라디오버튼용)
  const selectedGroupId = ref(null)

  // 연도 옵션
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  // 테이블 데이터
  const data = ref([
    { id: 1, name: '평가항목그룹1', ratingCount: 10 },
    { id: 2, name: '평가항목그룹2', ratingCount: 20 },
    { id: 3, name: '평가항목그룹3', ratingCount: 30 }
  ])

  /**
   * 행 선택 함수
   * tr 클릭 시 라디오 버튼 선택
   * @param {number} groupId - 선택할 그룹 ID
   * @param {Event} event - 클릭 이벤트
   */
  const selectRow = (groupId, event) => {
    // 이벤트 버블링 방지
    event.preventDefault()

    // 라디오 버튼 선택
    selectedGroupId.value = groupId

    console.log('행 클릭됨, 선택된 ID:', groupId)
  }

  /**
   * 가져오기 버튼 클릭 핸들러
   */
  const handleSave = () => {
    if (selectedGroupId.value) {
      const selectedGroup = data.value.find(item => item.id === selectedGroupId.value)
      console.log('선택된 그룹:', selectedGroup)
      showModal.value = false
    }
  }
</script>
