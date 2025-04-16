<template>
  <div class="components-page">
    <h1 class="page-title">UI 버튼 컴포넌트</h1>

    <section class="component-section">
      <h2 class="section-title">버튼 종류 (Variants)</h2>
      <div class="button-grid">
        <div class="button-item">
          <UiButton variant="primary">Primary 버튼</UiButton>
          <p class="button-desc">기본 버튼 (Primary)</p>
        </div>
        <div class="button-item">
          <UiButton variant="secondary">Secondary 버튼</UiButton>
          <p class="button-desc">보조 버튼 (Secondary)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line">Primary Line 버튼</UiButton>
          <p class="button-desc">테두리 버튼 (Primary Line)</p>
        </div>
        <div class="button-item">
          <UiButton variant="secondary-line">Secondary Line 버튼</UiButton>
          <p class="button-desc">회색 테두리 버튼 (Secondary Line)</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">버튼 크기 (Sizes)</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary" size="small">Small 버튼</UiButton>
          <p class="button-desc">작은 크기 (Small)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" size="medium">협업</UiButton>
          <p class="button-desc">중간 크기 (Medium)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" size="large">Large 버튼</UiButton>
          <p class="button-desc">큰 크기 (Large)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" size="xlarge">XLarge 버튼</UiButton>
          <p class="button-desc">매우 큰 크기 (XLarge)</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">라인 버튼 크기 (Line Button Sizes)</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary-line" size="small">Small 라인</UiButton>
          <p class="button-desc">작은 크기 (Small)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" size="medium">Medium 라인</UiButton>
          <p class="button-desc">중간 크기 (Medium)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" size="large">Large 라인</UiButton>
          <p class="button-desc">큰 크기 (Large)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" size="xlarge">XLarge 라인</UiButton>
          <p class="button-desc">매우 큰 크기 (XLarge)</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">버튼 상태 (States)</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary" disabled>비활성화 버튼</UiButton>
          <p class="button-desc">비활성화 상태 (Disabled)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" disabled>비활성화 라인</UiButton>
          <p class="button-desc">비활성화 라인 (Disabled)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" loading>로딩 버튼</UiButton>
          <p class="button-desc">로딩 상태 (Loading)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" block>Block 버튼</UiButton>
          <p class="button-desc">전체 너비 (Block)</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" radius0>각진 버튼</UiButton>
          <p class="button-desc">모서리 없음 (Radius 0)</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">아이콘 버튼 (Icon Buttons)</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary" icon="plus" iconPosition="left"> 왼쪽 아이콘 </UiButton>
          <p class="button-desc">왼쪽 아이콘 버튼</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" icon="search" iconPosition="right">
            오른쪽 아이콘
          </UiButton>
          <p class="button-desc">오른쪽 아이콘 라인 버튼</p>
        </div>
        <div class="button-item">
          <UiButton variant="secondary" iconOnly>
            <Icon name="heart" />
          </UiButton>
          <p class="button-desc">아이콘만 있는 버튼</p>
        </div>
        <div class="button-item">
          <UiButton variant="secondary-line" iconOnly>
            <Icon name="star" />
          </UiButton>
          <p class="button-desc">아이콘만 있는 라인 버튼</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">버튼 타입 (Types)</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary" type="button">Button 타입</UiButton>
          <p class="button-desc">기본 버튼 타입</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" type="submit">Submit 타입</UiButton>
          <p class="button-desc">폼 제출 타입</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary" type="reset">Reset 타입</UiButton>
          <p class="button-desc">폼 초기화 타입</p>
        </div>
      </div>
    </section>

    <section class="component-section">
      <h2 class="section-title">이벤트 처리 예시</h2>
      <div class="button-row">
        <div class="button-item">
          <UiButton variant="primary" @click="handleClick">클릭 이벤트</UiButton>
          <p class="button-desc">클릭 시 콘솔에 메시지 출력</p>
        </div>
        <div class="button-item">
          <UiButton variant="primary-line" :loading="isLoading" @click="handleLoadingClick">
            로딩 상태 토글
          </UiButton>
          <p class="button-desc">클릭 시 로딩 상태 전환</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 클릭 이벤트 핸들러
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다')
  }

  // 로딩 상태 토글 예시
  const isLoading = ref(false)
  const handleLoadingClick = () => {
    isLoading.value = true

    // 2초 후 로딩 상태 해제
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
</script>

<style lang="scss" scoped>
  .components-page {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f5f5f5;
  }

  .page-title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 32px;
    color: #333;
  }

  .component-section {
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .button-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    min-width: 150px;
  }

  .button-desc {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin: 0;
  }

  @media (max-width: 768px) {
    .components-page {
      padding: 16px;
    }

    .component-section {
      padding: 16px;
    }

    .button-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }

    .button-row {
      gap: 16px;
    }
  }
</style>
