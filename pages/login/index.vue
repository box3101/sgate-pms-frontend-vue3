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
          <!-- 아이디 입력 -->
          <UiInput
            v-model="username"
            size="large"
            prefixIcon="account"
            block
            placeholder="아이디를 입력하세요"
          />

          <!-- 비밀번호 입력 -->
          <UiInput
            v-model="password"
            type="password"
            size="large"
            prefixIcon="lock"
            block
            placeholder="비밀번호를 입력하세요"
          />

          <!-- 로그인 옵션 -->
          <div class="login-options">
            <div class="remember-me flex items-center justify-between w-full">
              <UiCheckbox v-model="rememberMe" label="로그인정보 저장" size="large" />
              <a href="#" class="forgot-password flex align-center gap-3" @click="toggleModal">
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
          <div class="system-notice">매주 목요일 22:00 ~ 24:00 시스템 점검이 있습니다.</div>
        </div>

        <!-- 업데이트/가이드/공지사항 -->
        <ul class="bottom-links-wrp flex gap-4">
          <li>
            <a href="#" class="bottom-link">
              <img src="/images/icon-login-patchnote.svg" alt="업데이트 노트" />
              <span>업데이트 노트</span>
            </a>
          </li>
          <li>
            <a href="#" class="bottom-link">
              <img src="/images/icon-login-guide.svg" alt="사용 가이드" />
              <span>사용 가이드</span>
            </a>
          </li>
          <li>
            <a href="#" class="bottom-link" @click="showNoticeModal = true">
              <img src="/images/icon-login-notice.svg" alt="공지사항" />
              <span>공지사항</span>
            </a>
          </li>
        </ul>

        <!-- 푸터 -->
        <div class="login-footer">
          <div class="footer-content">
            <img src="@/assets/images/ispark_logo.svg" alt="ISPARK Logo" />
            <a href="#" class="privacy-policy">개인정보처리방침</a>
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
        <!-- 아이디 입력 -->
        <UiInput
          v-model="username"
          size="large"
          prefixIcon="account"
          block
          placeholder="아이디를 입력하세요"
        />

        <!-- 이메일 입력 -->
        <UiInput
          v-model="email"
          type="email"
          size="large"
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

  // 공지사항
  const notices = ref([{ title: '시스템 업데이트 안내', date: '2025.03.31' }])
  const selectedNotice = ref({
    title: '시스템 업데이트 안내',
    date: '20225.03.31',
    content:
      '길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트길이테스트',
    attachments: [
      { name: '업데이트 상세내역.pdf', url: '#' },
      { name: '4개까지', url: '#' },
      { name: '4개까지', url: '#' },
      { name: '4개까지.pdf', url: '#' }
    ]
  })

  // 첨부파일 다운로드 처리
  const downloadFile = file => {
    console.log('Downloading file:', file.name)
    // 실제 다운로드 로직 구현
  }

  // 다시 보지 않기 체크박스
  const doNotShowAgain = ref(false)

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

  const handleLogin = () => {
    navigateTo('/task')
  }
