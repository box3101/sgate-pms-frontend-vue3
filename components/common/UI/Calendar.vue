<!-- components/common/UI/CustomCalendar.vue -->
<template>
  <div class="custom-calendar-wrapper" :style="wrapperStyles">
    <div class="calendar-container" :style="containerStyles">
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

    // 캘린더 높이 (auto, 픽셀값, vh 등)
    height: {
      type: [String, Number],
      default: 'auto'
    },

    // 뷰포트 높이 사용 여부 (vh 단위)
    useViewportHeight: {
      type: Boolean,
      default: false
    },

    // vh 값 (useViewportHeight가 true일 때)
    viewportHeight: {
      type: [String, Number],
      default: 80
    },

    // 셀 높이 커스터마이징
    cellHeight: {
      type: [String, Number],
      default: 100 // 기본 셀 높이
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

  // 컨테이너 스타일 계산
  const wrapperStyles = computed(() => {
    const styles = {}

    if (props.useViewportHeight) {
      const vhValue =
        typeof props.viewportHeight === 'number'
          ? `${props.viewportHeight}vh`
          : props.viewportHeight
      styles.height = vhValue
      styles.display = 'flex'
      styles.flexDirection = 'column'
    }

    return styles
  })

  const containerStyles = computed(() => {
    const styles = {}

    if (props.useViewportHeight) {
      styles.flex = '1'
      styles.display = 'flex'
      styles.flexDirection = 'column'
    }

    return styles
  })

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
      left: '',
      center: 'prev title next today', // 중앙에 모두 배치
      right: ''
    }
  })

  // 계산된 높이값
  const computedHeight = computed(() => {
    if (props.useViewportHeight) {
      return '100%' // 컨테이너가 flex로 설정되어 있어서 100% 사용
    }
    return props.height
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
      height: computedHeight.value,

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
      selectMirror: true,

      // 셀 높이 설정 (dayGrid 뷰에서만 적용)
      dayMaxEvents: false, // 이벤트 제한 없음
      moreLinkClick: 'popover'
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

<style scoped lang="scss">
  .custom-calendar-wrapper {
    width: 100%;
  }

  .calendar-container {
    background: white;
    border-radius: 8px;
    padding: 20px;
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

  /* FullCalendar 커스터마이징 - 디자인 시스템 적용 */
  :deep(.fc) {
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    height: 100%;
  }

  :deep(.fc-view-harness) {
    height: 100% !important;
  }

  :deep(.fc-toolbar-title) {
    font-size: 20px;
    font-weight: 700;
    color: #464c53; /* $text-default-color */
    line-height: 150%;
  }

  /* 버튼 기본 스타일 */
  :deep(.fc-button) {
    border-radius: 6px; /* $border-radius-md */
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 14px; /* $font-size-md */
    font-weight: 500;
    height: 32px; /* $ui-height-md */
    padding: 0 8px; /* $spacing-md */
    transition: all 0.2s ease; /* $transition-normal */
    border-width: 1px; /* $border-width */
    box-shadow: none;
  }

  /* Primary 버튼 (prev, next, month 등) */
  :deep(.fc-button-primary) {
    background-color: transparent;
    border-color: transparent;
    color: #000;
  }

  :deep(.fc-button-primary:hover) {
    transform: translateY(-1px);
  }

  :deep(.fc-button-primary:active) {
    transform: translateY(0);
  }

  :deep(.fc-button-primary:disabled) {
    border-color: #b1b8be;
    color: #fff;
    transform: none;
    box-shadow: none;
  }

  /* Today 버튼 - Success 색상 사용 */
  :deep(.fc-today-button) {
    border-radius: 4px !important;
    background: var(--color-primary-50, #0af) !important;
    border: none !important;
    color: var(--color-primary-70, #006699) !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    padding: 12px 6px !important;
    min-width: 72px !important;
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    @include font-style($body-small-bold);
    color: #fff !important;
  }

  :deep(.fc-today-button:hover) {
    background-color: #009a3e;
    border-color: #009a3e;
  }

  :deep(.fc-today-button:active) {
    background-color: #008034;
    border-color: #008034;
  }

  /* 오늘 날짜 배경 */
  :deep(.fc-daygrid-day.fc-day-today) {
    background-color: #e5f6ff; /* $primary-5 */
  }

  /* 날짜 칸 호버 효과 */
  :deep(.fc-daygrid-day:hover) {
    background-color: #cceeff; /* $primary-10 */
    cursor: pointer;
  }

  /* 셀 스타일링 */
  :deep(.fc-daygrid-day-number) {
    padding: 8px;
    font-weight: 500;
    font-size: 14px; /* $font-size-md */
    color: #464c53; /* $text-default-color */
  }

  /* 이벤트 스타일링 */
  :deep(.fc-event) {
    border-radius: 4px; /* $border-radius-sm */
    font-weight: 500;
    padding: 4px 8px; /* $spacing-xxs $spacing-xs */
    margin: 2px 0;
    cursor: pointer;
    transition: all 0.2s ease; /* $transition-normal */
    font-size: 12px; /* $font-size-sm */
    line-height: 150%;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  :deep(.fc-event:hover) {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); /* $shadow-color */
  }

  :deep(.fc-list-event:hover) {
    background-color: #f4f5f6; /* $gray-5 */
  }

  /* 헤더 스타일링 */
  :deep(.fc-col-header-cell) {
    background-color: #e5f6ff; /* $gray-5 */
    font-weight: 600;
    padding: 8px;
    @include font-style($body-large-bold);
    color: $gray-90;
  }

  :deep(.fc .fc-daygrid-day-top) {
    flex-direction: column;
  }

  /* 테두리 색상 통일 */
  :deep(.fc-scrollgrid) {
    border-color: #e6e8ea; /* $gray-10 */
    height: 100%;
  }

  :deep(.fc-scrollgrid td, .fc-scrollgrid th) {
    border-color: #e6e8ea; /* $gray-10 */
  }

  /* 컨테이너 스타일 업데이트 */
  .calendar-container {
    background: white;
    border-radius: 8px; /* $border-radius-lg */
    padding: 24px; /* $spacing-lg */
    border: 1px solid #e6e8ea; /* $gray-10 */
  }

  .selected-info {
    margin-top: 24px; /* $spacing-lg */
    padding: 16px; /* $spacing-md */
    background-color: #e5f6ff; /* $primary-5 */
    border-radius: 6px; /* $border-radius-md */
    border-left: 3px solid #00aaff; /* $primary-color */
  }

  .selected-info h3 {
    margin: 0 0 8px 0; /* $spacing-xs */
    color: #006699; /* $primary-70 */
    font-size: 16px; /* $font-size-lg */
    font-weight: 600;
  }

  .selected-info p {
    margin: 0;
    color: #6d7882; /* $gray-50 */
    font-size: 14px; /* $font-size-md */
  }

  /* 셀 높이 조정 */
  :deep(.fc-daygrid-day-frame) {
    min-height: v-bind('`${cellHeight}px`');
    display: flex;
    flex-direction: column;
  }

  :deep(.fc-daygrid-day-top) {
    flex-shrink: 0;
  }

  :deep(.fc-daygrid-day-events) {
    flex: 1;
    margin-top: 4px;
  }

  /* vh 사용시 높이 조정 */
  :deep(.fc-view-harness-active > .fc-view) {
    height: 100% !important;
  }

  :deep(.fc-daygrid-body) {
    height: 100%;
  }

  :deep(.fc-scrollgrid-sync-table) {
    height: 100%;
  }

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .calendar-container {
      padding: 16px; /* $spacing-md */
      margin: 0 -16px;
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    :deep(.fc-toolbar) {
      flex-direction: column;
      gap: 12px; /* $spacing-sm */
    }

    :deep(.fc-toolbar-chunk) {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px; /* $spacing-xs */
    }

    :deep(.fc-button) {
      height: 28px; /* $ui-height-sm */
      padding: 0 12px; /* $spacing-sm */
      font-size: 12px; /* $font-size-sm */
    }

    :deep(.fc-toolbar-title) {
      font-size: 18px; /* $heading-sm */
    }

    :deep(.fc-daygrid-day-frame) {
      min-height: v-bind('`${Math.max(cellHeight * 0.7, 60)}px`');
    }
  }

  @media (max-width: 480px) {
    .calendar-container {
      padding: 12px; /* $spacing-sm */
    }

    :deep(.fc-daygrid-day-number) {
      padding: 4px; /* $spacing-xxs */
      font-size: 12px; /* $font-size-sm */
    }

    :deep(.fc-event-title) {
      font-size: 10px; /* $font-size-xs */
    }

    :deep(.fc-daygrid-day-frame) {
      min-height: v-bind('`${Math.max(cellHeight * 0.6, 50)}px`');
    }

    :deep(.fc-button) {
      height: 24px; /* $ui-height-xs */
      padding: 0 8px; /* $spacing-xs */
      font-size: 10px; /* $font-size-xs */
    }
  }

  :deep(.fc-toolbar-chunk) {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  :deep(.fc-toolbar-center) {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  :deep(.fc-toolbar-title) {
    margin: 0 !important;
    padding: 0 8px;
    font-size: 28px;
    font-weight: 700;
    color: $gray-90;
  }
  :deep(.fc-direction-ltr .fc-toolbar > * > :not(:first-child)) {
    margin-left: 0px;
  }

  /* 기존 스타일에 추가 */

  /* 토요일 (6번째 열) - 파란색 */
  :deep(.fc-day-sat) {
    .fc-daygrid-day-number {
      color: #0084ff !important;
      font-weight: 600;
    }
  }

  /* 일요일 (첫 번째 열) - 빨간색 */
  :deep(.fc-day-sun) {
    .fc-daygrid-day-number {
      color: #f30 !important;
      font-weight: 600;
    }
  }

  /* 헤더의 토요일/일요일도 색상 적용 */
  :deep(.fc-col-header-cell.fc-day-sat) {
    .fc-col-header-cell-cushion {
      color: #0084ff !important;
      font-weight: 700;
    }
  }

  :deep(.fc-col-header-cell.fc-day-sun) {
    .fc-col-header-cell-cushion {
      color: #f30 !important;
      font-weight: 700;
    }
  }

  /* 더 구체적인 선택자 (필요시) */
  :deep(.fc-daygrid-day.fc-day-sat .fc-daygrid-day-top .fc-daygrid-day-number) {
    color: #0084ff !important;
  }

  :deep(.fc-daygrid-day.fc-day-sun .fc-daygrid-day-top .fc-daygrid-day-number) {
    color: #f30 !important;
  }

  /* 오늘이 토요일/일요일인 경우 처리 */
  :deep(.fc-daygrid-day.fc-day-today.fc-day-sat .fc-daygrid-day-number) {
    color: #0084ff !important;
    background-color: rgba(0, 132, 255, 0.1);
    border-radius: 4px;
    padding: 4px 6px;
  }

  :deep(.fc-daygrid-day.fc-day-today.fc-day-sun .fc-daygrid-day-number) {
    color: #f30 !important;
    background-color: rgba(255, 51, 0, 0.1);
    border-radius: 4px;
    padding: 4px 6px;
  }

  /* 선택적: 주말 전체 배경색도 살짝 다르게 */
  :deep(.fc-day-sat) {
    background-color: rgba(0, 132, 255, 0.02) !important;
  }

  :deep(.fc-day-sun) {
    background-color: rgba(255, 51, 0, 0.02) !important;
  }

  /* 리스트 뷰에서도 적용 */
  :deep(.fc-list-day-side-text) {
    &.fc-day-sat {
      color: #0084ff !important;
    }

    &.fc-day-sun {
      color: #f30 !important;
    }
  } /* 기존 스타일에 추가 */

  /* 토요일 (6번째 열) - 파란색 */
  :deep(.fc-day-sat) {
    .fc-daygrid-day-number {
      color: #0084ff !important;
      font-weight: 600;
    }
  }

  /* 일요일 (첫 번째 열) - 빨간색 */
  :deep(.fc-day-sun) {
    .fc-daygrid-day-number {
      color: #f30 !important;
      font-weight: 600;
    }
  }

  /* 헤더의 토요일/일요일도 색상 적용 */
  :deep(.fc-col-header-cell.fc-day-sat) {
    .fc-col-header-cell-cushion {
      color: #0084ff !important;
      font-weight: 700;
    }
  }

  :deep(.fc-col-header-cell.fc-day-sun) {
    .fc-col-header-cell-cushion {
      color: #f30 !important;
      font-weight: 700;
    }
  }

  /* 더 구체적인 선택자 (필요시) */
  :deep(.fc-daygrid-day.fc-day-sat .fc-daygrid-day-top .fc-daygrid-day-number) {
    color: #0084ff !important;
  }

  :deep(.fc-daygrid-day.fc-day-sun .fc-daygrid-day-top .fc-daygrid-day-number) {
    color: #f30 !important;
  }

  /* 오늘이 토요일/일요일인 경우 처리 */
  :deep(.fc-daygrid-day.fc-day-today.fc-day-sat .fc-daygrid-day-number) {
    color: #0084ff !important;
    background-color: rgba(0, 132, 255, 0.1);
    border-radius: 4px;
    padding: 4px 6px;
  }

  :deep(.fc-daygrid-day.fc-day-today.fc-day-sun .fc-daygrid-day-number) {
    color: #f30 !important;
    background-color: rgba(255, 51, 0, 0.1);
    border-radius: 4px;
    padding: 4px 6px;
  }

  /* 토요일/일요일 배경색 */
  :deep(.fc-day-sat) {
    border-bottom: 1px solid var(--color-gray-20, #cdd1d5) !important;
    background: var(--color-gray-5, #f4f5f6) !important;
  }

  :deep(.fc-day-sun) {
    border-bottom: 1px solid var(--color-gray-20, #cdd1d5) !important;
    background: var(--color-gray-5, #f4f5f6) !important;
  }

  /* 리스트 뷰에서도 적용 */
  :deep(.fc-list-day-side-text) {
    &.fc-day-sat {
      color: #0084ff !important;
    }

    &.fc-day-sun {
      color: #f30 !important;
    }
  }
</style>
