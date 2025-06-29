<template>
  <div class="employee-card" :class="{ active: isActive }" @click="handleCardClick">
    <!-- 사용자 기본 정보 -->
    <div class="user-main-info">
      <div class="user-info flex items-center gap-3">
        <div class="profile-image">
          <img
            :src="employee.profileImage || '/css/ui/img/profileChr-M.svg'"
            :alt="`${employee.name} 프로필`"
            class="profile-img"
            @error="handleImageError"
          />
        </div>
        <div class="user-details">
          <div class="user-name">{{ employee.name }}</div>
          <div class="user-tags flex items-center gap-2 mt-1">
            <span class="tag tag-position">{{ employee.position }}</span>
            <span class="tag tag-role">{{ employee.role }}</span>
            <span class="tag tag-department">{{ employee.department }}</span>
          </div>
        </div>
      </div>

      <!-- 평가자 정보 -->
      <div class="evaluators mt-3">
        <div class="evaluator-list flex flex-wrap gap-3">
          <span v-for="(evaluator, index) in employee.evaluators" :key="index" class="evaluator">
            {{ index + 1 }}차 : {{ evaluator }}
          </span>
        </div>
      </div>
    </div>

    <!-- 평가 결과 -->
    <div class="evaluation-results mt-4">
      <!-- 성과평가 -->
      <div class="eval-item flex items-center gap-3 mb-2">
        <div class="eval-icon"></div>
        <div class="eval-content flex items-center gap-2">
          <span class="eval-tag">성과평가</span>
          <span class="eval-result"> 결과 : {{ employee.performanceResult }}% </span>
        </div>
      </div>

      <!-- 역량평가 -->
      <div class="eval-item flex items-center gap-3">
        <div class="eval-icon"></div>
        <div class="eval-content flex items-center gap-2">
          <span class="eval-tag">역량평가</span>
          <span class="eval-result">{{ employee.competencyResult }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 함수 목적: 평가 대상자 카드 컴포넌트
   * @param {Object} employee - 직원 정보 객체
   * @param {Boolean} isActive - 활성 상태 여부
   */
  import { ref } from 'vue'

  // Props 정의
  const props = defineProps({
    employee: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        name: '',
        position: '',
        role: '',
        department: '',
        profileImage: '',
        evaluators: [],
        performanceResult: 0,
        competencyResult: ''
      })
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })

  // Emits 정의
  const emit = defineEmits(['card-click'])

  /**
   * 함수 목적: 카드 클릭 이벤트 처리
   */
  const handleCardClick = () => {
    emit('card-click', props.employee)
  }

  /**
   * 함수 목적: 이미지 로드 실패 시 기본 이미지로 대체
   * @param {Event} event - 이미지 에러 이벤트
   */
  const handleImageError = event => {
    // event.target.src = '/css/ui/img/profileChr-M.svg'
  }
</script>

<style lang="scss" scoped>
  // Employee Card 스타일
  .employee-card {
    margin-bottom: 10px;
    background: #fff;
    border: 1px solid $border-color-light;
    border-radius: $border-radius-md;
    padding: $spacing-md;
    cursor: pointer;
    transition: all $transition-normal;

    &:hover {
      background: $hover-background;
      border-color: $border-color-filled;
    }

    &.active {
      border-color: $primary-color;
      background: $primary-5;
    }
  }

  // 사용자 기본 정보 스타일
  .user-main-info {
    .user-info {
      .profile-image {
        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid $border-color-light;
        }
      }

      .user-details {
        flex: 1;

        .user-name {
          @include font-style($body-medium-bold);
          color: $text-default-color;
          margin-bottom: $spacing-xxs;
        }

        .user-tags {
          .tag {
            @include font-style($body-xsmall);
            padding: 2px $spacing-xs;
            border-radius: $border-radius-pill;
            background: $gray-5;
            color: $gray-70;

            &.tag-position {
              background: $tag-primary;
              color: $text-light-color;
            }

            &.tag-role {
              background: $tag-collaboration;
              color: $text-light-color;
            }

            &.tag-department {
              background: $gray-30;
              color: $text-light-color;
            }
          }
        }
      }
    }

    // 평가자 정보 스타일
    .evaluators {
      .evaluator-list {
        .evaluator {
          @include font-style($body-small);
          color: $gray-50;
        }
      }
    }
  }

  // 평가 결과 스타일
  .evaluation-results {
    .eval-item {
      .eval-icon {
        width: 6px;
        height: 20px;
        background: $gray-10;
        border-radius: 3px;
        flex-shrink: 0;
      }

      .eval-content {
        .eval-tag {
          @include font-style($body-xsmall);
          padding: 2px $spacing-xs;
          background: $gray-5;
          border-radius: $border-radius-pill;
          color: $gray-70;
          font-weight: 500;
        }

        .eval-result {
          @include font-style($body-small);
          color: $gray-50;
        }
      }
    }
  }

  // 반응형 스타일
  @media (max-width: 768px) {
    .employee-card {
      padding: $spacing-sm;

      .user-info {
        .profile-image .profile-img {
          width: 32px;
          height: 32px;
        }
      }

      .evaluators .evaluator-list {
        flex-direction: column;
        gap: $spacing-xxs;
      }
    }
  }
</style>
