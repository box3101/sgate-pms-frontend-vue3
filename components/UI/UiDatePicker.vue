<template>
  <div
    class="ui-datepicker"
    :class="{
      'ui-datepicker--opened': isOpen,
      'ui-datepicker--range': isRange,
      'ui-datepicker--disabled': disabled,
      'ui-datepicker--error': error
    }"
  >
    <label v-if="label" class="ui-datepicker__label">
      {{ label }}
      <span v-if="required" class="ui-datepicker__required">*</span>
    </label>

    <div class="ui-datepicker__input-wrapper">
      <!-- 단일 날짜 선택 -->
      <div v-if="!isRange" class="ui-datepicker__input" @click="openCalendar">
        <div class="ui-datepicker__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
            <path d="M8 3L8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 3L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="ui-datepicker__text">
          <span v-if="selectedDate" class="ui-datepicker__selected-text">{{ formatDate(selectedDate) }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ placeholder || '날짜 선택' }}</span>
        </div>
        <div class="ui-datepicker__clear" v-if="selectedDate && clearable" @click.stop="clearDate">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- 범위 날짜 선택 -->
      <div v-if="isRange" class="ui-datepicker__range-input" @click="openCalendar">
        <div class="ui-datepicker__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
            <path d="M8 3L8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 3L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="ui-datepicker__range-text">
          <span v-if="startDate" class="ui-datepicker__selected-text">{{ formatDate(startDate) }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ startPlaceholder || '시작일' }}</span>
        </div>
        <div class="ui-datepicker__range-separator">-</div>
        <div class="ui-datepicker__range-text">
          <span v-if="endDate" class="ui-datepicker__selected-text">{{ formatDate(endDate) }}</span>
          <span v-else class="ui-datepicker__placeholder">{{ endPlaceholder || '종료일' }}</span>
        </div>
        <div class="ui-datepicker__clear" v-if="(startDate || endDate) && clearable" @click.stop="clearDate">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="ui-datepicker__selectors">
            <!-- 월 선택 드롭다운 -->
            <div class="ui-datepicker__dropdown">
              <div class="ui-datepicker__month-select" @click.stop="toggleMonthDropdown">
                {{ currentMonthName }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div v-if="monthDropdownOpen" class="ui-datepicker__dropdown-list" @click.stop>
                <div
                  v-for="(month, index) in months"
                  :key="month"
                  class="ui-datepicker__dropdown-item"
                  :class="{ 'ui-datepicker__dropdown-item--selected': currentMonth === index }"
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div v-if="yearDropdownOpen" class="ui-datepicker__dropdown-list ui-datepicker__dropdown-list--years" @click.stop>
                <div class="ui-datepicker__year-scroll">
                  <div
                    v-for="year in yearListToShow"
                    :key="year"
                    class="ui-datepicker__dropdown-item"
                    :class="{ 'ui-datepicker__dropdown-item--selected': currentYear === year }"
                    @click="selectYear(year)"
                  >
                    {{ year }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="ui-datepicker__arrow ui-datepicker__arrow--next"
            @click="nextMonth"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="ui-datepicker__weekdays">
          <div v-for="day in weekdays" :key="day" class="ui-datepicker__weekday">{{ day }}</div>
        </div>

        <div class="ui-datepicker__days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="ui-datepicker__day"
            :class="{
              'ui-datepicker__day--disabled': day.disabled,
              'ui-datepicker__day--other-month': !day.currentMonth,
              'ui-datepicker__day--selected': day.selected,
              'ui-datepicker__day--range-start': day.rangeStart,
              'ui-datepicker__day--range-end': day.rangeEnd,
              'ui-datepicker__day--in-range': day.inRange
            }"
            @click="selectDate(day)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>

      <div v-if="isRange && viewMode === 'days'" class="ui-datepicker__actions">
        <button
          class="ui-datepicker__action-button ui-datepicker__action-button--cancel"
          @click="cancelSelection"
          type="button"
        >
          취소
        </button>
        <button
          class="ui-datepicker__action-button ui-datepicker__action-button--apply"
          @click="applySelection"
          :disabled="!startDate || !endDate"
          type="button"
        >
          적용
        </button>
      </div>
    </div>

    <div v-if="error && errorMessage" class="ui-datepicker__error">{{ errorMessage }}</div>
    <div v-else-if="helperText" class="ui-datepicker__helper">{{ helperText }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

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
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 상태 관리
const isOpen = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const tempStartDate = ref(null);
const tempEndDate = ref(null);
const viewMode = ref('days');

// 월/년도 드롭다운 상태
const monthDropdownOpen = ref(false);
const yearDropdownOpen = ref(false);

// 요일 이름과 월 이름
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

// 년도 목록 생성 (현재 년도 기준 -10년 ~ +10년)
const yearListToShow = computed(() => {
  const yearList = [];
  const startYear = currentYear.value - 50;
  const endYear = currentYear.value + 50;

  for (let year = startYear; year <= endYear; year++) {
    yearList.push(year);
  }

  return yearList;
});

// 현재 월 이름
const currentMonthName = computed(() => {
  return months[currentMonth.value];
});

// 캘린더 날짜 계산
const calendarDays = computed(() => {
  const days = [];

  // 월의 첫째 날과 마지막 날
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);

  // 첫째 날의 요일 (0 = 일요일)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // 이전 달의 마지막 날
  const lastDayOfPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();

  // 이전 달의 날짜 추가
  for (let i = 0; i < firstDayWeekday; i++) {
    const date = new Date(currentYear.value, currentMonth.value - 1, lastDayOfPrevMonth - firstDayWeekday + i + 1);
    days.push({
      day: date.getDate(),
      date: date,
      currentMonth: false,
      disabled: isDateDisabled(date),
      selected: isSameDate(date, selectedDate.value),
      rangeStart: isSameDate(date, startDate.value),
      rangeEnd: isSameDate(date, endDate.value),
      inRange: isInRange(date)
    });
  }

  // 현재 달의 날짜 추가
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({
      day: i,
      date: date,
      currentMonth: true,
      disabled: isDateDisabled(date),
      selected: isSameDate(date, selectedDate.value),
      rangeStart: isSameDate(date, startDate.value),
      rangeEnd: isSameDate(date, endDate.value),
      inRange: isInRange(date)
    });
  }

  // 다음 달의 날짜 추가 (6주를 채우기 위해)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i);
    days.push({
      day: i,
      date: date,
      currentMonth: false,
      disabled: isDateDisabled(date),
      selected: isSameDate(date, selectedDate.value),
      rangeStart: isSameDate(date, startDate.value),
      rangeEnd: isSameDate(date, endDate.value),
      inRange: isInRange(date)
    });
  }

  return days;
});

