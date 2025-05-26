<template>
  <div class="container-large">
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
            <span class="select-label">등급배분그룹</span>
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
                <i class="icon-md icon-pencil icon-white"></i>
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
          <UiTooltip title="등급배분표 그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                등급배분표 그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 등급배분표 그룹 중 하나를 선택하여 복사합니다.</p>
          </UiTooltip>
          <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
            전년도 데이터 복사
            <i class="icon-md icon-copy icon-primary"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <div class="flex-container">
      <div class="w-50p-left">
        <!-- 왼쪽 콘텐츠 -->
        <UiTable
          title="테이블 제목"
          v-model="tableDataDynamic"
          editable
          hover
          gradeRangeControls
          scrollable
          maxHeight="calc(100vh - 200px)"
          :fixHeader="true"
          :canAddRow="false"
          :default-row-data="defaultRowDataDynamic"
          @save="handleSaveDynamic"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckboxDynamic" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columnsDynamic"
              :key="index"
              :style="column.width ? `width: ${column.width}` : ''"
            />
          </template>

          <template #header="{ selectAll, isAllSelected }">
            <tr>
              <th style="width: 40px" v-if="useCheckboxDynamic">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th
                v-for="(column, index) in columnsDynamic"
                :key="index"
                :class="column.align ? `text-${column.align}` : ''"
              >
                {{ column.title }}
              </th>
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
              sortable
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
              <td v-if="useCheckboxDynamic">
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
                v-for="(column, colIndex) in columnsDynamic"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <!-- 입력 필드 또는 텍스트 값 조건부 렌더링 -->
                <UiInput
                  v-if="column.editable"
                  v-model="item[column.key]"
                  size="large"
                  :placeholder="column.placeholder || '값을 입력해주세요'"
                  @click.stop
                />
                <template v-else>
                  {{ item[column.key] }}
                </template>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>

      <div class="w-50p-right">
        <UiTable
          title="테이블 제목"
          v-model="tableDataExcel"
          excelControls
          hover
          :canAddRow="false"
          @save="handleSaveExcel"
          excelDownloadLabel="등급배분표그룹 양식다운로드"
          excelUploadLabel="등급배분표그룹 업로드"
        >
          <template #colgroup>
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columnsExcel"
              :key="index"
              :style="column.width ? `width: ${column.width}` : ''"
            />
          </template>
          <template #header="{ sortable }">
            <tr>
              <th v-for="(column, index) in columnsExcel" :key="index">{{ column.title }}</th>
            </tr>
          </template>
          <template
            #body="{ rows, handleDragStart, handleDragOver, handleDrop, handleDragEnd, sortable }"
          >
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{
                'sortable-row': sortable
              }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <td
                v-for="(column, colIndex) in columnsExcel"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
                class="text-center"
              >
                {{ item[column.key] }}
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
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

  const selectedGroup = ref('')
  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])

  // 등급 배분율 테이블 설정
  const useCheckboxDynamic = ref(true)
  // 테이블 열 정의
  const columnsDynamic = ref([
    {
      key: 'grade',
      title: '등급',
      editable: true,
      align: '',
      width: '100px',
      placeholder: '등급을 입력하세요'
    },
    {
      key: 'min',
      title: '이상',
      editable: true,
      align: 'center',
      width: '80px',
      type: 'number',
      placeholder: '최소값'
    },
    {
      key: 'max',
      title: '미만',
      editable: true,
      align: 'center',
      width: '80px',
      type: 'number',
      placeholder: '최대값'
    },
    {
      key: 'score',
      title: '환산점수',
      editable: true,
      align: 'center',
      width: '100px',
      type: 'number',
      placeholder: '환산점수'
    }
  ])
  // 테이블 데이터
  const tableDataDynamic = ref([
    { id: 1, grade: 'S', min: 90, max: 100, score: 100 },
    { id: 2, grade: 'A', min: 80, max: 90, score: 90 },
    { id: 3, grade: 'B', min: 70, max: 80, score: 80 },
    { id: 4, grade: 'C', min: 60, max: 70, score: 70 },
    { id: 5, grade: 'D', min: 50, max: 60, score: 60 },
    { id: 6, grade: 'E', min: 40, max: 50, score: 50 },
    { id: 7, grade: 'F', min: 0, max: 40, score: 0 },
    { id: 1, grade: 'S', min: 90, max: 100, score: 100 },
    { id: 2, grade: 'A', min: 80, max: 90, score: 90 },
    { id: 3, grade: 'B', min: 70, max: 80, score: 80 },
    { id: 4, grade: 'C', min: 60, max: 70, score: 70 },
    { id: 5, grade: 'D', min: 50, max: 60, score: 60 },
    { id: 6, grade: 'E', min: 40, max: 50, score: 50 },
    { id: 7, grade: 'F', min: 0, max: 40, score: 0 },
    { id: 1, grade: 'S', min: 90, max: 100, score: 100 },
    { id: 2, grade: 'A', min: 80, max: 90, score: 90 },
    { id: 3, grade: 'B', min: 70, max: 80, score: 80 },
    { id: 4, grade: 'C', min: 60, max: 70, score: 70 },
    { id: 5, grade: 'D', min: 50, max: 60, score: 60 },
    { id: 6, grade: 'E', min: 40, max: 50, score: 50 },
    { id: 7, grade: 'F', min: 0, max: 40, score: 0 }
  ])
  // 기본 행 데이터
  const defaultRowDataDynamic = { grade: '', min: 0, max: 0, score: 0 }
  // 저장 핸들러
  const handleSaveDynamic = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }
  // 테이블 열 정의
  const columnsExcel = ref([
    { key: 'count', title: '명수', align: 'center', width: '80px' },
    { key: 'gradeS', title: 'S', align: 'center', width: '60px' },
    { key: 'gradeA', title: 'A', align: 'center', width: '60px' },
    { key: 'gradeB', title: 'B', align: 'center', width: '60px' },
    { key: 'gradeC', title: 'C', align: 'center', width: '60px' },
    { key: 'gradeD', title: 'D', align: 'center', width: '60px' }
  ])

  // 테이블 데이터
  const tableDataExcel = ref([
    { id: 1, count: 5, gradeS: 0, gradeA: 0, gradeB: 2, gradeC: 2, gradeD: 1 },
    { id: 2, count: 5, gradeS: 0, gradeA: 0, gradeB: 2, gradeC: 2, gradeD: 1 },
    { id: 3, count: 5, gradeS: 0, gradeA: 0, gradeB: 2, gradeC: 2, gradeD: 1 },
    { id: 4, count: 5, gradeS: 0, gradeA: 0, gradeB: 2, gradeC: 2, gradeD: 1 }
  ])

  // 저장 핸들러
  const handleSaveExcel = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }
</script>
