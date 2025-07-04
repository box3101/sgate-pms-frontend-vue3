<!-- UiTabs.vue -->
<template>
  <div class="ui-tabs" :class="{ 'ui-tabs--scrollable': scrollable }">
    <!-- Tab Navigation -->
    <div class="ui-tabs__nav-wrapper">
      <!-- 좌측 스크롤 버튼 -->
      <button
        v-if="scrollable && showLeftButton"
        class="ui-tabs__scroll-btn ui-tabs__scroll-btn--left"
        @click="scrollLeft"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.9955 16.4463C13.7492 16.72 13.3277 16.7422 13.054 16.4959L6.3873 10.4961C6.2468 10.3697 6.1666 10.1896 6.1666 10.0006C6.1666 9.8116 6.2468 9.63149 6.3873 9.50506L13.054 3.50465C13.3276 3.25834 13.7492 3.28051 13.9955 3.55418C14.2418 3.82784 14.2196 4.24937 13.946 4.49568L7.8298 10.0005L13.9459 15.5048C14.2196 15.7511 14.2418 16.1726 13.9955 16.4463Z"
            fill="#464C53"
          />
        </svg>
      </button>

      <!-- 탭 네비게이션 -->
      <div ref="navElement" class="ui-tabs__nav" role="tablist" @scroll="handleScroll">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :id="`tab-${tab.id}`"
          :aria-controls="`panel-${tab.id}`"
          :aria-selected="activeTab === tab.id"
          :class="['ui-tabs__nav-item', { 'ui-tabs__nav-item--active': activeTab === tab.id }]"
          :style="getTabItemStyle()"
          role="tab"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.label }}
          <span v-if="isBadge" class="badge">{{ badge[index] }}</span>
        </button>
      </div>

      <!-- 우측 스크롤 버튼 -->
      <button
        v-if="scrollable && showRightButton"
        class="ui-tabs__scroll-btn ui-tabs__scroll-btn--right"
        @click="scrollRight"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.00451 16.4463C6.25081 16.72 6.67234 16.7422 6.94601 16.4959L13.6127 10.4961C13.7532 10.3697 13.8334 10.1896 13.8334 10.0006C13.8334 9.8116 13.7532 9.63149 13.6127 9.50506L6.94604 3.50465C6.67237 3.25834 6.25085 3.28051 6.00453 3.55418C5.75822 3.82784 5.78039 4.24937 6.05405 4.49568L12.1702 10.0005L6.05408 15.5048C5.7804 15.7511 5.75821 16.1726 6.00451 16.4463Z"
            fill="#464C53"
          />
        </svg>
      </button>
    </div>

    <!-- Tab Content는 기존과 동일 -->
    <div class="ui-tabs__content" :class="{ 'is-scroll': isScroll }">
      <!-- 기존 코드 그대로 -->
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

  const props = defineProps({
    tabs: {
      type: Array,
      required: true,
      validator: tabs => tabs.every(tab => tab.id && tab.label)
    },
    defaultTab: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Array,
      default: () => []
    },
    isBadge: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: null
    },
    minWidth: {
      type: [String, Number],
      default: null
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  })

  // 스크롤 관련 반응형 데이터 추가
  const navElement = ref(null)
  const showLeftButton = ref(false)
  const showRightButton = ref(false)
  /**
   * 스크롤 상태 확인 함수
   */
  const checkScrollButtons = () => {
    if (!navElement.value || !props.scrollable) return

    const { scrollLeft, scrollWidth, clientWidth } = navElement.value

    showLeftButton.value = scrollLeft > 0
    showRightButton.value = scrollLeft < scrollWidth - clientWidth - 1
  }
  /**
   * 우측 스크롤 함수 - 한 화면 분량만큼 이동
   */
  const scrollRight = () => {
    if (!navElement.value) return

    const container = navElement.value
    const tabs = container.querySelectorAll('.ui-tabs__nav-item')

    // 현재 보이는 영역
    const containerLeft = container.scrollLeft
    const containerRight = containerLeft + container.clientWidth

    // 현재 화면에서 완전히 보이는 마지막 탭 찾기
    let lastVisibleIndex = -1

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      const tabLeft = tab.offsetLeft
      const tabRight = tabLeft + tab.offsetWidth

      // 탭이 완전히 보이는 경우
      if (tabLeft >= containerLeft && tabRight <= containerRight) {
        lastVisibleIndex = i
      }
    }

    // 다음 탭으로 이동 (완전히 보이지 않는 첫 번째 탭)
    const nextTabIndex = lastVisibleIndex + 1

    if (nextTabIndex < tabs.length) {
      const targetTab = tabs[nextTabIndex]

      // 해당 탭이 완전히 보이도록 스크롤
      const targetScrollLeft = targetTab.offsetLeft

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  /**
   * 좌측 스크롤 함수 - 한 화면 분량만큼 뒤로 이동
   */
  const scrollLeft = () => {
    if (!navElement.value) return

    const container = navElement.value
    const tabs = container.querySelectorAll('.ui-tabs__nav-item')

    // 현재 보이는 영역
    const containerLeft = container.scrollLeft
    const containerRight = containerLeft + container.clientWidth

    // 현재 화면에서 완전히 보이는 첫 번째 탭 찾기
    let firstVisibleIndex = -1

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      const tabLeft = tab.offsetLeft
      const tabRight = tabLeft + tab.offsetWidth

      // 탭이 완전히 보이는 경우
      if (tabLeft >= containerLeft && tabRight <= containerRight) {
        firstVisibleIndex = i
        break
      }
    }

    if (firstVisibleIndex > 0) {
      // 한 화면 분량만큼 뒤로 계산
      const containerWidth = container.clientWidth
      let targetIndex = firstVisibleIndex - 1
      let totalWidth = 0

      // 한 화면에 들어갈 수 있는 탭들을 역순으로 계산
      for (let i = targetIndex; i >= 0; i--) {
        const tab = tabs[i]
        totalWidth += tab.offsetWidth

        if (totalWidth > containerWidth) {
          targetIndex = i + 1
          break
        }

        if (i === 0) {
          targetIndex = 0
        }
      }

      const targetTab = tabs[targetIndex]
      container.scrollTo({
        left: targetTab.offsetLeft,
        behavior: 'smooth'
      })
    }
  }
  /**
   * 스크롤 이벤트 핸들러
   */
  const handleScroll = () => {
    checkScrollButtons()
  }

  /**
   * 리사이즈 이벤트 핸들러
   */
  const handleResize = () => {
    checkScrollButtons()
  }

  const emit = defineEmits(['update:modelValue', 'change'])

  const activeTab = ref(props.modelValue || props.defaultTab || props.tabs[0]?.id || '')

  const setActiveTab = tabId => {
    if (activeTab.value !== tabId) {
      activeTab.value = tabId
      emit('update:modelValue', tabId)
      emit('change', tabId)
    }
  }

  // v-model 지원
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue && newValue !== activeTab.value) {
        activeTab.value = newValue
      }
    }
  )

  // 키보드 네비게이션
  const handleKeydown = event => {
    const currentIndex = props.tabs.findIndex(tab => tab.id === activeTab.value)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
        break
      case 'ArrowRight':
        newIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        newIndex = 0
        break
      case 'End':
        newIndex = props.tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    setActiveTab(props.tabs[newIndex].id)
  }

  // 👇 스타일 계산 함수 추가
  const getTabItemStyle = () => {
    const style = {}

    if (props.maxWidth) {
      style.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
    }

    if (props.minWidth) {
      style.minWidth = typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth
    }

    return style
  }

  onMounted(() => {
    const navElement = document.querySelector('.ui-tabs__nav')
    navElement?.addEventListener('keydown', handleKeydown)
    // 스크롤 관련 이벤트 리스너 추가
    if (props.scrollable) {
      nextTick(() => {
        checkScrollButtons()
        window.addEventListener('resize', handleResize)
      })
    }
  })

  onUnmounted(() => {
    const navElement = document.querySelector('.ui-tabs__nav')
    navElement?.removeEventListener('keydown', handleKeydown)
    // 스크롤 관련 이벤트 리스너 제거
    window.removeEventListener('resize', handleResize)
  })
  // tabs 변경 감지하여 스크롤 버튼 상태 업데이트
  watch(
    () => props.tabs,
    () => {
      if (props.scrollable) {
        nextTick(() => {
          checkScrollButtons()
        })
      }
    },
    { deep: true }
  )
