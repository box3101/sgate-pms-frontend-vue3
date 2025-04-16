<template>
  <div class="components-page">
    <h1 class="page-title">UI 인풋 컴포넌트</h1>

    <!-- 기본 인풋 -->
    <section class="component-section">
      <h2 class="section-title">기본 인풋</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput placeholder="기본 인풋" v-model="inputValue1" />
          <p class="input-desc">기본 인풋 (UiInput)</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiInput
  placeholder="기본 인풋"
  v-model="inputValue"
/&gt;
            </pre>
          </div>
        </div>
        <div class="input-item">
          <UiInput placeholder="라벨이 있는 인풋" label="이름" v-model="inputValue2" />
          <p class="input-desc">라벨이 있는 인풋</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiInput
  placeholder="라벨이 있는 인풋"
  label="이름"
  v-model="inputValue"
/&gt;
            </pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 사이즈별 예시 -->
    <section class="component-section">
      <h2 class="section-title">인풋 사이즈 (Sizes)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput size="small" placeholder="작은 사이즈" v-model="inputValue3" />
          <p class="input-desc">작은 사이즈 (Small)</p>
        </div>
        <div class="input-item">
          <UiInput size="medium" placeholder="중간 사이즈" v-model="inputValue4" />
          <p class="input-desc">중간 사이즈 (Medium) - 기본</p>
        </div>
        <div class="input-item">
          <UiInput size="large" placeholder="큰 사이즈" v-model="inputValue5" />
          <p class="input-desc">큰 사이즈 (Large)</p>
        </div>
        <div class="input-item">
          <UiInput size="xlarge" placeholder="아주 큰 사이즈" v-model="inputValue6" />
          <p class="input-desc">아주 큰 사이즈 (XLarge)</p>
        </div>
      </div>
    </section>

    <!-- 상태별 예시 -->
    <section class="component-section">
      <h2 class="section-title">인풋 상태 (States)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput placeholder="기본 상태" />
          <p class="input-desc">기본 상태 (Default)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="입력 완료" v-model="inputValue7" />
          <p class="input-desc">입력 완료 상태 (Complete)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="에러 상태" :error="true" errorMessage="유효하지 않은 입력입니다." />
          <p class="input-desc">에러 상태 (Error)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="비활성화 상태" :disabled="true" />
          <p class="input-desc">비활성화 상태 (Disabled)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="읽기 전용" v-model="inputValue8" :readonly="true" />
          <p class="input-desc">읽기 전용 상태 (Readonly)</p>
        </div>
      </div>
    </section>

    <!-- 아이콘 및 접두/접미사 예시 -->
    <section class="component-section">
      <h2 class="section-title">아이콘 및 접두/접미사 (Icons & Affixes)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput placeholder="아이콘이 있는 인풋" icon="search" v-model="inputValue9" />
          <p class="input-desc">아이콘이 있는 인풋</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="접두 아이콘" prefixIcon="user" v-model="inputValue10" />
          <p class="input-desc">접두 아이콘 (Prefix Icon)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="접미 아이콘" suffixIcon="calendar" v-model="inputValue11" />
          <p class="input-desc">접미 아이콘 (Suffix Icon)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="금액 입력" suffix="원" v-model="inputValue12" />
          <p class="input-desc">접미사 텍스트 (Suffix)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="도메인 입력" prefix="https://" v-model="inputValue13" />
          <p class="input-desc">접두사 텍스트 (Prefix)</p>
        </div>
      </div>
    </section>

    <!-- 입력 타입 예시 -->
    <section class="component-section">
      <h2 class="section-title">입력 타입 (Input Types)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput type="text" placeholder="텍스트 입력" v-model="inputValue14" />
          <p class="input-desc">텍스트 입력 (Text)</p>
        </div>
        <div class="input-item">
          <UiInput type="password" placeholder="비밀번호 입력" v-model="inputValue15" />
          <p class="input-desc">비밀번호 입력 (Password)</p>
        </div>
        <div class="input-item">
          <UiInput type="email" placeholder="이메일 입력" v-model="inputValue16" />
          <p class="input-desc">이메일 입력 (Email)</p>
        </div>
        <div class="input-item">
          <UiInput type="number" placeholder="숫자 입력" v-model="inputValue17" />
          <p class="input-desc">숫자 입력 (Number)</p>
        </div>
      </div>
    </section>

    <!-- 헬퍼 텍스트 및 필수 입력 -->
    <section class="component-section">
      <h2 class="section-title">헬퍼 텍스트 및 필수 입력</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput
            label="사용자 이름"
            placeholder="사용자 이름 입력"
            helperText="영문, 숫자 조합 8-20자"
            v-model="inputValue19"
          />
          <p class="input-desc">헬퍼 텍스트가 있는 인풋</p>
        </div>
        <div class="input-item">
          <UiInput
            label="이메일"
            placeholder="이메일 입력"
            :required="true"
            v-model="inputValue20"
          />
          <p class="input-desc">필수 입력 필드</p>
        </div>
        <div class="input-item">
          <UiInput
            label="전화번호"
            placeholder="전화번호 입력"
            helperText="'-' 없이 숫자만 입력"
            :required="true"
            v-model="inputValue21"
          />
          <p class="input-desc">필수 입력 + 헬퍼 텍스트</p>
        </div>
      </div>
    </section>

    <!-- 너비 옵션 예시 -->
    <section class="component-section">
      <h2 class="section-title">인풋 너비 (Width)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput placeholder="기본 너비" v-model="inputValue22" />
          <p class="input-desc">기본 너비</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="너비 지정" v-model="inputValue23" style="width: 150px" />
          <p class="input-desc">너비 지정 (150px)</p>
        </div>
        <div class="input-item">
          <UiInput placeholder="블록 레벨 인풋" v-model="inputValue24" :block="true" />
          <p class="input-desc">블록 레벨 인풋 (Block)</p>
        </div>
      </div>
    </section>

    <!-- 클리어러블 인풋 -->
    <section class="component-section">
      <h2 class="section-title">클리어러블 인풋 (Clearable)</h2>
      <div class="input-grid">
        <div class="input-item">
          <UiInput placeholder="텍스트를 입력하세요" v-model="inputValue25" :clearable="true" />
          <p class="input-desc">클리어러블 인풋</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiInput
  placeholder="텍스트를 입력하세요"
  v-model="inputValue"
  :clearable="true"
