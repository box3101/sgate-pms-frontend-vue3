<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="select-item">
          <span class="select-label">기준년도</span>
          <UiSelect
            v-model="selectedYear"
            :options="yearOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="select-item flex items-center">
          <span class="select-label">역량평가항목그룹</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            placeholder="선택"
            width="150px"
          />
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
      <UiTable
        title="테이블 제목"
        v-model="tableData"
        editable
        hover
        bordered
        :canAddRow="false"
        :showEditButton="true"
        :default-row-data="defaultRowData"
        @save="handleSave"
        @edit-row="handleEditRow"
      >
        <template #colgroup>
          <col style="width: 40px" v-if="useCheckbox" />
          <!-- 동적 열 너비 설정 -->
          <col
            v-for="(column, index) in columns"
            :key="index"
            :style="column.width ? `width: ${column.width}` : ''"
          />
          <!-- 수정 버튼 열 추가 -->
          <col style="width: 60px" v-if="showEditButton" />
        </template>
        <template #header="{ selectAll, isAllSelected, sortable }">
          <tr>
            <th style="width: 40px" v-if="useCheckbox">
              <UiCheckbox :modelValue="isAllSelected" @update:modelValue="selectAll" size="large" />
            </th>
            <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
            <!-- 수정 버튼 헤더 추가 -->
            <th v-if="showEditButton">수정</th>
          </tr>
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
            v-for="(item, index) in rows"
            :key="item.id"
            @click="!sortable && toggleRowSelection(item)"
            :class="{
              selected: isRowSelected(item),
              'sortable-row': sortable
            }"
            :draggable="sortable"
            @dragstart="e => handleDragStart(e, index)"
            @dragover="e => handleDragOver(e)"
            @drop="e => handleDrop(e, index)"
            @dragend="handleDragEnd"
          >
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
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              :class="column.align ? `text-${column.align}` : ''"
            >
              {{ item[column.key] }}
            </td>
            <!-- 수정 버튼 추가 -->
            <td v-if="showEditButton">
              <UiButton variant="secondary-line" icon-only @click="editRow(item)">
                <i class="icon-md icon-pencil"></i>
              </UiButton>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

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
  const currentEditRow = ref(null)
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

  // 행 수정 이벤트 핸들러
  const handleEditRow = row => {
    console.log('행 수정:', row)
    // 여기서 모달 창을 열거나 편집 모드로 전환하는 등의 작업 수행
    currentEditRow.value = row
    showEditModal.value = true
  }
</script>
