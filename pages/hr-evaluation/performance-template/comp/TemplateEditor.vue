<!-- 템플릿 편집기 컴포넌트 - UI만 -->
<template>
  <div class="template-editor">
    <div v-if="selectedTemplate" class="editor-content">
      <div class="editor-header">
        <h2>{{ selectedTemplate.name }}</h2>
      </div>

      <UiTable
        v-model="demoItems"
        editable
        :defaultRowData="defaultItemData"
        @save="handleSaveItems"
      >
        <template #header-action-right>
          <UiButton variant="secondary-line"> 미리보기 </UiButton>
          <UiButton variant="secondary-line"> 복사 </UiButton>
        </template>
        <template #colgroup>
          <col style="width: 40px" />
          <col style="width: auto" />
          <col style="width: 120px" />
          <col style="width: 100px" />
          <col style="width: 200px" />
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

    <div v-else class="empty-state">
      <div class="empty-content">
        <div class="empty-icon">📋</div>
        <h3>편집할 템플릿을 선택해주세요</h3>
        <p>
          왼쪽 템플릿 목록에서 편집 버튼을 클릭하면<br />해당 템플릿의 항목을 편집할 수 있습니다.
        </p>

        <div class="demo-tip">
          <h4>💡 데모 안내</h4>
          <ul>
            <li>현재는 UI 확인용 데모 버전입니다</li>
            <li>실제 저장 기능은 API 연동 후 활성화됩니다</li>
            <li>모든 기능이 정상 동작하는 것처럼 보입니다</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps(['selectedTemplate'])

  const selectedTemplate = ref(1)

  // 데모용 정적 데이터
  const demoItems = ref([
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
      itemName: '팀원수',
      itemType: 'number',
      isRequired: false,
      guide: '프로젝트에 참여한 전체 팀원 수를 입력하세요'
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
    { value: 'select', label: '선택형' }
  ]

  const handleSaveItems = () => {
    alert('항목이 저장되었습니다!\n(실제로는 API를 통해 서버에 저장됩니다)')
  }

  const handleAddDefaultItems = () => {
    alert('기본 항목들이 추가되었습니다!\n- 담당역할\n- 주요성과\n- 기여도')
  }

  const handlePreview = () => {
    alert('양식 미리보기 팝업이 열립니다!\n(실제로는 새 창에서 양식 형태로 보여집니다)')
  }
</script>

<style scoped>
  .template-editor {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .editor-content {
    padding: 20px;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .editor-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }

  .required-cell {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .required-label {
    font-size: 12px;
    color: #666;
  }

  .editor-actions {
    margin-top: 20px;
    display: flex;
    gap: 8px;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    padding: 40px;
  }

  .empty-content {
    text-align: center;
    max-width: 400px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-content h3 {
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 600;
    color: #374151;
  }

  .empty-content p {
    margin: 0 0 24px 0;
    color: #6b7280;
    line-height: 1.5;
  }

  .demo-tip {
    background: #f3f4f6;
    border-radius: 8px;
    padding: 16px;
    text-align: left;
  }

  .demo-tip h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #374151;
  }

  .demo-tip ul {
    margin: 0;
    padding-left: 16px;
    font-size: 13px;
    color: #6b7280;
  }

  .demo-tip li {
    margin-bottom: 4px;
  }
</style>
