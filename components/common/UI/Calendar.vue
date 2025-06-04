<!-- components/common/UI/CustomCalendar.vue -->
<template>
  <div class="custom-calendar-wrapper">
    <div class="calendar-container">
      <FullCalendar ref="fullCalendar" :options="mergedOptions" />
    </div>

    <!-- 선택된 날짜 정보 표시 (옵션) -->
    <div v-if="showSelectedInfo && selectedDate" class="selected-info">
      <h3>선택된 날짜: {{ formatDate(selectedDate) }}</h3>
      <p>{{ selectedInfoText }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import listPlugin from '@fullcalendar/list'
  import interactionPlugin from '@fullcalendar/interaction'

  // Props 정의
  const props = defineProps({
    // 초기 뷰 설정
    initialView: {
      type: String,
      default: 'dayGridMonth',
      validator: value => ['dayGridMonth', 'listMonth', 'dayGridWeek'].includes(value)
    },

    // 이벤트 데이터
    events: {
      type: Array,
      default: () => []
    },

    // 캘린더 높이
    height: {
      type: [String, Number],
      default: 'auto'
    },

    // 시작 요일 (0: 일요일, 1: 월요일)
    firstDay: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 6
    },

    // 헤더 툴바 표시 여부
    showHeader: {
      type: Boolean,
      default: true
    },

    // 주말 표시 여부
    showWeekends: {
      type: Boolean,
      default: true
    },

    // 선택된 날짜 정보 표시 여부
    showSelectedInfo: {
      type: Boolean,
      default: false
    },

    // 선택된 날짜 정보 텍스트
    selectedInfoText: {
      type: String,
      default: '이 날짜를 선택했습니다.'
    },

    // 날짜 클릭 활성화 여부
    dateClickable: {
      type: Boolean,
      default: true
    },

    // 이벤트 클릭 활성화 여부
    eventClickable: {
      type: Boolean,
      default: true
    },

    // 추가 플러그인
    additionalPlugins: {
      type: Array,
      default: () => []
    },

    // 커스텀 설정 (덮어쓰기용)
    customOptions: {
      type: Object,
      default: () => ({})
    }
  })

  // Emits 정의
  const emit = defineEmits(['dateClick', 'eventClick', 'dateSelect', 'eventChange'])

  // 내부 상태
  const selectedDate = ref(null)
  const fullCalendar = ref(null)

  // 기본 플러그인 + 추가 플러그인
  const allPlugins = computed(() => [
    dayGridPlugin,
    listPlugin,
    interactionPlugin,
    ...props.additionalPlugins
  ])

  // 헤더 툴바 설정
  const headerToolbar = computed(() => {
    if (!props.showHeader) return false

    return {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    }
  })

  // 캘린더 옵션 병합
  const mergedOptions = computed(() => {
    const baseOptions = {
      // 플러그인 설정
      plugins: allPlugins.value,

      // 초기 뷰
      initialView: props.initialView,

      // 헤더 툴바
      headerToolbar: headerToolbar.value,

      // 한국어 설정
      locale: 'ko',

      // 시작 요일
      firstDay: props.firstDay,

      // 높이 설정
      height: props.height,

      // 이벤트 데이터
      events: props.events,

      // 주말 표시
      weekends: props.showWeekends,

      // 이벤트 핸들러
      dateClick: props.dateClickable ? handleDateClick : undefined,
      eventClick: props.eventClickable ? handleEventClick : undefined,
      select: handleDateSelect,
      eventChange: handleEventChange,

      // 버튼 텍스트 커스터마이징
      buttonText: {
        today: '오늘',
        month: '월',
        listMonth: '일정목록',
        week: '주'
      },

      // 날짜 포맷 설정
      dayHeaderFormat: { weekday: 'short' },

      // 이벤트 표시 설정
      eventDisplay: 'block',

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
      noEventsText: '표시할 이벤트가 없습니다',

      // 선택 가능하도록 설정
      selectable: true,
      selectMirror: true
    }

    // 커스텀 옵션으로 덮어쓰기
    return { ...baseOptions, ...props.customOptions }
  })

  // 이벤트 핸들러들
  function handleDateClick(info) {
    selectedDate.value = info.date
    emit('dateClick', info)
  }

  function handleEventClick(info) {
    emit('eventClick', info)
  }

  function handleDateSelect(info) {
    emit('dateSelect', info)
  }

  function handleEventChange(info) {
    emit('eventChange', info)
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

  // 캘린더 API 메서드들
  function goToToday() {
    const calendarApi = fullCalendar.value?.getApi()
    calendarApi?.today()
  }

  function goToDate(date) {
    const calendarApi = fullCalendar.value?.getApi()
    calendarApi?.gotoDate(date)
  }

  function addEvent(eventInfo) {
    const calendarApi = fullCalendar.value?.getApi()
    calendarApi?.addEvent(eventInfo)
  }

  function removeEvent(eventId) {
    const calendarApi = fullCalendar.value?.getApi()
    const event = calendarApi?.getEventById(eventId)
    event?.remove()
  }

  function updateEvent(eventId, updateInfo) {
    const calendarApi = fullCalendar.value?.getApi()
    const event = calendarApi?.getEventById(eventId)
    if (event) {
      Object.assign(event, updateInfo)
    }
  }

  function changeView(viewName) {
    const calendarApi = fullCalendar.value?.getApi()
    calendarApi?.changeView(viewName)
  }

  function getEvents() {
    const calendarApi = fullCalendar.value?.getApi()
    return calendarApi?.getEvents() || []
  }

  function refetchEvents() {
    const calendarApi = fullCalendar.value?.getApi()
    calendarApi?.refetchEvents()
  }

  // 외부에서 사용할 수 있도록 노출
  defineExpose({
    goToToday,
    goToDate,
    addEvent,
    removeEvent,
    updateEvent,
    changeView,
    getEvents,
    refetchEvents,
    selectedDate
  })
</script>

<style scoped>
  .custom-calendar-wrapper {
    width: 100%;
  }

  .calendar-container {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
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
    font-size: 16px;
    font-weight: 600;
  }

  .selected-info p {
    margin: 0;
    color: #666;
    font-size: 14px;
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
    border-radius: 6px;
    padding: 6px 12px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  :deep(.fc-button-primary:hover) {
    background-color: #0066cc;
    border-color: #0066cc;
    transform: translateY(-1px);
  }

  :deep(.fc-button-primary:disabled) {
    background-color: #94a3b8;
    border-color: #94a3b8;
  }

  :deep(.fc-today-button) {
    background-color: #28a745;
    border-color: #28a745;
  }

  :deep(.fc-today-button:hover) {
    background-color: #218838;
    border-color: #1e7e34;
  }

  :deep(.fc-daygrid-day.fc-day-today) {
    background-color: rgba(0, 132, 255, 0.1);
  }

  :deep(.fc-daygrid-day:hover) {
    background-color: rgba(0, 132, 255, 0.05);
    cursor: pointer;
  }

  :deep(.fc-daygrid-day-number) {
    padding: 8px;
    font-weight: 500;
  }

  :deep(.fc-event) {
    border-radius: 4px;
    font-weight: 500;
    padding: 2px 4px;
    margin: 1px 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  :deep(.fc-event:hover) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  :deep(.fc-list-event:hover) {
    background-color: #f8f9fa;
  }

  :deep(.fc-col-header-cell) {
    background-color: #f8f9fa;
    font-weight: 600;
    border-color: #dee2e6;
  }

  :deep(.fc-scrollgrid) {
    border-color: #dee2e6;
  }

  :deep(.fc-scrollgrid td, .fc-scrollgrid th) {
    border-color: #dee2e6;
  }

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .calendar-container {
      padding: 10px;
      margin: 0 -10px;
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    :deep(.fc-toolbar) {
      flex-direction: column;
      gap: 10px;
    }

    :deep(.fc-toolbar-chunk) {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5px;
    }

    :deep(.fc-button) {
      padding: 4px 8px;
      font-size: 12px;
    }

    :deep(.fc-toolbar-title) {
      font-size: 1.2em;
    }
  }

  @media (max-width: 480px) {
    :deep(.fc-daygrid-day-number) {
      padding: 4px;
      font-size: 12px;
    }

    :deep(.fc-event-title) {
      font-size: 11px;
    }
  }
</style>
