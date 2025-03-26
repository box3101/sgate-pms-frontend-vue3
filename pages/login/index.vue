<template>
  <div class="login-page">
    <div
      class="login-container"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="100"
    >
      <!-- 로고 섹션 -->
      <div class="login-logo">
        <h1>
          <img src="@/assets/images/s-gate_logo.svg" alt="SGate Logo" />
        </h1>
      </div>

      <!-- 로그인 폼 섹션 -->
      <div class="login-form" :style="{ top: loginFormTop }">
        <!-- 회사아이디 입력 -->
        <UiInput
          v-model="companyId"
          label="회사아이디"
          size="medium"
          prefixIcon="mdi:office-building"
          block
        />

        <!-- 아이디 입력 -->
        <UiInput
          v-model="username"
          label="아이디"
          size="medium"
          prefixIcon="mdi:account"
          block
        />

        <!-- 비밀번호 입력 -->
        <UiInput
          v-model="password"
          type="password"
          label="비밀번호"
          size="medium"
          prefixIcon="mdi:lock"
          block
        />

        <!-- 로그인 옵션 -->
        <div class="login-options">
          <div class="remember-me flex items-center justify-between w-full">
            <UiCheckbox
              v-model="rememberMe"
              label="로그인정보 저장"
              size="large"
            />
            <a href="#" class="forgot-password" @click="toggleModal"
              >비밀번호 찾기</a
            >
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <button class="login-button" @click="handleLogin">로그인</button>
      </div>

      <!-- 구분선 -->
      <div class="divider"></div>

      <!-- 공지 섹션 -->
      <div class="notice-section">
        <h3 class="flex items-center gap-4">
          <Icon name="mdi:bell" style="background-color: #777" />공지사항
        </h3>

        <ul class="notice-list">
          <li
            v-for="(notice, index) in notices"
            :key="index"
            class="notice-item"
          >
            <a href="#" class="notice-title">{{ notice.title }}</a>
            <span class="notice-date">{{ notice.date }}</span>
          </li>
        </ul>

        <div class="system-notice">
          매주 목요일 22:00 ~ 24:00 시스템 점검이 있습니다.
        </div>
      </div>

      <!-- 푸터 -->
      <div class="login-footer">
        <div class="footer-content">
          <img src="@/assets/images/ispark_logo.svg" alt="ISPARK Logo" />
          <a href="#" class="privacy-policy">개인정보처리방침</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 비밀번호 찾기 모달 -->
  <UiModal v-model="showModal" title="비밀번호 찾기" size="xmedium"  :showFooter="true">
    <div class="modal-content">
      <div class="login-form" :style="{ top: loginFormTop }">
        <!-- 회사아이디 입력 -->
        <UiInput
          v-model="companyId"
          label="회사아이디"
          size="medium"
          prefixIcon="mdi:office-building"
          block
        />

        <!-- 아이디 입력 -->
        <UiInput
          v-model="username"
          label="아이디"
          size="medium"
          prefixIcon="mdi:account"
          block
        />

        <!-- 이메일 입력 -->
        <UiInput
          v-model="email"
          type="email"
          label="이메일"
          size="medium"
          prefixIcon="mdi:lock"
          block
        />
      </div>

      <div class="error-message">
        <Icon
          name="mdi:alert-circle"
          class="text-error mr-5"
          size="20"
        />
        등록된 이메일로 초기화된 비밀번호를 발송 합니다.
      </div>
    </div>
    <template #footerActions>
      <div class="flex gap-10 justify-center w-full">
        <UiButton variant="tertiary" size="xlarge"  @click="toggleModal" class="flex-1">닫기</UiButton>
        <UiButton variant="primary" size="xlarge" @click="handleFindPassword" class="flex-1">확인</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

definePageMeta({
  layout: false,
});

// 공지사항
const notices = ref([
  { title: "시스템 업데이트 안내", date: "25.03.31" },
  { title: "성과평가 일정 변경 안내", date: "25.03.28" },
  { title: "인사평가 시스템 개선 안내", date: "25.03.25" },
]);

const loginFormTop = ref("-100vh");

AOS.init({
  duration: 800,
  once: true,
});

// 모달 상태
const showModal = ref(false);

// 모달 토글
const toggleModal = () => {
  showModal.value = !showModal.value;
};
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
  h1 {
    text-align: center;
    img {
      display: inline-block;
      height: 35px;
    }
  }
}

.login-container {
  width: 480px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.login-logo {
  text-align: center;
  padding: 20px;
  background-color: #f8fafc;
}

.login-logo h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  padding: 20px 35px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  color: $primary-color;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: $primary-color;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;
}

.login-button:hover {
  background-color: #1765cc;
}

.divider {
  height: 1px;
  background-color: #e8eaed;
  margin: 0 35px;
}

.notice-section {
  padding: 20px 35px;
}

.notice-section h3 {
  font-size: 16px;
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
  padding: 10px 0;
  border-bottom: 1px solid #f1f3f4;
}

.notice-title {
  color: #202124;
  font-size: 14px;
}

.notice-title:hover {
  color: $primary-color;
}

.notice-date {
  color: #5f6368;
  font-size: 14px;
}

.system-notice {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  color: #5f6368;
  text-align: center;
}

.login-footer {
  background-color: #f8fafc;
  padding: 16px 35px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 35px;
  }
}

.logo-small {
  font-size: 16px;
  font-weight: 600;
  color: $primary-color;
}

.privacy-policy {
  font-size: 14px;
  color: $primary-color;
  text-decoration: none;
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

.modal-content .login-form{
  padding: 10px;
}

.error-message {
  display: flex;
  align-items: center;
  color: $info-color;
  font-size: 13px;
  margin-top: 12px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 8px 12px;
  background-color: rgba($info-color, 0.1);
  border-radius: 4px;
  border-left: 3px solid $info-color;

  i {
    margin-right: 8px;
    font-size: 20px;
    background-color: rgba($info-color, 0.1);
  }
}
</style>
