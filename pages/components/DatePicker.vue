<template>
  <div class="component-page">
    <h1 class="component-title">날짜 선택기 (DatePicker)</h1>
    <p class="component-description">
      날짜를 선택하거나 날짜 범위를 지정할 수 있는 컴포넌트입니다.
    </p>

    <!-- 기본 사용법 -->
    <section class="component-section">
      <h2 class="section-title">기본 사용법</h2>
      <p class="section-description">가장 기본적인 날짜 선택기의 사용 방법입니다.</p>

      <div class="example-wrapper">
        <div class="example-preview">
          <UiDatePicker v-model="basicDate" label="날짜 선택" />
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker v-model="date" label="날짜 선택" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 크기 옵션 -->
    <section class="component-section">
      <h2 class="section-title">크기 옵션</h2>
      <p class="section-description">
        날짜 선택기는 small, medium, large, xlarge 네 가지 크기를 지원합니다.
      </p>

      <div class="example-wrapper">
        <div class="example-preview">
          <div class="size-examples">
            <UiDatePicker v-model="sizeSmall" label="Small" size="small" />
            <UiDatePicker v-model="sizeMedium" label="Medium" size="medium" />
            <UiDatePicker v-model="sizeLarge" label="Large" size="large" />
            <UiDatePicker v-model="sizeXLarge" label="XLarge" size="xlarge" />
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker v-model="date" label="Small" size="small" /&gt;
&lt;UiDatePicker v-model="date" label="Medium" size="medium" /&gt;
&lt;UiDatePicker v-model="date" label="Large" size="large" /&gt;
&lt;UiDatePicker v-model="date" label="XLarge" size="xlarge" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 날짜 범위 선택 -->
    <section class="component-section">
      <h2 class="section-title">날짜 범위 선택</h2>
      <p class="section-description">
        isRange 속성을 사용하여 시작일과 종료일을 선택할 수 있는 범위 선택 모드를 활성화할 수
        있습니다.
      </p>

      <div class="example-wrapper">
        <div class="example-preview">
          <UiDatePicker
            v-model="rangeDate"
            label="기간 선택"
            :isRange="true"
            startPlaceholder="시작일 선택"
            endPlaceholder="종료일 선택"
          />
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker
  v-model="rangeDate"
  label="기간 선택"
  :isRange="true"
  startPlaceholder="시작일 선택"
  endPlaceholder="종료일 선택"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 최소/최대 날짜 설정 -->
    <section class="component-section">
      <h2 class="section-title">최소/최대 날짜 설정</h2>
      <p class="section-description">
        minDate와 maxDate 속성을 사용하여 선택 가능한 날짜 범위를 제한할 수 있습니다.
      </p>

      <div class="example-wrapper">
        <div class="example-preview">
          <UiDatePicker
            v-model="limitedDate"
            label="제한된 날짜 선택"
            :minDate="minDate"
            :maxDate="maxDate"
            helperText="오늘부터 30일 이내만 선택 가능합니다."
          />
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker
  v-model="limitedDate"
  label="제한된 날짜 선택"
  :minDate="new Date()"
  :maxDate="new Date(new Date().setDate(new Date().getDate() + 30))"
  helperText="오늘부터 30일 이내만 선택 가능합니다."
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 상태 옵션 -->
    <section class="component-section">
      <h2 class="section-title">상태 옵션</h2>
      <p class="section-description">날짜 선택기는 다양한 상태(에러, 비활성화)를 지원합니다.</p>

      <div class="example-wrapper">
        <div class="example-preview">
          <div class="state-examples">
            <UiDatePicker
              v-model="errorDate"
              label="에러 상태"
              :error="true"
              errorMessage="날짜를 선택해주세요."
            />
            <UiDatePicker v-model="disabledDate" label="비활성화 상태" :disabled="true" />
            <UiDatePicker
              v-model="requiredDate"
              label="필수 입력"
              :required="true"
              helperText="이 필드는 필수 입력 항목입니다."
            />
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker
  v-model="date"
  label="에러 상태"
  :error="true"
  errorMessage="날짜를 선택해주세요."
/&gt;

&lt;UiDatePicker
  v-model="date"
  label="비활성화 상태"
  :disabled="true"
/&gt;

&lt;UiDatePicker
  v-model="date"
  label="필수 입력"
  :required="true"
  helperText="이 필드는 필수 입력 항목입니다."
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 커스텀 포맷 -->
    <section class="component-section">
      <h2 class="section-title">커스텀 날짜 포맷</h2>
      <p class="section-description">format 속성을 사용하여 날짜 표시 형식을 변경할 수 있습니다.</p>

      <div class="example-wrapper">
        <div class="example-preview">
          <div class="format-examples">
            <UiDatePicker
              v-model="formatDate1"
              label="기본 포맷 (YYYY.MM.DD)"
              format="YYYY.MM.DD"
            />
            <UiDatePicker
              v-model="formatDate2"
              label="슬래시 포맷 (YYYY/MM/DD)"
              format="YYYY/MM/DD"
            />
            <UiDatePicker
              v-model="formatDate3"
              label="하이픈 포맷 (YYYY-MM-DD)"
              format="YYYY-MM-DD"
            />
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker
  v-model="date"
  label="기본 포맷 (YYYY.MM.DD)"
  format="YYYY.MM.DD"
/&gt;

&lt;UiDatePicker
  v-model="date"
  label="슬래시 포맷 (YYYY/MM/DD)"
  format="YYYY/MM/DD"
/&gt;

