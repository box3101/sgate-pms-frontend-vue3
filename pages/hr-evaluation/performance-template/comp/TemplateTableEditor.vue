<!-- 항목정의 타입 에디터 (테이블) - 수정 버전 -->
<template>
  <div class="table-editor-content">
    <UiTable
      v-model="templateItems"
      editable
      :defaultRowData="defaultItemData"
      @save="handleSaveItems"
      :scrollable="true"
      :max-height="'calc(100vh - 335px)'"
    >
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 150px" />
        <col style="width: 100px" />
        <col style="width: 400px" />
      </template>

      <template #header="{ selectAll, isAllSelected }">
        <th>
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>항목명</th>
        <th>입력형태</th>
        <th>필수여부</th>
        <th>작성가이드</th>
      </template>

      <template
        #body="{
          rows,
          toggleRowSelection,
          isRowSelected,
          handleDragStart,
          handleDragOver,
          handleDrop,
          handleDragEnd,
          sortable,
          editable
        }"
      >
        <tr
          v-for="(row, index) in rows"
          :key="row.id"
          :draggable="sortable"
          @dragstart="e => handleDragStart(e, index)"
          @dragover="handleDragOver"
          @drop="e => handleDrop(e, index)"
          @dragend="handleDragEnd"
          :class="{ 'sortable-row': sortable }"
        >
          <td>
            <UiCheckbox
              size="large"
              :modelValue="isRowSelected(row)"
              @update:modelValue="() => toggleRowSelection(row)"
            />
          </td>
          <td>
            <UiInput v-model="row.itemName" placeholder="항목명" />
          </td>
          <td>
            <UiSelect v-model="row.itemType" :options="itemTypeOptions" />
          </td>
          <td>
            <div class="required-cell">
              <UiCheckbox size="large" v-model="row.isRequired" />
              <span class="required-label">필수</span>
            </div>
          </td>
          <td>
            <UiInput v-model="row.guide" placeholder="작성가이드를 입력하세요" />
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    template: {
      type: Object,
      required: true
    }
  })

  // 템플릿 데이터
  const templateItems = ref([
    {
      id: 1,
      itemName: '프로젝트명',
      itemType: 'text',
      isRequired: true,
      guide: '수행한 프로젝트의 정확한 명칭을 입력하세요'
    },
    {
      id: 2,
      itemName: '개발기간',
      itemType: 'date',
      isRequired: true,
      guide: '프로젝트 시작일부터 종료일까지의 기간을 선택하세요'
    },
    {
      id: 3,
      itemName: '사용기술',
      itemType: 'text',
      isRequired: false,
      guide: '프로젝트에서 사용한 주요 기술스택을 나열하세요'
    },
    {
      id: 4,
      itemName: '담당역할',
      itemType: 'text',
      isRequired: true,
      guide: '프로젝트에서 본인의 역할을 구체적으로 작성하세요'
    },
    {
      id: 5,
      itemName: '주요성과',
      itemType: 'text',
      isRequired: false,
      guide: '프로젝트를 통해 달성한 주요 성과를 작성하세요'
    }
  ])

  const defaultItemData = {
    itemName: '',
    itemType: 'text',
    isRequired: false,
    guide: '',
    isNewRow: true
  }

  const itemTypeOptions = [
    { value: 'text', label: '텍스트' },
    { value: 'number', label: '숫자' },
    { value: 'date', label: '날짜' },
    { value: 'select', label: '선택형' },
    { value: 'file', label: '파일첨부' },
    { value: 'textarea', label: '장문' }
  ]

  const handleSaveItems = () => {
    console.log('항목 저장:', templateItems.value)
  }
</script>

<style scoped>
  .table-editor-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .required-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  .required-label {
    font-size: 14px;
    color: #374151;
  }
</style>