/&gt;
            </pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 인풋 값
  const inputValue1 = ref('')
  const inputValue2 = ref('')

  // 사이즈별 인풋 값
  const inputValue3 = ref('')
  const inputValue4 = ref('')
  const inputValue5 = ref('')
  const inputValue6 = ref('')

  // 상태별 인풋 값
  const inputValue7 = ref('입력된 텍스트')
  const inputValue8 = ref('읽기 전용 텍스트')

  // 아이콘 및 접두/접미사 인풋 값
  const inputValue9 = ref('')
  const inputValue10 = ref('')
  const inputValue11 = ref('')
  const inputValue12 = ref('')
  const inputValue13 = ref('')

  // 입력 타입별 인풋 값
  const inputValue14 = ref('')
  const inputValue15 = ref('')
  const inputValue16 = ref('')
  const inputValue17 = ref('')
  const inputValue18 = ref('')

  // 헬퍼 텍스트 및 필수 입력 인풋 값
  const inputValue19 = ref('')
  const inputValue20 = ref('')
  const inputValue21 = ref('')

  // 너비 옵션 인풋 값
  const inputValue22 = ref('')
  const inputValue23 = ref('')
  const inputValue24 = ref('')

  // 클리어러블 인풋 값
  const inputValue25 = ref('클리어 버튼을 눌러 지우세요')
</script>

<style lang="scss" scoped>
  .components-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--color-gray-80, #2c3137);
  }

  .component-section {
    margin-bottom: 40px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 8px;
    padding: 20px;
    background-color: var(--color-gray-0, #fff);
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--color-gray-70, #464c53);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
  }

  .input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .input-item {
    padding: 15px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 6px;
    background-color: var(--color-gray-5, #f5f6f7);
  }

  .input-desc {
    margin-top: 10px;
    font-size: 14px;
    color: var(--color-gray-60, #58616a);
  }

  .code-example {
    margin-top: 15px;
    background-color: var(--color-gray-10, #e6e8ea);
    border-radius: 4px;
    overflow: hidden;
  }

  .code-block {
    padding: 12px;
    font-size: 12px;
    color: var(--color-gray-70, #464c53);
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
  }

  @media (max-width: 768px) {
    .input-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
