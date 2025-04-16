<template>
  <div class="checkbox-examples">
    <h1 class="page-title">체크박스 컴포넌트</h1>
    <p class="page-description">다양한 상태와 옵션을 가진 체크박스 컴포넌트 사용 예시입니다.</p>

    <div class="example-section">
      <h2 class="section-title">기본 체크박스</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiCheckbox v-model="basicCheckbox" label="기본 체크박스" />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiCheckbox v-model="basicCheckbox" label="기본 체크박스" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">체크박스 크기</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="checkbox-size-group">
            <UiCheckbox v-model="sizeCheckboxes.small" label="작은 크기" size="small" />
            <UiCheckbox v-model="sizeCheckboxes.medium" label="중간 크기" size="medium" />
            <UiCheckbox v-model="sizeCheckboxes.large" label="큰 크기" size="large" />
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiCheckbox v-model="sizeCheckboxes.small" label="작은 크기" size="small" /&gt;
&lt;UiCheckbox v-model="sizeCheckboxes.medium" label="중간 크기" size="medium" /&gt;
&lt;UiCheckbox v-model="sizeCheckboxes.large" label="큰 크기" size="large" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">비활성화된 체크박스</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiCheckbox v-model="disabledUnchecked" label="비활성화 (미선택)" disabled />
          <UiCheckbox v-model="disabledChecked" label="비활성화 (선택됨)" disabled />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiCheckbox v-model="disabledUnchecked" label="비활성화 (미선택)" disabled /&gt;
&lt;UiCheckbox v-model="disabledChecked" label="비활성화 (선택됨)" disabled /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">슬롯을 사용한 커스텀 라벨</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiCheckbox v-model="customLabelCheckbox">
            <span class="custom-label">커스텀 라벨 <span class="highlight">강조</span> 텍스트</span>
          </UiCheckbox>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiCheckbox v-model="customLabelCheckbox"&gt;
  &lt;span class="custom-label"&gt;커스텀 라벨 &lt;span class="highlight"&gt;강조&lt;/span&gt; 텍스트&lt;/span&gt;
&lt;/UiCheckbox&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">체크박스 그룹</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="checkbox-group">
            <h3 class="group-title">좋아하는 과일을 선택하세요</h3>
            <UiCheckbox v-model="fruitCheckboxes.apple" label="사과" />
            <UiCheckbox v-model="fruitCheckboxes.banana" label="바나나" />
            <UiCheckbox v-model="fruitCheckboxes.orange" label="오렌지" />
            <UiCheckbox v-model="fruitCheckboxes.grape" label="포도" />
            <UiCheckbox v-model="fruitCheckboxes.strawberry" label="딸기" />
          </div>
          <div class="checkbox-result">
            <p>
              선택한 과일:
              {{
                Object.entries(fruitCheckboxes)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => {
                    switch (key) {
                      case 'apple':
                        return '사과'
                      case 'banana':
                        return '바나나'
                      case 'orange':
                        return '오렌지'
                      case 'grape':
                        return '포도'
                      case 'strawberry':
                        return '딸기'
                    }
                  })
                  .join(', ') || '없음'
              }}
            </p>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;div class="checkbox-group"&gt;
  &lt;h3 class="group-title"&gt;좋아하는 과일을 선택하세요&lt;/h3&gt;
  &lt;UiCheckbox v-model="fruitCheckboxes.apple" label="사과" /&gt;
  &lt;UiCheckbox v-model="fruitCheckboxes.banana" label="바나나" /&gt;
  &lt;UiCheckbox v-model="fruitCheckboxes.orange" label="오렌지" /&gt;
  &lt;UiCheckbox v-model="fruitCheckboxes.grape" label="포도" /&gt;
  &lt;UiCheckbox v-model="fruitCheckboxes.strawberry" label="딸기" /&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">전체 선택 기능</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="checkbox-group">
            <UiCheckbox
              v-model="selectAllTerms"
              label="모든 약관에 동의합니다"
              size="large"
              @update:modelValue="updateAllTerms"
            />
            <div class="sub-checkboxes">
              <UiCheckbox
                v-model="termsCheckboxes.service"
                label="서비스 이용약관 동의 (필수)"
                @update:modelValue="updateSelectAll"
              />
              <UiCheckbox
                v-model="termsCheckboxes.privacy"
                label="개인정보 수집 및 이용 동의 (필수)"
                @update:modelValue="updateSelectAll"
              />
              <UiCheckbox
                v-model="termsCheckboxes.marketing"
                label="마케팅 정보 수신 동의 (선택)"
                @update:modelValue="updateSelectAll"
              />
            </div>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiCheckbox
  v-model="selectAllTerms"
  label="모든 약관에 동의합니다"
  size="large"
  @update:modelValue="updateAllTerms"
/&gt;
&lt;div class="sub-checkboxes"&gt;
  &lt;UiCheckbox
    v-model="termsCheckboxes.service"
    label="서비스 이용약관 동의 (필수)"
    @update:modelValue="updateSelectAll"
  /&gt;
  &lt;UiCheckbox
    v-model="termsCheckboxes.privacy"
    label="개인정보 수집 및 이용 동의 (필수)"
    @update:modelValue="updateSelectAll"
  /&gt;
  &lt;UiCheckbox
    v-model="termsCheckboxes.marketing"
    label="마케팅 정보 수신 동의 (선택)"
    @update:modelValue="updateSelectAll"
  /&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'

  // 기본 체크박스 상태
  const basicCheckbox = ref(false)

  // 크기별 체크박스 상태
  const sizeCheckboxes = reactive({
    small: false,
    medium: true,
    large: false
  })

  // 비활성화된 체크박스 상태
  const disabledUnchecked = ref(false)
  const disabledChecked = ref(true)

  // 커스텀 라벨 체크박스 상태
  const customLabelCheckbox = ref(false)

  // 과일 체크박스 그룹 상태
  const fruitCheckboxes = reactive({
    apple: true,
    banana: false,
    orange: true,
    grape: false,
    strawberry: false
  })

  // 약관 동의 체크박스 상태
  const termsCheckboxes = reactive({
    service: false,
    privacy: false,
    marketing: false
  })

  // 전체 선택 체크박스 상태
  const selectAllTerms = ref(false)

  // 모든 약관 체크박스 업데이트 함수
  const updateAllTerms = value => {
    Object.keys(termsCheckboxes).forEach(key => {
      termsCheckboxes[key] = value
    })
  }

  // 전체 선택 체크박스 업데이트 함수
  const updateSelectAll = () => {
    const allChecked = Object.values(termsCheckboxes).every(value => value === true)
    const someChecked = Object.values(termsCheckboxes).some(value => value === true)

    selectAllTerms.value = allChecked ? true : false
  }
</script>

<style lang="scss" scoped>
  @use 'sass:color';

  // 페이지 스타일
  .checkbox-examples {
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

          // 체크박스 크기 그룹 스타일
          .checkbox-size-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          // 체크박스 그룹 스타일
          .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 12px;

            // 그룹 제목 스타일
            .group-title {
              font-size: 16px;
              font-weight: 600;
              margin: 0 0 8px 0;
              color: #333;
            }

            // 서브 체크박스 스타일
            .sub-checkboxes {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-left: 24px;
              padding-top: 8px;
            }
          }

          // 체크박스 결과 스타일
          .checkbox-result {
            margin-top: 12px;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 14px;

            p {
              margin: 0;
            }
          }

          // 커스텀 라벨 스타일
          .custom-label {
            .highlight {
              color: #00aaff;
              font-weight: 600;
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
