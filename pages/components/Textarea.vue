<template>
  <div class="container">
    <h1 class="page-title">텍스트영역(Textarea) 컴포넌트</h1>
    <p class="page-description">
      텍스트영역 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 UI 요소입니다. 다양한 크기와
      상태를 지원합니다.
    </p>

    <!-- 기본 텍스트영역 -->
    <section class="component-section">
      <h2 class="section-title">기본 텍스트영역</h2>
      <div class="component-demo">
        <UiTextarea
          v-model="basicTextarea"
          label="기본 텍스트영역"
          placeholder="여기에 텍스트를 입력하세요"
          helperText="이것은 도움말 텍스트입니다"
        />
      </div>
      <div class="code-example">
        <pre><code>&lt;UiTextarea
  v-model="basicTextarea"
  label="기본 텍스트영역"
  placeholder="여기에 텍스트를 입력하세요"
  helperText="이것은 도움말 텍스트입니다"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 크기 변형 -->
    <section class="component-section">
      <h2 class="section-title">크기 변형</h2>
      <div class="component-demo">
        <div class="component-row">
          <UiTextarea
            v-model="smallTextarea"
            label="Small 텍스트영역"
            placeholder="Small 크기"
            size="small"
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="mediumTextarea"
            label="Medium 텍스트영역"
            placeholder="Medium 크기"
            size="medium"
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="largeTextarea"
            label="Large 텍스트영역"
            placeholder="Large 크기"
            size="large"
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="xlargeTextarea"
            label="XLarge 텍스트영역"
            placeholder="XLarge 크기"
            size="xlarge"
          />
        </div>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiTextarea
  v-model="smallTextarea"
  label="Small 텍스트영역"
  placeholder="Small 크기"
  size="small"
/&gt;

&lt;UiTextarea
  v-model="mediumTextarea"
  label="Medium 텍스트영역"
  placeholder="Medium 크기"
  size="medium"
/&gt;

&lt;UiTextarea
  v-model="largeTextarea"
  label="Large 텍스트영역"
  placeholder="Large 크기"
  size="large"
/&gt;

&lt;UiTextarea
  v-model="xlargeTextarea"
  label="XLarge 텍스트영역"
  placeholder="XLarge 크기"
  size="xlarge"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 상태 변형 -->
    <section class="component-section">
      <h2 class="section-title">상태 변형</h2>
      <div class="component-demo">
        <div class="component-row">
          <UiTextarea
            v-model="errorTextarea"
            label="오류 상태"
            placeholder="오류 상태의 텍스트영역"
            error
            errorMessage="이것은 오류 메시지입니다"
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="disabledTextarea"
            label="비활성화 상태"
            placeholder="비활성화된 텍스트영역"
            disabled
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="readonlyTextarea"
            label="읽기 전용 상태"
            placeholder="읽기 전용 텍스트영역"
            readonly
            :modelValue="'이 텍스트는 변경할 수 없습니다'"
          />
        </div>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiTextarea
  v-model="errorTextarea"
  label="오류 상태"
  placeholder="오류 상태의 텍스트영역"
  error
  errorMessage="이것은 오류 메시지입니다"
/&gt;

&lt;UiTextarea
  v-model="disabledTextarea"
  label="비활성화 상태"
  placeholder="비활성화된 텍스트영역"
  disabled
/&gt;

&lt;UiTextarea
  v-model="readonlyTextarea"
  label="읽기 전용 상태"
  placeholder="읽기 전용 텍스트영역"
  readonly
  :modelValue="'이 텍스트는 변경할 수 없습니다'"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 추가 기능 -->
    <section class="component-section">
      <h2 class="section-title">추가 기능</h2>
      <div class="component-demo">
        <div class="component-row">
          <UiTextarea
            v-model="resizableTextarea"
            label="크기 조절 가능"
            placeholder="이 텍스트영역은 크기를 조절할 수 있습니다"
            resizable
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="countTextarea"
            label="글자 수 표시"
            placeholder="최대 100자까지 입력 가능합니다"
            maxlength="100"
            showCount
          />
        </div>
        <div class="component-row">
          <UiTextarea
            v-model="rowsTextarea"
            label="행 수 지정"
            placeholder="이 텍스트영역은 8줄로 표시됩니다"
            :rows="8"
          />
        </div>
      </div>
      <div class="code-example">
        <pre><code>&lt;UiTextarea
  v-model="resizableTextarea"
  label="크기 조절 가능"
  placeholder="이 텍스트영역은 크기를 조절할 수 있습니다"
  resizable
/&gt;

&lt;UiTextarea
  v-model="countTextarea"
  label="글자 수 표시"
  placeholder="최대 100자까지 입력 가능합니다"
  maxlength="100"
  showCount
