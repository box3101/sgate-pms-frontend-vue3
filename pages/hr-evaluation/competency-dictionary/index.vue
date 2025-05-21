<template>
  <div class="flex-container">
    <div class="w-30p">
      <!-- 왼쪽 콘텐츠 -->
    </div>
    <div class="w-70p">
      <!-- 오른쪽 콘텐츠 -->
      <UiTable
        v-model="tableData"
        hover
        editable
        bordered
        :canAddRow="false"
        :default-row-data="defaultRowData"
        @save="handleSave"
      >
        <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
        <template #action-button>
          <UiButton type="button" variant="primary" @click="showAddItemModal = true">
            항목 추가
          </UiButton>
        </template>

        <!-- 열 너비 설정 -->
        <template #colgroup>
          <col v-if="useCheckbox" width="40px" />
          <col v-for="column in columns" :key="column.key" :width="column.width" />
          <col v-if="showEditButton" width="60px" />
        </template>

        <!-- 테이블 헤더 -->
        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th v-if="useCheckbox">
              <UiCheckbox
                :modelValue="isAllSelected"
                @update:modelValue="selectAll"
                size="large"
                @click.stop
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="column.align ? `text-${column.align}` : ''"
            >
              {{ column.title }}
            </th>
            <th v-if="showEditButton">수정</th>
          </tr>
        </template>

        <!-- 테이블 본문 -->
        <template
          #body="{
            rows,
            toggleRowSelection,
            isRowSelected,
            handleDragStart,
            handleDragOver,
            handleDrop,
            handleDragEnd,
            sortable
          }"
        >
          <template v-for="(item, index) in rows" :key="item.id">
            <!-- 일반 항목인 경우 (특별 카테고리가 아닌 경우) -->
            <tr
              v-if="item.category !== 'BOS'"
              @click="!sortable && toggleRowSelection(item)"
              :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <!-- 체크박스 -->
              <td v-if="useCheckbox">
                <div v-if="!sortable" class="row-checkbox">
                  <UiCheckbox
                    :modelValue="isRowSelected(item)"
                    @update:modelValue="toggleRowSelection(item)"
                    size="large"
                    @click.stop
                  />
                </div>
                <div v-else class="drag-handle">
                  <i class="icon-md icon-drag"></i>
                </div>
              </td>

              <!-- 데이터 셀 -->
              <td
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                {{ item[column.key] }}
              </td>

              <!-- 수정 버튼 -->
              <td v-if="showEditButton">
                <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                  <i class="icon-md icon-pencil icon-gray"></i>
                </UiButton>
              </td>
            </tr>

            <!-- 특별 카테고리 항목인 경우 (예: BOS) -->
            <template v-else>
              <tr
                v-for="(behavior, behaviorIndex) in item.behaviors"
                :key="`${item.id}-behaviorIndex`"
                @click="!sortable && toggleRowSelection(item)"
                :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
                :draggable="sortable && behaviorIndex === 0"
                @dragstart="handleDragStart(event, index)"
                @dragover="handleDragOver(event)"
                @drop="handleDrop(event, index)"
                @dragend="handleDragEnd"
              >
                <!-- 첫 번째 행에만 표시되는 셀 -->
                <template v-if="behaviorIndex === 0">
                  <!-- 체크박스 -->
                  <td v-if="useCheckbox" :rowspan="item.behaviors.length">
                    <div v-if="!sortable" class="row-checkbox">
                      <UiCheckbox
                        :modelValue="isRowSelected(item)"
                        @update:modelValue="toggleRowSelection(item)"
                        size="large"
                        @click.stop
                      />
                    </div>
                    <div v-else class="drag-handle">
                      <i class="icon-md icon-drag"></i>
                    </div>
                  </td>

                  <!-- 첫 번째 고정 컬럼 (항목명) -->
                  <td :rowspan="item.behaviors.length">
                    {{ item.name }}
                  </td>

                  <!-- 두 번째 고정 컬럼 (구분) -->
                  <td
                    :rowspan="item.behaviors.length"
                    :class="columns[1].align ? `text-${columns[1].align}` : ''"
                  >
                    {{ item.category }}
                  </td>
                </template>

                <!-- 모든 행에 표시되는 셀 (행동수준) -->
                <td :class="columns[2].align ? `text-${columns[2].align}` : ''">
                  {{ behavior.description }}
                </td>

                <!-- 수준/점수 -->
                <td :class="columns[3].align ? `text-${columns[3].align}` : ''">
                  {{ behavior.level }}/{{ behavior.score }}
                </td>

                <!-- 가중치 -->
                <td :class="columns[4].align ? `text-${columns[4].align}` : ''">
                  {{ behavior.weight }}
                </td>

                <!-- 수정 버튼 (첫 번째 행만) -->
                <td v-if="showEditButton && behaviorIndex === 0" :rowspan="item.behaviors.length">
                  <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                    <i class="icon-md icon-pencil icon-gray"></i>
                  </UiButton>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </UiTable>
    </div>
  </div>

  <!-- 역량사전 모달 -->
  <UiModal
    v-model="showAddItemModal"
    size="mlarge"
    :title="isEditMode ? '항목 수정' : '항목 추가'"
    :showFooter="true"
  >
    <UiFormLayout>
      <!-- 항목명 - 항상 표시 -->
      <UiFormItem label="항목명">
        <UiInput v-model="newItem.name" placeholder="항목명을 입력해주세요." />
      </UiFormItem>

      <!-- 구분 선택 - 항상 표시 -->
      <UiFormItem label="구분">
        <UiSelect
          v-model="newItem.category"
          :options="categoryOptions"
          placeholder="구분을 선택해주세요."
          @update:modelValue="handleCategoryChange"
        />
      </UiFormItem>

      <!-- 일반 구분일 경우의 필드 -->
      <template v-if="newItem.category === '일반'">
        <!-- 정의 -->
        <UiFormItem label="정의">
          <UiTextarea v-model="newItem.standard" placeholder="정의를 입력해주세요." />
        </UiFormItem>
      </template>

      <!-- 특별 구분 아닐 경우의 필드 -->
      <template v-else-if="newItem.category !== 'BOS'">
        <!-- 정의 -->
        <UiFormItem label="정의">
          <UiTextarea v-model="newItem.standard" placeholder="정의를 입력해주세요." />
        </UiFormItem>

        <!-- 수준/점수 -->
        <UiFormItem label="수준/점수">
          <UiInput
            v-model.number="newItem.level"
            type="number"
            placeholder="수준/점수를 입력해주세요."
          />
        </UiFormItem>

        <!-- 가중치 -->
        <UiFormItem label="가중치">
          <UiInput
            v-model.number="newItem.weight"
            type="number"
            placeholder="가중치를 입력해주세요."
          />
        </UiFormItem>
      </template>

      <!-- 특별 구분일 경우의 필드 (예: BOS) -->
      <template v-else>
        <!-- 내부 테이블 -->
        <UiTable v-model="newItem.behaviors" editable sortable>
          <!-- 열 너비 설정 -->
          <template #colgroup>
            <col style="width: 20px" />
            <col style="width: auto" />
            <col style="width: 15%" />
            <col style="width: 10%" />
          </template>

          <!-- 테이블 헤더 -->
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th>
                <UiCheckbox
                  size="large"
                  @click.stop
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                />
              </th>
              <th>행동수준 설명</th>
              <th>수준/점수</th>
              <th>가중치</th>
            </tr>
          </template>

          <!-- 테이블 본문 -->
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
              v-for="(behavior, index) in rows"
              :key="index"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
              :class="{ 'sortable-row': sortable }"
            >
              <!-- 체크박스 -->
              <td>
                <UiCheckbox
                  :modelValue="isRowSelected(behavior)"
                  @update:modelValue="toggleRowSelection(behavior)"
                  size="large"
                  @click.stop
                />
              </td>
              <!-- 행동수준 설명 -->
              <td>
                <UiTextarea
                  v-if="editable"
                  v-model="behavior.description"
                  placeholder="행동수준 설명을 입력해주세요."
                  rows="3"
                />
                <div v-else>{{ behavior.description }}</div>
              </td>

              <!-- 수준/점수 -->
              <td>
                <div v-if="editable" class="flex items-center gap-2">
                  <UiInput
                    v-model.number="behavior.level"
                    type="number"
                    placeholder="수준"
                    class="w-1/2"
                  />
                  <span>/</span>
                  <UiInput
                    v-model.number="behavior.score"
                    type="number"
                    placeholder="점수"
                    class="w-1/2"
                  />
                </div>
                <div v-else>{{ behavior.level }}/{{ behavior.score }}</div>
              </td>

              <!-- 가중치 -->
              <td>
                <UiInput
                  v-if="editable"
                  v-model.number="behavior.weight"
                  type="number"
                  placeholder="가중치"
                />
                <div v-else>{{ behavior.weight }}</div>
              </td>
            </tr>
            <tr v-if="rows.length === 0">
              <td colspan="4" class="text-center py-4">
                항목이 없습니다. '행 추가' 버튼을 클릭하여 추가해주세요.
              </td>
            </tr>
          </template>
        </UiTable>
      </template>
    </UiFormLayout>

    <template #footerActions>
      <UiButton @click="saveItem" variant="primary">저장</UiButton>
      <UiButton @click="closeModal" variant="secondary-line">닫기</UiButton>
    </template>
  </UiModal>
