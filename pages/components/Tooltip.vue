<template>
  <div class="component-page">
    <div class="component-header">
      <h1 class="component-title">툴팁 컴포넌트</h1>
      <p class="component-description">
        마우스 오버 또는 클릭 시 추가 정보를 제공하는 툴팁 컴포넌트입니다. 다양한 위치와 트리거
        방식을 지원합니다.
      </p>
    </div>

    <div class="component-section">
      <h2 class="section-title">기본 사용법</h2>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiTooltip title="툴팁 제목">
            <template #trigger>
              <button class="example-button">마우스 오버</button>
            </template>
            <p>기본 툴팁 내용입니다.</p>
          </UiTooltip>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTooltip title="툴팁 제목"&gt;
  &lt;template #trigger&gt;
    &lt;button&gt;마우스 오버&lt;/button&gt;
  &lt;/template&gt;
  &lt;p&gt;기본 툴팁 내용입니다.&lt;/p&gt;
&lt;/UiTooltip&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h2 class="section-title">위치 설정</h2>
      <p class="section-description">
        position 속성을 사용하여 툴팁의 위치를 지정할 수 있습니다. 지원되는 위치: top, right,
        bottom, left
      </p>
      <div class="example-wrapper">
        <div class="example-preview position-examples">
          <UiTooltip title="위쪽 툴팁" position="top">
            <template #trigger>
              <button class="example-button">위쪽</button>
            </template>
            <p>위쪽에 표시되는 툴팁입니다.</p>
          </UiTooltip>

          <UiTooltip title="오른쪽 툴팁" position="right">
            <template #trigger>
              <button class="example-button">오른쪽</button>
            </template>
            <p>오른쪽에 표시되는 툴팁입니다.</p>
          </UiTooltip>

          <UiTooltip title="아래쪽 툴팁" position="bottom">
            <template #trigger>
              <button class="example-button">아래쪽</button>
            </template>
            <p>아래쪽에 표시되는 툴팁입니다.</p>
          </UiTooltip>

          <UiTooltip title="왼쪽 툴팁" position="left">
            <template #trigger>
              <button class="example-button">왼쪽</button>
            </template>
            <p>왼쪽에 표시되는 툴팁입니다.</p>
          </UiTooltip>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTooltip title="툴팁 제목" position="top|right|bottom|left"&gt;
  &lt;template #trigger&gt;
    &lt;button&gt;트리거 요소&lt;/button&gt;
  &lt;/template&gt;
  &lt;p&gt;툴팁 내용&lt;/p&gt;
&lt;/UiTooltip&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h2 class="section-title">트리거 방식</h2>
      <p class="section-description">
        trigger 속성을 사용하여 툴팁이 표시되는 방식을 지정할 수 있습니다. 지원되는 트리거:
        hover(기본값), click
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiTooltip title="클릭 툴팁" trigger="click">
            <template #trigger>
              <button class="example-button">클릭하세요</button>
            </template>
            <p>클릭 시 표시되는 툴팁입니다.</p>
            <p>외부를 클릭하면 닫힙니다.</p>
          </UiTooltip>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTooltip title="클릭 툴팁" trigger="click"&gt;
  &lt;template #trigger&gt;
    &lt;button&gt;클릭하세요&lt;/button&gt;
  &lt;/template&gt;
  &lt;p&gt;클릭 시 표시되는 툴팁입니다.&lt;/p&gt;
  &lt;p&gt;외부를 클릭하면 닫힙니다.&lt;/p&gt;
&lt;/UiTooltip&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h2 class="section-title">커스텀 타이틀</h2>
      <p class="section-description">
        title 속성 대신 #title 슬롯을 사용하여 타이틀을 커스터마이징할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiTooltip>
            <template #trigger>
              <button class="example-button">커스텀 타이틀</button>
            </template>
            <template #title>
              <strong style="color: #4a6cf7">커스텀 스타일 타이틀</strong>
            </template>
            <p>타이틀에 커스텀 스타일을 적용할 수 있습니다.</p>
          </UiTooltip>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTooltip&gt;
  &lt;template #trigger&gt;
    &lt;button&gt;커스텀 타이틀&lt;/button&gt;
  &lt;/template&gt;
  &lt;template #title&gt;
    &lt;strong style="color: #4a6cf7;"&gt;커스텀 스타일 타이틀&lt;/strong&gt;
  &lt;/template&gt;
  &lt;p&gt;타이틀에 커스텀 스타일을 적용할 수 있습니다.&lt;/p&gt;
