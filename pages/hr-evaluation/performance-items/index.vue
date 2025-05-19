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
        <UiTable
          title="등급척도 그룹"
          v-model="tableDataCheckboxDynamic"
          editable
          hover
          :canAddRow="true"
          :default-row-data="defaultRowData"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columnsCheckboxDynamic"
              :key="index"
              :style="column.width ? `width: ${column.width}` : ''"
            />
          </template>

          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px" v-if="useCheckbox">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th v-for="(column, index) in columnsCheckboxDynamic" :key="index">
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
                v-for="(column, colIndex) in columnsCheckboxDynamic"
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
                <template v-else-if="column.key === 'gradeCount'">
                  <UiButton
                    class="textUnderLine"
                    variant="ghost"
                    size="small"
                    @click.stop="handleGradeCount(item)"
                    >{{ item.gradeCount }}</UiButton
                  >
                </template>
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
          title="평가척도"
          v-model="tableDataScaleDynamic"
          editable
          hover
          :canAddRow="true"
          :default-row-data="defaultScaleRowData"
          @save="handleScaleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox2" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columnsScaleDynamic"
              :key="index"
              :style="column.width ? `width: ${column.width}` : ''"
            />
          </template>

          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px" v-if="useCheckbox2">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th v-for="(column, index) in columnsScaleDynamic" :key="index">
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
              <td v-if="useCheckbox2">
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
                v-for="(column, colIndex) in columnsScaleDynamic"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <!-- 입력 필드 또는 텍스트 값 조건부 렌더링 -->
                <UiInput
                  v-if="column.editable"
                  v-model="item[column.key]"
                  size="large"
                  :type="column.type || 'text'"
                  :placeholder="column.placeholder || '값을 입력해주세요'"
                  @click.stop
                />
                <template v-else-if="column.key === 'gradeCount'">
                  <UiButton
                    class="textUnderLine"
                    variant="ghost"
                    size="small"
                    @click.stop="handleGradeCount(item)"
                    >{{ item.gradeCount }}</UiButton
                  >
                </template>
                <template v-else>
                  {{ item[column.key] }}
                </template>
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

  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const useCheckbox = ref(true)

  // 테이블 열 정의
  const columnsCheckboxDynamic = ref([
    {
      key: 'name',
      title: '평가항목 그룹명',
      editable: true,
      align: '',
      width: '',
      placeholder: '평가항목 그룹명을 입력해주세요'
    },
    {
      key: 'gradeCount',
      title: '문항수',
      editable: false,
      align: 'center',
      width: '50px'
    }
  ])

  // 테이블 데이터
  const tableDataCheckboxDynamic = ref([
    { id: 1, name: '샘플 데이터 1', gradeCount: 5 },
    { id: 2, name: '샘플 데이터 2', gradeCount: 5 },
    { id: 3, name: '샘플 데이터 3', gradeCount: 5 }
  ])

  // 기본 행 데이터
  const defaultRowData = { name: '', gradeCount: 0 }

  // 저장 핸들러
  const handleSave = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }

  // 등급 수 핸들러
  const handleGradeCount = item => {
    // 등급 수 처리 로직
    console.log('등급 수 수정:', item)
  }

  // 평가항목 배점 평가척도 설정
  const useCheckbox2 = ref(true)

  // 테이블 열 정의
  const columnsScaleDynamic = ref([
    {
      key: 'scale',
      title: '평가척도',
      editable: true,
      align: '',
      width: '',
      placeholder: '평가척도를 입력해주세요'
    },
    {
      key: 'score',
      title: '배점',
      editable: true,
      align: 'center',
      width: '80px',
      type: 'number',
      placeholder: '배점'
    },
    {
      key: 'gradeCount',
      title: '평가등급수',
      editable: false,
      align: 'center',
      width: '50px'
    }
  ])

  // 테이블 데이터
  const tableDataScaleDynamic = ref([
    { id: 1, scale: '매우우수', score: 5, gradeCount: 'S(100),A(90),B(80),C(70),D(60)' },
    { id: 2, scale: '우수', score: 4, gradeCount: 'S(100),A(90),B(80),C(70),D(60)' },
    { id: 3, scale: '보통', score: 3, gradeCount: 'S(100),A(90),B(80),C(70),D(60)' },
    { id: 4, scale: '미흡', score: 2, gradeCount: 'S(100),A(90),B(80),C(70),D(60)' }
  ])

  // 기본 행 데이터
  const defaultScaleRowData = { scale: '', score: 0, gradeCount: '' }

  // 저장 핸들러
  const handleScaleSave = data => {
    console.log('평가척도 저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }
</script>