</template>


<script setup>
import { ref, computed } from 'vue'

// 테이블 설정
const useCheckbox = ref(true)
const showEditButton = ref(true)
const columns = ref([
  { key: 'name', title: '항목명', align: '', width: '100px' },
  { key: 'category', title: '구분', align: 'center', width: '100px' },
  {
    key: 'standard',
    title: '정의/설명',
    align: '',
    width: ''
  },
  { key: 'level', title: '수준/점수', align: 'center', width: '100px' },
  { key: 'weight', title: '가중치', align: 'center', width: '80px' }
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
    name: '샘플 항목 1',
    category: '카테고리 1',
    standard: '이 항목에 대한 설명입니다.',
    level: 5,
    weight: 20
  },
  {
    id: 2,
    name: '샘플 항목 2',
    category: '카테고리 2',
    standard: '이 항목에 대한 설명입니다.',
    level: 4,
    weight: 15
  },
  {
    id: 3,
    name: '특별 항목',
    category: 'BOS',
    behaviors: [
      {
        description: '첫 번째 행동수준에 대한 설명입니다.',
        level: 5,
        score: 100,
        weight: '-'
      },
      {
        description: '두 번째 행동수준에 대한 설명입니다.',
        level: 4,
        score: 80,
        weight: '-'
      }
    ]
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
const isEditMode = ref(false)
const editItemId = ref(null)

// 구분 옵션
const categoryOptions = ref([
  { value: '카테고리 1', label: '카테고리 1' },
  { value: '카테고리 2', label: '카테고리 2' },
  { value: 'BOS', label: 'BOS' },
  { value: '일반', label: '일반' }
])

// 새 항목 데이터 초기화
const initNewItem = () => ({
  name: '',
  category: '',
  standard: '',
  level: 3,
  weight: 10,
  behaviors: []
})

// 새 항목 데이터
const newItem = ref(initNewItem())

// 구분 변경 핸들러
const handleCategoryChange = newCategory => {
  // 공통 초기화
  newItem.value.behaviors = []

  if (newCategory === '일반') {
    newItem.value.level = '-'
    newItem.value.weight = '-'
  } else if (newCategory === 'BOS') {
    // BOS일 경우 기본 행동수준 하나 추가
    newItem.value.behaviors = [createNewBehavior()]
  } else {
    // 기본 카테고리일 경우
    newItem.value.level = 3
    newItem.value.weight = 10
  }
}

// 새 행동수준 객체 생성
const createNewBehavior = () => ({
  description: '',
  level: 1,
  score: 20,
  weight: '-'
})

// 모달 닫기
const closeModal = () => {
  showAddItemModal.value = false
  isEditMode.value = false
  editItemId.value = null
  newItem.value = initNewItem()
}

// 항목 편집 시작
const editItem = item => {
  isEditMode.value = true
  editItemId.value = item.id

  // 깊은 복사로 항목 데이터 복사
  newItem.value = JSON.parse(
    JSON.stringify({
      name: item.name,
      category: item.category,
      standard: item.standard,
      level: item.level,
      weight: item.weight,
      behaviors: item.behaviors || []
    })
  )

  showAddItemModal.value = true
}

// 항목 저장 (추가 또는 수정)
const saveItem = () => {
  // 기본 검증
  if (!newItem.value.name || !newItem.value.category) {
    alert('항목명과 구분은 필수 입력 항목입니다.')
    return
  }

  // 구분별 검증 및 처리
  if (newItem.value.category === 'BOS') {
    if (newItem.value.behaviors.length === 0) {
      alert('BOS 구분의 경우 최소 하나 이상의 행동수준을 추가해야 합니다.')
      return
    }

    // 행동수준 검증
    for (const behavior of newItem.value.behaviors) {
      if (!behavior.description) {
        alert('모든 행동수준 설명을 입력해주세요.')
        return
      }
    }
  } else if (newItem.value.category === '일반') {
    // 일반 구분일 경우
    if (!newItem.value.standard) {
      alert('항목 정의를 입력해주세요.')
      return
    }
    newItem.value.level = '-'
    newItem.value.weight = '-'
  } else {
    // 다른 구분일 경우
    if (!newItem.value.standard) {
      alert('항목 정의를 입력해주세요.')
      return
    }
  }

  // 추가 또는 수정 처리
  if (isEditMode.value) {
    const index = tableData.value.findIndex(item => item.id === editItemId.value)
    if (index !== -1) {
      tableData.value[index] = {
        ...tableData.value[index],
        ...newItem.value,
        id: editItemId.value // ID 유지
      }
    }
  } else {
    tableData.value.push({
      id: Date.now(),
      ...newItem.value
    })
  }

  // 모달 닫기
  closeModal()
}
</script>