&lt;/UiTooltip&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h2 class="section-title">실제 사용 예시</h2>
      <p class="section-description">아이콘과 함께 사용하는 툴팁 예시입니다.</p>
      <div class="example-wrapper">
        <div class="example-preview">
          <div class="tooltip-wrapper">
            <UiTooltip>
              <template #trigger>
                <i class="icon-md icon-get"></i>
              </template>
              <template #title>
                <strong>등급척도그룹 가져오기란?</strong>
              </template>
              <p>다른 심사자가 작성한 등급척도그룹을 내 등급척도그룹에 추가합니다.</p>
              <p>가져온 등급척도그룹은 내 등급척도그룹 목록에서 확인할 수 있습니다.</p>
            </UiTooltip>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;div class="tooltip-wrapper"&gt;
  &lt;UiTooltip&gt;
    &lt;template #trigger&gt;
      &lt;i class="icon-md icon-get"&gt;&lt;/i&gt;
    &lt;/template&gt;
    &lt;template #title&gt;
      &lt;strong&gt;등급척도그룹 가져오기란?&lt;/strong&gt;
    &lt;/template&gt;
    &lt;p&gt;다른 심사자가 작성한 등급척도그룹을 내 등급척도그룹에 추가합니다.&lt;/p&gt;
    &lt;p&gt;가져온 등급척도그룹은 내 등급척도그룹 목록에서 확인할 수 있습니다.&lt;/p&gt;
  &lt;/UiTooltip&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h2 class="section-title">Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>타입</th>
            <th>기본값</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>''</td>
            <td>툴팁 제목 (title 슬롯을 사용하면 무시됨)</td>
          </tr>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>'bottom'</td>
            <td>툴팁 위치 (top, right, bottom, left)</td>
          </tr>
          <tr>
            <td>trigger</td>
            <td>String</td>
            <td>'hover'</td>
            <td>툴팁 트리거 방식 (hover, click)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="component-section">
      <h2 class="section-title">Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>trigger</td>
            <td>툴팁을 트리거할 요소</td>
          </tr>
          <tr>
            <td>title</td>
            <td>툴팁 제목 (title prop보다 우선 적용)</td>
          </tr>
          <tr>
            <td>default</td>
            <td>툴팁 내용</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TooltipPage'
  }
</script>

<style lang="scss" scoped>
  .component-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .component-header {
    margin-bottom: 40px;

    .component-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #333;
    }

    .component-description {
      font-size: 16px;
      line-height: 1.6;
      color: #666;
    }
  }

  .component-section {
    margin-bottom: 48px;

    .section-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #333;
      padding-bottom: 8px;
      border-bottom: 1px solid #eaeaea;
    }

    .section-description {
      font-size: 16px;
      line-height: 1.6;
      color: #666;
      margin-bottom: 16px;
    }
  }

  .example-wrapper {
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .example-preview {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;

    &.position-examples {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 16px;
    }
  }

  .example-button {
    padding: 8px 16px;
    background-color: #4a6cf7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3a5ce5;
    }
  }

  .example-code {
    background-color: #f0f0f0;
    padding: 16px;
    overflow-x: auto;

    pre {
      margin: 0;

      code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .props-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;

    th,
    td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    td {
      color: #666;
    }
  }

  .tooltip-wrapper {
    display: inline-block;

    .icon-md {
      width: 24px;
      height: 24px;
      display: inline-block;
      cursor: pointer;
      background-color: #4a6cf7;
      border-radius: 50%;
      position: relative;

      &::before {
        content: '?';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-weight: bold;
      }
    }
  }
</style>
