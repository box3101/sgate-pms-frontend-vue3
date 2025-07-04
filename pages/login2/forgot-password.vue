<template>
  <div class="forgot-password-page">
    <div class="forgot-password-card">
      <!-- 비밀번호 찾기 제목 -->
      <h1 class="forgot-title">FORGOT PASSWORD</h1>

      <!-- 안내 텍스트 -->
      <p class="forgot-description">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <!-- 이메일 입력 -->
      <div class="form-group">
        <label class="form-label">email</label>
        <input v-model="email" type="email" class="form-input" placeholder="" />
      </div>

      <!-- 이메일 전송 버튼 -->
      <button class="send-btn" @click="handleSendEmail">임시 코드 발송</button>

      <!-- 성공 메시지 -->
      <div v-if="emailSent" class="success-message">
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="#10B981" stroke-width="1.5" />
          <path
            d="M6 10L8.5 12.5L14 7"
            stroke="#10B981"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Reset link sent to your email!</span>
      </div>

      <!-- 하단 링크들 -->
      <div class="forgot-links">
        <span class="remember-text">Remember your password?</span>
        <nuxt-link to="/login2" class="signin-link">Back to Sign in</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  definePageMeta({
    layout: false
  })
  export default {
    name: 'ForgotPasswordPage',
    data() {
      return {
        email: '',
        emailSent: false
      }
    },
    methods: {
      /**
       * 비밀번호 리셋 이메일 전송
       * 목적: 이메일 전송 버튼 클릭 시 호출
       */
      handleSendEmail() {
        console.log('비밀번호 리셋 이메일 전송:', {
          email: this.email
        })

        // 성공 메시지 표시
        this.emailSent = true

        // 3초 후 메시지 숨김
        setTimeout(() => {
          this.emailSent = false
        }, 3000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .forgot-password-page {
    min-height: 100vh;
    background-color: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;

    .forgot-password-card {
      background: white;
      border-radius: 16px;
      padding: 60px 48px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);

      .forgot-title {
        font-size: 28px;
        font-weight: 600;
        color: #4a5568;
        text-align: center;
        margin: 0 0 24px 0;
        letter-spacing: 1.5px;
      }

      .forgot-description {
        font-size: 16px;
        color: #666;
        text-align: center;
        line-height: 1.6;
        margin: 0 0 48px 0;
        max-width: 360px;
        margin-left: auto;
        margin-right: auto;
      }

      .form-group {
        margin-bottom: 15px;

        .form-label {
          display: block;
          font-size: 16px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          height: 56px;
          padding: 0 18px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          color: #2d3748;
          background: #f8f9fa;
          box-sizing: border-box;
          transition: all 0.2s ease;

          &:focus {
            outline: none;
            border-color: #4299e1;
            background: white;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
          }

          &::placeholder {
            color: #a0aec0;
          }
        }
      }

      .send-btn {
        width: 100%;
        height: 56px;
        background: #2d5a5a;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        margin: 0 0 32px 0;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(45, 90, 90, 0.2);

        &:hover {
          background: #234848;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(45, 90, 90, 0.3);
        }

        &:active {
          background: #1a3636;
          transform: translateY(0);
        }
      }

      .success-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px 20px;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 12px;
        margin-bottom: 32px;
        animation: fadeIn 0.3s ease;

        span {
          font-size: 16px;
          color: #10b981;
          font-weight: 500;
        }

        svg {
          flex-shrink: 0;
        }
      }

      .forgot-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .remember-text {
          font-size: 16px;
          color: #666;
        }

        .signin-link {
          font-size: 16px;
          color: #2d5a5a;
          text-decoration: none;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;

          &:hover {
            color: #234848;
            text-decoration: underline;
            background-color: #f8f9fa;
          }
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // 반응형 처리
  @media (max-width: 600px) {
    .forgot-password-page {
      padding: 16px;

      .forgot-password-card {
        padding: 48px 32px;
        max-width: 100%;

        .forgot-title {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .forgot-description {
          font-size: 15px;
          margin-bottom: 36px;
        }

        .form-group {
          margin-bottom: 28px;

          .form-label {
            font-size: 15px;
          }

          .form-input {
            height: 52px;
            font-size: 15px;
          }
        }

        .send-btn {
          height: 52px;
          font-size: 17px;
        }

        .success-message {
          padding: 14px 18px;
          margin-bottom: 28px;

          span {
            font-size: 15px;
          }
        }

        .forgot-links {
          .remember-text {
            font-size: 15px;
          }

          .signin-link {
            font-size: 15px;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .forgot-password-page {
      .forgot-password-card {
        padding: 40px 24px;

        .forgot-title {
          font-size: 22px;
          margin-bottom: 18px;
        }

        .forgot-description {
          font-size: 14px;
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 24px;

          .form-input {
            height: 48px;
            font-size: 14px;
          }
        }

        .send-btn {
          height: 48px;
          font-size: 16px;
        }

        .success-message {
          padding: 12px 16px;
          margin-bottom: 24px;

          span {
            font-size: 14px;
          }
        }

        .forgot-links {
          .remember-text {
            font-size: 14px;
          }

          .signin-link {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
