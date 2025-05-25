<template>
  <div class="component-guide">
    <h1 class="guide-title">UiConfirm 컴포넌트</h1>
    <p class="guide-description">
      UiConfirm 컴포넌트는 사용자에게 확인/취소 선택을 요청하는 모달 대화상자입니다.
      다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다.
    </p>

    <section class="guide-section">
      <h2 class="section-title">기본 사용법</h2>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiButton @click="showBasicConfirm = true">기본 확인 대화상자 열기</UiButton>
          <UiConfirm
            v-model="showBasicConfirm"
            title="확인"
            message="계속 진행하시겠습니까?"
            @confirm="handleConfirm('기본 확인')"
            @cancel="handleCancel('기본 확인')"
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiButton @click="showBasicConfirm = true"&gt;기본 확인 대화상자 열기&lt;/UiButton&gt;
&lt;UiConfirm
  v-model="showBasicConfirm"
  title="확인"
  message="계속 진행하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">대화상자 타입</h2>
      <p class="section-description">
        UiConfirm 컴포넌트는 4가지 타입(info, success, warning, error)을 지원합니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <div class="button-group">
            <UiButton @click="showInfoConfirm = true" class="mb-2">정보 대화상자</UiButton>
            <UiButton @click="showSuccessConfirm = true" class="mb-2">성공 대화상자</UiButton>
            <UiButton @click="showWarningConfirm = true" class="mb-2">경고 대화상자</UiButton>
            <UiButton @click="showErrorConfirm = true">오류 대화상자</UiButton>
          </div>

          <UiConfirm
            v-model="showInfoConfirm"
            type="info"
            title="정보"
            message="새로운 정보가 있습니다. 확인하시겠습니까?"
            @confirm="handleConfirm('정보')"
            @cancel="handleCancel('정보')"
          />

          <UiConfirm
            v-model="showSuccessConfirm"
            type="success"
            title="성공"
            message="작업이 성공적으로 완료되었습니다. 계속하시겠습니까?"
            @confirm="handleConfirm('성공')"
            @cancel="handleCancel('성공')"
          />

          <UiConfirm
            v-model="showWarningConfirm"
            type="warning"
            title="경고"
            message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
            @confirm="handleConfirm('경고')"
            @cancel="handleCancel('경고')"
          />

          <UiConfirm
            v-model="showErrorConfirm"
            type="error"
            title="오류"
            message="오류가 발생했습니다. 다시 시도하시겠습니까?"
            @confirm="handleConfirm('오류')"
            @cancel="handleCancel('오류')"
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiButton @click="showInfoConfirm = true"&gt;정보 대화상자&lt;/UiButton&gt;
&lt;UiConfirm
  v-model="showInfoConfirm"
  type="info"
  title="정보"
  message="새로운 정보가 있습니다. 확인하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/&gt;

