<template>
  <div class="components-page">
    <h1 class="page-title">UI 셀렉트 컴포넌트</h1>

    <!-- 사이즈별 예시 -->
    <section class="component-section">
      <h2 class="section-title">셀렉트 사이즈 (Sizes)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect
            size="small"
            placeholder="선택하세요"
            :options="options"
            v-model="selectedValue1"
          />
          <p class="select-desc">작은 사이즈 (Small)</p>
        </div>
        <div class="select-item">
          <UiSelect
            size="medium"
            placeholder="선택하세요"
            :options="options"
            v-model="selectedValue2"
          />
          <p class="select-desc">중간 사이즈 (Medium) - 기본</p>
        </div>
        <div class="select-item">
          <UiSelect
            size="large"
            placeholder="선택하세요"
            :options="options"
            v-model="selectedValue3"
          />
          <p class="select-desc">큰 사이즈 (Large)</p>
        </div>
      </div>
    </section>

    <!-- 상태별 예시 -->
    <section class="component-section">
      <h2 class="section-title">셀렉트 상태 (States)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" />
          <p class="select-desc">기본 상태 (Default)</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" v-model="selectedValue4" />
          <p class="select-desc">선택 완료 상태 (Complete)</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" :error="true" />
          <p class="select-desc">에러 상태 (Error)</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" :disabled="true" />
          <p class="select-desc">비활성화 상태 (Disabled)</p>
        </div>
        <div class="select-item">
          <UiSelect
            placeholder="선택하세요"
            :options="options"
            v-model="selectedValue5"
            :viewOnly="true"
          />
          <p class="select-desc">보기 전용 상태 (View Only)</p>
        </div>
      </div>
    </section>

    <!-- 너비 옵션 예시 -->
    <section class="component-section">
      <h2 class="section-title">셀렉트 너비 (Width)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" />
          <p class="select-desc">기본 너비 (150px)</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" width="200px" />
          <p class="select-desc">200px 너비</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" width="100%" />
          <p class="select-desc">100% 너비</p>
        </div>
      </div>
    </section>

    <!-- 옵션 예시 -->
    <section class="component-section">
      <h2 class="section-title">다양한 옵션 (Options)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="options" v-model="selectedValue6" />
          <p class="select-desc">기본 옵션 - 선택된 값: {{ selectedValue6 || '없음' }}</p>
        </div>
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="longOptions" v-model="selectedValue7" />
          <p class="select-desc">긴 옵션 목록 - 선택된 값: {{ selectedValue7 || '없음' }}</p>
        </div>
      </div>
    </section>

    <!-- 코드 예시 -->
    <section class="component-section">
      <h2 class="section-title">사용 예시 코드</h2>
      <div class="code-example">
        <pre class="code-block">
&lt;UiSelect
  size="medium"
  placeholder="선택하세요"
  :options="[
    { value: '1', label: '옵션 1' },
    { value: '2', label: '옵션 2' },
    { value: '3', label: '옵션 3' }
  ]"
  v-model="selectedValue"
/&gt;
        </pre>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 옵션 데이터
  const options = [
    { value: '1', label: '옵션 1' },
    { value: '2', label: '옵션 2' },
    { value: '3', label: '옵션 3' },
    { value: '4', label: '옵션 4' },
    { value: '5', label: '옵션 5' }
  ]

  // 긴 옵션 목록
  const longOptions = Array.from({ length: 20 }, (_, i) => ({
    value: String(i + 1),
    label: `긴 옵션 목록 ${i + 1}`
  }))

  // 선택된 값 상태 관리
  const selectedValue1 = ref('1')
  const selectedValue2 = ref('2')
  const selectedValue3 = ref('3')
  const selectedValue4 = ref('2')
  const selectedValue5 = ref('3')
  const selectedValue6 = ref('')
  const selectedValue7 = ref('')
</script>

<style lang="scss" scoped>
  // 컴포넌트 페이지 스타일
  .components-page {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  // 페이지 제목
  .page-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--color-gray-70, #464c53);
  }

  // 섹션 스타일
  .component-section {
    margin-bottom: 40px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--color-gray-20, #cdd1d5);

    &:last-child {
      border-bottom: none;
    }
  }

  // 섹션 제목
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--color-gray-70, #464c53);
  }

  // 셀렉트 그리드 레이아웃
  .select-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  // 셀렉트 아이템 스타일
  .select-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // 셀렉트 설명 텍스트
  .select-desc {
    font-size: 14px;
    color: var(--color-gray-60, #58616a);
    margin-top: 8px;
  }

  // 코드 예시 스타일
  .code-example {
    background-color: var(--color-gray-10, #e6e8ea);
    border-radius: 4px;
    padding: 16px;
  }

  .code-block {
    font-family: monospace;
    font-size: 14px;
    white-space: pre-wrap;
    color: var(--color-gray-70, #464c53);
  }
</style>
