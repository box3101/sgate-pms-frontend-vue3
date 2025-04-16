<template>
  <div class="components-page">
    <h1 class="page-title">UI 셀렉트 컴포넌트</h1>

    <!-- 기본 셀렉트와 검색 가능한 셀렉트 비교 -->
    <section class="component-section">
      <h2 class="section-title">기본 셀렉트와 검색 가능한 셀렉트</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect placeholder="기본 셀렉트" :options="options" v-model="selectedValue1" />
          <p class="select-desc">기본 셀렉트 (UiSelect)</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiSelect
  placeholder="기본 셀렉트"
  :options="options"
  v-model="selectedValue"
/&gt;
            </pre>
          </div>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            placeholder="검색 가능한 셀렉트"
            :options="options"
            v-model="selectedValueSearch1"
          />
          <p class="select-desc">검색 가능한 셀렉트 (UiSearchableSelect)</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiSearchableSelect
  placeholder="검색 가능한 셀렉트"
  :options="options"
  v-model="selectedValue"
/&gt;
            </pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 사이즈별 예시 - 기본 셀렉트 -->
    <section class="component-section">
      <h2 class="section-title">기본 셀렉트 사이즈 (Sizes)</h2>
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
        <div class="select-item">
          <UiSelect
            size="xlarge"
            placeholder="선택하세요"
            :options="options"
            v-model="selectedValueXL"
          />
          <p class="select-desc">아주 큰 사이즈 (XLarge)</p>
        </div>
      </div>
    </section>

    <!-- 사이즈별 예시 - 검색 가능한 셀렉트 -->
    <section class="component-section">
      <h2 class="section-title">검색 가능한 셀렉트 사이즈 (Sizes)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSearchableSelect
            size="small"
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearch2"
          />
          <p class="select-desc">작은 사이즈 (Small)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            size="medium"
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearch3"
          />
          <p class="select-desc">중간 사이즈 (Medium) - 기본</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            size="large"
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearch4"
          />
          <p class="select-desc">큰 사이즈 (Large)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            size="xlarge"
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearchXL"
          />
          <p class="select-desc">아주 큰 사이즈 (XLarge)</p>
        </div>
      </div>
    </section>

    <!-- 상태별 예시 - 기본 셀렉트 -->
    <section class="component-section">
      <h2 class="section-title">기본 셀렉트 상태 (States)</h2>
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

    <!-- 상태별 예시 - 검색 가능한 셀렉트 -->
    <section class="component-section">
      <h2 class="section-title">검색 가능한 셀렉트 상태 (States)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" />
          <p class="select-desc">기본 상태 (Default)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearch5"
          />
          <p class="select-desc">선택 완료 상태 (Complete)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" :error="true" />
          <p class="select-desc">에러 상태 (Error)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" :disabled="true" />
          <p class="select-desc">비활성화 상태 (Disabled)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            placeholder="검색하세요"
            :options="options"
            v-model="selectedValueSearch6"
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
          <UiSelect placeholder="선택하세요" :options="options" width="150px" />
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
      <div class="select-grid mt-4">
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" width="150px" />
          <p class="select-desc">기본 너비 (150px)</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" width="200px" />
          <p class="select-desc">200px 너비</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect placeholder="검색하세요" :options="options" width="100%" />
          <p class="select-desc">100% 너비</p>
        </div>
      </div>
    </section>

    <!-- 긴 옵션 목록 예시 -->
    <section class="component-section">
      <h2 class="section-title">긴 옵션 목록</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSelect placeholder="선택하세요" :options="longOptions" v-model="selectedValue7" />
          <p class="select-desc">기본 셀렉트 - 선택된 값: {{ selectedValue7 || '없음' }}</p>
        </div>
        <div class="select-item">
          <UiSearchableSelect
            placeholder="검색하세요"
            :options="longOptions"
            v-model="selectedValueSearch7"
          />
          <p class="select-desc">
            검색 가능한 셀렉트 - 선택된 값: {{ selectedValueSearch7 || '없음' }}
          </p>
        </div>
      </div>
    </section>

    <!-- 검색 기능 예시 -->
    <section class="component-section">
      <h2 class="section-title">검색 기능 활용</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiSearchableSelect
            placeholder="국가를 검색하세요"
            :options="countries"
            v-model="selectedCountry"
          />
          <p class="select-desc">
            국가 검색 - 선택된 국가:
            {{ selectedCountry ? countries.find(c => c.value === selectedCountry)?.label : '없음' }}
          </p>
        </div>
      </div>
      <div class="code-example mt-4">
        <pre class="code-block">
&lt;UiSearchableSelect
  placeholder="국가를 검색하세요"
  :options="countries"
  v-model="selectedCountry"
