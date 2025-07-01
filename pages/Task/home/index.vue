<template>
  <div class="task-page-wrapper">
    <div class="container-large">
      <!-- 헤더 -->
      <CollaborationHeader />
      <!-- 헤더  EEE -->

      <div class="flex-container">
        <div class="w-40p">
          <!-- 사이드바 -->
          <CollaborationSidebar />
          <!-- 사이드바 EEE -->
        </div>
        <div class="w-60p">
          <!-- 피드 -->
          <CollaborationFeed />
          <!-- 피드 EEE -->
        </div>
      </div>
    </div>

    <!-- 왼쪽 고정 메뉴 -->
    <div class="task-sidebar-fixed">
      <div class="task-nav">
        <nav class="nav-menu">
          <div class="task-status-summary">
            <button class="status-item active">
              <span class="status-label">전체</span>
              <span class="status-count">39</span>
            </button>
            <button class="status-item">
              <span class="status-label">진행중</span>
              <span class="status-count">31</span>
            </button>
            <button class="status-item">
              <span class="status-label">완료</span>
              <span class="status-count">3</span>
            </button>
            <button class="status-item">
              <span class="status-label">진행전</span>
              <span class="status-count">0</span>
            </button>
            <button class="status-item">
              <span class="status-label">취소/보류</span>
              <span class="status-count">5</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
    <!-- 왼쪽 고정 메뉴 EEE -->
  </div>
</template>

<script setup>
  import CollaborationHeader from '~/pages/Task/home/comp/CollaborationHeader.vue'
  import CollaborationSidebar from '~/pages/Task/home/comp/CollaborationSidebar.vue'
  import CollaborationFeed from '~/pages/Task/home/comp/CollaborationFeed.vue'
</script>

<style lang="scss" scoped>
  .page-header {
    padding: 0;
    background: #fff;
    border: none;
  }
  .task-page-wrapper {
    position: relative;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: calc(100% - 100px);
  }

  .task-sidebar-fixed {
    position: absolute;
    left: -120px;
    top: 40px;
    overflow-y: auto;

    .task-nav {
      padding: 24px 0;

      .task-status-summary {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .status-item {
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

          // Hover 효과
          &:hover {
            background: var(--color-gray-10, #e8e9ea);
            transform: translateY(-1px); // 미묘한 lift 효과
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
          }

          // Active 상태
          &.active {
            background: var(--color-primary-30, #6cf);
            color: var(--color-gray-90, #1a1a1a); // 명시적 컬러 변수 사용 권장
            transform: translateY(-2px);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          }

          // Active 상태에서의 hover (추가 상호작용)
          &.active:hover {
            background: var(--color-primary-40, #5cbfff); // 더 진한 primary 색상
          }

          // Focus 접근성 (키보드 내비게이션)
          &:focus {
            outline: 2px solid var(--color-primary-50, #0066cc);
            outline-offset: 2px;
          }

          // Pressed 상태 (클릭 시 피드백)
          &:active {
            transform: translateY(0px);
            transition: transform 0.1s ease;
          }
        }
      }
    }
  }

  // 반응형 처리
  @media (max-width: 1024px) {
    .task-page-wrapper {
      .container-large {
        margin-left: 0;
        padding-right: 16px;
      }
    }

    .task-sidebar-fixed {
      transform: translateX(-100%);
      transition: transform 0.3s ease;

      &.mobile-open {
        transform: translateX(0);
      }
    }
  }
</style>
