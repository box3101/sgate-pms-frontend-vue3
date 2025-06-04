<template>
  <div class="report-page container-large">
    <!-- 체크박스와 셀렉트 박스 -->
    <div class="report-controls mt-20 com-header flex gap-10">
      <div class="checkbox-group flex gap-10">
        <UiCheckbox size="large" v-model="dailyReport" label="일간보고" value="d" />
        <UiCheckbox size="large" v-model="weeklyReport" label="주간보고" value="w" />
      </div>
      <div class="select-group">
        <UiSelect
          v-model="dateGbnType"
          class="w-150"
          :options="[
            { value: 'w', label: '작성일 기준' },
            { value: 'r', label: '보고일 기준' }
          ]"
        />
      </div>
    </div>

    <!-- FullCalendar 컴포넌트 -->
    <Calendar
      v-model="selectedDate"
      :events="reportEvents"
      @date-click="handleDateClick"
      @event-click="handleEventClick"
    />
  </div>

  <!-- 모달 -->
  <UiModal v-model="reportDetailModal" title="보고서 상세">
    <div class="report-detail">
      <div class="report-info">
        <div class="report-title">{{ selectedReport?.title }}</div>
        <div class="report-author">{{ selectedReport?.author }}</div>
        <div class="report-date">{{ selectedReport?.date }}</div>
      </div>
      <div class="report-content">
        <div class="report-type">
          {{ selectedReport?.reportType === 'daily' ? '일간보고' : '주간보고' }}
        </div>
        <div class="report-content-text">{{ selectedReport?.content }}</div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'

  // 선택된 날짜와 보고서
  const selectedDate = ref(null)
  const selectedReport = ref(null)

  // 보고서 필터 상태
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')

  // 모달 상태
  const reportDetailModal = ref(false)
  const reportConfigModal = ref(false)
  const reportCreateModal = ref(false)

  // 보고서 이벤트 데이터
  const reportEvents = ref([
    {
      id: '1',
      title: '[이찬용]2025-05-09주간보고',
      date: '2025-05-09',
      allDay: true,
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용'
      }
    },
    {
      id: '2',
      title: '[이찬용]2025-05-16주간보고',
      date: '2025-05-16',
      allDay: true,
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용'
      }
    },
    {
      id: '3',
      title: '[김철수]2025-05-10일간보고',
      date: '2025-05-10',
      allDay: true,
      backgroundColor: '#28a745',
      borderColor: '#28a745',
      extendedProps: {
        reportType: 'daily',
        author: '김철수'
      }
    },
    {
      id: '4',
      title: '[박영희]2025-05-15일간보고',
      date: '2025-05-15',
      allDay: true,
      backgroundColor: '#28a745',
      borderColor: '#28a745',
      extendedProps: {
        reportType: 'daily',
        author: '박영희'
      }
    }
  ])

  // 이벤트 핸들러
  function handleDateClick(info) {
    selectedDate.value = info.date
    selectedReport.value = null
    reportDetailModal.value = true
  }

  function handleEventClick(info) {
    selectedDate.value = info.event.start
    selectedReport.value = info.event.extendedProps
    reportDetailModal.value = true
  }
</script>
