<!-- 템플릿 목록 컴포넌트 - 정적 데이터로 UI만 -->
<template>
  <div class="template-list">
    <UiTable
      title="성과기술서 템플릿"
      v-model="demoTemplates"
      editable
      isDragging
      :defaultRowData="defaultRowData"
      @save="handleSave"
      :scrollable="true"
      :max-height="'calc(100vh - 230px)'"
    >
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 150px" />
        <col style="width: 80px" />
      </template>

      <template #header="{ selectAll, isAllSelected }">
        <th>
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>성과기술서 템플릿</th>
        <th>형식</th>
        <th>조회</th>
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
            <UiInput v-model="row.name" placeholder="템플릿명" />
          </td>
          <td>
            <UiSelect v-model="row.type" :options="typeOptions" />
          </td>
          <td class="text-center">
            <UiButton v-if="!row.isNewRow" variant="ghost" icon-only @click="selectTemplate(row)">
              <i class="icon-md icon-search"></i>
            </UiButton>
            <span v-else class="text-gray-400">-</span>
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 데모용 정적 데이터
  const demoTemplates = ref([
    {
      id: 1,
      name: '기본 성과기술서 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 2,
      name: '연구개발 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 3,
      name: '특허 관련 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 4,
      name: '영업부서 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 5,
      name: '마케팅 성과 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 6,
      name: '인사부서 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 7,
      name: '재무부서 성과 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 8,
      name: '고객서비스 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 9,
      name: '프로젝트 관리 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 10,
      name: 'IT부서 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 11,
      name: '제품개발 성과 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 12,
      name: '품질관리 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 13,
      name: '생산부서 성과 템플릿',
      type: '항목정의',
      isNewRow: false
    },
    {
      id: 14,
      name: '물류관리 성과 템플릿',
      type: '양식',
      isNewRow: false
    },
    {
      id: 15,
      name: '구매부서 성과 템플릿',
      type: '항목정의',
      isNewRow: false
    }
  ])

  const typeOptions = [
    { value: '양식', label: '양식' },
    { value: '항목정의', label: '항목정의' }
  ]

  const defaultRowData = {
    name: '',
    type: '양식',
    isNewRow: true
  }

  // 선택된 템플릿을 부모로 전달하는 이벤트
  const emit = defineEmits(['template-selected'])

  const selectTemplate = template => {
    emit('template-selected', template)

    // UI 피드백
    alert(`"${template.name}" 템플릿을 선택했습니다`)
  }

  const handleSave = () => {
    // UI 피드백만
    alert('저장되었습니다! (실제로는 API 연동 후 동작)')
  }

  const handleReset = () => {
    // 단순히 확인만
    if (confirm('초기화하시겠습니까?')) {
      alert('초기화되었습니다!')
    }
  }
</script>

<style scoped>
  .template-list h2 {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .table-actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
  }
</style>
