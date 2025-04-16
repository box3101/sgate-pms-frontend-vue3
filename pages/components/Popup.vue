<template>
  <div class="container">
    <h1 class="page-title">팝업(Modal) 컴포넌트</h1>
    <p class="page-description">
      팝업 컴포넌트는 사용자에게 중요한 정보를 표시하거나 작업을 수행하도록 하는 오버레이 창입니다.
    </p>

    <!-- 기본 팝업 -->
    <section class="component-section">
      <h2 class="section-title">기본 팝업</h2>
      <div class="component-demo">
        <UiButton @click="basicModal = true">기본 팝업 열기</UiButton>

        <UiModal v-model="basicModal" title="기본 팝업">
          <p>이것은 기본 팝업의 내용입니다.</p>
          <p>팝업은 사용자의 주의를 끌기 위해 사용됩니다.</p>
        </UiModal>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton @click="basicModal = true"&gt;기본 팝업 열기&lt;/UiButton&gt;

&lt;UiModal v-model="basicModal" title="기본 팝업"&gt;
  &lt;p&gt;이것은 기본 팝업의 내용입니다.&lt;/p&gt;
  &lt;p&gt;팝업은 사용자의 주의를 끌기 위해 사용됩니다.&lt;/p&gt;
&lt;/UiModal&gt;</code></pre>
      </div>
    </section>

    <!-- 크기 변형 -->
    <section class="component-section">
      <h2 class="section-title">크기 변형</h2>
      <div class="component-demo">
        <div class="flex gap-4 flex-wrap">
          <UiButton @click="smallModal = true">Small</UiButton>
          <UiButton @click="mediumModal = true">Medium</UiButton>
          <UiButton @click="largeModal = true">Large</UiButton>
          <UiButton @click="xlargeModal = true">XLarge</UiButton>
        </div>

        <UiModal v-model="smallModal" title="Small 팝업" size="small">
          <p>Small 크기의 팝업입니다.</p>
        </UiModal>

        <UiModal v-model="mediumModal" title="Medium 팝업" size="medium">
          <p>Medium 크기의 팝업입니다.</p>
        </UiModal>

        <UiModal v-model="largeModal" title="Large 팝업" size="large">
          <p>Large 크기의 팝업입니다.</p>
        </UiModal>

        <UiModal v-model="xlargeModal" title="XLarge 팝업" size="xlarge">
          <p>XLarge 크기의 팝업입니다.</p>
        </UiModal>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiModal v-model="smallModal" title="Small 팝업" size="small"&gt;
  &lt;p&gt;Small 크기의 팝업입니다.&lt;/p&gt;
&lt;/UiModal&gt;

&lt;UiModal v-model="mediumModal" title="Medium 팝업" size="medium"&gt;
  &lt;p&gt;Medium 크기의 팝업입니다.&lt;/p&gt;
&lt;/UiModal&gt;

&lt;UiModal v-model="largeModal" title="Large 팝업" size="large"&gt;
  &lt;p&gt;Large 크기의 팝업입니다.&lt;/p&gt;
&lt;/UiModal&gt;

&lt;UiModal v-model="xlargeModal" title="XLarge 팝업" size="xlarge"&gt;
  &lt;p&gt;XLarge 크기의 팝업입니다.&lt;/p&gt;
&lt;/UiModal&gt;</code></pre>
      </div>
    </section>

    <!-- 위치 옵션 -->
    <section class="component-section">
      <h2 class="section-title">위치 옵션</h2>
      <div class="component-demo">
        <div class="flex gap-4">
          <UiButton @click="centeredModal = true">중앙 정렬</UiButton>
          <UiButton @click="rightModal = true">오른쪽 정렬</UiButton>
        </div>

        <UiModal v-model="centeredModal" title="중앙 정렬 팝업" centered>
          <p>이 팝업은 화면 중앙에 정렬됩니다.</p>
        </UiModal>

        <UiModal v-model="rightModal" title="오른쪽 정렬 팝업" position="right">
          <p>이 팝업은 화면 오른쪽에 정렬됩니다.</p>
          <p>크기 조절 핸들을 드래그하여 너비를 조절할 수 있습니다.</p>
        </UiModal>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiModal v-model="centeredModal" title="중앙 정렬 팝업" centered&gt;
  &lt;p&gt;이 팝업은 화면 중앙에 정렬됩니다.&lt;/p&gt;
&lt;/UiModal&gt;

&lt;UiModal v-model="rightModal" title="오른쪽 정렬 팝업" position="right"&gt;
  &lt;p&gt;이 팝업은 화면 오른쪽에 정렬됩니다.&lt;/p&gt;
  &lt;p&gt;크기 조절 핸들을 드래그하여 너비를 조절할 수 있습니다.&lt;/p&gt;
&lt;/UiModal&gt;</code></pre>
      </div>
    </section>

    <!-- 푸터 사용 -->
    <section class="component-section">
      <h2 class="section-title">푸터 사용</h2>
      <div class="component-demo">
        <UiButton @click="footerModal = true">푸터가 있는 팝업 열기</UiButton>

        <UiModal v-model="footerModal" title="푸터가 있는 팝업" showFooter>
          <p>이 팝업에는 푸터 영역이 있습니다.</p>

          <template #footerActions>
            <div class="flex justify-end gap-2">
              <UiButton variant="secondary" @click="footerModal = false">취소</UiButton>
              <UiButton @click="footerModal = false">확인</UiButton>
            </div>
          </template>
        </UiModal>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiModal v-model="footerModal" title="푸터가 있는 팝업" showFooter&gt;
  &lt;p&gt;이 팝업에는 푸터 영역이 있습니다.&lt;/p&gt;

  &lt;template #footerActions&gt;
    &lt;div class="flex justify-end gap-2"&gt;
      &lt;UiButton variant="secondary" @click="footerModal = false"&gt;취소&lt;/UiButton&gt;
      &lt;UiButton @click="footerModal = false"&gt;확인&lt;/UiButton&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/UiModal&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 팝업
  const basicModal = ref(false)

  // 크기 변형
  const smallModal = ref(false)
  const mediumModal = ref(false)
  const largeModal = ref(false)
  const xlargeModal = ref(false)

  // 위치 옵션
  const centeredModal = ref(false)
  const rightModal = ref(false)

  // 푸터 사용
  const footerModal = ref(false)
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--color-gray-80, #2c3137);
  }

  .page-description {
    font-size: 16px;
    color: var(--color-gray-60, #58616a);
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .component-section {
    margin-bottom: 40px;
    border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
    padding-bottom: 40px;

    &:last-child {
      border-bottom: none;
    }
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--color-gray-70, #464c53);
  }

  .component-demo {
    margin-bottom: 20px;
    padding: 24px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 8px;
    background-color: var(--color-gray-5, #f5f6f7);
  }

  .code-example {
    background-color: var(--color-gray-10, #e6e8ea);
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;

    pre {
      margin: 0;

      code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        color: var(--color-gray-80, #2c3137);
        line-height: 1.5;
      }
    }
  }

  .flex {
    display: flex;
  }

  .gap-2 {
    gap: 8px;
  }

  .gap-4 {
    gap: 16px;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .justify-end {
    justify-content: flex-end;
  }
</style>