&lt;UiButton @click="showWarningConfirm = true"&gt;경고 대화상자&lt;/UiButton&gt;
&lt;UiConfirm
  v-model="showWarningConfirm"
  type="warning"
  title="경고"
  message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">크기 옵션</h2>
      <p class="section-description">
        size 속성을 사용하여 대화상자의 크기를 조절할 수 있습니다. (small, medium, large)
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <div class="button-group">
            <UiButton @click="showSmallConfirm = true" class="mb-2">작은 대화상자</UiButton>
            <UiButton @click="showMediumConfirm = true" class="mb-2">중간 대화상자</UiButton>
            <UiButton @click="showLargeConfirm = true">큰 대화상자</UiButton>
          </div>

          <UiConfirm
            v-model="showSmallConfirm"
            size="small"
            title="작은 대화상자"
            message="작은 크기의 확인 대화상자입니다."
            @confirm="handleConfirm('작은 크기')"
            @cancel="handleCancel('작은 크기')"
          />

          <UiConfirm
            v-model="showMediumConfirm"
            size="medium"
            title="중간 대화상자"
            message="중간 크기의 확인 대화상자입니다."
            @confirm="handleConfirm('중간 크기')"
            @cancel="handleCancel('중간 크기')"
          />

          <UiConfirm
            v-model="showLargeConfirm"
            size="large"
            title="큰 대화상자"
            message="큰 크기의 확인 대화상자입니다."
            @confirm="handleConfirm('큰 크기')"
            @cancel="handleCancel('큰 크기')"
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiButton @click="showSmallConfirm = true"&gt;작은 대화상자&lt;/UiButton&gt;
&lt;UiConfirm
  v-model="showSmallConfirm"
  size="small"
  title="작은 대화상자"
  message="작은 크기의 확인 대화상자입니다."
  @confirm="handleConfirm"
  @cancel="handleCancel"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">버튼 커스터마이징</h2>
      <p class="section-description">
        버튼 텍스트와 스타일을 커스터마이징할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiButton @click="showCustomButtonConfirm = true">커스텀 버튼 대화상자</UiButton>

          <UiConfirm
            v-model="showCustomButtonConfirm"
            type="warning"
            title="파일 삭제"
            message="선택한 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            confirm-button-text="삭제"
            cancel-button-text="취소"
            confirm-button-variant="primary"
            cancel-button-variant="secondary-line"
            @confirm="handleConfirm('커스텀 버튼')"
            @cancel="handleCancel('커스텀 버튼')"
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiConfirm
  v-model="showCustomButtonConfirm"
  type="warning"
  title="파일 삭제"
  message="선택한 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  confirm-button-text="삭제"
  cancel-button-text="취소"
  confirm-button-variant="primary"
  cancel-button-variant="secondary-line"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">슬롯 사용</h2>
      <p class="section-description">
        기본 슬롯과 title, footer 슬롯을 사용하여 내용을 커스터마이징할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiButton @click="showSlotConfirm = true">슬롯 사용 대화상자</UiButton>

          <UiConfirm
            v-model="showSlotConfirm"
            type="info"
            @confirm="handleConfirm('슬롯 사용')"
            @cancel="handleCancel('슬롯 사용')"
          >
            <template #title>
              <div class="custom-title">
                <Icon name="heroicons:document-text" class="mr-2" />
                약관 동의
              </div>
            </template>

            <div class="custom-content">
              <p>서비스 이용을 위해 다음 약관에 동의해주세요:</p>
              <ul>
                <li>개인정보 처리방침</li>
                <li>서비스 이용약관</li>
                <li>마케팅 정보 수신 동의 (선택)</li>
              </ul>
              <div class="mt-3">
                <UiCheckbox v-model="termsAgreed">모든 약관에 동의합니다</UiCheckbox>
              </div>
            </div>

            <template #footer>
              <UiButton variant="secondary-line" @click="showSlotConfirm = false">취소</UiButton>
              <UiButton
                variant="primary"
                :disabled="!termsAgreed"
                @click="handleSlotConfirm"
              >
                동의 및 계속
              </UiButton>
            </template>
          </UiConfirm>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiConfirm
  v-model="showSlotConfirm"
  type="info"
  @confirm="handleConfirm"
  @cancel="handleCancel"
&gt;
  &lt;template #title&gt;
    &lt;div class="custom-title"&gt;
      &lt;Icon name="heroicons:document-text" class="mr-2" /&gt;
      약관 동의
    &lt;/div&gt;
  &lt;/template&gt;

  &lt;div class="custom-content"&gt;
    &lt;p&gt;서비스 이용을 위해 다음 약관에 동의해주세요:&lt;/p&gt;
    &lt;ul&gt;
      &lt;li&gt;개인정보 처리방침&lt;/li&gt;
      &lt;li&gt;서비스 이용약관&lt;/li&gt;
      &lt;li&gt;마케팅 정보 수신 동의 (선택)&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="mt-3"&gt;
      &lt;UiCheckbox v-model="termsAgreed"&gt;모든 약관에 동의합니다&lt;/UiCheckbox&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;template #footer&gt;
    &lt;UiButton variant="secondary-line" @click="showSlotConfirm = false"&gt;취소&lt;/UiButton&gt;
    &lt;UiButton
      variant="primary"
      :disabled="!termsAgreed"
      @click="handleSlotConfirm"
    &gt;
      동의 및 계속
    &lt;/UiButton&gt;
  &lt;/template&gt;
