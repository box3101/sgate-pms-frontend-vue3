<template>
  <div class="components-page">
    <h1 class="page-title">레이아웃 유틸리티 클래스</h1>

    <!-- 마진 예시 -->
    <section class="component-section">
      <h2 class="section-title">마진 (Margin)</h2>
      <p class="section-desc">
        마진 유틸리티 클래스는 요소 간의 간격을 조정하는 데 사용됩니다. 1px부터 100px까지 지정할 수
        있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">기본 마진</h3>
        <div class="example-box bg-gray-10">
          <div class="box m-10 bg-primary">m-10 (모든 방향 10px 마진)</div>
          <div class="box mt-20 bg-primary">mt-20 (위쪽 20px 마진)</div>
          <div class="box mr-30 bg-primary">mr-30 (오른쪽 30px 마진)</div>
          <div class="box mb-15 bg-primary">mb-15 (아래쪽 15px 마진)</div>
          <div class="box ml-25 bg-primary">ml-25 (왼쪽 25px 마진)</div>
        </div>

        <h3 class="example-title">수평/수직 마진</h3>
        <div class="example-box bg-gray-10">
          <div class="box mx-20 bg-primary">mx-20 (좌우 20px 마진)</div>
          <div class="box my-15 bg-primary">my-15 (상하 15px 마진)</div>
        </div>

        <h3 class="example-title">자동 마진</h3>
        <div class="example-box bg-gray-10">
          <div class="box mx-auto w-200 bg-primary">mx-auto (수평 중앙 정렬)</div>
          <div class="box ml-auto w-150 bg-primary">ml-auto (오른쪽 정렬)</div>
          <div class="box mr-auto w-150 bg-primary">mr-auto (왼쪽 정렬)</div>
        </div>
      </div>

      <div class="code-example">
        <pre class="code-block">
&lt;div class="m-10"&gt;모든 방향 10px 마진&lt;/div&gt;
&lt;div class="mt-20"&gt;위쪽 20px 마진&lt;/div&gt;
&lt;div class="mr-30"&gt;오른쪽 30px 마진&lt;/div&gt;
&lt;div class="mb-15"&gt;아래쪽 15px 마진&lt;/div&gt;
&lt;div class="ml-25"&gt;왼쪽 25px 마진&lt;/div&gt;

&lt;div class="mx-20"&gt;좌우 20px 마진&lt;/div&gt;
&lt;div class="my-15"&gt;상하 15px 마진&lt;/div&gt;

&lt;div class="mx-auto w-200"&gt;수평 중앙 정렬&lt;/div&gt;
&lt;div class="ml-auto w-150"&gt;오른쪽 정렬&lt;/div&gt;
&lt;div class="mr-auto w-150"&gt;왼쪽 정렬&lt;/div&gt;
        </pre>
      </div>
    </section>

    <!-- 패딩 예시 -->
    <section class="component-section">
      <h2 class="section-title">패딩 (Padding)</h2>
      <p class="section-desc">
        패딩 유틸리티 클래스는 요소 내부의 여백을 조정하는 데 사용됩니다. 1px부터 100px까지 지정할
        수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">기본 패딩</h3>
        <div class="example-box bg-gray-10">
          <div class="box p-10 bg-primary">p-10 (모든 방향 10px 패딩)</div>
          <div class="box pt-20 bg-primary">pt-20 (위쪽 20px 패딩)</div>
          <div class="box pr-30 bg-primary">pr-30 (오른쪽 30px 패딩)</div>
          <div class="box pb-15 bg-primary">pb-15 (아래쪽 15px 패딩)</div>
          <div class="box pl-25 bg-primary">pl-25 (왼쪽 25px 패딩)</div>
        </div>

        <h3 class="example-title">수평/수직 패딩</h3>
        <div class="example-box bg-gray-10">
          <div class="box px-20 bg-primary">px-20 (좌우 20px 패딩)</div>
          <div class="box py-15 bg-primary">py-15 (상하 15px 패딩)</div>
        </div>
      </div>

      <div class="code-example">
        <pre class="code-block">
&lt;div class="p-10"&gt;모든 방향 10px 패딩&lt;/div&gt;
&lt;div class="pt-20"&gt;위쪽 20px 패딩&lt;/div&gt;
&lt;div class="pr-30"&gt;오른쪽 30px 패딩&lt;/div&gt;
&lt;div class="pb-15"&gt;아래쪽 15px 패딩&lt;/div&gt;
&lt;div class="pl-25"&gt;왼쪽 25px 패딩&lt;/div&gt;

