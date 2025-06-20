<template>
  <div
    class="ui-datepicker"
    :class="[
      `ui-datepicker--${size}`,
      {
        'ui-datepicker--opened': isOpen,
        'ui-datepicker--range': isRange,
        'ui-datepicker--disabled': disabled,
        'ui-datepicker--error': error,
        'ui-datepicker--block': block,
        'ui-datepicker--full': full,
        'ui-datepicker--has-value': isRange ? startDate || endDate : selectedDate
      }
    ]"
  >
    <label v-if="label" class="ui-datepicker__label" :for="id">
      {{ label }}
      <span v-if="required" class="ui-datepicker__required">*</span>
    </label>

    <div class="ui-datepicker__wrapper">
      <!-- 단일 날짜 선택 -->
      <div v-if="!isRange" class="ui-datepicker__input" @click="openCalendar">
        <i class="icon icon-calendar icon-md ui-datepicker__icon"></i>
        <div class="ui-datepicker__text">
          <span v-if="selectedDate" class="ui-datepicker__selected-text">{{
            formatDate(selectedDate)
          }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ placeholder || '날짜 선택' }}</span>
        </div>
        <i
          v-if="selectedDate && clearable"
          class="icon icon-x-circle icon-md ui-datepicker__clear"
          @click.stop="clearDate"
        ></i>
      </div>

      <!-- 범위 날짜 선택 -->
      <div v-if="isRange" class="ui-datepicker__range-input" @click="openCalendar">
        <i class="icon icon-calendar icon-md ui-datepicker__icon"></i>
        <div class="ui-datepicker__range-text">
          <span v-if="startDate" class="ui-datepicker__selected-text">{{
            formatDate(startDate)
          }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ startPlaceholder || '시작일' }}</span>
        </div>
        <div class="ui-datepicker__range-separator">-</div>
        <div class="ui-datepicker__range-text">
          <span v-if="endDate" class="ui-datepicker__selected-text">{{ formatDate(endDate) }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ endPlaceholder || '종료일' }}</span>
        </div>
        <i
          v-if="(startDate || endDate) && clearable"
          class="icon icon-x-circle icon-md ui-datepicker__clear"
          @click.stop="clearDate"
        ></i>
      </div>
    </div>

    <!-- 캘린더 -->
    <div v-if="isOpen" class="ui-datepicker__calendar">
      <!-- 날짜 선택 모드 -->
      <div v-if="viewMode === 'days'">
        <div class="ui-datepicker__header">
          <button
            class="ui-datepicker__arrow ui-datepicker__arrow--prev"
            @click="prevMonth"
            type="button"
          >
            <i class="icon icon-chevron-left icon-md"></i>
          </button>

          <div class="ui-datepicker__selectors">
            <!-- 월 선택 드롭다운 -->
            <div class="ui-datepicker__dropdown">
              <div class="ui-datepicker__month-select" @click.stop="toggleMonthDropdown">
                {{ currentMonthName }}
                <i class="icon icon-chevron-down icon-sm"></i>
              </div>
              <div v-if="monthDropdownOpen" class="ui-datepicker__dropdown-list" @click.stop>
                <div
                  v-for="(month, index) in months"
                  :key="month"
                  class="ui-datepicker__dropdown-item"
                  :class="{
                    'ui-datepicker__dropdown-item--selected': currentMonth === index
                  }"
                  @click="selectMonth(index)"
                >
                  {{ month }}
                </div>
              </div>
            </div>

            <!-- 년도 선택 드롭다운 -->
            <div class="ui-datepicker__dropdown">
              <div class="ui-datepicker__year-select" @click.stop="toggleYearDropdown">
                {{ currentYear }}
                <i class="icon icon-chevron-down icon-sm"></i>
              </div>
              <div v-if="yearDropdownOpen" class="ui-datepicker__dropdown-list" @click.stop>
                <div
                  v-for="year in yearRange"
                  :key="year"
                  class="ui-datepicker__dropdown-item"
                  :class="{
                    'ui-datepicker__dropdown-item--selected': currentYear === year
                  }"
                  @click="selectYear(year)"
                >
                  {{ year }}
                </div>
              </div>
            </div>
          </div>

          <button
            class="ui-datepicker__arrow ui-datepicker__arrow--next"
            @click="nextMonth"
            type="button"
          >
            <i class="icon icon-chevron-right icon-md"></i>
          </button>
        </div>

        <div class="ui-datepicker__weekdays">
          <div v-for="day in weekdays" :key="day" class="ui-datepicker__weekday">
            {{ day }}
          </div>
        </div>

        <div class="ui-datepicker__days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="ui-datepicker__day"
            :class="{
              'ui-datepicker__day--other-month': !day.currentMonth,
              'ui-datepicker__day--today': day.isToday,
              'ui-datepicker__day--selected': isSelected(day.date),
              'ui-datepicker__day--in-range': isInRange(day.date),
              'ui-datepicker__day--disabled': isDateDisabled(day.date)
            }"
            @click="!isDateDisabled(day.date) && selectDate(day)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>

      <div v-if="isRange && viewMode === 'days'" class="ui-datepicker__actions">
        <button
          class="ui-datepicker__action-button ui-datepicker__action-button--cancel"
          @click="cancelSelection"
        >
          취소
        </button>
        <button
          class="ui-datepicker__action-button ui-datepicker__action-button--apply"
          @click="applySelection"
        >
          적용
        </button>
      </div>
    </div>

    <div v-if="error && errorMessage" class="ui-datepicker__error">
      {{ errorMessage }}
    </div>
    <div v-else-if="helperText" class="ui-datepicker__helper">
      {{ helperText }}
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [Date, String, Array, null],
      default: null
    },
    isRange: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '날짜 선택'
    },
    full: {
      type: Boolean,
      default: false
    },
    startPlaceholder: {
      type: String,
      default: '시작일'
    },
    endPlaceholder: {
      type: String,
      default: '종료일'
    },
    format: {
      type: String,
      default: 'YYYY.MM.DD'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    },
    minDate: {
      type: [Date, String],
      default: null
    },
    maxDate: {
      type: [Date, String],
      default: null
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    block: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  // 상태 관리
  const isOpen = ref(false)
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  const selectedDate = ref(null)
  const startDate = ref(null)
  const endDate = ref(null)
  const tempStartDate = ref(null)
  const tempEndDate = ref(null)
  const viewMode = ref('days')

  // 월/년도 드롭다운 상태
  const monthDropdownOpen = ref(false)
  const yearDropdownOpen = ref(false)

  // 요일 이름과 월 이름
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ]

  // 년도 목록 생성 (현재 년도 기준 -10년 ~ +10년)
  const yearRange = computed(() => {
    const yearList = []
    const startYear = currentYear.value - 10
    const endYear = currentYear.value + 10

    for (let year = startYear; year <= endYear; year++) {
      yearList.push(year)
    }

    return yearList
  })

  // 현재 월 이름
  const currentMonthName = computed(() => {
    return months[currentMonth.value]
  })

  // 캘린더 날짜 계산
  const calendarDays = computed(() => {
    const days = []

    // 월의 첫째 날과 마지막 날
    const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
    const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)

    // 첫째 날의 요일 (0 = 일요일)
    const firstDayWeekday = firstDayOfMonth.getDay()

    // 이전 달의 마지막 날
    const lastDayOfPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()

    // 이전 달의 날짜 추가
    for (let i = 0; i < firstDayWeekday; i++) {
      const date = new Date(
        currentYear.value,
        currentMonth.value - 1,
        lastDayOfPrevMonth - firstDayWeekday + i + 1
      )
      days.push({
        day: date.getDate(),
        date: date,
        currentMonth: false,
        disabled: isDateDisabled(date),
        selected: isSameDate(date, selectedDate.value),
        rangeStart: isSameDate(date, startDate.value),
        rangeEnd: isSameDate(date, endDate.value),
        inRange: isInRange(date)
      })
    }

    // 현재 달의 날짜 추가
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentYear.value, currentMonth.value, i)
      days.push({
        day: i,
        date: date,
        currentMonth: true,
        disabled: isDateDisabled(date),
        selected: isSameDate(date, selectedDate.value),
        rangeStart: isSameDate(date, startDate.value),
        rangeEnd: isSameDate(date, endDate.value),
        inRange: isInRange(date)
      })
    }

    // 다음 달의 날짜 추가 (6주를 채우기 위해)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear.value, currentMonth.value + 1, i)
      days.push({
        day: i,
        date: date,
        currentMonth: false,
        disabled: isDateDisabled(date),
        selected: isSameDate(date, selectedDate.value),
        rangeStart: isSameDate(date, startDate.value),
        rangeEnd: isSameDate(date, endDate.value),
        inRange: isInRange(date)
      })
    }

    return days
  })

  // 초기화
  onMounted(() => {
    initializeValues()
    document.addEventListener('click', handleClickOutside)
  })

  // 언마운트시 이벤트 리스너 제거
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  // 초기 값 설정
  function initializeValues() {
    if (props.modelValue) {
      if (props.isRange && Array.isArray(props.modelValue)) {
        // 범위 모드일 때 배열로 받음 [시작일, 종료일]
        if (props.modelValue[0]) {
          startDate.value = new Date(props.modelValue[0])
        }
        if (props.modelValue[1]) {
          endDate.value = new Date(props.modelValue[1])
        }

        // 설정된 날짜 기준으로 캘린더 월/년 설정
        if (startDate.value) {
          currentMonth.value = startDate.value.getMonth()
          currentYear.value = startDate.value.getFullYear()
        }
      } else if (!props.isRange) {
        // 단일 날짜 모드
        try {
          selectedDate.value = new Date(props.modelValue)

          if (!isNaN(selectedDate.value.getTime())) {
            currentMonth.value = selectedDate.value.getMonth()
            currentYear.value = selectedDate.value.getFullYear()
          } else {
            selectedDate.value = null
          }
        } catch (e) {
          selectedDate.value = null
        }
      }
    }
  }

  // 월/년도 드롭다운 토글 메서드
  function toggleMonthDropdown() {
    monthDropdownOpen.value = !monthDropdownOpen.value
    if (monthDropdownOpen.value) {
      yearDropdownOpen.value = false
    }
  }

  function toggleYearDropdown() {
    yearDropdownOpen.value = !yearDropdownOpen.value
    if (yearDropdownOpen.value) {
      monthDropdownOpen.value = false
    }
  }

  // 모든 드롭다운 닫기
  function closeAllDropdowns() {
    monthDropdownOpen.value = false
    yearDropdownOpen.value = false
  }

  // 날짜 비교 유틸리티 함수
  function isSameDate(date1, date2) {
    if (!date1 || !date2) return false
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  // 날짜가 비활성화되었는지 확인
  function isDateDisabled(date) {
    if (props.minDate) {
      const minDate = new Date(props.minDate)
      if (date < minDate) return true
    }

    if (props.maxDate) {
      const maxDate = new Date(props.maxDate)
      if (date > maxDate) return true
    }

    return false
  }

  // 날짜가 선택되었는지 확인
  function isSelected(date) {
    if (!date) return false

    if (props.isRange) {
      // 범위 선택 모드에서는 시작일과 종료일 확인
      return (
        (startDate.value && isSameDate(date, startDate.value)) ||
        (endDate.value && isSameDate(date, endDate.value))
      )
    } else {
      // 단일 선택 모드에서는 선택된 날짜와 비교
      return selectedDate.value && isSameDate(date, selectedDate.value)
    }
  }

  // 날짜가 범위 내에 있는지 확인
  function isInRange(date) {
    if (!props.isRange || !startDate.value || !endDate.value || !date) return false

    return date > startDate.value && date < endDate.value
  }

  // 날짜 포맷팅
  function formatDate(date) {
    if (!date || isNaN(date.getTime())) {
      return ''
    }

    try {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      let formattedDate = props.format
      formattedDate = formattedDate.replace('YYYY', year)
      formattedDate = formattedDate.replace('MM', month)
      formattedDate = formattedDate.replace('DD', day)

      return formattedDate
    } catch (e) {
      return ''
    }
  }

  // 캘린더 열기
  function openCalendar() {
    if (props.disabled) return

    isOpen.value = true
    viewMode.value = 'days'

    if (props.isRange) {
      // 범위 모드에서 열 때 임시 값 저장
      tempStartDate.value = startDate.value ? new Date(startDate.value) : null
      tempEndDate.value = endDate.value ? new Date(endDate.value) : null
    }
  }

  // 외부 클릭 처리
  function handleClickOutside(event) {
    const datepicker = event.target.closest('.ui-datepicker')

    if (!datepicker && isOpen.value) {
      if (props.isRange) {
        // 범위 모드에서는, 외부 클릭시 이전 선택으로 되돌림
        startDate.value = tempStartDate.value
        endDate.value = tempEndDate.value
      }
      isOpen.value = false
      closeAllDropdowns()
    }
  }

  // 이전/다음 월 이동
  function prevMonth() {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
    closeAllDropdowns()
  }

  function nextMonth() {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
    closeAllDropdowns()
  }

  // 이전/다음 년도 이동
  function prevYear() {
    currentYear.value--
    closeAllDropdowns()
  }

  function nextYear() {
    currentYear.value++
    closeAllDropdowns()
  }

  // 월 선택
  function selectMonth(monthIndex) {
    currentMonth.value = monthIndex
    monthDropdownOpen.value = false
  }

  // 년도 선택
  function selectYear(year) {
    currentYear.value = year
    yearDropdownOpen.value = false
  }

  // 날짜 선택
  function selectDate(day) {
    if (day.disabled) return
    closeAllDropdowns()

    if (props.isRange) {
      // 범위 선택 모드
      if (!startDate.value || (startDate.value && endDate.value)) {
        // 시작일이 없거나, 이미 범위가 선택된 경우 => 시작일로 설정
        startDate.value = new Date(day.date)
        endDate.value = null
      } else {
        // 시작일 이후의 날짜만 종료일로 선택 가능
        if (day.date >= startDate.value) {
          endDate.value = new Date(day.date)
          // 자동 적용 (옵션)
          applySelection()
        } else {
          // 시작일보다 이전 날짜를 선택한 경우, 시작일을 변경
          const temp = new Date(startDate.value)
          startDate.value = new Date(day.date)
          endDate.value = temp
          // 자동 적용 (옵션)
          applySelection()
        }
      }
    } else {
      // 단일 선택 모드
      selectedDate.value = new Date(day.date)

      // 선택 즉시 적용하고 닫기
      emit('update:modelValue', selectedDate.value)
      emit('change', selectedDate.value)
      isOpen.value = false
    }
  }

  // 날짜 지우기
  function clearDate(event) {
    event.stopPropagation()

    if (props.isRange) {
      startDate.value = null
      endDate.value = null
      emit('update:modelValue', [null, null])
      emit('change', [null, null])
    } else {
      selectedDate.value = null
      emit('update:modelValue', null)
      emit('change', null)
    }
  }

  // 범위 선택 취소
  function cancelSelection() {
    startDate.value = tempStartDate.value
    endDate.value = tempEndDate.value
    isOpen.value = false
    closeAllDropdowns()
  }

  // 범위 선택 적용
  function applySelection() {
    if (startDate.value && endDate.value) {
      emit('update:modelValue', [startDate.value, endDate.value])
      emit('change', [startDate.value, endDate.value])
      isOpen.value = false
      closeAllDropdowns()
    }
  }

  // 모델 값 변경 감시
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue === null || newValue === undefined) {
        selectedDate.value = null
        startDate.value = null
        endDate.value = null
        return
      }

      if (props.isRange && Array.isArray(newValue)) {
        startDate.value = newValue[0] ? new Date(newValue[0]) : null
        endDate.value = newValue[1] ? new Date(newValue[1]) : null
      } else if (!props.isRange) {
        try {
          selectedDate.value = newValue ? new Date(newValue) : null
        } catch (e) {
          selectedDate.value = null
        }
      }
    },
    { immediate: true }
  )

  // 선택한 날짜가 변경될 때마다 캘린더 업데이트
  watch([selectedDate, startDate, endDate], () => {
    const dateToUse = props.isRange ? startDate.value || endDate.value : selectedDate.value

    if (dateToUse) {
      currentMonth.value = dateToUse.getMonth()
      currentYear.value = dateToUse.getFullYear()
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:color';

  .ui-datepicker {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 250px;

    &--full {
      max-width: 100%;
    }

    // 값이 입력되었을 때 스타일
    &--has-value {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        border: 1px solid $border-color-filled;
      }
    }

    // 크기 변형 - Small (32px)
    &--small {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        height: $ui-height-sm; // 32px
        padding: $ui-padding-sm;
      }

      .ui-datepicker__placeholder,
      .ui-datepicker__selected-text {
        font-size: $ui-font-sm;
      }

      .ui-datepicker__range-text {
        font-size: $ui-font-sm;
      }
    }

    // 크기 변형 - Medium (40px)
    &--medium {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        height: $ui-height-md; // 40px
        padding: $ui-padding-md;
      }

      .ui-datepicker__placeholder,
      .ui-datepicker__selected-text {
        font-size: $ui-font-md;
      }

      .ui-datepicker__range-text {
        font-size: $ui-font-md;
      }
    }

    // 크기 변형 - Large (48px)
    &--large {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        height: $ui-height-lg; // 48px
        padding: $ui-padding-lg;
      }

      .ui-datepicker__placeholder,
      .ui-datepicker__selected-text {
        font-size: $ui-font-lg;
      }

      .ui-datepicker__range-text {
        font-size: $ui-font-lg;
      }
    }

    // 크기 변형 - XLarge (56px)
    &--xlarge {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        height: $ui-height-xl; // 56px
        padding: $ui-padding-xl;
      }

      .ui-datepicker__placeholder,
      .ui-datepicker__selected-text {
        font-size: $ui-font-xl;
      }

      .ui-datepicker__range-text {
        font-size: $ui-font-xl;
      }
    }

    &__label {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-gray-70, #464c53);
      margin-bottom: 4px;
    }

    &__required {
      color: var(--color-system-r30, #f30);
      margin-left: 2px;
    }

    &__wrapper {
      position: relative;
    }

    &__input,
    &__range-input {
      display: flex;
      align-items: center;
      height: $ui-height-md; // 기본 높이 40px
      padding: $ui-padding-md;
      border: 1px solid $border-color-light;
      border-radius: 4px;
      background: var(--color-gray-0, #fff);
      cursor: pointer;
      transition: all 0.2s ease;
      box-sizing: border-box;

      &:hover {
        border-color: var(--color-gray-50, #6e7781);
      }
    }

    &__icon {
      color: var(--color-gray-40, #8a949e);
      margin-right: 8px;
      flex-shrink: 0;
    }

    &__text,
    &__range-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--color-gray-70, #464c53);
      font-size: 14px;
    }

    &__placeholder {
      color: $placeholder-color;
      font-family: $placeholder-font-family;
      font-size: $ui-font-md;
      font-style: normal;
      font-weight: $placeholder-font-weight;
      line-height: $placeholder-line-height;
    }

    &__selected-text {
      color: var(--color-gray-70, #464c53);
    }

    &__range-separator {
      margin: 0 8px;
      color: var(--color-gray-40, #8a949e);
    }

    &__clear {
      margin-left: 8px;
      cursor: pointer;
      color: var(--color-gray-40, #8a949e);
      flex-shrink: 0;

      &:hover {
        color: var(--color-gray-70, #464c53);
      }
    }

    &__calendar {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 100;
      width: 280px;
      background: var(--color-gray-0, #fff);
      border: 1px solid var(--color-gray-20, #cdd1d5);
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: datepickerFadeIn 0.2s ease;
      overflow: hidden;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
    }

    &__selectors {
      display: flex;
      gap: 8px;
    }

    &__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 30px;
      border: none;
      background: transparent;
      border-radius: 4px;
      cursor: pointer;
      color: var(--color-gray-60, #58616a);

      &:hover {
        background: var(--color-gray-10, #e6e8ea);
      }
    }

    &__dropdown {
      position: relative;
    }

    &__month-select,
    &__year-select {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      color: var(--color-gray-70, #464c53);

      &:hover {
        background: var(--color-gray-10, #e6e8ea);
      }
    }

    &__dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      width: 120px;
      max-height: 200px;
      overflow-y: auto;
      background: var(--color-gray-0, #fff);
      border: 1px solid var(--color-gray-20, #cdd1d5);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    &__dropdown-item {
      padding: 6px 12px;
      cursor: pointer;
      color: var(--color-gray-70, #464c53);

      &:hover {
        background: var(--color-gray-10, #e6e8ea);
      }

      &--selected {
        background: var(--color-system-b10, #e6f4ff);
        color: var(--color-system-b30, #0084ff);
        font-weight: 500;
      }
    }

    &__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 8px 0;
      border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
    }

    &__weekday {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      color: var(--color-gray-60, #58616a);
    }

    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 8px;
    }

    &__day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;
      margin: 2px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      color: var(--color-gray-70, #464c53);

      &:hover:not(&--disabled):not(&--selected) {
        background: var(--color-gray-10, #e6e8ea);
      }

      &--other-month {
        color: var(--color-gray-30, #b1b8be);
      }

      &--today {
        font-weight: 500;
        border: 1px solid var(--color-gray-30, #b1b8be);
      }

      &--selected {
        background: var(--color-system-b30, #0084ff);
        color: var(--color-gray-0, #fff);
      }

      &--in-range {
        background: var(--color-system-b10, #e6f4ff);
        border-radius: 0;
      }

      &--disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid var(--color-gray-20, #cdd1d5);
    }

    &__action-button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;

      &--cancel {
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-70, #464c53);

        &:hover {
          background: var(--color-gray-20, #cdd1d5);
        }
      }

      &--apply {
        background: var(--color-system-b30, #0084ff);
        color: var(--color-gray-0, #fff);

        &:hover {
          background: var(--color-system-b40, #0068cc);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }

    &__error {
      font-size: 12px;
      color: var(--color-system-r30, #f30);
      margin-top: 2px;
    }

    &__helper {
      font-size: 12px;
      color: var(--color-gray-60, #58616a);
      margin-top: 2px;
    }

    // 상태 변형
    &--disabled {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }

      .ui-datepicker__text,
      .ui-datepicker__range-text,
      .ui-datepicker__placeholder,
      .ui-datepicker__selected-text,
      .ui-datepicker__icon {
        color: var(--color-gray-30, #b1b8be);
      }
    }

    &--error {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        border: 1px solid var(--color-system-r30, #f30);
        color: var(--color-gray-70, #464c53);

        &:focus-within {
          box-shadow: 0 0 0 2px rgba(255, 51, 0, 0.1);
        }
      }
    }

    &--block {
      .ui-datepicker__input,
      .ui-datepicker__range-input {
        width: 100%;
      }
    }
  }

  @keyframes datepickerFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
