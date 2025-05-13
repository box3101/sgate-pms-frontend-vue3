<template>
  <div class="button-examples">
    <h1 class="page-title">버튼 컴포넌트 사용 예시</h1>

    <section class="example-section">
      <h2 class="section-title">기본 버튼 스타일</h2>
      <div class="button-row">
        <UiButton variant="primary">Primary 버튼</UiButton>
        <UiButton variant="secondary">Secondary 버튼</UiButton>
        <UiButton variant="primary-line">Primary Line 버튼</UiButton>
        <UiButton variant="secondary-line">Secondary Line 버튼</UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton variant="primary"&gt;Primary 버튼&lt;/UiButton&gt;
&lt;UiButton variant="secondary"&gt;Secondary 버튼&lt;/UiButton&gt;
&lt;UiButton variant="primary-line"&gt;Primary Line 버튼&lt;/UiButton&gt;
&lt;UiButton variant="secondary-line"&gt;Secondary Line 버튼&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">버튼 크기</h2>
      <div class="button-row">
        <UiButton size="small">Small 버튼</UiButton>
        <UiButton size="medium">Medium 버튼</UiButton>
        <UiButton size="large">Large 버튼</UiButton>
        <UiButton size="xlarge">XLarge 버튼</UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton size="small"&gt;Small 버튼&lt;/UiButton&gt;
&lt;UiButton size="medium"&gt;Medium 버튼&lt;/UiButton&gt;
&lt;UiButton size="large"&gt;Large 버튼&lt;/UiButton&gt;
&lt;UiButton size="xlarge"&gt;XLarge 버튼&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">아이콘 버튼</h2>
      <div class="button-row">
        <UiButton icon="plus">
          <i class="icon icon-plus icon-sm icon-white"></i>
          <span>아이콘 버튼</span>
        </UiButton>
        <UiButton icon="search" variant="secondary">
          <i class="icon icon-search icon-sm icon-white"></i>
          <span>검색 버튼</span>
        </UiButton>
        <UiButton icon="trash" variant="primary-line">
          <i class="icon icon-trash icon-sm"></i>
          <span>삭제 버튼</span>
        </UiButton>
        <UiButton icon="edit" iconOnly>
          <i class="icon icon-plus icon-sm icon-white"></i>
        </UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton icon="plus"&gt;아이콘 버튼&lt;/UiButton&gt;
&lt;UiButton icon="search" variant="secondary"&gt;검색 버튼&lt;/UiButton&gt;
&lt;UiButton icon="trash" variant="primary-line"&gt;삭제 버튼&lt;/UiButton&gt;
&lt;UiButton icon="edit" iconOnly&gt;&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">비활성화 버튼</h2>
      <div class="button-row">
        <UiButton disabled>비활성화 버튼</UiButton>
        <UiButton variant="secondary" disabled>비활성화 버튼</UiButton>
        <UiButton variant="primary-line" disabled>비활성화 버튼</UiButton>
        <UiButton icon="plus" disabled>비활성화 아이콘 버튼</UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton disabled&gt;비활성화 버튼&lt;/UiButton&gt;
&lt;UiButton variant="secondary" disabled&gt;비활성화 버튼&lt;/UiButton&gt;
&lt;UiButton variant="primary-line" disabled&gt;비활성화 버튼&lt;/UiButton&gt;
&lt;UiButton icon="plus" disabled&gt;비활성화 아이콘 버튼&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">블록 버튼</h2>
      <div class="button-block">
        <UiButton block>블록 버튼</UiButton>
        <UiButton variant="secondary" block>블록 버튼</UiButton>
        <UiButton variant="primary-line" block>블록 버튼</UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton block&gt;블록 버튼&lt;/UiButton&gt;
&lt;UiButton variant="secondary" block&gt;블록 버튼&lt;/UiButton&gt;
&lt;UiButton variant="primary-line" block&gt;블록 버튼&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">Ghost 버튼</h2>
      <div class="button-row">
        <UiButton variant="ghost">Ghost 버튼</UiButton>
        <UiButton variant="ghost">
          <i class="icon icon-plus icon-sm icon-gray"></i>
          <span>Ghost 아이콘 버튼</span>
        </UiButton>
        <UiButton variant="ghost" iconOnly>
          <i class="icon icon-edit icon-sm icon-gray"></i>
        </UiButton>
        <UiButton variant="ghost" disabled>
          <i class="icon icon-trash icon-sm icon-gray"></i>
          <span>비활성화 Ghost</span>
        </UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton variant="ghost"&gt;Ghost 버튼&lt;/UiButton&gt;
&lt;UiButton variant="ghost"&gt;
  &lt;i class="icon icon-plus icon-sm icon-gray"&gt;&lt;/i&gt;
  &lt;span&gt;Ghost 아이콘 버튼&lt;/span&gt;
&lt;/UiButton&gt;
&lt;UiButton variant="ghost" iconOnly&gt;
  &lt;i class="icon icon-edit icon-sm icon-gray"&gt;&lt;/i&gt;
&lt;/UiButton&gt;
&lt;UiButton variant="ghost" disabled&gt;
  &lt;i class="icon icon-trash icon-sm icon-gray"&gt;&lt;/i&gt;
  &lt;span&gt;비활성화 Ghost&lt;/span&gt;
&lt;/UiButton&gt;</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">버튼 타입</h2>
      <div class="button-row">
        <UiButton nativeType="button">Button 타입</UiButton>
        <UiButton nativeType="submit" variant="primary">Submit 타입</UiButton>
        <UiButton nativeType="reset" variant="secondary-line">Reset 타입</UiButton>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiButton nativeType="button"&gt;Button 타입&lt;/UiButton&gt;
&lt;UiButton nativeType="submit" variant="primary"&gt;Submit 타입&lt;/UiButton&gt;
&lt;UiButton nativeType="reset" variant="secondary-line"&gt;Reset 타입&lt;/UiButton&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
  // 버튼 컴포넌트 사용 예시 페이지
</script>

<style lang="scss" scoped>
  .button-examples {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
  }

  .example-section {
    margin-bottom: 40px;
    border: 1px solid #e6e8ea;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
    color: #333;
    font-weight: 600;
  }

  .button-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .button-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .code-example {
    background-color: #f4f5f6;
    border-radius: 4px;
    padding: 16px;
    margin-top: 16px;

    pre {
      margin: 0;
      white-space: pre-wrap;

      code {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>