&lt;div class="px-20"&gt;좌우 20px 패딩&lt;/div&gt;
&lt;div class="py-15"&gt;상하 15px 패딩&lt;/div&gt;
        </pre>
      </div>
    </section>

    <!-- 너비/높이 예시 -->
    <section class="component-section">
      <h2 class="section-title">너비와 높이 (Width & Height)</h2>
      <p class="section-desc">
        너비와 높이 유틸리티 클래스는 요소의 크기를 조정하는 데 사용됩니다. 픽셀 단위와 퍼센트
        단위를 모두 지원합니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">픽셀 단위 너비</h3>
        <div class="example-box bg-gray-10">
          <div class="box w-100 bg-primary">w-100 (너비 100px)</div>
          <div class="box w-200 bg-primary">w-200 (너비 200px)</div>
          <div class="box w-300 bg-primary">w-300 (너비 300px)</div>
          <div class="box min-w-150 bg-primary">min-w-150 (최소 너비 150px)</div>
        </div>

        <h3 class="example-title">퍼센트 단위 너비</h3>
        <div class="example-box bg-gray-10">
          <div class="box w-25p bg-primary">w-25p (너비 25%)</div>
          <div class="box w-50p bg-primary">w-50p (너비 50%)</div>
          <div class="box w-75p bg-primary">w-75p (너비 75%)</div>
          <div class="box w-100p bg-primary">w-100p (너비 100%)</div>
        </div>

        <h3 class="example-title">높이 설정</h3>
        <div class="example-box bg-gray-10 h-200">
          <div class="box w-100 h-50 bg-primary">h-50 (높이 50px)</div>
          <div class="box w-100 h-100 bg-primary">h-100 (높이 100px)</div>
          <div class="box w-100 h-50p bg-primary">h-50p (높이 50%)</div>
          <div class="box w-100 h-full bg-primary">h-full (높이 100%)</div>
        </div>

        <h3 class="example-title">특수 너비/높이 값</h3>
        <div class="example-box bg-gray-10">
          <div class="box w-auto bg-primary">w-auto (자동 너비)</div>
          <div class="box w-fit bg-primary">w-fit (내용에 맞는 너비)</div>
          <div class="box w-full bg-primary">w-full (100% 너비)</div>
          <div class="box w-half bg-primary">w-half (50% 너비)</div>
          <div class="box w-third bg-primary">w-third (33.333% 너비)</div>
          <div class="box w-quarter bg-primary">w-quarter (25% 너비)</div>
        </div>
      </div>

      <div class="code-example">
        <pre class="code-block">
&lt;div class="w-100"&gt;너비 100px&lt;/div&gt;
&lt;div class="w-200"&gt;너비 200px&lt;/div&gt;
&lt;div class="min-w-150"&gt;최소 너비 150px&lt;/div&gt;

&lt;div class="w-25p"&gt;너비 25%&lt;/div&gt;
&lt;div class="w-50p"&gt;너비 50%&lt;/div&gt;
&lt;div class="w-100p"&gt;너비 100%&lt;/div&gt;

&lt;div class="h-50"&gt;높이 50px&lt;/div&gt;
&lt;div class="h-100"&gt;높이 100px&lt;/div&gt;
&lt;div class="h-50p"&gt;높이 50%&lt;/div&gt;
&lt;div class="h-full"&gt;높이 100%&lt;/div&gt;

