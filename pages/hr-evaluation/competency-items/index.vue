<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="select-item">
          <span class="select-label">기준년도</span>
          <UiSelect v-model="selectedYear" :options="yearOptions" size="medium" placeholder="선택" width="150px" />
        </div>
        <div class="select-item flex items-center">
          <span class="select-label">역량평가항목그룹</span>
          <UiSelect v-model="selectedGroup" :options="groupOptions" placeholder="선택" width="150px" />
          <div class="button-group ml-4 flex items-center gap-4">
            <UiButton variant="primary" icon-only>
              <i class="icon-md icon-plus icon-white"></i>
            </UiButton>
            <UiButton variant="secondary" icon-only>
              <i class="icon-md icon-pencil"></i>
            </UiButton>
            <UiButton variant="secondary-line" icon-only>
              <i class="icon-md icon-delete"></i>
            </UiButton>
          </div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiTooltip title="역량평가항목 그룹 가져오기">
          <template #trigger>
            <UiButton type="button" variant="secondary-line" size="medium">
              역량평가항목 그룹 가져오기
              <i class="icon-md icon-get"></i>
            </UiButton>
          </template>
          <p>현 기존년도의 역량평가항목 그룹 중 하나를 선택하여 복사합니다.</p>
        </UiTooltip>
        <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
          전년도 데이터 복사
          <i class="icon-md icon-copy icon-primary"></i>
        </UiButton>
      </div>
    </div>
  </div>

  <div class="flex-container">
    <div class="w-30p"><!-- 왼쪽 콘텐츠 -->2</div>
    <div class="w-70p">
      <!-- 테이블 제목 테이블 -->
      <UiTable title="테이블 제목" v-model="tableData" hover editable bordered :canAddRow="false"
        :default-row-data="defaultRowData" @save="handleSave">
        <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
        <template #action-button>
          <UiButton type="button" variant="primary" @click="showAddItemModal = true">
            항목 추가
          </UiButton>
        </template>

        <template #colgroup>
          <col style="width: 40px" v-if="useCheckbox" />
          <!-- 동적 열 너비 설정 -->
          <col v-for="(column, index) in columns" :key="index" :style="column.width ? `width: ${column.width}` : ''" />
        </template>
        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th style="width: 40px" v-if="useCheckbox">
              <UiCheckbox :modelValue="isAllSelected" @update:modelValue="selectAll" size="large" />
            </th>
            <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
            <!-- 수정 버튼 헤더 추가 -->
            <th v-if="showEditButton">수정</th>
          </tr>
        </template>
        <template #body="{
          rows,
          toggleRowSelection,
          isRowSelected,
          handleDragStart,
          handleDragOver,
          handleDrop,
          handleDragEnd,
          sortable,
          editable
        }">
          <tr v-for="(item, index) in rows" :key="item.id" @click="!sortable && toggleRowSelection(item)" :class="{
            selected: isRowSelected(item),
            'sortable-row': sortable
          }" :draggable="sortable" @dragstart="e => handleDragStart(e, index)" @dragover="e => handleDragOver(e)"
            @drop="e => handleDrop(e, index)" @dragend="handleDragEnd">
            <td v-if="useCheckbox">
              <div v-if="!sortable" class="row-checkbox">
                <UiCheckbox :modelValue="isRowSelected(item)" @update:modelValue="toggleRowSelection(item)" size="large"
                  @click.stop />
              </div>
              <div v-else class="drag-handle">
                <i class="icon-md icon-drag"></i>
              </div>
            </td>
            <td v-for="(column, colIndex) in columns" :key="colIndex"
              :class="column.align ? `text-${column.align}` : ''">
              {{ item[column.key] }}
            </td>
            <!-- 수정 버튼 추가 -->
            <td v-if="showEditButton">
              <UiButton variant="ghost" icon-only>
                <i class="icon-md icon-pencil icon-gray"></i>
              </UiButton>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </div>

  <!-- 모달 -->
  <UiModal v-model="showAddItemModal" title="역량사전 항목" :showFooter="true">
    <UiFormLayout>
      <!-- 역량항목 - 항상 표시 -->
      <UiFormItem label="역량항목">
        <UiInput v-model="newItem.name" placeholder="역량항목을 입력해주세요." />
      </UiFormItem>

      <!-- 구분 - 항상 표시 -->
      <UiFormItem label="구분">
        <UiSelect v-model="newItem.category" :options="categoryOptions" placeholder="구분을 선택해주세요."
          @update:modelValue="handleCategoryChange" />
      </UiFormItem>

      <!-- 역량정의 - 항상 표시 -->
      <UiFormItem label="역량정의">
        <UiTextarea v-model="newItem.standard" placeholder="역량정의를 입력해주세요." />
      </UiFormItem>

      <!-- 수준/점수 - 구분이 '일반'이 아닐 때만 표시 -->
      <UiFormItem v-if="newItem.category !== '일반'" label="수준/점수">
        <UiInput v-model.number="newItem.level" type="number" placeholder="수준/점수를 입력해주세요." />
      </UiFormItem>

      <!-- 가중치 - 구분이 '일반'이 아닐 때만 표시 -->
      <UiFormItem v-if="newItem.category !== '일반'" label="가중치">
        <UiInput v-model.number="newItem.weight" type="number" placeholder="가중치를 입력해주세요." />
      </UiFormItem>
    </UiFormLayout>
    <template #footerActions>
      <UiButton @click="addItem" variant="primary">저장</UiButton>
      <UiButton @click="closeModal" variant="secondary-line">닫기</UiButton>
    </template>
    <!-- 모달 내용 -->
  </UiModal>