// 초기화
onMounted(() => {
  initializeValues();
  document.addEventListener('click', handleClickOutside);
});

// 언마운트시 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 초기 값 설정
function initializeValues() {
  if (props.modelValue) {
    if (props.isRange && Array.isArray(props.modelValue)) {
      // 범위 모드일 때 배열로 받음 [시작일, 종료일]
      if (props.modelValue[0]) {
        startDate.value = new Date(props.modelValue[0]);
      }
      if (props.modelValue[1]) {
        endDate.value = new Date(props.modelValue[1]);
      }

      // 설정된 날짜 기준으로 캘린더 월/년 설정
      if (startDate.value) {
        currentMonth.value = startDate.value.getMonth();
        currentYear.value = startDate.value.getFullYear();
      }
    } else if (!props.isRange) {
      // 단일 날짜 모드
      try {
        selectedDate.value = new Date(props.modelValue);

        if (!isNaN(selectedDate.value.getTime())) {
          currentMonth.value = selectedDate.value.getMonth();
          currentYear.value = selectedDate.value.getFullYear();
        } else {
          selectedDate.value = null;
        }
      } catch (e) {
        selectedDate.value = null;
      }
    }
  }
}

// 월/년도 드롭다운 토글 메서드
function toggleMonthDropdown() {
  monthDropdownOpen.value = !monthDropdownOpen.value;
  if (monthDropdownOpen.value) {
    yearDropdownOpen.value = false;
  }
}

function toggleYearDropdown() {
  yearDropdownOpen.value = !yearDropdownOpen.value;
  if (yearDropdownOpen.value) {
    monthDropdownOpen.value = false;
  }
}

// 모든 드롭다운 닫기
function closeAllDropdowns() {
  monthDropdownOpen.value = false;
  yearDropdownOpen.value = false;
}

