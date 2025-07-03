<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="flex gap-8 items-center">
          <UiDatePicker
            v-model="dateRange"
            :isRange="true"
            startPlaceholder="시작일"
            endPlaceholder="종료일"
            class="w-260"
          />
          <UiSelect
            v-model="selectedBoard"
            :options="boardOptions"
            placeholder="보드를 선택해주세요"
            class="w-200"
          />
          <UiInput placeholder="업무를 입력하세요" class="w-200" />
          <UiButton variant="primary" size="medium" iconOnly>
            <i class="icon-md icon-search icon-white"></i>
          </UiButton>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiButton type="button" variant="ghost" size="medium" class="arrow-btn">
          상세 필터
          <i class="icon-md icon-arrow-down"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 함수 목적: 협업 페이지 헤더 반응형 데이터 초기화
 * 매개변수: 없음
 * 반환값: 없음
 */
const initializeHeaderData = () => {
  // 날짜 범위 선택을 위한 반응형 배열 초기화
  dateRange.value = []
  
  // 선택된 보드 값 초기화
  selectedBoard.value = ''
  
  // 보드 옵션 목록 설정
  boardOptions.value = [
    { label: '보드1', value: 'board1' },
    { label: '보드2', value: 'board2' },
    { label: '보드3', value: 'board3' }
  ]
}

// 날짜 범위 선택을 위한 반응형 데이터
const dateRange = ref([])

// 선택된 보드를 저장하는 반응형 데이터
const selectedBoard = ref('')

// 보드 선택 옵션 목록 반응형 데이터
const boardOptions = ref([
  { label: '보드1', value: 'board1' },
  { label: '보드2', value: 'board2' },
  { label: '보드3', value: 'board3' }
])

// 컴포넌트 마운트 시 데이터 초기화
onMounted(initializeHeaderData)
</script>

<style lang="scss" scoped>
// 페이지 헤더 컴포넌트 스타일링
.page-header {
  // 헤더 기본 레이아웃 설정 - 양쪽 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid var(--color-gray-10, #e8e9ea);
  
  // 헤더 왼쪽 영역 스타일링
  &__left {
    .select-group {
      // 폼 요소들의 그룹 스타일링
      // utilities.scss의 flex, gap 클래스 활용
    }
  }
  
  // 헤더 오른쪽 영역 스타일링
  &__right {
    .button-group {
      // 버튼 그룹 스타일링
      display: flex;
      gap: 8px;
      
      .arrow-btn {
        // 화살표 버튼 특별 스타일링
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
  
  // 반응형 미디어 쿼리 - 모바일 대응
  @media (max-width: 768px) {
    // 모바일에서 세로 배치로 변경
    flex-direction: column;
    gap: 12px;
    
    &__left,
    &__right {
      width: 100%;
    }
    
    .select-group {
      // 모바일에서 폼 요소들 세로 배치
      .flex {
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
