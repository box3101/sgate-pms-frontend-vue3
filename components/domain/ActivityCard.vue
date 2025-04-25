<template>
  <div class="activity-card">
    <div class="activity-header">
      <div class="activity-info">
        <div class="activity-date flex gap-5 items-center">
          <!-- 진행 상태 표시 -->
          <div
            :class="['activity-type', `activity-type--${getEvaluationClass(activity.evaluation)}`]"
          >
            {{ activity.status || '상태 없음' }}
          </div>

          <span class="current-date">{{ currentDate }}</span>
        </div>
        <div class="activity-user">
          <span class="company">{{ activity.user.company }}</span>
          <span class="separator">></span>
          <span class="team">{{ activity.user.team }}</span>
          &nbsp;
          <span class="user-name">{{ activity.user.name }}</span>
        </div>
      </div>
      <div class="activity-actions flex flex-col gap-5">
        <span class="created-date">(생성: {{ activity.createdDate }})</span>
        <div class="action-buttons flex gap-5 items-center justify-end">
          <button class="action-btn edit-btn" @click.stop="$emit('edit', activity.id)">
            <Icon name="mdi:pencil" size="16" />
          </button>
          <button class="action-btn delete-btn" @click.stop="$emit('delete', activity.id)">
            <Icon name="mdi:delete" size="16" />
          </button>
          <button class="action-btn reply-btn" @click.stop="$emit('reply', activity.id)">
            <Icon name="mdi:reply" size="16" />
          </button>
        </div>
      </div>
    </div>
    <div class="activity-content">
      <ul class="activity-list" v-html="activity.items"></ul>
    </div>
  </div>
</template>

<script setup>
  /**
   * 활동 카드 컴포넌트
   * 활동 정보를 표시하는 카드 컴포넌트
   */

  import { ref, computed } from 'vue'

  // 현재 날짜 계산
  const currentDate = computed(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  })

  function getEvaluationClass(evaluation) {
    switch (evaluation) {
      case '우수':
        return 'excellent'
      case '보통':
        return 'average'
      case '미흡':
        return 'poor'
      default:
        return 'default'
    }
  }
  // props 정의
  const props = defineProps({
    activity: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        status: '', // 진행중, 완료, 진행전, 취소/보류
        evaluation: '', // 우수, 보통, 미흡
        createdDate: '',
        items: [],
        user: {
          company: '',
          team: '',
          name: ''
        }
      })
    }
  })

  // 이벤트 정의
  defineEmits(['edit', 'delete', 'reply'])
</script>

<style lang="scss" scoped>
  .activity-card {
    border-radius: 8px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    background: var(--color-gray-0, #fff);
    padding: 16px;
    margin-bottom: 16px;

    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-gray-30, #b1b8be);

      .activity-info {
        .activity-date {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;

          .activity-type {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 700;
            &--excellent {
              color: #0084ff;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: $primary-color;
              }
            }

            &--completed {
              color: #10b981;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #10b981;
              }
            }

            &--average {
              color: #ff9500;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ff9500;
              }
            }

            &--poor {
              color: #ef4444;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ef4444;
              }
            }
          }

          .current-date {
            color: var(--color-gray-50, #6d7882);
            text-align: right;
            font-size: 14px;
            font-weight: 400;
            line-height: 150%; /* 21px */
          }
        }

        .activity-user {
          font-size: 14px;
          color: #333;

          .separator {
            margin: 0 6px;
            color: #ccc;
          }

          .team {
            color: var(--color-gray-70, #464c53);
            font-size: 14px;
            line-height: 150%; /* 21px */
          }

          .user-name {
            color: var(--color-gray-70, #464c53);

            font-size: 14px;
            font-weight: 700;
            line-height: 140%; /* 19.6px */
          }
        }
      }

      .activity-actions {
        display: flex;
        gap: 8px;

        .created-date {
          color: var(--color-gray-50, #6d7882);
          text-align: right;
          font-size: 14px;
          font-weight: 400;
          line-height: 150%; /* 21px */
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #666;

          &:hover {
            background-color: #f5f5f5;
            color: #333;
          }

          &.edit-btn:hover {
            color: #2196f3;
          }

          &.delete-btn:hover {
            color: #f44336;
          }

          &.reply-btn:hover {
            color: #4caf50;
          }
        }
      }
    }

    .activity-content {
      .activity-list {
        list-style-type: none;
        padding-left: 0;
        margin: 0;

        li {
          padding: 6px 0;
          font-size: 14px;
          color: #555;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
