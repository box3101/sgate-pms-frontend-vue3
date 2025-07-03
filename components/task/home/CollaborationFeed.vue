<template>
  <div class="page-title">
    <div class="page-title__icon">
      <i class="icon-md icon-list icon-white"></i>
    </div>
    <div class="page-title__text">활동</div>
  </div>
  
  <!-- 검색 영역 -->
  <div class="search-container mb-12">
    <div class="flex gap-8 items-center">
      <UiDatePicker
        v-model="dateRange"
        :isRange="true"
        startPlaceholder="시작일"
        endPlaceholder="종료일"
        size="medium"
        class="w-260"
      />
      <UiInput 
        v-model="searchKeyword" 
        placeholder="검색어를 입력하세요" 
        class="w-200" 
        @keyup.enter="handleSearch"
      />
      <UiButton variant="primary" size="medium" iconOnly @click="handleSearch">
        <i class="icon-md icon-search icon-white"></i>
      </UiButton>
    </div>
  </div>
  
  <!-- 활동 피드 목록 -->
  <ul class="scrollable-minus-12">
    <li v-for="(item, index) in feedItems" :key="`feed-${index}`">
      <CollaborationItem :itemData="item" />
    </li>
  </ul>
</template>

<script setup>
/**
 * 함수 목적: 협업 피드 초기 데이터 생성
 * 매개변수: {number} count - 생성할 피드 아이템 개수
 * 반환값: Array<Object> - 피드 아이템 배열
 */
const generateFeedData = (count = 20) => {
  const sampleData = []
  
  // 지정된 개수만큼 샘플 데이터 생성
  for (let i = 1; i <= count; i++) {
    sampleData.push({
      id: i,
      title: `활동 피드 ${i}`,
      content: `이것은 ${i}번째 활동 피드의 내용입니다.`,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(), // 1시간씩 이전 시간
      author: `사용자${i}`,
      type: i % 3 === 0 ? 'comment' : i % 2 === 0 ? 'update' : 'create'
    })
  }
  
  return sampleData
}

/**
 * 함수 목적: 검색 기능 실행
 * 매개변수: 없음
 * 반환값: 없음
 */
const handleSearch = () => {
  // 검색 키워드 로그 출력
  console.log('검색 실행:', {
    keyword: searchKeyword.value,
    dateRange: dateRange.value
  })
  
  // 실제 검색 로직은 여기에 구현
  // 현재는 로그만 출력하는 UI 중심 구현
}

/**
 * 함수 목적: 피드 데이터 필터링
 * 매개변수: {string} keyword - 검색 키워드
 * 반환값: Array<Object> - 필터링된 피드 배열
 */
const filterFeedData = (keyword) => {
  if (!keyword.trim()) {
    return generateFeedData()
  }
  
  // 키워드로 제목과 내용 필터링
  return generateFeedData().filter(item => 
    item.title.includes(keyword) || 
    item.content.includes(keyword)
  )
}

// CollaborationItem 컴포넌트 import
import CollaborationItem from './CollaborationItem.vue'

// 날짜 범위 선택을 위한 반응형 데이터
const dateRange = ref([])

// 검색 키워드를 저장하는 반응형 데이터
const searchKeyword = ref('')

// 피드 아이템 목록을 저장하는 반응형 데이터
const feedItems = ref(generateFeedData())

// 컴포넌트 마운트 시 실행되는 라이프사이클 훅
onMounted(() => {
  console.log('협업 피드 컴포넌트가 마운트되었습니다.')
  console.log('초기 피드 아이템 개수:', feedItems.value.length)
})

// 검색 키워드 변경 시 실시간 필터링 (선택사항)
watch(searchKeyword, (newKeyword) => {
  console.log('검색 키워드 변경:', newKeyword)
  // 실시간 검색이 필요한 경우 여기에 로직 추가
})
</script>

<style scoped lang="scss">
// 피드 목록 아이템 간격 조정
li {
  // 아이템 간 마진 설정
  margin-bottom: 8px;
  
  // 마지막 아이템은 마진 제거
  &:last-child {
    margin-bottom: 0;
  }
  
  // 호버 효과 추가
  &:hover {
    // 미묘한 스케일 효과
    transform: translateY(-1px);
    transition: transform 0.2s ease;
  }
}

// 검색 컨테이너 스타일링
.search-container {
  // 검색 영역 배경 및 패딩
  background: var(--color-gray-5, #f4f5f6);
  padding: 16px;
  border-radius: 8px;
  
  // utilities.scss 클래스 활용한 flex 레이아웃
  .flex {
    // 반응형에서 세로 배치 고려
    flex-wrap: wrap;
  }
  
  // 반응형 미디어 쿼리 - 모바일 대응
  @media (max-width: 768px) {
    padding: 12px;
    
    .flex {
      // 모바일에서 세로 배치
      flex-direction: column;
      gap: 8px !important;
      
      // 모바일에서 폼 요소 전체 너비
      .w-260,
      .w-200 {
        width: 100% !important;
      }
    }
  }
}

// 스크롤 가능한 목록 영역 스타일링
.scrollable-minus-12 {
  // 최대 높이 설정으로 스크롤 영역 확보
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  
  // 스크롤바 커스터마이징 (webkit 기반 브라우저)
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-10, #e8e9ea);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-30, #b0b8c1);
    border-radius: 3px;
    
    &:hover {
      background: var(--color-gray-50, #6d7882);
    }
  }
}
</style>
