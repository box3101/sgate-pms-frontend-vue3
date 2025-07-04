<template>
  <UiModal v-model="showModal" title="평가항목그룹 가져오기" showFooter>
    <UiSelect
      v-model="selectedValue"
      :options="options"
      placeholder="기준년도"
      size="medium"
      class="w-200"
    />
    <UiTable v-model="data">
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 80px" />
      </template>
      <template #header>
        <th></th>
        <th>역량평가항목그룹</th>
        <th>그룹개수</th>
      </template>
      <template #body="{ rows }">
        <tr
          v-for="row in rows"
          :key="row.id"
          :class="{ 'selected-row': selectedGroupId === row.id }"
          @click="selectRow(row.id, $event)"
        >
          <td>
            <UiRadio v-model="selectedGroupId" :value="row.id" name="rating-group" size="medium" />
          </td>
          <td>{{ row.name }}</td>
          <td class="text-center">{{ row.ratingCount }}</td>
        </tr>
      </template>
    </UiTable>
    <template #footerActions>
      <UiButton variant="primary" @click="handleImport">가져오기</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'
  const selectedValue = ref('')
  const options = ref([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ])

  const data = ref([
    { id: 1, name: 'Option 1', ratingCount: 10 },
    { id: 2, name: 'Option 2', ratingCount: 20 },
    { id: 3, name: 'Option 3', ratingCount: 30 }
  ])

  const selectedGroupId = ref(null)
  const selectRow = (groupId, event) => {
    event.preventDefault()
    selectedGroupId.value = groupId
    console.log('행 클릭됨, 선택된 ID:', groupId)
  }
</script>