</template>

<script setup>
import { ref } from 'vue'
import UiModal from '@/components/UI/UiModal.vue'
import UiFormLayout from '@/components/UI/UiFormLayout.vue'
import UiFormItem from '@/components/UI/UiFormItem.vue'
import UiInput from '@/components/UI/UiInput.vue'
import UiSelect from '@/components/UI/UiSelect.vue'
import UiTextarea from '@/components/UI/UiTextarea.vue'

// 헤더 관련 스크립트
const selectedYear = ref('2025')
const yearOptions = ref([
  { value: '2025', label: '2025년' },
  { value: '2024', label: '2024년' },
  { value: '2023', label: '2023년' }
])

// 테이블 관련 스크립트
const useCheckbox = ref(true)

// 행 수정 관련 상태 추가
const showEditButton = ref(true)

// 테이블 열 정의
const columns = ref([
  { key: 'name', title: '역량항목', align: '', width: '100px', icon: 'edit' },
  { key: 'category', title: '구분', align: 'center', width: '100px' },
  {
    key: 'standard',
    title: '행동기준/행동수준/역량정의',
    align: '',
    width: ''
  },
  { key: 'level', title: '수준/점수', align: 'center', width: '100px' },
  { key: 'weight', title: '가중', align: 'center', width: '80px' }
])

// 기본 행 데이터 정의
const defaultRowData = computed(() => {
  const defaultData = {}
  columns.value.forEach(column => {
    defaultData[column.key] = column.key === 'level' || column.key === 'weight' ? 0 : ''
  })
  return defaultData
})

// 테이블 데이터
const tableData = ref([
  {
    id: 1,
    name: '리더십',
    category: '핵심역량',
    standard:
      '조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력조직의 목표를 달성하기 위해 구성원들을 이끄는 능력',
    level: 5,
    weight: 20
  },
  {
    id: 2,
    name: '문제해결',
    category: '직무역량',
    standard: '복잡한 문제를 분석하고 효과적인 해결책을 도출하는 능력',
    level: 4,
    weight: 15
  },
  {
    id: 3,
    name: '의사소통',
    category: '기본역량',
    standard: '정보와 아이디어를 명확하게 전달하고 수용하는 능력',
    level: 3,
    weight: 10
  }
])

// 저장 핸들러
const handleSave = data => {
  console.log('저장된 데이터:', data)
  // API 호출 등의 저장 로직
}

/**
 * 모달 관련
 */
const showAddItemModal = ref(false)

// 구분
// 구분 옵션 - '일반' 추가
const categoryOptions = ref([
  { value: '일반', label: '일반' },
  { value: 'bos', label: 'BOS' }
])


// 닫기
const closeModal = () => {
  showAddItemModal.value = false
  // 폼 초기화
  newItem.value = {
    name: '',
    category: '',
    standard: '',
    level: 3,
    weight: 10
  }
}

// 추가
const newItem = ref({
  name: '',
  category: '',
  standard: '',
  level: 3,
  weight: 10
})

// 항목 추가
const addItem = () => {
  // 입력 검증
  if (!newItem.value.name || !newItem.value.category || !newItem.value.standard) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }

  // 구분이 '일반'인 경우 level과 weight를 '-'로 설정
  if (newItem.value.category === '일반') {
    newItem.value.level = '-'
    newItem.value.weight = '-'
  }

  // 항목 추가
  tableData.value.push({
    id: Date.now(),
    ...newItem.value
  })

  // 모달 닫기
  closeModal()
}
</script>
