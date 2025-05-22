<template>
  <div class="report-creation-container">
    <header class="report-header com-header">
      <div class="ct-top flex justify-between items-center">
        <ul class="my_menu flex gap-23 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-270"
              v-model="dateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="secondary" size="medium" icon-only>
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </li>
        </ul>
        <div class="tbl-btn flex gap-5">
          <UiButton variant="secondary-line">
            <i class="icon icon-sm icon-excel"></i>
            <span>Excel</span>
          </UiButton>
          <UiButton variant="secondary-line" @click="aiReportModal = true">
            <i class="icon icon-sm icon-robot"></i>
            <span>AI 취합 보고서 생성</span>
          </UiButton>
          <UiButton class="org-btn new" @click="reportConfigModal = true">
            <i class="icon icon-sm icon-create icon-white"></i>
            <span>보고서작성</span>
          </UiButton>
        </div>
      </div>
    </header>
    <div class="report-content mt-20">
      <div class="flex-container">
        <div class="w-25p">
          <UiTable
            v-model="tableData"
            hover
            editable
            striped
            scrollable
            maxHeight="calc(100vh - 190px)"
            :fixHeader="true"
            :canAddRow="false"
            :canSave="false"
          >
            <!-- 추가 버튼 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddModal = true">
                데이터 추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="80px" />
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
                <th v-if="showEditButton">관리</th>
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
                <tr
                  @click="!sortable && toggleRowSelection(item)"
                  :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
                  :draggable="sortable"
                  @dragstart="e => handleDragStart(e, index)"
                  @dragover="e => handleDragOver(e)"
                  @drop="e => handleDrop(e, index)"
                  @dragend="handleDragEnd"
                >
                  <!-- 체크박스/드래그 핸들 -->
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

                  <!-- 수정/조회 버튼 -->
                  <td v-if="showEditButton">
                    <div class="button-group flex items-center gap-1">
                      <UiButton variant="ghost" icon-only @click.stop="viewItem(item)">
                        <i class="icon-md icon-eye icon-gray"></i>
                      </UiButton>
                      <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                        <i class="icon-md icon-pencil icon-gray"></i>
                      </UiButton>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </UiTable>
        </div>
        <div class="w-75p"><!-- 오른쪽 콘텐츠 -->3</div>
      </div>
    </div>
  </div>

  <!-- ================== 보고서 생성 팝업 ======================-->
  <UiModal title="보고서 작성" v-model="reportCreateModal" :size="'xlarge'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="isFilterModalOpen = false">제출</UiButton>
    </template>
    <UiFormLayout>
      <UiFormItem label="">
        <div class="flex gap-10 align-center">
          <div class="user-label gap-5">
            <i class="icon icon-md icon-user"></i>
            <div class="user-name">김윤기</div>
          </div>
          <div>
            <ul class="daily-report">
              <li>일간보고</li>
              <li>2025.04.04 제출</li>
            </ul>
          </div>
          <UiMultiSelect
            class="w-400"
            placeholder="협업자 이름을 입력해주세요"
            :options="[
              { value: 'value', label: '형광민[기업]' },
              { value: 'value', label: '땡땡땡[기업]' }
            ]"
          />
          <UiButton variant="secondary" @click="aiSummaryModal = true">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>직접입력</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>활동재생성</span>
          </UiButton>
          <UiButton variant="secondary" @click="addActivityPopup = true">
            <span>업무 활동 추가</span>
          </UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>
    <UiReportTable />
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '일일/주간보고'

  // 데이터 및 상태 관리
  const dateRange = ref([null, null])

  const useCheckbox = ref(true)

  const columns = ref([
    { key: 'date', title: '날짜', width: 'auto', align: 'center' },
    { key: 'type', title: '보고서 유형', width: '80px', align: 'center' },
    { key: 'status', title: '상태', width: '80px', align: 'center' },
    { key: 'action', title: '수정', width: '50px', align: 'center' },
    { key: 'action2', title: '조회', width: '50px', align: 'center' }
  ])

  const tableData = ref([
    {
      date: '2025-05-22',
      type: '일간보고',
      status: '대기'
    },
    {
      date: '2025-05-21',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-20',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-19',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-18',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-05-17',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-05-16',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-15',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-14',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-13',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-05-12',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-11',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-05-10',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-09',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-08',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-05-07',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-06',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-05',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-05-04',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-05-03',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-02',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-05-01',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-30',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-04-29',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-28',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-27',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-04-26',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-25',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-24',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-04-23',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-22',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-21',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-20',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-04-19',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-18',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-04-17',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-16',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-15',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-14',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-04-13',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-04-12',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-11',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-10',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-09',
      type: '일간보고',
      status: '미제출'
    },
    {
      date: '2025-04-08',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-07',
      type: '일간보고',
      status: '제출'
    },
    {
      date: '2025-04-06',
      type: '주간보고',
      status: '제출'
    },
    {
      date: '2025-04-05',
      type: '일간보고',
      status: '제출'
    }
  ])
</script>