&lt;/UiConfirm&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">API 참조</h2>
      <h3 class="subsection-title">Props</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 20%">
          <col style="width: 20%">
          <col style="width: 15%">
          <col style="width: 45%">
        </colgroup>
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
            <td>Boolean</td>
            <td>false</td>
            <td>대화상자 표시 여부 (v-model)</td>
          </tr>
          <tr>
            <td>type</td>
            <td>String</td>
            <td>info</td>
            <td>대화상자 타입 (info, success, warning, error)</td>
          </tr>
          <tr>
            <td>size</td>
            <td>String</td>
            <td>medium</td>
            <td>대화상자 크기 (small, medium, large)</td>
          </tr>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>'확인'</td>
            <td>대화상자 제목</td>
          </tr>
          <tr>
            <td>message</td>
            <td>String</td>
            <td>'계속 진행하시겠습니까?'</td>
            <td>대화상자 메시지</td>
          </tr>
          <tr>
            <td>showIcon</td>
            <td>Boolean</td>
            <td>true</td>
            <td>아이콘 표시 여부</td>
          </tr>
          <tr>
            <td>closeOnBackdropClick</td>
            <td>Boolean</td>
            <td>true</td>
            <td>배경 클릭 시 닫기 여부</td>
          </tr>
          <tr>
            <td>showConfirmButton</td>
            <td>Boolean</td>
            <td>true</td>
            <td>확인 버튼 표시 여부</td>
          </tr>
          <tr>
            <td>showCancelButton</td>
            <td>Boolean</td>
            <td>true</td>
            <td>취소 버튼 표시 여부</td>
          </tr>
          <tr>
            <td>confirmButtonText</td>
            <td>String</td>
            <td>'확인'</td>
            <td>확인 버튼 텍스트</td>
          </tr>
          <tr>
            <td>cancelButtonText</td>
            <td>String</td>
            <td>'취소'</td>
            <td>취소 버튼 텍스트</td>
          </tr>
          <tr>
            <td>confirmButtonVariant</td>
            <td>String</td>
            <td>'primary'</td>
            <td>확인 버튼 스타일 변형</td>
          </tr>
          <tr>
            <td>cancelButtonVariant</td>
            <td>String</td>
            <td>'secondary-line'</td>
            <td>취소 버튼 스타일 변형</td>
          </tr>
        </tbody>
      </UiTable>

      <h3 class="subsection-title mt-4">이벤트</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 30%">
          <col style="width: 70%">
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>대화상자가 열리거나 닫힐 때 발생하는 이벤트</td>
          </tr>
          <tr>
            <td>confirm</td>
            <td>확인 버튼 클릭 시 발생하는 이벤트</td>
          </tr>
          <tr>
            <td>cancel</td>
            <td>취소 버튼 클릭 시 발생하는 이벤트</td>
          </tr>
        </tbody>
      </UiTable>

      <h3 class="subsection-title mt-4">슬롯</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 30%">
          <col style="width: 70%">
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>default</td>
            <td>대화상자 본문 내용을 커스터마이징할 수 있는 기본 슬롯</td>
          </tr>
          <tr>
            <td>title</td>
            <td>대화상자 제목을 커스터마이징할 수 있는 슬롯</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>대화상자 푸터(버튼 영역)를 커스터마이징할 수 있는 슬롯</td>
          </tr>
        </tbody>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 토스트 메시지 사용 (없으면 콘솔 로그로 대체)
const toast = useToast ? useToast() : {
  success: msg => console.log('Success:', msg),
  info: msg => console.log('Info:', msg),
  warning: msg => console.log('Warning:', msg),
  error: msg => console.log('Error:', msg)
}

// 기본 확인 대화상자
const showBasicConfirm = ref(false)

// 타입별 확인 대화상자
const showInfoConfirm = ref(false)
const showSuccessConfirm = ref(false)
const showWarningConfirm = ref(false)
const showErrorConfirm = ref(false)

// 크기별 확인 대화상자
const showSmallConfirm = ref(false)
const showMediumConfirm = ref(false)
const showLargeConfirm = ref(false)

// 커스텀 버튼 확인 대화상자
const showCustomButtonConfirm = ref(false)

// 슬롯 사용 확인 대화상자
const showSlotConfirm = ref(false)
const termsAgreed = ref(false)

// 확인 버튼 클릭 핸들러
const handleConfirm = (type = '') => {
  toast.success(`${type ? `[${type}] ` : ''}확인 버튼이 클릭되었습니다.`)
}

// 취소 버튼 클릭 핸들러
const handleCancel = (type = '') => {
  toast.info(`${type ? `[${type}] ` : ''}취소 버튼이 클릭되었습니다.`)
}

// 슬롯 사용 확인 대화상자 확인 버튼 핸들러
const handleSlotConfirm = () => {
  if (termsAgreed.value) {
    toast.success('약관에 동의하셨습니다.')
    showSlotConfirm.value = false
  } else {
    toast.warning('모든 약관에 동의해야 합니다.')
  }
}
</script>

<style lang="scss" scoped>
.component-guide {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.guide-description {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 32px;
}

.guide-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.section-description {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 16px;
}

.subsection-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.example-wrapper {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.example-preview {
  padding: 24px;
  background-color: #fff;
}

.example-code {
  padding: 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;

  pre {
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      color: #333;
    }
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 200px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-3 {
  margin-bottom: 12px;
}

.mt-3 {
  margin-top: 12px;
}

.mt-4 {
  margin-top: 16px;
}

.mr-2 {
  margin-right: 8px;
}

.custom-title {
  display: flex;
  align-items: center;
  font-weight: 700;
}

.custom-content {
  ul {
    margin: 8px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
    }
  }
}
</style>
