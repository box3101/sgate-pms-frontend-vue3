.report-page { padding: 20px; max-width: 1200px; margin: 0 auto; } .report-controls { display: flex;
align-items: center; gap: 20px; margin-bottom: 20px; padding: 15px; background: #f8f9fa;
border-radius: 6px; border: 1px solid #e9ecef; } .checkbox-group { display: flex; gap: 15px; }
.checkbox-item { display: flex; align-items: center; gap: 5px; cursor: pointer; font-size: 14px;
color: #333; } .checkbox-item input[type="checkbox"] { width: 16px; height: 16px; margin: 0; }
.select-group { margin-left: auto; } .date-select { padding: 6px 12px; border: 1px solid #ccc;
border-radius: 4px; font-size: 14px; background: white; } .calendar-container { background: white;
border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); } .selected-info {
margin-top: 20px; padding: 15px; background-color: #f0f8ff; border-radius: 6px; border-left: 4px
solid #0084ff; } .selected-info h3 { margin: 0 0 8px 0; color: #0066cc; } .selected-info p { margin:
0; color: #666; } /* FullCalendar 커스터마이징 */ :deep(.fc) { font-family: 'Pretendard',
-apple-system, BlinkMacSystemFont, sans-serif; } :deep(.fc-toolbar-title) { font-size: 1.5em;
font-weight: 600; color: #333; } :deep(.fc-button-primary) { background-color: #0084ff;
border-color: #0084ff; font-size: 14px; padding: 6px 12px; } :deep(.fc-button-primary:hover) {
background-color: #0066cc; border-color: #0066cc; } :deep(.fc-today-button) { background-color:
#28a745; border-color: #28a745; } :deep(.fc-daygrid-day.fc-day-today) { background-color: rgba(0,
132, 255, 0.1); } :deep(.fc-daygrid-day:hover) { background-color: rgba(0, 132, 255, 0.05); }
:deep(.fc-event) { border-radius: 4px; font-weight: 500; font-size: 12px
<template>
  <div class="report-page">
    <h1>보고서 조회</h1>

    <!-- 체크박스와 셀렉트 박스 -->
    <div class="report-controls">
      <div class="checkbox-group">
        <label class="checkbox-item">
          <input type="checkbox" v-model="dailyReport" value="d" />
          <span>일간보고</span>
        </label>
        <label class="checkbox-item">
          <input type="checkbox" v-model="weeklyReport" value="w" />
          <span>주간보고</span>
        </label>
      </div>
      <div class="select-group">
        <select v-model="dateGbnType" class="date-select">
          <option value="w">작성일 기준</option>
          <option value="r">보고일 기준</option>
        </select>
      </div>
    </div>

    <!-- FullCalendar 컴포넌트 -->
    <div class="calendar-container">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>

    <!-- 선택된 날짜 정보 표시 -->
    <div v-if="selectedDate" class="selected-info">
      <h3>선택된 날짜: {{ formatDate(selectedDate) }}</h3>
      <p>이 날짜의 보고서를 조회합니다.</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import listPlugin from '@fullcalendar/list'

  // 선택된 날짜
  const selectedDate = ref(null)
  const fullCalendar = ref(null)

  // 보고서 필터 상태
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')

  // FullCalendar 옵션 설정
  const calendarOptions = reactive({
    // 플러그인 설정 (리스트 플러그인 추가)
    plugins: [dayGridPlugin, listPlugin],

    // 초기 뷰 설정
    initialView: 'dayGridMonth',

    // 헤더 툴바 설정
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },

    // 한국어 설정
    locale: 'ko',

    // 시작 요일 (일요일: 0, 월요일: 1)
    firstDay: 0,

    // 높이 설정
    height: 'auto',

    // 날짜 클릭 이벤트
    dateClick: handleDateClick,

    // 이벤트 데이터 (실제 보고서 데이터 형태)
    events: [
      {
        id: '1',
        title: '[이찬용]2025-05-09주간보고',
        date: '2025-05-09',
        allDay: true,
        backgroundColor: '#0084ff',
        borderColor: '#0084ff',
        extendedProps: {
          reportType: 'weekly'
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
          reportType: 'weekly'
        }
      },
      {
        id: '3',
        title: '[이찬용]2025-05-21주간보고',
        date: '2025-05-21',
        allDay: true,
        backgroundColor: '#0084ff',
        borderColor: '#0084ff',
        extendedProps: {
          reportType: 'weekly'
        }
      },
      {
        id: '4',
        title: '[김철수]2025-05-10일간보고',
        date: '2025-05-10',
        allDay: true,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        extendedProps: {
          reportType: 'daily'
        }
      },
      {
        id: '5',
        title: '[박영희]2025-05-15일간보고',
        date: '2025-05-15',
        allDay: true,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        extendedProps: {
          reportType: 'daily'
        }
      }
    ],

    // 버튼 텍스트 커스터마이징
    buttonText: {
      today: '오늘',
      month: '월',
      listMonth: '일정목록'
    },

    // 날짜 포맷 설정
    dayHeaderFormat: { weekday: 'short' },

    // 이벤트 표시 설정
    eventDisplay: 'block',

    // 주말 강조
    weekends: true,

    // 리스트 뷰 설정
    listDayFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    listDaySideFormat: {
      weekday: 'long'
    },

    // 이벤트 시간 표시 포맷
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    },

    // 종일 이벤트 텍스트
    allDayText: '종일',

    // 이벤트가 없는 경우 메시지
    noEventsText: '표시할 이벤트가 없습니다'
  })

  // 날짜 클릭 핸들러
  function handleDateClick(info) {
    selectedDate.value = info.date
    console.log('선택된 날짜:', info.dateStr)

    // 선택된 날짜로 보고서 조회 로직
    fetchReportByDate(info.dateStr)
  }

  // 보고서 조회 함수 (날짜별)
  function fetchReportByDate(date) {
    console.log(`${date} 보고서 조회 중...`)
    // API 호출 로직
  }

  // 날짜 포맷팅 함수
  function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date)
  }

  // 프로그래밍 방식으로 캘린더 조작하는 함수들
  function goToToday() {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.today()
  }

  function goToDate(date) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.gotoDate(date)
  }

  function addEvent(eventInfo) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.addEvent(eventInfo)
  }

  // 뷰 변경 함수
  function changeView(viewName) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.changeView(viewName)
  }

  // 외부에서 사용할 수 있도록 노출
  defineExpose({
    goToToday,
    goToDate,
    addEvent,
    changeView
  })