</script>

<style scoped lang="scss">
  // 기본 색상 변수
  $primary-color: #00aaff;

  $gray-5: #f9f9f9;
  $gray-10: #e5e5e5;
  $gray-30: #999;
  $gray-50: #666;
  $gray-70: #333;

  .ui-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .ui-tabs__nav {
    display: flex;
    border-bottom: 1px solid $gray-10;
    background: #fff;
  }

  .ui-tabs__nav-item {
    // flex: 1;
    padding: 8px 20px;
    @include font-style($body-medium);
    color: $gray-30;
    position: relative;

    // 🔥 border-radius 명시적 제거
    border-radius: 0 !important;
    border: none !important;

    // 모든 상태에서 동일한 높이 유지
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    // 👇 동적 width 스타일 추가
    &[data-max-width] {
      max-width: var(--max-width);
    }

    &[data-min-width] {
      min-width: var(--min-width);
    }

    .badge {
      position: absolute;
      top: 11px;
      right: 74px;
      background-color: #f30;
      color: white;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      font-weight: 600;
      transition: none !important;
      pointer-events: none;
      z-index: 1;
    }

    &:hover {
      background-color: $primary-color;
      color: #fff;
      // 🔥 호버 시에도 border-radius 제거
      border-radius: 0 !important;
    }

    &:focus {
      outline: 2px solid $primary-color;
      outline-offset: -2px;
      // 🔥 포커스 시에도 border-radius 제거
      border-radius: 0 !important;
    }

    &--active {
      // 🔥 폰트 크기는 그대로 유지, 굵기만 변경
      font-weight: 700;
      border-bottom: 3px solid #00aaff !important;
      color: $gray-90;

      // 🔥 액티브 상태에서 border-radius 완전 제거
      border-radius: 0 !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;

      // 🔥 또는 transform으로 크기 변경 (레이아웃 영향 없음)
      // transform: scale(1.05);
      // transform-origin: center;
    }
  }

  .ui-tabs__content {
    background: #fff;

    &.is-scroll {
      max-height: 400px;
      overflow-y: auto;
    }
  }

  .ui-tabs__panel {
    display: none;

    &--active {
      display: block;
    }
  }

  // 반응형
  @media (max-width: 768px) {
    .ui-tabs__nav {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .ui-tabs__nav-item {
      white-space: nowrap;
      flex-shrink: 0;
      min-width: 100px;
      padding: 10px 16px;
      font-size: 13px;

      // 🔥 모바일에서도 border-radius 제거
      border-radius: 0 !important;
    }

    .ui-tabs__panel {
      padding: 16px;
    }
  }

  // 🔥 추가: 전역 스타일 재정의 방지
  * {
    &.ui-tabs__nav-item {
      border-radius: 0 !important;

      &:before,
      &:after {
        border-radius: 0 !important;
      }
    }
  }

  .ui-tabs {
    &--scrollable {
      .ui-tabs__nav-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      .ui-tabs__nav {
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .ui-tabs__nav-wrapper {
    position: relative;
    background: #fff;
    border-bottom: 1px solid $gray-10;
  }

  .ui-tabs__scroll-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 1);
    }

    &--left {
      left: -50px;
      z-index: 2;
      border: 1px solid $gray-40;
      &:hover {
        background: rgba(255, 255, 255, 1);
      }
    }

    &--right {
      right: -50px;
      z-index: 2;
      border: 1px solid $gray-40;
      &:hover {
        background: rgba(255, 255, 255, 1);
      }
    }

    svg {
      color: #464c53;
    }
  }

  // scrollable일 때 nav 스타일 조정
  .ui-tabs--scrollable {
    .ui-tabs__nav {
    }
  }
</style>