// 날짜 비교 유틸리티 함수
function isSameDate(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

// 날짜가 비활성화되었는지 확인
function isDateDisabled(date) {
  if (props.minDate) {
    const minDate = new Date(props.minDate);
    if (date < minDate) return true;
  }

  if (props.maxDate) {
    const maxDate = new Date(props.maxDate);
    if (date > maxDate) return true;
  }

  return false;
}

// 날짜가 범위 내에 있는지 확인
function isInRange(date) {
  if (!startDate.value || !endDate.value) return false;
  return date > startDate.value && date < endDate.value;
}

// 날짜 포맷팅
function formatDate(date) {
  if (!date || isNaN(date.getTime())) {
    return '';
  }

  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let formattedDate = props.format;
    formattedDate = formattedDate.replace('YYYY', year);
    formattedDate = formattedDate.replace('MM', month);
    formattedDate = formattedDate.replace('DD', day);

    return formattedDate;
  } catch (e) {
    return '';
  }
}

// 캘린더 열기
function openCalendar() {
  if (props.disabled) return;

  isOpen.value = true;
  viewMode.value = 'days';

  if (props.isRange) {
    // 범위 모드에서 열 때 임시 값 저장
    tempStartDate.value = startDate.value ? new Date(startDate.value) : null;
    tempEndDate.value = endDate.value ? new Date(endDate.value) : null;
  }
}

// 외부 클릭 처리
function handleClickOutside(event) {
  const datepicker = event.target.closest('.ui-datepicker');

  if (!datepicker && isOpen.value) {
    if (props.isRange) {
      // 범위 모드에서는, 외부 클릭시 이전 선택으로 되돌림
      startDate.value = tempStartDate.value;
      endDate.value = tempEndDate.value;
    }
    isOpen.value = false;
    closeAllDropdowns();
  }
}

// 이전/다음 월 이동
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  closeAllDropdowns();
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  closeAllDropdowns();
}

// 이전/다음 년도 이동
function prevYear() {
  currentYear.value--;
  closeAllDropdowns();
}

function nextYear() {
  currentYear.value++;
  closeAllDropdowns();
}

// 월 선택
function selectMonth(monthIndex) {
  currentMonth.value = monthIndex;
  monthDropdownOpen.value = false;
}

// 년도 선택
function selectYear(year) {
  currentYear.value = year;
  yearDropdownOpen.value = false;
}

// 날짜 선택
function selectDate(day) {
  if (day.disabled) return;
  closeAllDropdowns();

  if (props.isRange) {
    // 범위 선택 모드
    if (!startDate.value || (startDate.value && endDate.value)) {
      // 시작일이 없거나, 이미 범위가 선택된 경우 => 시작일로 설정
      startDate.value = new Date(day.date);
      endDate.value = null;
    } else {
      // 시작일 이후의 날짜만 종료일로 선택 가능
      if (day.date >= startDate.value) {
        endDate.value = new Date(day.date);
        // 자동 적용 (옵션)
        applySelection();
      } else {
        // 시작일보다 이전 날짜를 선택한 경우, 시작일을 변경
        const temp = new Date(startDate.value);
        startDate.value = new Date(day.date);
        endDate.value = temp;
        // 자동 적용 (옵션)
        applySelection();
      }
    }
  } else {
    // 단일 선택 모드
    selectedDate.value = new Date(day.date);

    // 선택 즉시 적용하고 닫기
    emit('update:modelValue', selectedDate.value);
    emit('change', selectedDate.value);
    isOpen.value = false;
  }
}

// 날짜 지우기
function clearDate(event) {
  event.stopPropagation();

  if (props.isRange) {
    startDate.value = null;
    endDate.value = null;
    emit('update:modelValue', [null, null]);
    emit('change', [null, null]);
  } else {
    selectedDate.value = null;
    emit('update:modelValue', null);
    emit('change', null);
  }
}

// 범위 선택 취소
function cancelSelection() {
  startDate.value = tempStartDate.value;
  endDate.value = tempEndDate.value;
  isOpen.value = false;
  closeAllDropdowns();
}

// 범위 선택 적용
function applySelection() {
  if (startDate.value && endDate.value) {
    emit('update:modelValue', [startDate.value, endDate.value]);
    emit('change', [startDate.value, endDate.value]);
    isOpen.value = false;
    closeAllDropdowns();
  }
}