</script>

<style scoped>
  .report-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .calendar-container {
    margin: 20px 0;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .selected-info {
    margin-top: 20px;
    padding: 15px;
    background-color: #f0f8ff;
    border-radius: 6px;
    border-left: 4px solid #0084ff;
  }

  .selected-info h3 {
    margin: 0 0 8px 0;
    color: #0066cc;
  }

  .selected-info p {
    margin: 0;
    color: #666;
  }

  /* FullCalendar 커스터마이징 */
  :deep(.fc) {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :deep(.fc-toolbar-title) {
    font-size: 1.5em;
    font-weight: 600;
    color: #333;
  }

  :deep(.fc-button-primary) {
    background-color: #0084ff;
    border-color: #0084ff;
  }

  :deep(.fc-button-primary:hover) {
    background-color: #0066cc;
    border-color: #0066cc;
  }

  :deep(.fc-today-button) {
    background-color: #28a745;
    border-color: #28a745;
  }

  :deep(.fc-daygrid-day.fc-day-today) {
    background-color: rgba(0, 132, 255, 0.1);
  }

  :deep(.fc-daygrid-day:hover) {
    background-color: rgba(0, 132, 255, 0.05);
  }

  :deep(.fc-event) {
    border-radius: 4px;
    font-weight: 500;
  }

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .report-page {
      padding: 10px;
    }

    .calendar-container {
      padding: 10px;
    }

    :deep(.fc-toolbar) {
      flex-direction: column;
      gap: 10px;
    }

    :deep(.fc-toolbar-chunk) {
      display: flex;
      justify-content: center;
    }
  }
</style>
