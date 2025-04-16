<template>
  <div class="radio-examples">
    <h1 class="page-title">라디오 버튼 컴포넌트</h1>
    <p class="page-description">다양한 상태와 옵션을 가진 라디오 버튼 컴포넌트 사용 예시입니다.</p>

    <div class="example-section">
      <h2 class="section-title">기본 라디오 버튼</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-group">
            <UiRadio v-model="basicRadio" name="basic-radio" value="option1" label="옵션 1" />
            <UiRadio v-model="basicRadio" name="basic-radio" value="option2" label="옵션 2" />
            <UiRadio v-model="basicRadio" name="basic-radio" value="option3" label="옵션 3" />
          </div>
          <p class="radio-result">선택된 값: {{ basicRadio }}</p>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiRadio v-model="basicRadio" name="basic-radio" value="option1" label="옵션 1" /&gt;
&lt;UiRadio v-model="basicRadio" name="basic-radio" value="option2" label="옵션 2" /&gt;
&lt;UiRadio v-model="basicRadio" name="basic-radio" value="option3" label="옵션 3" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">라디오 버튼 크기</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-size-group">
            <div class="radio-size-item">
              <h3 class="size-title">작은 크기 (small)</h3>
              <UiRadio
                v-model="sizeRadios.small"
                name="small-radio"
                value="option1"
                label="옵션 1"
                size="small"
              />
              <UiRadio
                v-model="sizeRadios.small"
                name="small-radio"
                value="option2"
                label="옵션 2"
                size="small"
              />
            </div>

            <div class="radio-size-item">
              <h3 class="size-title">중간 크기 (medium)</h3>
              <UiRadio
                v-model="sizeRadios.medium"
                name="medium-radio"
                value="option1"
                label="옵션 1"
                size="medium"
              />
              <UiRadio
                v-model="sizeRadios.medium"
                name="medium-radio"
                value="option2"
                label="옵션 2"
                size="medium"
              />
            </div>

            <div class="radio-size-item">
              <h3 class="size-title">큰 크기 (large)</h3>
              <UiRadio
                v-model="sizeRadios.large"
                name="large-radio"
                value="option1"
                label="옵션 1"
                size="large"
              />
              <UiRadio
                v-model="sizeRadios.large"
                name="large-radio"
                value="option2"
                label="옵션 2"
                size="large"
              />
            </div>
          </div>
        </div>
        <div class="example-code">
          <pre><code>// 작은 크기 (small)
&lt;UiRadio v-model="sizeRadios.small" name="small-radio" value="option1" label="옵션 1" size="small" /&gt;
&lt;UiRadio v-model="sizeRadios.small" name="small-radio" value="option2" label="옵션 2" size="small" /&gt;

// 중간 크기 (medium)
&lt;UiRadio v-model="sizeRadios.medium" name="medium-radio" value="option1" label="옵션 1" size="medium" /&gt;
&lt;UiRadio v-model="sizeRadios.medium" name="medium-radio" value="option2" label="옵션 2" size="medium" /&gt;

// 큰 크기 (large)
&lt;UiRadio v-model="sizeRadios.large" name="large-radio" value="option1" label="옵션 1" size="large" /&gt;
&lt;UiRadio v-model="sizeRadios.large" name="large-radio" value="option2" label="옵션 2" size="large" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">비활성화된 라디오 버튼</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-group">
            <UiRadio
              v-model="disabledRadio"
              name="disabled-radio"
              value="option1"
              label="비활성화 (미선택)"
              disabled
            />
            <UiRadio
              v-model="disabledRadio"
              name="disabled-radio"
              value="option2"
              label="비활성화 (선택됨)"
              disabled
            />
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiRadio v-model="disabledRadio" name="disabled-radio" value="option1" label="비활성화 (미선택)" disabled /&gt;
&lt;UiRadio v-model="disabledRadio" name="disabled-radio" value="option2" label="비활성화 (선택됨)" disabled /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">슬롯을 사용한 커스텀 라벨</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-group">
            <UiRadio v-model="customLabelRadio" name="custom-label-radio" value="option1">
              <span class="custom-label"
                >커스텀 라벨 <span class="highlight">강조</span> 텍스트</span
              >
            </UiRadio>
            <UiRadio v-model="customLabelRadio" name="custom-label-radio" value="option2">
              <span class="custom-label">아이콘 포함 <i class="icon">★</i></span>
            </UiRadio>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiRadio v-model="customLabelRadio" name="custom-label-radio" value="option1"&gt;
  &lt;span class="custom-label"&gt;커스텀 라벨 &lt;span class="highlight"&gt;강조&lt;/span&gt; 텍스트&lt;/span&gt;
&lt;/UiRadio&gt;

&lt;UiRadio v-model="customLabelRadio" name="custom-label-radio" value="option2"&gt;
  &lt;span class="custom-label"&gt;아이콘 포함 &lt;i class="icon"&gt;★&lt;/i&gt;&lt;/span&gt;
&lt;/UiRadio&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">라디오 그룹 - 숫자 값</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-group">
            <h3 class="group-title">연령대를 선택하세요</h3>
            <UiRadio v-model="ageGroup" name="age-group" :value="10" label="10대" />
            <UiRadio v-model="ageGroup" name="age-group" :value="20" label="20대" />
            <UiRadio v-model="ageGroup" name="age-group" :value="30" label="30대" />
            <UiRadio v-model="ageGroup" name="age-group" :value="40" label="40대" />
            <UiRadio v-model="ageGroup" name="age-group" :value="50" label="50대 이상" />
          </div>
          <div class="radio-result">
            <p>선택한 연령대: {{ ageGroup }}대</p>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiRadio v-model="ageGroup" name="age-group" :value="10" label="10대" /&gt;
