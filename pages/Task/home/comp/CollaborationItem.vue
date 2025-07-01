<template>
  <!-- 제목 섹션 -->
  <div class="task-title-section">
    <div class="task-title-section__content">
      <div class="task-title-badge">
        <span class="task-title-badge__text">진행중</span>
      </div>
      <h2 class="task-title-section__title">[현대걸설] 보전 및 생산 관리</h2>
    </div>
    <div class="task-title-section__date">2025.05.27</div>
  </div>

  <div class="collaboration-item">
    <!-- 메인 콘텐츠 -->
    <div class="collaboration-item__content">
      <!-- 헤더 정보 -->
      <div class="collaboration-item__header">
        <div class="collaboration-item__left">
          <!-- 상태 배지 -->
          <div class="status-badge">
            <div class="status-badge__dot"></div>
            <span class="status-badge__text">진행중</span>
          </div>
        </div>
        <div class="collaboration-item__date">2025.08.29</div>
      </div>

      <!-- 사용자 정보 -->
      <div class="collaboration-item__user">
        <div class="user-avatar">
          <img src="" alt="사용자 아바타" />
        </div>
        <div class="user-info">
          <span class="user-name">안창주 선임</span>
          <div class="user-divider"></div>
          <span class="user-team">AX Group > UXUI팀</span>
        </div>
        <div class="collaboration-item__actions">
          <button class="action-btn">
            <i class="icon-sm icon-edit"></i>
          </button>
          <button class="action-btn">
            <i class="icon-sm icon-delete"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 활동 내용 -->
    <div class="collaboration-item__activity">
      <div class="activity-content">
        활동종류 : 서비스 기획 및 디자인<br />
        활동내용<br />
        &nbsp;&nbsp;&nbsp;- Sgate 화면 분석 및 기능 분석<br />
        &nbsp;&nbsp;&nbsp;- 와이어프레임으로 프로세스 제작<br />
        &nbsp;&nbsp;&nbsp;- 와이어프레임에 UI 디자인 적용
      </div>
    </div>

    <!-- 시간 정보 -->
    <div class="collaboration-item__time">
      <span class="time-info">2022.07.12 | 14:45:57</span>
      <button class="comment-btn">
        <i class="icon-sm icon-comment"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
  // 컴포넌트 props 정의 (추후 확장 가능)
  const props = defineProps({
    item: {
      type: Object,
      default: () => ({
        id: 1,
        status: 'progress',
        statusText: '진행중',
        date: '2025.08.29',
        user: {
          name: '안창주 선임',
          team: 'AX Group > UXUI팀',
          avatar: '/images/avatar-placeholder.png'
        },
        activity: {
          type: '서비스 기획 및 디자인',
          content: [
            'Sgate 화면 분석 및 기능 분석',
            '와이어프레임으로 프로세스 제작',
            '와이어프레임에 UI 디자인 적용'
          ]
        },
        timestamp: '2022.07.12 | 14:45:57'
      })
    }
  })
</script>

<style scoped lang="scss">
  // 제목 섹션 스타일
  .task-title-section {
    background: #e6e8ea; //  배경색
    border-radius: 4px;
    padding: 4px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }

  .task-title-section__content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .task-title-badge {
    background: #0084ff; //  파란색
    border-radius: 2px;
    padding: 3px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .task-title-badge__text {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 10px;
    line-height: 1.2;
    color: #ffffff;
    text-align: center;
  }

  .task-title-section__title {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    color: #1e2124; //  진한 텍스트 색상
    margin: 0;
  }

  .task-title-section__date {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 1.5;
    color: #6d7882; //  그레이 색상
  }

  .collaboration-item {
    background: #e5f6ff; //에서 확인된 배경색
    border-radius: 4px; // 디자인에 맞춤
    padding: 16px;
    margin-bottom: 8px; // 간격 조정
    position: relative;
  }

  // 메인 콘텐츠
  .collaboration-item__content {
    border-bottom: 1px solid #cdd1d5; //  stroke 컬러
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  // 헤더
  .collaboration-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px; // 간격 조정
  }

  .collaboration-item__left {
    display: flex;
    align-items: center;
  }

  // 상태 배지 (디자인 반영)
  .status-badge {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-badge__dot {
    width: 8px;
    height: 8px;
    background-color: #0084ff; //  파란색
    border-radius: 50%;
  }

  .status-badge__text {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.4;
    color: #0084ff; //  파란색
  }

  .collaboration-item__date {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882; //  그레이 컬러
    text-align: right;
  }

  // 사용자 정보
  .collaboration-item__user {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
  }

  .user-avatar {
    width: 32px; // 디자인 크기
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background: #898989; //  기본 아바타 색상
    border: 1px solid #cdd1d5; //  stroke
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .user-name {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.4;
    color: #00aaff; //  사용자명 색상
  }

  .user-divider {
    width: 2px;
    height: 16px;
    background-color: #b1b8be; //  구분선 색상
  }

  .user-team {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882; //  그레이 컬러
  }

  .collaboration-item__actions {
    display: flex;
    gap: 4px;
  }

  .action-btn {
    width: 20px; // 디자인 크기
    height: 20px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6d7882; //  아이콘 색상

    &:hover {
      background: rgba(109, 120, 130, 0.1);
    }
  }

  // 활동 내용
  .collaboration-item__activity {
    margin-bottom: 8px;
  }

  .activity-content {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 16px; //에서 확인된 크기
    line-height: 1.5;
    color: #464c53; //  텍스트 색상
  }

  // 시간 정보
  .collaboration-item__time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid #cdd1d5; //  stroke 컬러
  }

  .time-info {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882; //  그레이 컬러
    width: 137px; //에서 확인된 고정 폭
  }

  .comment-btn {
    width: 20px; // 디자인 크기
    height: 20px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6d7882; //  아이콘 색상

    &:hover {
      background: rgba(109, 120, 130, 0.1);
    }
  }
</style>