</script>
<style scoped lang="scss">
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 15px;
    overflow-y: hidden;

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .login-container .login-left {
      padding: 24px 40px;
      padding-bottom: 60px;
      width: 428px;
    }

    .login-container .login-right {
      width: 592px;
      height: 100%;
      border-radius: 0 8px 8px 0;
      box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      img {
        height: 660px;
      }
    }

    h1 {
      text-align: center;
      img {
        display: inline-block;
        height: 50px;
        margin-bottom: 5px;
      }
    }
  }

  .login-container .login-left {
    width: 480px;
    border-radius: 8px 0 0 8px;
    background: var(--color-gray-0, #fff);
    box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .login-logo {
    text-align: center;
    padding: 24px;
  }

  .login-logo h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form {
    padding: 15px 0px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    font-size: 14px;
  }

  .remember-me {
    display: flex;
    align-items: center;
  }

  .remember-me input {
    margin-right: 8px;
  }

  .forgot-password {
    display: flex;
    align-items: center;
    color: var(--color-primary-50, #0af);

    font-family: Pretendard;
    font-size: 13px;
    font-weight: 700;
    line-height: 150%; /* 18px */
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .login-button {
    width: 100%;
    padding: 12px 16px;
    background-color: $primary-color;
    color: white;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 5px;
  }

  .login-button:hover {
    background-color: #1765cc;
  }

  .divider {
    height: 1px;
    background: var(--color-gray-30, #b1b8be);
  }

  .notice-section {
    padding: 15px 0px;
  }

  .notice-section h3 {
    font-size: $font-size-lg;
    font-weight: 600;
    color: #202124;
    margin-bottom: 12px;
  }

  .notice-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;
  }

  .notice-item {
    display: flex;
    justify-content: space-between;
  }

  .notice-title {
    color: var(--color-primary-50, #0af);
    font-size: 14px;
    font-weight: 700;
    line-height: 140%; /* 19.6px */
  }

  .notice-title:hover {
    color: $primary-color;
  }

  .notice-date {
    color: var(--color-gray-30, #b1b8be);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%; /* 21px */
  }

  .system-notice {
    display: flex;
    padding: 5px 0px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 4px;
    background: var(--color-system-y10, #ffeacc);
    color: var(--color-system-y30, #ff9500);
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 700;
  }

  .login-footer {
    margin-top: 36px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    img {
      height: 35px;
    }
  }

  .logo-mdall {
    font-size: 16px;
    font-weight: 600;
    color: $primary-color;
  }

  .privacy-policy {
    margin-top: 24px;
    color: var(--color-gray-60, #58616a);
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  .privacy-policy:hover {
    text-decoration: underline;
  }

  @media (max-width: 576px) {
    .login-container {
      width: 100%;
    }

    .login-form {
      padding: 20px;
    }

    .notice-section {
      padding: 20px;
    }

    .login-footer {
      padding: 16px 20px;
    }
  }

  .modal-content .login-form {
    padding: 10px;
  }

  .error-message {
    display: flex;
    align-items: center;
    color: $system-blue;
    font-size: 13px;
    margin-top: 12px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 8px 12px;
    background-color: rgba($system-blue, 0.1);
    border-radius: 4px;
    border-left: 3px solid $system-blue;

    i {
      margin-right: 8px;
      font-size: 20px;
      background-color: rgba($system-green, 0.1);
    }
  }

  .notice-modal-content {
    padding: 20px;

    .notice-header {
      margin-bottom: 16px;
      border-bottom: 1px solid #e8eaed;
      padding-bottom: 12px;

      .notice-title {
        font-size: 24px;
        font-weight: 600;
        color: #202124;
      }

      .notice-date {
        font-size: 14px;
        color: #5f6368;
      }
    }

    .notice-body {
      margin-bottom: 20px;

      .notice-text {
        font-size: $font-size-md;
        line-height: 1.5;
        color: #202124;
        white-space: pre-line;
        margin-bottom: 16px;
      }

      .notice-attachments {
        background-color: #f8fafc;
        border-radius: 6px;
        padding: 12px 16px;

        h4 {
          font-size: $font-size-md;
          font-weight: 600;
          margin-bottom: 8px;
          color: #202124;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          padding: 6px 0;

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
      border-top: 1px solid #e8eaed;
      padding-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .bottom-links-wrp {
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;

        &:hover {
          img {
            filter: brightness(1.1);
          }
          span {
            color: $primary-color;
          }
        }
        img {
          width: 40px;
          height: 40px;
        }
        span {
          color: var(--color-gray-70, #464c53);
          text-align: center;
          font-family: Pretendard;
          font-size: 13px;
          font-weight: 700;
          line-height: 150%; /* 18px */
        }
      }
    }
  }

  :deep(.ui-input__label) {
    font-size: $font-size-md !important;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--color-gray-70, #464c53);
  }

  :deep(.ui-input__text) {
    font-size: $font-size-md !important;
  }
</style>