&lt;UiDatePicker
  v-model="date"
  label="하이픈 포맷 (YYYY-MM-DD)"
  format="YYYY-MM-DD"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 블록 모드 -->
    <section class="component-section">
      <h2 class="section-title">블록 모드</h2>
      <p class="section-description">
        block 속성을 사용하여 날짜 선택기를 부모 요소의 너비에 맞게 확장할 수 있습니다.
      </p>

      <div class="example-wrapper">
        <div class="example-preview">
          <UiDatePicker v-model="blockDate" label="블록 모드" :block="true" />
        </div>

        <div class="code-block">
          <pre><code>&lt;UiDatePicker
  v-model="date"
  label="블록 모드"
  :block="true"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 속성 테이블 -->
    <section class="component-section">
      <h2 class="section-title">Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>속성명</th>
            <th>타입</th>
            <th>기본값</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>modelValue</td>
            <td>Date, String, Array, null</td>
            <td>null</td>
            <td>선택된 날짜 값</td>
          </tr>
          <tr>
            <td>isRange</td>
            <td>Boolean</td>
            <td>false</td>
            <td>날짜 범위 선택 모드 활성화</td>
          </tr>
          <tr>
            <td>label</td>
            <td>String</td>
            <td>''</td>
            <td>입력 필드 레이블</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>'날짜 선택'</td>
            <td>단일 날짜 선택 시 표시되는 플레이스홀더</td>
          </tr>
          <tr>
            <td>startPlaceholder</td>
            <td>String</td>
            <td>'시작일'</td>
            <td>범위 선택 시 시작일 플레이스홀더</td>
          </tr>
          <tr>
            <td>endPlaceholder</td>
            <td>String</td>
            <td>'종료일'</td>
            <td>범위 선택 시 종료일 플레이스홀더</td>
          </tr>
          <tr>
            <td>format</td>
            <td>String</td>
            <td>'YYYY.MM.DD'</td>
            <td>날짜 표시 형식</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>Boolean</td>
            <td>true</td>
            <td>선택된 날짜 지우기 버튼 표시 여부</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>비활성화 상태</td>
          </tr>
          <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>false</td>
            <td>필수 입력 필드 여부</td>
          </tr>
          <tr>
            <td>error</td>
            <td>Boolean</td>
            <td>false</td>
            <td>에러 상태</td>
          </tr>
          <tr>
            <td>errorMessage</td>
            <td>String</td>
            <td>''</td>
            <td>에러 메시지</td>
          </tr>
          <tr>
            <td>helperText</td>
            <td>String</td>
            <td>''</td>
            <td>도움말 텍스트</td>
          </tr>
          <tr>
            <td>minDate</td>
            <td>Date, String</td>
            <td>null</td>
            <td>선택 가능한 최소 날짜</td>
          </tr>
          <tr>
            <td>maxDate</td>
            <td>Date, String</td>
            <td>null</td>
            <td>선택 가능한 최대 날짜</td>
          </tr>
          <tr>
            <td>size</td>
            <td>String</td>
            <td>'medium'</td>
            <td>컴포넌트 크기 (small, medium, large, xlarge)</td>
          </tr>
          <tr>
            <td>block</td>
            <td>Boolean</td>
            <td>false</td>
            <td>부모 요소 너비에 맞게 확장</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 이벤트 테이블 -->
    <section class="component-section">
      <h2 class="section-title">Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>이벤트명</th>
            <th>반환 값</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>Date, [Date, Date]</td>
            <td>선택된 날짜가 변경될 때 발생</td>
          </tr>
          <tr>
            <td>change</td>
            <td>Date, [Date, Date]</td>
            <td>선택된 날짜가 변경될 때 발생</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 사용법
  const basicDate = ref(null)

  // 크기 옵션
  const sizeSmall = ref(null)
  const sizeMedium = ref(null)
  const sizeLarge = ref(null)
  const sizeXLarge = ref(null)

  // 날짜 범위 선택
  const rangeDate = ref([null, null])

  // 최소/최대 날짜 설정
  const limitedDate = ref(null)
  const minDate = ref(new Date())
  const maxDate = ref(new Date(new Date().setDate(new Date().getDate() + 30)))

  // 상태 옵션
  const errorDate = ref(null)
  const disabledDate = ref(new Date())
  const requiredDate = ref(null)

  // 커스텀 포맷
  const formatDate1 = ref(new Date())
  const formatDate2 = ref(new Date())
  const formatDate3 = ref(new Date())

  // 블록 모드
  const blockDate = ref(null)
</script>

<style lang="scss" scoped>
  .component-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .component-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #333;
  }

  .component-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
  }

  .component-section {
    margin-bottom: 60px;
  }

  .section-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 8px;
  }

  .section-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 24px;
  }

  .example-wrapper {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
  }

  .example-preview {
    padding: 24px;
    background-color: #fff;
  }

  .code-block {
    padding: 16px;
    background-color: #f5f7fa;
    border-top: 1px solid #eaeaea;
    overflow-x: auto;

    pre {
      margin: 0;

      code {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .size-examples,
  .state-examples,
  .format-examples {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .props-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #eaeaea;
      padding: 12px 16px;
      text-align: left;
    }

    th {
      background-color: #f5f7fa;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  @media (max-width: 768px) {
    .component-page {
      padding: 20px 16px;
    }

    .component-title {
      font-size: 28px;
    }

    .section-title {
      font-size: 20px;
    }

    .props-table {
      font-size: 14px;

      th,
      td {
        padding: 8px 12px;
      }
    }
  }
</style>