// 모델 값 변경 감시
watch(() => props.modelValue, (newValue) => {
  if (newValue === null || newValue === undefined) {
    selectedDate.value = null;
    startDate.value = null;
    endDate.value = null;
    return;
  }

  if (props.isRange && Array.isArray(newValue)) {
    startDate.value = newValue[0] ? new Date(newValue[0]) : null;
    endDate.value = newValue[1] ? new Date(newValue[1]) : null;
  } else if (!props.isRange) {
    try {
      selectedDate.value = newValue ? new Date(newValue) : null;
    } catch (e) {
      selectedDate.value = null;
    }
  }
}, { immediate: true });

// 선택한 날짜가 변경될 때마다 캘린더 업데이트
watch([selectedDate, startDate, endDate], () => {
  const dateToUse = props.isRange
    ? (startDate.value || endDate.value)
    : selectedDate.value;

  if (dateToUse) {
    currentMonth.value = dateToUse.getMonth();
    currentYear.value = dateToUse.getFullYear();
  }
});
</script>

<style lang="scss" scoped>
.ui-datepicker {
  position: relative;
  width: 100%;
  font-family: inherit;

  &__label {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  &__required {
    color: #f44336;
    margin-left: 2px;
  }

  &__input-wrapper {
    position: relative;
  }

  &__input,
  &__range-input {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 40px;

    &:hover {
      border-color: #bbb;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: #666;
  }

  &__text,
  &__range-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  &__range-text {
    flex: 0 1 auto;
    min-width: 80px;
    text-align: center;
  }

  &__range-separator {
    margin: 0 8px;
    color: #999;
    flex-shrink: 0;
  }

  &__placeholder {
    color: #999;
    font-size: 14px;
  }

  &__selected-text {
    color: #333;
    font-weight: 500;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #666;
    }
  }

  &__calendar {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 300px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    padding: 16px;
    opacity: 0;
    transform: translateY(-10px);
    animation: datepickerFadeIn 0.2s ease forwards;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__selectors {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__dropdown {
    position: relative;
  }

  &__month-select,
  &__year-select {
    padding: 4px 8px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      background-color: #f5f5f5;
    }
  }
  &__dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 101;
    margin-top: 4px;
    width: 100px;
    max-height: 280px;
    overflow-y: auto;

    &--years {
      width: 80px;
    }
  }

  &__year-scroll {
    max-height: 240px;
    overflow-y: auto;
  }

  &__dropdown-item {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }

    &--selected {
      background-color: #e3f2fd;
      color: #2196f3;
      font-weight: 500;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #666;
    border-radius: 4px;

    &:hover {
      background-color: #f5f5f5;
    }

    &:focus {
      outline: none;
    }
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 8px;
  }

  &__weekday {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: #999;
    padding: 4px 0;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;

    &:hover:not(&--disabled):not(&--other-month) {
      background-color: #f5f5f5;
    }

    &--other-month {
      color: #ccc;
    }

    &--disabled {
      color: #ccc;
      cursor: not-allowed;
      pointer-events: none;
    }

    &--selected {
      background-color: #2196f3;
      color: #fff;
      font-weight: 500;
    }

    &--range-start,
    &--range-end {
      background-color: #2196f3;
      color: #fff;
      font-weight: 500;
    }

    &--in-range {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196f3;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #eee;
  }

  &__action-button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &--cancel {
      background-color: #f5f5f5;
      color: #666;

      &:hover {
        background-color: #eee;
      }
    }

    &--apply {
      background-color: #2196f3;
      color: #fff;

      &:hover {
        background-color: #1e88e5;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  &__error {
    margin-top: 4px;
    font-size: 12px;
    color: #f44336;
  }

  &__helper {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
  }

  // 상태 스타일
  &--disabled {
    opacity: 0.6;
    pointer-events: none;

    .ui-datepicker__input,
    .ui-datepicker__range-input {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  &--error {
    .ui-datepicker__input,
    .ui-datepicker__range-input {
      border-color: #f44336;
    }
  }

  // 날짜 범위 선택기 추가 스타일
  &--range {
    .ui-datepicker__calendar {
      width: 340px;
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

@media (max-width: 768px) {
  .ui-datepicker {
    &__calendar {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 32px);
      max-width: 340px;
      animation: none;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