&lt;UiRadio v-model="ageGroup" name="age-group" :value="20" label="20대" /&gt;
&lt;UiRadio v-model="ageGroup" name="age-group" :value="30" label="30대" /&gt;
&lt;UiRadio v-model="ageGroup" name="age-group" :value="40" label="40대" /&gt;
&lt;UiRadio v-model="ageGroup" name="age-group" :value="50" label="50대 이상" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">라디오 그룹 - 객체 값</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="radio-group">
            <h3 class="group-title">배송 방법을 선택하세요</h3>
            <UiRadio
              v-for="(option, index) in deliveryOptions"
              :key="index"
              v-model="selectedDelivery"
              name="delivery-option"
              :value="option.value"
              :label="option.label"
            />
          </div>
          <div class="radio-result">
            <p>선택한 배송 방법: {{ selectedDelivery }}</p>
            <p>배송비: {{ getDeliveryFee(selectedDelivery) }}원</p>
          </div>
        </div>
        <div class="example-code">
          <pre><code>// 데이터 설정
const deliveryOptions = [
  { value: 'standard', label: '일반 배송 (3-5일)' },
  { value: 'express', label: '빠른 배송 (1-2일)' },
  { value: 'same-day', label: '당일 배송' }
]

// 템플릿에서 사용
&lt;UiRadio
  v-for="(option, index) in deliveryOptions"
  :key="index"
  v-model="selectedDelivery"
  name="delivery-option"
  :value="option.value"
  :label="option.label"
/&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  // 기본 라디오 버튼 상태
  const basicRadio = ref('option1')

  // 크기별 라디오 버튼 상태
  const sizeRadios = reactive({
    small: 'option1',
    medium: 'option1',
    large: 'option1'
  })

  // 비활성화된 라디오 버튼 상태
  const disabledRadio = ref('option2')

  // 커스텀 라벨 라디오 버튼 상태
  const customLabelRadio = ref('option1')

  // 숫자 값 라디오 그룹 상태
  const ageGroup = ref(20)

  // 객체 값 라디오 그룹 상태
  const selectedDelivery = ref('standard')
  const deliveryOptions = [
    { value: 'standard', label: '일반 배송 (3-5일)' },
    { value: 'express', label: '빠른 배송 (1-2일)' },
    { value: 'same-day', label: '당일 배송' }
  ]

  // 배송비 계산 함수
  const getDeliveryFee = deliveryType => {
    switch (deliveryType) {
      case 'standard':
        return 3000
      case 'express':
        return 6000
      case 'same-day':
        return 10000
      default:
        return 0
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sass:color';

  // 페이지 스타일
  .radio-examples {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Noto Sans KR', sans-serif;

    // 페이지 제목 스타일
    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #333;
    }

    // 페이지 설명 스타일
    .page-description {
      font-size: 16px;
      color: #666;
      margin-bottom: 32px;
    }

    // 예시 섹션 스타일
    .example-section {
      margin-bottom: 40px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      // 섹션 제목 스타일
      .section-title {
        font-size: 18px;
        font-weight: 600;
        padding: 16px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #eaeaea;
        margin: 0;
      }

      // 예시 컨테이너 스타일
      .example-container {
        display: flex;
        flex-direction: column;

        // 예시 미리보기 영역
        .example-preview {
          padding: 24px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 16px;

          // 라디오 그룹 스타일
          .radio-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          // 라디오 크기 그룹 스타일
          .radio-size-group {
            display: flex;
            flex-direction: column;
            gap: 24px;

            // 라디오 크기 아이템 스타일
            .radio-size-item {
              display: flex;
              flex-direction: column;
              gap: 8px;

              // 크기 제목 스타일
              .size-title {
                font-size: 14px;
                font-weight: 600;
                margin: 0 0 4px 0;
                color: #666;
              }
            }
          }

          // 그룹 제목 스타일
          .group-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #333;
          }

          // 라디오 결과 스타일
          .radio-result {
            margin-top: 12px;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 14px;

            p {
              margin: 0;

              &:not(:last-child) {
                margin-bottom: 4px;
              }
            }
          }

          // 커스텀 라벨 스타일
          .custom-label {
            display: flex;
            align-items: center;
            gap: 4px;

            .highlight {
              color: #00aaff;
              font-weight: 600;
            }

            .icon {
              color: #ffc107;
              font-style: normal;
            }
          }
        }

        // 예시 코드 영역
        .example-code {
          padding: 16px;
          background-color: #f8f9fa;
          border-top: 1px solid #eaeaea;

          pre {
            margin: 0;
            overflow-x: auto;

            code {
              font-family: 'Consolas', monospace;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }

    // 미디어 쿼리: 768px 이상에서 예시 컨테이너 가로 배치
    @media (min-width: 768px) {
      .example-container {
        flex-direction: row !important;

        .example-preview {
          flex: none;
          border-right: 1px solid #eaeaea;
        }

        .example-code {
          flex: 1;
          border-top: none !important;
        }
      }
    }
  }
</style>
