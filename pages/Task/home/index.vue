<template>
  <div class="task-page-wrapper">
    <div class="container-large">
      <!-- 헤더 -->
      <CollaborationHeader />
      <!-- 헤더 끝 -->

      <div class="flex-container">
        <div class="w-40p">
          <!-- 사이드바 -->
          <CollaborationSidebar />
          <!-- 사이드바 끝 -->
        </div>
        <div class="w-60p">
          <!-- 피드 -->
          <CollaborationFeed />
          <!-- 피드 끝 -->
        </div>
      </div>
    </div>

    <!-- 왼쪽 고정 메뉴 -->
    <div class="task-sidebar-fixed">
      <div class="task-nav">
        <nav class="nav-menu">
          <div class="task-status-summary">
            <button
              v-for="status in taskStatusList"
              :key="status.key"
              class="status-item"
              :class="{ active: status.active }"
              @click="handleStatusClick(status.key)"
            >
              <span class="status-label">{{ status.label }}</span>
              <span class="status-count">{{ status.count }}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
    <!-- 왼쪽 고정 메뉴 끝 -->
  </div>
</template>

<script setup>
  /**
   * 함수 목적: 업무 상태 목록 초기 데이터 설정
   * 매개변수: 없음
   * 반환값: Array<Object> - 업무 상태 목록 배열
   */
  const initializeTaskStatusData = () => {
    return [
      { key: 'all', label: '전체', count: 39, active: true },
      { key: 'progress', label: '진행중', count: 31, active: false },
      { key: 'complete', label: '완료', count: 3, active: false },
      { key: 'pending', label: '진행전', count: 0, active: false },
      { key: 'canceled', label: '취소/보류', count: 5, active: false }
    ]
  }

  /**
   * 함수 목적: 상태 버튼 클릭 처리
   * 매개변수: {string} statusKey - 클릭된 상태의 키
   * 반환값: 없음
   */
  const handleStatusClick = statusKey => {
    // 모든 상태를 비활성화하고 클릭된 상태만 활성화
    taskStatusList.value.forEach(status => {
      status.active = status.key === statusKey
    })

    // 클릭된 상태 로그 출력
    const selectedStatus = taskStatusList.value.find(s => s.key === statusKey)
    console.log('선택된 상태:', selectedStatus.label, `(${selectedStatus.count}개)`)

    // 실제 필터링 로직은 여기에 구현 (현재는 UI만 처리)
  }

  /**
   * 함수 목적: 페이지 초기화 작업 수행
   * 매개변수: 없음
   * 반환값: 없음
   */
  const initializePage = () => {
    console.log('업무 홈 페이지가 초기화되었습니다.')
    console.log('업무 상태 목록:', taskStatusList.value)
  }

  // 컴포넌트 import
  import CollaborationHeader from './comp/CollaborationHeader.vue'
  import CollaborationSidebar from './comp/CollaborationSidebar.vue'
  import CollaborationFeed from './comp/CollaborationFeed.vue'

  // 업무 상태 목록을 저장하는 반응형 데이터
  const taskStatusList = ref(initializeTaskStatusData())

  // 컴포넌트 마운트 시 초기화 실행
  onMounted(initializePage)
</script>

<style lang="scss" scoped>
  // 페이지 헤더 기본 스타일 제거
  .page-header {
    padding: 0;
    background: #fff;
    border: none;
  }

  // 업무 페이지 메인 래퍼 스타일링
  .task-page-wrapper {
    // 페이지 기본 레이아웃 설정
    position: relative;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: calc(100% - 100px);
  }

  // 왼쪽 고정 사이드바 스타일링
  .task-sidebar-fixed {
    // 고정 위치 설정
    position: absolute;
    left: -120px;
    top: 72px;
    overflow-y: auto;

    // 네비게이션 영역 스타일링
    .task-nav {
      padding: 24px 0;

      // 상태 요약 버튼 그룹
      .task-status-summary {
        display: flex;
        flex-direction: column;
        gap: 8px;

        // 개별 상태 버튼 스타일링
        .status-item {
          // 기본 버튼 레이아웃
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 30px;
          background: var(--color-gray-5, #f4f5f6);
          padding: 8px 16px;
          @include font-style($body-small-bold);
          color: $gray-50;
          border: none; // 기본 button border 제거
          cursor: pointer;
          transition: all 0.2s ease; // 부드러운 전환 효과

          // 호버 상태 스타일링
          &:hover {
            background: var(--color-gray-10, #e8e9ea);
            transform: translateY(-1px); // 미묘한 lift 효과
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
          }

          // 활성 상태 스타일링
          &.active {
            background: var(--color-primary-30, #6cf);
            color: var(--color-gray-90, #1a1a1a); // 명시적 컬러 변수 사용 권장
            transform: translateY(-2px);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          }

          // 활성 상태에서의 호버 효과
          &.active:hover {
            background: var(--color-primary-40, #5cbfff); // 더 진한 primary 색상
          }

          // 키보드 접근성 포커스 스타일링
          &:focus {
            outline: 2px solid var(--color-primary-50, #0066cc);
            outline-offset: 2px;
          }

          // 클릭 시 피드백 효과
          &:active {
            transform: translateY(0px);
            transition: transform 0.1s ease;
          }
        }
      }
    }
  }

  // 반응형 미디어 쿼리 - 태블릿 및 모바일 대응
  @media (max-width: 1024px) {
    .task-page-wrapper {
      .container-large {
        // 좁은 화면에서 마진 조정
        margin-left: 0;
        padding-right: 16px;
      }
    }

    // 고정 사이드바 숨김 처리
    .task-sidebar-fixed {
      transform: translateX(-100%);
      transition: transform 0.3s ease;

      // 모바일에서 열림 상태 (추후 토글 기능 추가 시 사용)
      &.mobile-open {
        transform: translateX(0);
      }
    }
  }

  // 모바일 전용 스타일링
  @media (max-width: 768px) {
    .task-page-wrapper {
      // 모바일에서 전체 너비 사용
      max-width: 100%;
      padding: 0 16px;

      // 플렉스 컨테이너 세로 배치
      .flex-container {
        flex-direction: column;

        .w-40p,
        .w-60p {
          width: 100% !important;
          margin-bottom: 16px;
        }
      }
    }

    // 모바일에서 고정 사이드바 완전 숨김
    .task-sidebar-fixed {
      display: none;
    }
  }
</style>
