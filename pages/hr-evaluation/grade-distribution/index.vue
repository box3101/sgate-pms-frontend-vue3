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
          gradeRangeControls
          hover
          :default-row-data="defaultRowData"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columns"
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
                <!-- 편집 모드일 경우 input 컴포넌트 표시 -->
                <UiInput v-if="editable" v-model="item[column.key]" />
                <!-- 편집 모드가 아닐 경우 일반 텍스트 또는 버튼 표시 -->
                <template v-else>
                  <!-- 숫자 값이면 textUnderLine 버튼으로 표시 -->
                  <button
                    v-if="typeof item[column.key] === 'number'"
                    class="textUnderLine"
                    @click="editCell(item, column.key)"
                  >
                    {{ item[column.key] }}
                  </button>
                  <!-- 그 외의 경우 일반 텍스트로 표시 -->
                  <span v-else>{{ item[column.key] }}</span>
                </template>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
      <div class="w-50p-right">
        <!-- 테이블 제목 테이블 -->
        <UiTable
          title="테이블 제목"
          v-model="tableData2"
          excelControls
          hover
          :canAddRow="false"
          @save="handleSave"
        >
          <template #colgroup>
            <!-- 동적 열 너비 설정 -->
            <col
              v-for="(column, index) in columns2"
              :key="index"
              :style="column.width ? `width: {column.width}` : ''"
            />
          </template>
          <template #header="{ sortable }">
            <tr>
              <th v-for="(column, index) in columns2" :key="index">{{ column.title }}</th>
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
                v-for="(column, colIndex) in columns2"
                :key="colIndex"
                :class="column.align ? `text-{column.align}` : ''"
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
  const useCheckbox = ref(true)

  // 테이블 데이터
  const tableData = ref([
    { id: 1, name: '샘플 데이터 1', value1: 10, value2: 20 },
    { id: 2, name: '샘플 데이터 2', value1: 30, value2: 40 },
    { id: 3, name: '샘플 데이터 3', value1: 50, value2: 60 }
  ])

  // 테이블 열 정의
  const columns = ref([
    { key: 'name', title: '첫번째 열 제목', editable: false, align: '' },
    { key: 'value1', title: '두번째 열 제목', editable: false, align: 'center', width: '100px' },
    { key: 'value2', title: '세번째 열 제목', editable: false, align: 'center', width: '100px' }
    // 추가 열은 여기에 정의
  ])

  const handleSave = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }

  // 테이블 열 정의
  const columns2 = ref([
    { key: 'name', title: '첫번째 열 제목', align: '', width: '' },
    { key: 'value1', title: '두번째 열 제목', align: 'center', width: '100px' },
    { key: 'value2', title: '세번째 열 제목', align: 'center', width: '100px' },
    { key: 'value3', title: '네번째 열 제목', align: 'center', width: '100px' },
    { key: 'value4', title: '다섯번째 열 제목', align: 'center', width: '100px' }
  ])

  const tableData2 = ref([
    { id: 1, name: '샘플 데이터 1', value1: 10, value2: 20, value3: 30, value4: 40 },
    { id: 2, name: '샘플 데이터 2', value1: 30, value2: 40, value3: 50, value4: 60 },
    { id: 3, name: '샘플 데이터 3', value1: 50, value2: 60, value3: 70, value4: 80 }
  ])
</script>