&lt;div class="w-auto"&gt;자동 너비&lt;/div&gt;
&lt;div class="w-fit"&gt;내용에 맞는 너비&lt;/div&gt;
&lt;div class="w-full"&gt;100% 너비&lt;/div&gt;
&lt;div class="w-half"&gt;50% 너비&lt;/div&gt;
        </pre>
      </div>
    </section>

    <!-- Flex 레이아웃 예시 -->
    <section class="component-section">
      <h2 class="section-title">Flex 레이아웃</h2>
      <p class="section-desc">
        Flex 유틸리티 클래스는 요소를 유연하게 배치하는 데 사용됩니다. 다양한 정렬 옵션을
        제공합니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">기본 Flex 컨테이너</h3>
        <div class="example-box bg-gray-10">
          <div class="flex bg-gray-20 p-10">
            <div class="box bg-primary">Flex 아이템 1</div>
            <div class="box bg-primary">Flex 아이템 2</div>
            <div class="box bg-primary">Flex 아이템 3</div>
          </div>
        </div>

        <h3 class="example-title">Flex 방향</h3>
        <div class="example-box bg-gray-10">
          <div class="flex flex-row bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Row 1</div>
            <div class="box bg-primary">Row 2</div>
            <div class="box bg-primary">Row 3</div>
          </div>
          <div class="flex flex-row-reverse bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Row Reverse 1</div>
            <div class="box bg-primary">Row Reverse 2</div>
            <div class="box bg-primary">Row Reverse 3</div>
          </div>
          <div class="flex flex-col bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Column 1</div>
            <div class="box bg-primary">Column 2</div>
            <div class="box bg-primary">Column 3</div>
          </div>
          <div class="flex flex-col-reverse bg-gray-20 p-10">
            <div class="box bg-primary">Column Reverse 1</div>
            <div class="box bg-primary">Column Reverse 2</div>
            <div class="box bg-primary">Column Reverse 3</div>
          </div>
        </div>

        <h3 class="example-title">수평 정렬 (justify-content)</h3>
        <div class="example-box bg-gray-10">
          <div class="flex justify-start bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Start 1</div>
            <div class="box bg-primary">Start 2</div>
            <div class="box bg-primary">Start 3</div>
          </div>
          <div class="flex justify-center bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Center 1</div>
            <div class="box bg-primary">Center 2</div>
            <div class="box bg-primary">Center 3</div>
          </div>
          <div class="flex justify-end bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">End 1</div>
            <div class="box bg-primary">End 2</div>
            <div class="box bg-primary">End 3</div>
          </div>
          <div class="flex justify-between bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Between 1</div>
            <div class="box bg-primary">Between 2</div>
            <div class="box bg-primary">Between 3</div>
          </div>
          <div class="flex justify-around bg-gray-20 p-10">
            <div class="box bg-primary">Around 1</div>
            <div class="box bg-primary">Around 2</div>
            <div class="box bg-primary">Around 3</div>
          </div>
        </div>

        <h3 class="example-title">수직 정렬 (align-items)</h3>
        <div class="example-box bg-gray-10">
          <div class="flex items-start bg-gray-20 p-10 h-100 mb-10">
            <div class="box bg-primary">Start 1</div>
            <div class="box bg-primary h-50">Start 2</div>
            <div class="box bg-primary">Start 3</div>
          </div>
          <div class="flex items-center bg-gray-20 p-10 h-100 mb-10">
            <div class="box bg-primary">Center 1</div>
            <div class="box bg-primary h-50">Center 2</div>
            <div class="box bg-primary">Center 3</div>
          </div>
          <div class="flex items-end bg-gray-20 p-10 h-100 mb-10">
            <div class="box bg-primary">End 1</div>
            <div class="box bg-primary h-50">End 2</div>
            <div class="box bg-primary">End 3</div>
          </div>
          <div class="flex items-stretch bg-gray-20 p-10 h-100">
            <div class="box bg-primary">Stretch 1</div>
            <div class="box bg-primary">Stretch 2</div>
            <div class="box bg-primary">Stretch 3</div>
          </div>
        </div>

        <h3 class="example-title">간격 (Gap)</h3>
        <div class="example-box bg-gray-10">
          <div class="flex gap-10 bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Gap 10px</div>
            <div class="box bg-primary">Gap 10px</div>
            <div class="box bg-primary">Gap 10px</div>
          </div>
          <div class="flex gap-20 bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Gap 20px</div>
            <div class="box bg-primary">Gap 20px</div>
            <div class="box bg-primary">Gap 20px</div>
          </div>
          <div class="flex flex-col gap-15 bg-gray-20 p-10">
            <div class="box bg-primary">Gap 15px</div>
            <div class="box bg-primary">Gap 15px</div>
            <div class="box bg-primary">Gap 15px</div>
          </div>
        </div>

        <h3 class="example-title">자주 사용하는 Flex 조합</h3>
        <div class="example-box bg-gray-10">
          <div class="flex-center bg-gray-20 p-10 h-100 mb-10">
            <div class="box bg-primary">Flex Center</div>
          </div>
          <div class="flex-between-center bg-gray-20 p-10 mb-10">
            <div class="box bg-primary">Between Center 1</div>
            <div class="box bg-primary">Between Center 2</div>
            <div class="box bg-primary">Between Center 3</div>
          </div>
          <div class="flex-col-center bg-gray-20 p-10 h-150">
            <div class="box bg-primary">Column Center 1</div>
            <div class="box bg-primary">Column Center 2</div>
            <div class="box bg-primary">Column Center 3</div>
          </div>
        </div>

        <h3 class="example-title">Flex 아이템 속성</h3>
        <div class="example-box bg-gray-10">
          <div class="flex bg-gray-20 p-10 mb-10">
            <div class="box bg-primary flex-1">flex-1</div>
            <div class="box bg-primary flex-2">flex-2</div>
            <div class="box bg-primary flex-1">flex-1</div>
          </div>
          <div class="flex bg-gray-20 p-10">
            <div class="box bg-primary flex-none">flex-none</div>
            <div class="box bg-primary flex-1">flex-1</div>
            <div class="box bg-primary flex-auto">flex-auto</div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <pre class="code-block">
