<template>
  <div class="activity-section">
    <!-- 활동 카드 목록 -->
    <div class="activity-cards">
      <!-- 활동 카드 -->
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity-id="activity.id"
        :status="activity.status"
        :evaluation="activity.evaluation"
        :current-date="activity.currentDate"
        :created-date="activity.createdDate"
        :user="activity.user"
        :content="activity.content"
        @edit="handleEdit"
        @delete="handleDelete"
        @reply="handleReply"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import ActivityCard from './ActivityCard.vue'

  // 활동 데이터
  const activities = ref([
    {
      id: 1,
      status: '진행중',
      evaluation: '우수',
      currentDate: '2025-06-09',
      createdDate: '2025-06-08',
      user: {
        name: '홍길동',
        company: 'ABC회사',
        team: '개발팀'
      },
      content: `
     글자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트자테스트
    `
    },
    {
      id: 2,
      status: '완료',
      evaluation: '보통',
      currentDate: '2025-06-08',
      createdDate: '2025-06-07',
      user: {
        name: '김철수',
        company: 'ABC회사',
        team: '기획팀'
      },
      content: `
          에디터 내용2
    `
    },
    {
      id: 3,
      status: '진행중',
      evaluation: '미흡',
      currentDate: '2025-06-09',
      createdDate: '2025-06-08',
      user: {
        name: '박영수',
        company: 'ABC회사',
        team: '개발팀'
      },
      content: `
      에디터 내용
    `
    }
  ])
</script>

<style lang="scss" scoped>
  .activity-section {
    margin-top: 24px;

    .activity-cards {
      margin-bottom: 24px;
    }

    .comments-section {
      margin-top: 0px;

      .comments-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #333;
      }

      .comments-list {
        margin-bottom: 20px;
        margin-left: 16px;
      }

      .comment-input-area {
        margin-top: 16px;

        .comment-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          resize: vertical;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: #2196f3;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        }

        .comment-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
      }
    }
  }

  /* 활동 카드 스타일 */
  .activity-card {
    border-radius: 8px;
    border: 1px solid #cdd1d5;
    background: #fff;
    padding: 16px;
    margin-bottom: 16px;

    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #b1b8be;

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
              color: #3b82f6;
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
                background-color: #3b82f6;
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
              color: #f59e0b;
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
                background-color: #f59e0b;
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
            color: #6d7882;
            text-align: right;
            font-size: 14px;
            font-weight: 400;
            line-height: 150%;
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
            color: #464c53;
            font-size: 14px;
            line-height: 150%;
          }

          .user-name {
            color: #464c53;
            font-size: 14px;
            font-weight: 700;
            line-height: 140%;
          }

          .company {
            color: #464c53;
            font-size: 14px;
          }
        }
      }

      .activity-actions {
        display: flex;
        gap: 8px;

        .created-date {
          color: #6d7882;
          text-align: right;
          font-size: 14px;
          font-weight: 400;
          line-height: 150%;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;

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

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  /* 댓글 카드 스타일 */
  .comment-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #b1b8be;

      .comment-info {
        .comment-date {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .comment-user {
          font-size: 14px;
          color: #333;

          .separator {
            margin: 0 6px;
            color: #ccc;
          }

          .team {
            color: #464c53;
            font-size: 14px;
            line-height: 150%;
          }

          .user-name {
            color: #464c53;
            font-size: 14px;
            font-weight: 700;
            line-height: 140%;
          }

          .company {
            color: #464c53;
            font-size: 14px;
          }
        }
      }

      .comment-actions {
        display: flex;
        gap: 8px;

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background-color: #f0f0f0;
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

    .comment-content {
      color: #464c53;
      font-size: 16px;
      line-height: 150%;
      word-break: break-word;
    }
  }

  /* 대댓글 스타일 */
  .replies-list {
    margin-top: 12px;
    margin-left: 24px;

    .reply-card {
      background-color: #ffffff;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      border-left: 3px solid #e0e0e0;

      .reply-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e5e5e5;

        .reply-info {
          .reply-date {
            font-size: 12px;
            color: #999;
            margin-bottom: 2px;
          }

          .reply-user {
            font-size: 13px;
            color: #333;

            .separator {
              margin: 0 4px;
              color: #ccc;
            }

            .team {
              color: #464c53;
              font-size: 13px;
            }

            .user-name {
              color: #464c53;
              font-size: 13px;
              font-weight: 600;
            }

            .company {
              color: #464c53;
              font-size: 13px;
            }
          }
        }

        .reply-actions {
          display: flex;
          gap: 6px;

          .action-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 3px;
            border-radius: 3px;
            color: #888;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              background-color: #f5f5f5;
              color: #555;
            }

            &.edit-btn:hover {
              color: #2196f3;
            }

            &.delete-btn:hover {
              color: #f44336;
            }
          }
        }
      }

      .reply-content {
        color: #464c53;
        font-size: 14px;
        line-height: 140%;
        word-break: break-word;
      }
    }
  }

  /* 유틸리티 클래스 */
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .gap-5 {
    gap: 5px;
  }

  .items-center {
    align-items: center;
  }

  .justify-end {
    justify-content: flex-end;
  }
</style>
