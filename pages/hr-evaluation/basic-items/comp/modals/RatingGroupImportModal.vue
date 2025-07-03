<template>
  <UiModal v-model="showImportModal" title="등급척도그룹 가져오기" showFooter>
    <!-- 기준년도 선택 -->
    <div class="select-section">
      <UiSelect
        v-model="selectedYear"
        :options="yearOptions"
        placeholder="기준년도"
        size="medium"
        class="w-200"
      />
    </div>

    <!-- 등급척도그룹 테이블 -->
    <UiTable v-model="data" class="rating-table">
      <template #colgroup>
        <col style="width: 60px" />
        <col style="width: auto" />
        <col style="width: 120px" />
      </template>
      <template #header>
        <th></th>
        <th>등급척도</th>
        <th>평가등급수</th>
      </template>
      <template #body="{ rows }">
        <tr v-for="row in rows" :key="row.id" class="table-row">
          <td class="radio-cell">
            <UiRadio v-model="selectedGroupId" :value="row.id" name="rating-group" size="medium" />
          </td>
          <td class="group-name">{{ row.name }}</td>
          <td class="rating-count text-center">{{ row.ratingCount }}</td>
        </tr>
      </template>
    </UiTable>

    <template #footerActions>
      <UiButton size="medium" variant="primary">가져오기</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  // 기준년도 선택
  const selectedYear = ref('')
  const yearOptions = ref([
    { label: '2024 상/하', value: '2024' },
    { label: '2023 상/하', value: '2023' },
    { label: '2022 상/하', value: '2022' }
  ])

  // 라디오 버튼 선택 상태
  const selectedGroupId = ref(null)

  // 테이블 데이터
  const data = ref([
    {
      id: 'G001',
      name: '성과평가등급그룹',
      ratingCount: 5
    },
    {
      id: 'G002',
      name: '역량평가등급그룹',
      ratingCount: 3
    },
    {
      id: 'G003',
      name: '기본등급그룹',
      ratingCount: 4
    }
  ])
</script>
