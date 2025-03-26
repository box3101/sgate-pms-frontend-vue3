<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo Section -->
      <div class="login-logo">
        <h1>
          <img src="@/assets/images/s-gate_logo.svg" alt="SGate Logo" />
        </h1>
      </div>
      
      <!-- Login Form Section -->
      <div class="login-form" :style="{ top: loginFormTop }">
        <!-- Company ID Input -->
        <UiInput
          v-model="companyId"
          label="회사아이디"
          size="medium"
          prefixIcon="mdi:office-building"
          block
        />
        
        <!-- Username Input -->
        <UiInput
          v-model="username"
          label="아이디"
          size="medium"
          prefixIcon="mdi:account"
          block
        />
        
        <!-- Password Input -->
        <UiInput
          v-model="password"
          type="password"
          label="패스워드"
          size="medium"
          prefixIcon="mdi:lock"
          block
        />
        
        <!-- Login Options -->
        <div class="login-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">로그인정보 저장</label>
          </div>
          <a href="#" class="forgot-password">비밀번호 찾기</a>
        </div>
        
        <!-- Login Button -->
        <button class="login-button" @click="handleLogin">로그인</button>
      </div>
      
      <!-- Divider -->
      <div class="divider"></div>
      
      <!-- Notice Section -->
      <div class="notice-section">
        <h3 class="flex items-center gap-4" >
            <Icon name="mdi:bell"  style="background-color: #777;"/>공지사항
        </h3>
        
        <ul class="notice-list">
          <li v-for="(notice, index) in notices" :key="index" class="notice-item">
            <a href="#" class="notice-title">{{ notice.title }}</a>
            <span class="notice-date">{{ notice.date }}</span>
          </li>
        </ul>
        
        <div class="system-notice">
          매주 목요일 22:00 ~ 24:00 시스템 점검이 있습니다.
        </div>
      </div>
      
      <!-- Footer -->
      <div class="login-footer">
        <div class="footer-content">
          <img src="@/assets/images/ispark_logo.svg" alt="ISPARK Logo" />
          <a href="#" class="privacy-policy">개인정보처리방침</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Layout setting - don't use default layout
definePageMeta({
  layout: false
});

// Sample notices
const notices = ref([
  { title: '시스템 업데이트 안내', date: '25.03.31' },
  { title: '성과평가 일정 변경 안내', date: '25.03.28' },
  { title: '인사평가 시스템 개선 안내', date: '25.03.25' }
]);

const loginFormTop = ref('-100vh');

// First page load, scroll up login form
window.addEventListener('load', () => {
  setTimeout(() => {
    loginFormTop.value = '0';
  }, 100);
});
</script>
<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 15px;
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

.login-logo h1{
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
  img{
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
 </style>