&lt;!-- 기본 Flex 컨테이너 --&gt;
&lt;div class="flex"&gt;
  &lt;div&gt;Flex 아이템 1&lt;/div&gt;
  &lt;div&gt;Flex 아이템 2&lt;/div&gt;
  &lt;div&gt;Flex 아이템 3&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Flex 방향 --&gt;
&lt;div class="flex flex-row"&gt;...&lt;/div&gt;
&lt;div class="flex flex-row-reverse"&gt;...&lt;/div&gt;
&lt;div class="flex flex-col"&gt;...&lt;/div&gt;
&lt;div class="flex flex-col-reverse"&gt;...&lt;/div&gt;

&lt;!-- 수평 정렬 --&gt;
&lt;div class="flex justify-start"&gt;...&lt;/div&gt;
&lt;div class="flex justify-center"&gt;...&lt;/div&gt;
&lt;div class="flex justify-end"&gt;...&lt;/div&gt;
&lt;div class="flex justify-between"&gt;...&lt;/div&gt;
&lt;div class="flex justify-around"&gt;...&lt;/div&gt;

&lt;!-- 수직 정렬 --&gt;
&lt;div class="flex items-start"&gt;...&lt;/div&gt;
&lt;div class="flex items-center"&gt;...&lt;/div&gt;
&lt;div class="flex items-end"&gt;...&lt;/div&gt;
&lt;div class="flex items-stretch"&gt;...&lt;/div&gt;

&lt;!-- 간격 --&gt;
&lt;div class="flex gap-10"&gt;...&lt;/div&gt;
&lt;div class="flex gap-20"&gt;...&lt;/div&gt;
&lt;div class="flex flex-col gap-15"&gt;...&lt;/div&gt;

&lt;!-- 자주 사용하는 Flex 조합 --&gt;
&lt;div class="flex-center"&gt;...&lt;/div&gt;
&lt;div class="flex-between-center"&gt;...&lt;/div&gt;
&lt;div class="flex-col-center"&gt;...&lt;/div&gt;

&lt;!-- Flex 아이템 속성 --&gt;
&lt;div class="flex"&gt;
  &lt;div class="flex-1"&gt;flex-1&lt;/div&gt;
  &lt;div class="flex-2"&gt;flex-2&lt;/div&gt;
  &lt;div class="flex-1"&gt;flex-1&lt;/div&gt;
&lt;/div&gt;
        </pre>
      </div>
    </section>
  </div>
</template>

<script setup>
  // 스크립트 없음
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
    margin-bottom: 16px;
    color: var(--color-gray-70, #464c53);
  }

  // 섹션 설명
  .section-desc {
    font-size: 16px;
    margin-bottom: 24px;
    color: var(--color-gray-60, #58616a);
    line-height: 1.5;
  }

  // 예시 컨테이너
  .example-container {
    margin-bottom: 24px;
  }

  // 예시 제목
  .example-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--color-gray-70, #464c53);
  }

  // 예시 박스
  .example-box {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // 박스 아이템
  .box {
    padding: 8px 16px;
    border-radius: 4px;
    margin-bottom: 8px;
    color: white;
    font-weight: 500;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // 코드 예시
  .code-example {
    margin-top: 24px;
    background-color: var(--color-gray-10, #e6e8ea);
    border-radius: 8px;
    padding: 16px;
  }

  // 코드 블록
  .code-block {
    font-family: 'Consolas', monospace;
    font-size: 14px;
    color: var(--color-gray-70, #464c53);
    white-space: pre-wrap;
    line-height: 1.5;
  }

  // 배경색 유틸리티
  .bg-primary {
    background-color: var(--color-system-b30, #0084ff);
  }

  .bg-gray-10 {
    background-color: var(--color-gray-10, #e6e8ea);
  }

  .bg-gray-20 {
    background-color: var(--color-gray-20, #cdd1d5);
  }

  // 추가 Flex 유틸리티
  .flex-2 {
    flex: 2;
  }
</style>