/&gt;

// 스크립트 부분
const countries = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  // ... 더 많은 국가 데이터
]
        </pre>
      </div>
    </section>

    <!-- 멀티 셀렉트 예시 -->
    <section class="component-section">
      <h2 class="section-title">멀티 셀렉트 (Multiple Selection)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues1"
          />
          <p class="select-desc">기본 멀티 셀렉트</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiMultiSelect
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/&gt;
            </pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 멀티 셀렉트 사이즈 예시 -->
    <section class="component-section">
      <h2 class="section-title">멀티 셀렉트 사이즈 (Sizes)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            size="small"
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues2"
          />
          <p class="select-desc">작은 사이즈 (Small)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect
            size="medium"
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues3"
          />
          <p class="select-desc">중간 사이즈 (Medium) - 기본</p>
        </div>
        <div class="select-item">
          <UiMultiSelect
            size="large"
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues4"
          />
          <p class="select-desc">큰 사이즈 (Large)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect
            size="xlarge"
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValuesXL"
          />
          <p class="select-desc">아주 큰 사이즈 (XLarge)</p>
        </div>
      </div>
    </section>

    <!-- 멀티 셀렉트 상태 예시 -->
    <section class="component-section">
      <h2 class="section-title">멀티 셀렉트 상태 (States)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect placeholder="다중 선택하세요" :options="options" />
          <p class="select-desc">기본 상태 (Default)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues5"
          />
          <p class="select-desc">선택 완료 상태 (Complete)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect placeholder="다중 선택하세요" :options="options" :error="true" />
          <p class="select-desc">에러 상태 (Error)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect placeholder="다중 선택하세요" :options="options" :disabled="true" />
          <p class="select-desc">비활성화 상태 (Disabled)</p>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="다중 선택하세요"
            :options="options"
            v-model="multiSelectedValues6"
            :viewOnly="true"
          />
          <p class="select-desc">보기 전용 상태 (View Only)</p>
        </div>
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

  // 국가 목록 예시
  const countries = [
    { value: 'kr', label: '대한민국' },
    { value: 'us', label: '미국' },
    { value: 'jp', label: '일본' },
    { value: 'cn', label: '중국' },
    { value: 'gb', label: '영국' },
    { value: 'fr', label: '프랑스' },
    { value: 'de', label: '독일' },
    { value: 'it', label: '이탈리아' },
    { value: 'es', label: '스페인' },
    { value: 'ca', label: '캐나다' },
    { value: 'au', label: '호주' },
    { value: 'br', label: '브라질' },
    { value: 'in', label: '인도' },
    { value: 'ru', label: '러시아' },
    { value: 'mx', label: '멕시코' }
  ]

  // 기본 셀렉트 선택 값
  const selectedValue1 = ref('1')
  const selectedValue2 = ref('2')
  const selectedValue3 = ref('3')
  const selectedValue4 = ref('2')
  const selectedValue5 = ref('3')
  const selectedValue6 = ref('')
  const selectedValue7 = ref('')
  const selectedValueXL = ref('4')

  // 검색 가능한 셀렉트 선택 값
  const selectedValueSearch1 = ref('1')
  const selectedValueSearch2 = ref('2')
  const selectedValueSearch3 = ref('3')
  const selectedValueSearch4 = ref('4')
  const selectedValueSearch5 = ref('2')
  const selectedValueSearch6 = ref('3')
  const selectedValueSearch7 = ref('')
  const selectedValueSearchXL = ref('5')
  const selectedCountry = ref('kr')

  // 멀티 셀렉트 선택 값
  const multiSelectedValues1 = ref(['1', '2'])
  const multiSelectedValues2 = ref(['1'])
  const multiSelectedValues3 = ref(['2', '3'])
  const multiSelectedValues4 = ref(['3', '4'])
  const multiSelectedValues5 = ref(['1', '3', '5'])
  const multiSelectedValues6 = ref(['2', '4'])
  const multiSelectedValuesXL = ref(['1', '5'])
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

  // 셀렉트 설명 스타일
  .select-desc {
    font-size: 14px;
    color: var(--color-gray-60, #58616a);
    margin: 8px 0;
  }

  // 코드 예시 스타일
  .code-example {
    margin-top: 8px;
    background-color: var(--color-gray-10, #e6e8ea);
    border-radius: 4px;
    overflow: hidden;
  }

  // 코드 블록 스타일
  .code-block {
    padding: 12px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-gray-70, #464c53);
    white-space: pre-wrap;
    overflow-x: auto;
  }

  // 여백 유틸리티
  .mt-4 {
    margin-top: 16px;
  }
</style>