/&gt;

&lt;UiTextarea
  v-model="rowsTextarea"
  label="행 수 지정"
  placeholder="이 텍스트영역은 8줄로 표시됩니다"
  :rows="8"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 전체 너비 -->
    <section class="component-section">
      <h2 class="section-title">전체 너비</h2>
      <div class="component-demo">
        <UiTextarea
          v-model="blockTextarea"
          label="전체 너비 텍스트영역"
          placeholder="이 텍스트영역은 전체 너비를 차지합니다"
          block
        />
      </div>
      <div class="code-example">
        <pre><code>&lt;UiTextarea
  v-model="blockTextarea"
  label="전체 너비 텍스트영역"
  placeholder="이 텍스트영역은 전체 너비를 차지합니다"
  block
/&gt;</code></pre>
      </div>
    </section>

    <!-- API 문서 -->
    <section class="component-section">
      <h2 class="section-title">API</h2>
      <div class="api-docs">
        <h3>Props</h3>
        <table class="api-table">
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
              <td>modelValue</td>
              <td>String</td>
              <td>''</td>
              <td>텍스트영역의 값</td>
            </tr>
            <tr>
              <td>label</td>
              <td>String</td>
              <td>''</td>
              <td>텍스트영역의 레이블</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>String</td>
              <td>''</td>
              <td>텍스트영역의 플레이스홀더</td>
            </tr>
            <tr>
              <td>size</td>
              <td>String</td>
              <td>'medium'</td>
              <td>텍스트영역의 크기 (small, medium, large, xlarge)</td>
            </tr>
            <tr>
              <td>rows</td>
              <td>Number, String</td>
              <td>4</td>
              <td>텍스트영역의 행 수</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 비활성화 여부</td>
            </tr>
            <tr>
              <td>readonly</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 읽기 전용 여부</td>
            </tr>
            <tr>
              <td>required</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 필수 입력 여부</td>
            </tr>
            <tr>
              <td>block</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 전체 너비 사용 여부</td>
            </tr>
            <tr>
              <td>error</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 오류 상태 여부</td>
            </tr>
            <tr>
              <td>errorMessage</td>
              <td>String</td>
              <td>''</td>
              <td>텍스트영역의 오류 메시지</td>
            </tr>
            <tr>
              <td>helperText</td>
              <td>String</td>
              <td>''</td>
              <td>텍스트영역의 도움말 텍스트</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>Number, String</td>
              <td>undefined</td>
              <td>텍스트영역의 최대 글자 수</td>
            </tr>
            <tr>
              <td>showCount</td>
              <td>Boolean</td>
              <td>false</td>
              <td>텍스트영역의 글자 수 표시 여부</td>
            </tr>
            <tr>
              <td>resizable</td>
              <td>Boolean</td>
              <td>true</td>
              <td>텍스트영역의 크기 조절 가능 여부</td>
            </tr>
          </tbody>
        </table>

        <h3>이벤트</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>파라미터</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>update:modelValue</td>
              <td>String</td>
              <td>텍스트영역의 값이 변경될 때 발생</td>
            </tr>
            <tr>
              <td>focus</td>
              <td>Event</td>
              <td>텍스트영역이 포커스를 받을 때 발생</td>
            </tr>
            <tr>
              <td>blur</td>
              <td>Event</td>
              <td>텍스트영역이 포커스를 잃을 때 발생</td>
            </tr>
            <tr>
              <td>change</td>
              <td>Event</td>
              <td>텍스트영역의 값이 변경되고 포커스를 잃을 때 발생</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 텍스트영역
  const basicTextarea = ref('')

  // 크기 변형
  const smallTextarea = ref('')
  const mediumTextarea = ref('')
  const largeTextarea = ref('')
  const xlargeTextarea = ref('')

  // 상태 변형
  const errorTextarea = ref('')
  const disabledTextarea = ref('')
  const readonlyTextarea = ref('이 텍스트는 변경할 수 없습니다')

  // 추가 기능
  const resizableTextarea = ref('')
  const countTextarea = ref('')
  const rowsTextarea = ref('')

  // 전체 너비
  const blockTextarea = ref('')
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

  .component-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
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

  .api-docs {
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 24px 0 16px;
      color: var(--color-gray-70, #464c53);
    }
  }

  .api-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;

    th,
    td {
      text-align: left;
      padding: 12px 16px;
      border: 1px solid var(--color-gray-20, #cdd1d5);
    }

    th {
      background-color: var(--color-gray-10, #e6e8ea);
      font-weight: 600;
      color: var(--color-gray-70, #464c53);
    }

    td {
      color: var(--color-gray-60, #58616a);
    }
  }
</style>
