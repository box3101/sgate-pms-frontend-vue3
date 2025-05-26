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
          <UiTooltip title="등급척도그룹 가져오기">
            <template #trigger>
              <UiButton
                type="button"
                variant="secondary-line"
                size="medium"
                @click="showGroupSelectModal = true"
              >
                등급척도그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 등급척도 그룹 중 하나를 선택하여 복사합니다.</p>
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
        <!-- 테이블 제목 테이블 -->
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
        <!-- 테이블 제목 테이
         블 -->
        <UiTable
          v-model="tableDataDynamic"
          editable
          hover
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
                <!-- 숫자 타입 입력 필드 -->
                <UiInput
                  v-if="column.editable && column.type === 'number'"
                  v-model.number="item[column.key]"
                  type="number"
                  size="large"
                  :placeholder="column.placeholder"
                  @click.stop
                />
                <!-- 일반 텍스트 입력 필드 -->
                <UiInput
                  v-else-if="column.editable"
                  v-model="item[column.key]"
                  size="large"
                  :placeholder="column.placeholder"
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
    </div>
  </div>

  <!-- 등급척도그룹 가져오기 -->
  <UiModal
    v-model="showGroupSelectModal"
    title="등급척도그룹 가져오기"
    size="medium"
    :show-footer="true"
  >
    <div class="flex items-center gap-10">
      <h2 class="heading-6">기준년도</h2>
      <UiSelect
        v-model="selectedYear"
        :options="yearOptions"
        size="medium"
        placeholder="선택"
        width="150px"
      />
    </div>

    <UiTable striped hover>
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 40px" />
      </template>
      <template #header>
        <tr>
          <th></th>
          <th>등급척도</th>
          <th>평가등급수</th>
        </tr>
      </template>
      <template #body>
        <tr v-for="(grade, index) in 7" :key="index">
          <td>
            <UiRadio v-model="selectedGroup" :value="index" size="large" @click.stop />
          </td>
          <td>성과평가등급그룹</td>
          <td class="text-center">5</td>
        </tr>
      </template>
    </UiTable>
    <template #footerActions>
      <UiButton variant="primary" @click="showGroupSelectModal = false">가져오기</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  const logoText = inject('logoText')
  logoText.value = '평가기본항목관리'

  // 선택된 등급척도그룹
  const selectedGroup = ref(0)

  // 등급척도그룹 가져오기 모달
  const showGroupSelectModal = ref(false)

  // 기준년도 선택 옵션
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])

  const useCheckbox = ref(true)

  // 테이블 열 정의
  const columnsCheckboxDynamic = ref([
    {
      key: 'name',
      title: '등급척도',
      editable: true,
      align: '',
      width: '',
      placeholder: '등급척도를 입력해주세요'
    },
    { key: 'gradeCount', title: '평가등급수', editable: false, align: 'center', width: '50px' }
  ])

  // 테이블 데이터
  const tableDataCheckboxDynamic = ref([
    { id: 1, name: '샘플 데이터 1', gradeCount: 5 },
    { id: 2, name: '샘플 데이터 2', gradeCount: 5 },
    { id: 3, name: '샘플 데이터 3', gradeCount: 5 }
  ])

  const defaultRowData = { name: '', gradeCount: 0 }

  // 테이블 2 설정
  const useCheckboxDynamic = ref(true)

  // 테이블 열 정의
  const columnsDynamic = ref([
    {
      key: 'name',
      title: '평가등급',
      editable: true,
      align: '',
      width: '',
      placeholder: '평가등급'
    },
    {
      key: 'value1',
      title: '평가등급점수',
      editable: true,
      align: 'center',
      width: '150px',
      type: 'number',
      placeholder: '평가등급점수'
    }
  ])

  // 테이블 데이터
  const tableDataDynamic = ref([
    { id: 1, name: '샘플 데이터 1', value1: 10 },
    { id: 2, name: '샘플 데이터 2', value1: 30 }
  ])

  // 기본 행 데이터
  const defaultRowDataDynamic = { name: '', value1: '' }

  // 저장 핸들러
  const handleSaveDynamic = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }
</script>
