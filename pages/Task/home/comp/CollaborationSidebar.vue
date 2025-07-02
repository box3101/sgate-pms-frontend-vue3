<template>
  <div class="page-title">
    <div class="page-title__icon">
      <i class="icon-md icon-list icon-white"></i>
    </div>
    <div class="page-title__text">업무</div>
  </div>

  <!-- 리스트 -->
  <div class="task-container">
    <!-- 헤더 -->
    <div class="task-header">
      <div class="task-header__left">
        <span class="task-header__checkbox"></span>
        <span class="task-header__title">All</span>
      </div>
      <div class="task-header__count">
        Selected <span class="task-header__count-text">{{ taskItems.length }}개</span>
      </div>
    </div>

    <!-- 리스트 -->
    <ul class="task-list scrollable-minus-12">
      <li
        v-for="(task, index) in taskItems"
        :key="task.id"
        class="task-item"
        :class="{ 'task-item--selected': task.selected }"
      >
        <div class="task-item__header">
          <span class="task-item__tag" :class="`task-item__tag--${task.status}`">
            {{ task.statusText }}
          </span>
          <div class="task-item__content">
            <div class="task-item__title">{{ task.title }}</div>
            <div class="task-item__meta">
              <span class="task-item__author">{{ task.author }}</span>
              <span v-if="task.date" class="task-item__date">
                {{ task.date }}
              </span>
              <span v-if="task.priority" class="task-item__priority">
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- 리스트 EEE -->
</template>

<script setup>
  // 업무 목록 데이터
  const taskItems = ref([
    {
      id: 1,
      title: '[컨대건설] 보전 및 성산 관리',
      author: '관리 | 총괄팀',
      date: '2026년 8월 29일',
      status: 'excellent',
      statusText: '우수',
      selected: false
    },
    {
      id: 2,
      title: '[컨대설기계] 보전/생산/품질 파트 MES 시스템...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'excellent',
      statusText: '우수',
      selected: false
    },
    {
      id: 3,
      title: '[컨대설기계] 보전/생산/품질 파트 MES 시스템...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'good',
      statusText: '보통',
      selected: false
    },
    {
      id: 4,
      title: 'Sgate UX/UI 리뉴얼',
      author: '내 업무',
      priority: '기간초과',
      status: 'poor',
      statusText: '미흡',
      selected: true
    },
    {
      id: 5,
      title: '[신규구축] 인천 중구청 평생학습센터 웹사이트 구...',
      author: '관리 | 전략팀',
      priority: '기간초과',
      status: 'excellent',
      statusText: '우수',
      selected: false
    },
    {
      id: 6,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'good',
      statusText: '보통',
      selected: false
    },
    {
      id: 7,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'good',
      statusText: '보통',
      selected: false
    },
    {
      id: 8,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'poor',
      statusText: '미흡',
      selected: false
    },
    {
      id: 9,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'excellent',
      statusText: '우수',
      selected: false
    },
    {
      id: 10,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'good',
      statusText: '보통',
      selected: false
    },
    {
      id: 11,
      title: '업무명 TEST 업무명 TEST 업무명 TEST 업무...',
      author: '내 업무',
      date: '2026년 8월 29일',
      status: 'poor',
      statusText: '미흡',
      selected: false
    }
  ])
</script>

<style scoped lang="scss">
  .task-container {
    border-radius: 8px;
    overflow: hidden;
  }

  /* 헤더 영역 */
  .task-header {
    background-color: #6c757d;
    color: white;
    padding: 5px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .task-header__left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .task-header__checkbox {
    display: flex;
    width: 16px;
    height: 16px;
    padding: 5px 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: var(--color-gray-0, #fff);
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='9' viewBox='0 0 12 9' fill='none'%3E%3Cpath d='M1 4.26923L4.5 7.5L11 1.5' stroke='%2300AAFF' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  .task-header__title {
    @include font-style($body-large-bold);
  }

  .task-header__count {
    padding: 4px 8px;
    @include font-style($body-medium-bold);
    border-radius: 4px;
  }

  .task-header__count-text {
    padding: 2px 6px;
    background: #fff;
    @include font-style($body-medium-bold);
    color: $gray-70;
    border-radius: 4px;
    display: inline-block;
    margin-left: 8px;
  }

  /* 리스트 아이템 */
  .task-list {
    list-style: none;
  }

  .task-item {
    padding: 11px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    background: var(--color-gray-10, #e6e8ea);
    cursor: pointer;

    &:hover {
      background-color: #f8f9fa;
    }
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item__header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .task-item__tag {
    display: flex;
    min-width: 38px;
    padding: 3px 6px;
    justify-content: center;
    align-items: center;
    @include font-style($body-caption-bold);
    color: $gray-0;
    border-radius: 4px;
  }

  // 시스템 컬러로 변경 - 진행중 3단계
  // 업무 평가 상태 스타일
  .task-item__tag--excellent {
    background-color: $system-blue; // 우수 - 시스템 블루
  }

  .task-item__tag--good {
    background-color: $system-yellow; // 보통 - 시스템 옐로우
  }

  .task-item__tag--poor {
    background-color: $system-red; // 미흡 - 시스템 레드
  }

  .task-item__content {
    flex: 1;
  }

  .task-item__title {
    @include font-style($body-medium-bold);
    color: $gray-70;
    line-height: 1.2;
  }

  .task-item__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-style($body-caption-bold);
    color: $gray-50;
    margin-top: 5px;
  }

  .task-item__author {
    color: var(--color-gray-50, #6d7882);
    font-size: 12px;
    line-height: 150%; /* 18px */
  }

  .task-item__date {
    @include font-style($body-xsmall-bold);
    color: $gray-30;
  }

  .task-item__priority {
    color: #ff3b30; // 시스템 레드
    font-weight: 600;
    color: var(--color-system-r30, #f30);
    font-size: 12px;
    line-height: 150%; /* 18px */
  }

  /* 선택된 아이템 배경 */
  .task-item--selected {
    background-color: #f8f9fa;
  }
</style>
