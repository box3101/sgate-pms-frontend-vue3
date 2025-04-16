<template>
  <div class="switch-examples">
    <h1 class="page-title">스위치 컴포넌트</h1>
    <p class="page-description">다양한 상태와 옵션을 가진 스위치 컴포넌트 사용 예시입니다.</p>

    <div class="example-section">
      <h2 class="section-title">기본 스위치</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiSwitch v-model="basicSwitch" />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiSwitch v-model="basicSwitch" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">라벨이 있는 스위치</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiSwitch v-model="labeledSwitch" label="알림 받기" />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiSwitch v-model="labeledSwitch" label="알림 받기" /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">비활성화된 스위치</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiSwitch v-model="disabledOffSwitch" disabled />
          <UiSwitch v-model="disabledOnSwitch" disabled />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiSwitch v-model="disabledOffSwitch" disabled /&gt;
&lt;UiSwitch v-model="disabledOnSwitch" disabled /&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">스위치 상태 변경 이벤트</h2>
      <div class="example-container">
        <div class="example-preview">
          <UiSwitch v-model="eventSwitch" label="이벤트 테스트" />
          <p class="event-result">현재 상태: {{ eventSwitch ? '켜짐' : '꺼짐' }}</p>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiSwitch v-model="eventSwitch" label="이벤트 테스트" /&gt;
&lt;p&gt;현재 상태: {{ eventSwitch ? '켜짐' : '꺼짐' }}&lt;/p&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2 class="section-title">여러 스위치 그룹</h2>
      <div class="example-container">
        <div class="example-preview">
          <div class="switch-group">
            <UiSwitch v-model="groupSwitches.email" label="이메일 알림" />
            <UiSwitch v-model="groupSwitches.push" label="푸시 알림" />
            <UiSwitch v-model="groupSwitches.sms" label="SMS 알림" />
          </div>
          <div class="switch-group-result">
            <p>
              활성화된 알림:
              {{
                Object.entries(groupSwitches)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => {
                    switch (key) {
                      case 'email':
                        return '이메일'
                      case 'push':
                        return '푸시'
                      case 'sms':
                        return 'SMS'
                    }
                  })
                  .join(', ') || '없음'
              }}
            </p>
          </div>
        </div>
        <div class="example-code">
          <pre><code>&lt;div class="switch-group"&gt;
  &lt;UiSwitch v-model="groupSwitches.email" label="이메일 알림" /&gt;
  &lt;UiSwitch v-model="groupSwitches.push" label="푸시 알림" /&gt;
  &lt;UiSwitch v-model="groupSwitches.sms" label="SMS 알림" /&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  // 기본 스위치 상태
  const basicSwitch = ref(false)

  // 라벨이 있는 스위치 상태
  const labeledSwitch = ref(false)

  // 비활성화된 스위치 상태
  const disabledOffSwitch = ref(false)
  const disabledOnSwitch = ref(true)
  const disabledLabeledSwitch = ref(false)

  // 이벤트 테스트용 스위치 상태
  const eventSwitch = ref(false)

  // 스위치 그룹 상태
  const groupSwitches = reactive({
    email: true,
    push: false,
    sms: false
  })
</script>

<style lang="scss" scoped>
  @use 'sass:color';

  // 페이지 스타일
  .switch-examples {
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

          // 이벤트 결과 텍스트
          .event-result {
            margin-top: 8px;
            font-size: 14px;
            color: #666;
          }

          // 스위치 그룹 스타일
          .switch-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          // 스위치 그룹 결과 스타일
          .switch-group-result {
            margin-top: 12px;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 14px;

            p {
              margin: 0;
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
          flex: 1;
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
