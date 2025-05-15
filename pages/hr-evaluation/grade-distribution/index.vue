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
        <!-- 테이블 제목 테이블 -->
        <UiTable
          title="테이블 제목"
          v-model="tableData"
          editable
          :canAddRow="false"
          hover
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columns"
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
              <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
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
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <template v-if="column.editable">
                  <UiInput v-model="item[column.key]" size="large" @click.stop />
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
        <!-- 테이블 제목 테이블 -->
        <UiTable
          v-model="tableData"
          editable
          hover
          :default-row-data="defaultRowData"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columns2"
              :key="index"
              :style="column.width ? `width: ${column.width}px` : ''"
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
              <th v-for="(column, index) in columns2" :key="index">{{ column.title }}</th>
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
                v-for="(column, colIndex) in columns2"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <template v-if="column.editable">
                  <UiInput v-model="item[column.key]" size="large" @click.stop />
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
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    {
      value: '2024',
      label: '2024년'
    },
    { value: '2023', label: '2023년' }
  ])
  const selectedGroup = ref('')
  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])

  // 등급관리 테이블
  const useCheckbox = ref(true)
  const columns = ref([
    { key: 'grade', title: '등급', editable: false, align: 'center', width: '60px' },
    { key: 'above', title: '이상', editable: true, align: 'center', width: 'auto' },
    { key: 'below', title: '미만', editable: true, align: 'center', width: 'auto' },
    { key: 'score', title: '환산점수', editable: true, align: 'center', width: 'auto' }
  ])
  const tableData = ref([
    { id: 1, grade: '5', above: 100, below: 90, score: 5 },
    { id: 2, grade: '4', above: 89, below: 80, score: 4 },
    { id: 3, grade: '3', above: 79, below: 70, score: 3 },
    { id: 4, grade: '2', above: 69, below: 60, score: 2 },
    { id: 5, grade: '1', above: 59, below: 0, score: 1 }
  ])
  const handleSave = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }

  // 배분표 관리
  const columns2 = ref([
    { key: 'name', title: '첫번째 열 제목', editable: false, align: '' },
    { key: 'value1', title: '두번째 열 제목', editable: false, align: 'center', width: '100px' },
    { key: 'value2', title: '세번째 열 제목', editable: false, align: 'center', width: '100px' },
    { key: 'value3', title: '네번째 열 제목', editable: false, align: 'center', width: '100px' },
    { key: 'value4', title: '다섯번째 열 제목', editable: false, align: 'center', width: '100px' }
  ])

  const tableData2 = ref([
    { id: 1, value1: 10, value2: 20, value3: 30, value4: 40, value5: 50 },
    { id: 2, value1: 30, value2: 40, value3: 50, value4: 60, value5: 70 },
    { id: 3, value1: 50, value2: 60, value3: 70, value4: 80, value5: 90 }
  ])

  const defaultRowData = computed(() => {
    const defaultData = {}
    columns.value.forEach(column => {
      defaultData[column.key] = column.key.includes('value') ? 0 : ''
    })
    return defaultData
  })
</script>
