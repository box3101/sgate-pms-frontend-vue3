<template>
  <div class="signup-page">
    <div class="signup-card">
      <!-- 회원가입 제목 -->
      <h1 class="signup-title">SIGN UP</h1>

      <!-- 이름 입력 -->
      <div class="form-group">
        <label class="form-label">name</label>
        <input v-model="name" type="text" class="form-input" placeholder="" />
      </div>

      <!-- 이메일 입력 -->
      <div class="form-group">
        <label class="form-label">email</label>
        <input v-model="email" type="email" class="form-input" placeholder="" />
      </div>

      <!-- 비밀번호 입력 -->
      <div class="form-group">
        <label class="form-label">password</label>
        <div class="password-field">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-input"
            placeholder=""
          />
          <button type="button" class="password-toggle" @click="togglePassword">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="showPassword"
                d="M2.5 10C2.5 10 5.5 4 10 4C14.5 4 17.5 10 17.5 10C17.5 10 14.5 16 10 16C5.5 16 2.5 10 2.5 10Z"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                v-if="showPassword"
                cx="10"
                cy="10"
                r="3"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                v-else
                d="M14.12 14.12C13.15 14.7 12.1 15 10 15C5.5 15 2.5 10 2.5 10C3.21 8.84 4.31 7.49 6 6.5M9.9 4C10.5 4 11.5 4.2 12.5 4.8C13.5 5.4 14.5 6.5 15.5 8C16 8.8 16.5 9.4 17.5 10C17.5 10 16.5 11.6 15 13.5"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                v-if="!showPassword"
                x1="2"
                y1="2"
                x2="18"
                y2="18"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 비밀번호 확인 입력 -->
      <div class="form-group">
        <label class="form-label">confirm password</label>
        <div class="password-field">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="form-input"
            placeholder=""
          />
          <button type="button" class="password-toggle" @click="toggleConfirmPassword">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="showConfirmPassword"
                d="M2.5 10C2.5 10 5.5 4 10 4C14.5 4 17.5 10 17.5 10C17.5 10 14.5 16 10 16C5.5 16 2.5 10 2.5 10Z"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                v-if="showConfirmPassword"
                cx="10"
                cy="10"
                r="3"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                v-else
                d="M14.12 14.12C13.15 14.7 12.1 15 10 15C5.5 15 2.5 10 2.5 10C3.21 8.84 4.31 7.49 6 6.5M9.9 4C10.5 4 11.5 4.2 12.5 4.8C13.5 5.4 14.5 6.5 15.5 8C16 8.8 16.5 9.4 17.5 10C17.5 10 16.5 11.6 15 13.5"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                v-if="!showConfirmPassword"
                x1="2"
                y1="2"
                x2="18"
                y2="18"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 회원가입 버튼 -->
      <button class="signup-btn" @click="handleSignup">Create Account</button>

      <!-- 하단 링크들 -->
      <div class="signup-links">
        <span class="already-text">Already have an account?</span>
        <nuxt-link to="/login2" class="signin-link">Sign in</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  definePageMeta({
    layout: false
  })
  export default {
    name: 'SignupPage',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
      }
    },
    methods: {
      /**
       * 회원가입 처리
       * 목적: 회원가입 버튼 클릭 시 호출
       */
      handleSignup() {
        console.log('회원가입:', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
      },

      /**
       * 비밀번호 표시/숨김 토글
       * 목적: 비밀번호 필드 옆 아이콘 클릭 시 호출
       */
      togglePassword() {
        this.showPassword = !this.showPassword
      },

      /**
       * 비밀번호 확인 표시/숨김 토글
       * 목적: 비밀번호 확인 필드 옆 아이콘 클릭 시 호출
       */
      toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signup-page {
    min-height: 100vh;
    background-color: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;

    .signup-card {
      background: white;
      border-radius: 16px;
      padding: 60px 48px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);

      .signup-title {
        font-size: 28px;
        font-weight: 600;
        color: #4a5568;
        text-align: center;
        margin: 0 0 48px 0;
        letter-spacing: 2px;
      }

      .form-group {
        margin-bottom: 15px;

        &:last-of-type {
          margin-bottom: 32px;
        }

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

        .password-field {
          position: relative;

          .form-input {
            padding-right: 60px;
          }

          .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: background-color 0.2s ease;

            &:hover {
              background-color: #f1f5f9;
            }

            svg {
              display: block;
              width: 24px;
              height: 24px;
            }
          }
        }
      }

      .signup-btn {
        width: 100%;
        height: 56px;
        background: #2d5a5a;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        margin: 16px 0 32px 0;
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

      .signup-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .already-text {
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

  // 반응형 처리
  @media (max-width: 600px) {
    .signup-page {
      padding: 16px;

      .signup-card {
        padding: 48px 32px;
        max-width: 100%;

        .signup-title {
          font-size: 24px;
          margin-bottom: 36px;
        }

        .form-group {
          margin-bottom: 24px;

          &:last-of-type {
            margin-bottom: 28px;
          }

          .form-label {
            font-size: 15px;
          }

          .form-input {
            height: 52px;
            font-size: 15px;
          }
        }

        .signup-btn {
          height: 52px;
          font-size: 17px;
        }

        .signup-links {
          .already-text {
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
    .signup-page {
      .signup-card {
        padding: 40px 24px;

        .signup-title {
          font-size: 22px;
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 20px;

          &:last-of-type {
            margin-bottom: 24px;
          }

          .form-input {
            height: 48px;
            font-size: 14px;
          }
        }

        .signup-btn {
          height: 48px;
          font-size: 16px;
        }

        .signup-links {
          .already-text {
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
