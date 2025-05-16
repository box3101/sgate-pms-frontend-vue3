<template>
  <div class="login-page">
    <div class="login-container" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
      <div class="login-left">
        <!-- 로고 섹션 -->
        <div class="login-logo">
          <h1>
            <img src="@/assets/images/s-gate_logo.svg" alt="SGate Logo" />
          </h1>
        </div>

        <!-- 로그인 폼 섹션 -->
        <div class="login-form" :style="{ top: loginFormTop }">
          <!-- 회사 아이디 입력 -->
          <UiInput
            clearable="true"
            v-model="company"
            size="xlarge"
            prefixIcon="account"
            block
            placeholder="회사 아이디를 입력하세요"
          />
          <!-- 아이디 입력 -->
          <UiInput
            clearable="true"
            v-model="username"
            size="xlarge"
            prefixIcon="account"
            block
            placeholder="아이디를 입력하세요"
          />

          <!-- 비밀번호 입력 -->
          <UiInput
            clearable="true"
            v-model="password"
            type="password"
            size="xlarge"
            prefixIcon="lock"
            block
            placeholder="비밀번호를 입력하세요"
          />

          <!-- 로그인 옵션 -->
          <div class="login-options">
            <div class="remember-me flex items-center justify-between w-full">
              <UiCheckbox
                class="flex items-center"
                v-model="rememberMe"
                label="로그인 정보 저장"
                size="medium"
              />
              <a href="#" class="forgot-password flex items-center gap-3" @click="toggleModal">
                <span> 비밀번호 찾기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.60268 9.86768C3.75046 10.0319 4.00338 10.0452 4.16758 9.89742L8.16758 6.29757C8.25187 6.22172 8.3 6.11365 8.3 6.00026C8.30001 5.88686 8.25188 5.7788 8.1676 5.70294L4.1676 2.10269C4.0034 1.95491 3.75048 1.96821 3.60269 2.13241C3.45491 2.29661 3.46821 2.54952 3.63241 2.69731L7.30207 6.00023L3.63242 9.30278C3.46822 9.45056 3.4549 9.70347 3.60268 9.86768Z"
                    fill="#00AAFF"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- 로그인 버튼 -->
          <button class="login-button" @click="handleLogin">로그인</button>
        </div>

        <!-- 구분선 -->
        <div class="divider"></div>

        <!-- 공지 섹션 -->
        <div class="notice-section">
          <ul class="notice-list">
            <li v-for="(notice, index) in notices" :key="index" class="notice-item">
              <a href="#none" class="notice-title">{{ notice.title }}</a>
              <span class="notice-date">{{ notice.date }}</span>
            </li>
          </ul>
        </div>

        <div class="login-footer">
          <div class="footer-content">
            <img src="@/assets/images/ispark_logo.svg" alt="ISPARK Logo" />
            <div class="system-notice">매주 목요일 22:00 ~ 24:00 시스템 점검이 있습니다.</div>
            <a href="#" class="privacy-policy">개인정보처리방침</a>

            <div class="copyright-info">
              <span class="version-info">
                <a href="#" @click="showNoticeModal = true">공지사항</a> |
                <a href="/release-notes">v.1.1.4 릴리즈노트</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-right">
        <img src="/images/login-thumail.png" alt="Login Right" />
      </div>
    </div>
  </div>

  <!-- 비밀번호 찾기 모달 -->
  <UiModal v-model="showModal" title="비밀번호 찾기" size="xmedium" :showFooter="true">
    <div class="modal-content">
      <div class="login-form" :style="{ top: loginFormTop }">
        <!-- 회사 아이디-->
        <UiInput
          clearable="true"
          v-model="company"
          size="xlarge"
          prefixIcon="account"
          block
          placeholder="회사 아이디를 입력하세요"
        />

        <!-- 아이디 입력 -->
        <UiInput
          clearable="true"
          v-model="username"
          size="xlarge"
          prefixIcon="account"
          block
          placeholder="아이디를 입력하세요"
        />

        <!-- 이메일 입력 -->
        <UiInput
          clearable="true"
          v-model="email"
          type="email"
          size="xlarge"
          prefixIcon="lock"
          block
          placeholder="이메일을 입력하세요"
        />
      </div>

      <div class="error-message">
        <Icon name="mdi:alert-circle" class="text-error mr-5" size="20" />
        등록된 이메일로 초기화된 비밀번호를 발송 합니다.
      </div>
    </div>
    <template #footerActions>
      <div class="flex gap-10 justify-center w-full">
        <UiButton variant="secondary" size="xlarge" @click="toggleModal" class="flex-1"
          >닫기</UiButton
        >
        <UiButton variant="primary" size="xlarge" @click="handleFindPassword" class="flex-1"
          >확인</UiButton
        >
      </div>
    </template>
  </UiModal>

  <!-- 공지사항 모달 -->
  <UiModal v-model="showNoticeModal" title="공지사항" size="medium">
    <div class="notice-modal-content">
      <div class="notice-header flex justify-between items-center">
        <h3 class="notice-title">{{ selectedNotice?.title }}</h3>
        <div class="notice-date">{{ selectedNotice?.date }}</div>
      </div>

      <div class="notice-body">
        <div class="notice-text">
          {{ selectedNotice?.content }}
        </div>

        <div v-if="selectedNotice?.attachments?.length" class="notice-attachments">
          <h4>첨부파일</h4>
          <ul>
            <li v-for="(file, index) in selectedNotice.attachments" :key="index">
              <a href="#" @click.prevent="downloadFile(file)">
                <Icon name="mdi:file" class="mr-2" />
                {{ file.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="notice-footer">
        <UiCheckbox v-model="doNotShowAgain" label="다시 보지 않기" size="medium" />
      </div>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  definePageMeta({
    layout: false
  })

  // 로그인 페이지에만 모바일 친화적인 viewport 설정 적용
  useHead({
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ]
  })

  // 공지사항
  const notices = ref([{ title: '시스템 업데이트 안내', date: '2025.03.31' }])
  const selectedNotice = ref({
    title: '시스템 업데이트 안내',
    date: '2025.03.31',
    content: '시스템 업데이트 안내입니다. 자세한 내용은 첨부파일을 참고해주세요.',
    attachments: [
      { name: '업데이트 상세내역.pdf', url: '#' },
      { name: '사용자 매뉴얼.pdf', url: '#' }
    ]
  })

  // 첨부파일 다운로드 처리
  const downloadFile = file => {
    console.log('Downloading file:', file.name)
    // 실제 다운로드 로직 구현
  }

  // 다시 보지 않기 체크박스
  const doNotShowAgain = ref(false)

  // 로그인 관련 상태
  const company = ref('')
  const username = ref('')
  const password = ref('')
  const email = ref('')
  const rememberMe = ref(false)
  const loginFormTop = ref('0px')

  // AOS 초기화
  AOS.init({
    duration: 800,
    once: true
  })

  // 모달 상태
  const showModal = ref(false)
  const showNoticeModal = ref(false)

  // 모달 토글
  const toggleModal = () => {
    showModal.value = !showModal.value
  }

  // 로그인 처리
  const handleLogin = () => {
    navigateTo('/task/collaboration/home')
  }

  // 비밀번호 찾기 처리
  const handleFindPassword = () => {
    // 비밀번호 찾기 로직 구현
    showModal.value = false
  }
</script>
<style scoped lang="scss">
  html {
    font-size: 16px;
  }
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 0.9375rem;
    overflow-y: hidden;

    .login-container {
      display: flex;
      justify-content: center;
    }
  }

  .login-container {
    .login-left {
      padding: 1.5rem 2.5rem;
      padding-bottom: 3.75rem;
      width: 26.75rem;
      border-radius: 0.5rem 0 0 0.5rem;
      background: var(--color-gray-0, #fff);
      box-shadow: 0.5rem 0.5rem 1rem 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      box-sizing: border-box;
    }

    .login-right {
      border-radius: 0 0.5rem 0.5rem 0;
      box-shadow: 0.5rem 0.5rem 1rem 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      img {
        height: 100%;
      }
    }
  }

  .login-logo {
    text-align: center;
    padding: 1.5rem;

    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      img {
        display: inline-block;
        height: 3.125rem;
        margin-bottom: 0.3125rem;
      }
    }
  }

  .login-form {
    padding: 0.9375rem 0;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }

  .remember-me {
    display: flex;
    align-items: center;
  }

  .forgot-password {
    position: relative;
    top: -1px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      @include font-style($body-small-bold);
      color: $primary-50;
    }
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .login-button {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: $primary-color;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 0.3125rem;

    &:hover {
      background-color: #1765cc;
    }
  }

  .divider {
    height: 0.0625rem;
    background: var(--color-gray-30, #b1b8be);
  }

  .notice-section {
    padding: 0.9375rem 0;
  }

  .notice-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
  }

  .notice-item {
    display: flex;
    justify-content: space-between;
  }

  .notice-title {
    color: var(--color-primary-50, #0af);
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 140%;

    &:hover {
      color: $primary-color;
    }
  }

  .notice-date {
    color: var(--color-gray-30, #b1b8be);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 150%;
  }

  .system-notice {
    display: flex;
    padding: 0.3125rem 0;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.25rem;
    background: var(--color-system-y10, #ffeacc);
    color: var(--color-system-y30, #ff9500);
    text-align: center;
    font-size: 0.8125rem;
    font-weight: 700;
    margin-top: 1.6875rem;
  }

  .copyright-info {
    margin-top: 0.875rem;
    color: var(--color-gray-60, $primary-color);
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.125rem;

    .version-info {
      display: flex;
      gap: 0.5rem;
    }

    a {
      color: var(--color-gray-60, $primary-color);
      text-decoration: underline;
      text-underline-offset: 0.3125rem;
    }
  }

  .login-footer {
    margin-top: 0.875rem;

    .footer-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      img {
        height: 2.1875rem;
      }
    }
  }

  .privacy-policy {
    margin-top: 0.875rem;
    color: var(--color-gray-60, #58616a);
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.125rem;

    &:hover {
      text-decoration: underline;
    }
  }

  .modal-content .login-form {
    padding: 0.625rem;
  }

  .error-message {
    display: flex;
    align-items: center;
    color: $system-blue;
    font-size: 0.8125rem;
    margin-top: 0.75rem;
    margin-right: 0.625rem;
    margin-left: 0.625rem;
    padding: 0.5rem 0.75rem;
    background-color: rgba($system-blue, 0.1);
    border-radius: 0.25rem;
    border-left: 0.1875rem solid $system-blue;
  }

  .notice-modal-content {
    padding: 1.25rem;

    .notice-header {
      margin-bottom: 1rem;
      border-bottom: 0.0625rem solid #e8eaed;
      padding-bottom: 0.75rem;

      .notice-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #202124;
      }

      .notice-date {
        font-size: 0.875rem;
        color: #5f6368;
      }
    }

    .notice-body {
      margin-bottom: 1.25rem;

      .notice-text {
        font-size: $font-size-md;
        line-height: 1.5;
        color: #202124;
        white-space: pre-line;
        margin-bottom: 1rem;
      }

      .notice-attachments {
        background-color: #f8fafc;
        border-radius: 0.375rem;
        padding: 0.75rem 1rem;

        h4 {
          font-size: $font-size-md;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #202124;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          padding: 0.375rem 0;

          a {
            display: flex;
            align-items: center;
            color: $primary-color;
            text-decoration: none;
            font-size: $font-size-md;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .notice-footer {
      border-top: 0.0625rem solid #e8eaed;
      padding-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
  }

  :deep(.ui-input__label) {
    @include font-style($body-small-bold);
    color: $gray-30;
  }

  :deep(.ui-checkbox__label) {
    @include font-style($body-small-bold);
    color: $gray-30;
  }

  // 모바일 반응형 스타일 추가
  @media (max-width: 768px) {
    .login-page {
      padding: 0.625rem;
      overflow-y: auto;
    }

    .login-container {
      flex-direction: column;
      width: 100%;
      max-width: 100%;

      .login-left {
        width: 100%;
        min-width: unset;
        border-radius: 0.5rem;
        padding: 1.25rem;
        box-sizing: border-box;
      }

      .login-right {
        display: none; // 모바일에서는 이미지 숨김
      }
    }

    .login-logo {
      padding: 0.9375rem;

      h1 img {
        height: 2.5rem;
      }
    }

    .login-form {
      padding: 0.625rem 0;
    }

    .login-options {
      flex-wrap: wrap;
    }

    .remember-me {
      width: 100%;
    }
  }

  // 더 작은 모바일 화면용 (iPhone SE 등)
  @media (max-width: 480px) {
    .login-container .login-left {
      padding: 0.9375rem;
    }

    .login-logo {
      padding: 0.625rem;
    }

    .login-options {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .login-form {
      gap: 0.625rem;
    }

    .notice-section {
      padding: 0.625rem 0;
    }

    .login-footer {
      margin-top: 0.625rem;
    }
  }
</style>
