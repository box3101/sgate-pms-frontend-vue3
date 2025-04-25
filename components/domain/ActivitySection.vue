<template>
  <div class="activity-section">
    <!-- 활동 카드 -->
    <ActivityCard
      :activity="activity"
      @edit="handleEditActivity"
      @delete="handleDeleteActivity"
      @reply="handleReplyToActivity"
    />

    <!-- 댓글 섹션 -->
    <div class="comments-section">
      <h4 class="comments-title">댓글 ({{ comments.length }})</h4>

      <!-- 댓글 목록 -->
      <div class="comments-list">
        <CommentCard
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          @edit="handleEditComment"
          @delete="handleDeleteComment"
          @reply="handleReplyToComment"
          @edit-reply="handleEditReply"
          @delete-reply="handleDeleteReply"
        />
      </div>

      <!-- 댓글 입력 영역 -->
      <div class="comment-input-area">
        <textarea
          v-model="newComment"
          class="comment-input"
          placeholder="댓글을 입력하세요..."
          rows="3"
        ></textarea>
        <div class="comment-actions">
          <UiButton variant="primary" size="small" @click="submitComment">등록</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 활동 섹션 컴포넌트
   * 활동 카드와 댓글 시스템을 통합한 컴포넌트
   */

  import { ref } from 'vue'
  import ActivityCard from './ActivityCard.vue'
  import CommentCard from './CommentCard.vue'

  // 활동 데이터
  const activity = ref({
    id: '1',
    type: '진행중', // '진행중', '완료', '대기중', '취소됨' 중 하나의 값
    createdDate: '2022.07.12 | 14:45:57',
    items: [
      `
      활동종류 : 서비스 기획 및 디자인<br>
      활동내용<br>
      - Sgate 화면 분석 및 기능 분석<br>
      - 와이어프레임으로 프로세스 제작<br>
      - 와이어프레임에 UI 디자인 적용<br>
      `
    ],
    user: {
      company: 'ABC 회사',
      team: '개발팀',
      name: '홍길동'
    }
  })

  // 댓글 데이터
  const comments = ref([
    {
      id: '1',
      content: '업무 완료 처리했습니다. 리뷰 부탁드립니다.',
      date: '2025-04-22',
      user: {
        company: 'ABC 회사',
        team: '개발팀',
        name: '홍길동'
      },
      replies: [
        {
          id: '1-1',
          content: '리뷰 완료했습니다. 수고하셨습니다!',
          date: '2025-04-23',
          user: {
            company: 'ABC 회사',
            team: '기획팀',
            name: '김철수'
          }
        }
      ]
    },
    {
      id: '2',
      content: '마감일 연장에 대한 이유를 추가로 기록해주세요.',
      date: '2025-04-23',
      user: {
        company: 'ABC 회사',
        team: '기획팀',
        name: '김철수'
      },
      replies: []
    }
  ])

  // 새 댓글 입력
  const newComment = ref('')

  // 댓글 제출
  const submitComment = () => {
    if (!newComment.value.trim()) return

    const comment = {
      id: `${comments.value.length + 1}`,
      content: newComment.value,
      date: new Date().toISOString().split('T')[0],
      user: {
        company: 'ABC 회사',
        team: '개발팀',
        name: '홍길동'
      },
      replies: []
    }

    comments.value.push(comment)
    newComment.value = ''
  }

  // 활동 수정
  const handleEditActivity = id => {
    console.log('활동 수정:', id)
    // 활동 수정 로직 구현
  }

  // 활동 삭제
  const handleDeleteActivity = id => {
    console.log('활동 삭제:', id)
    // 활동 삭제 로직 구현
  }

  // 활동에 댓글 달기
  const handleReplyToActivity = id => {
    console.log('활동에 댓글 달기:', id)
    // 댓글 입력 영역으로 포커스
    document.querySelector('.comment-input').focus()
  }

  // 댓글 수정
  const handleEditComment = id => {
    console.log('댓글 수정:', id)
    // 댓글 수정 로직 구현
  }

  // 댓글 삭제
  const handleDeleteComment = id => {
    console.log('댓글 삭제:', id)
    comments.value = comments.value.filter(comment => comment.id !== id)
  }

  // 댓글에 대댓글 달기
  const handleReplyToComment = id => {
    console.log('댓글에 대댓글 달기:', id)
    // 대댓글 입력 로직 구현
    // 예: 대댓글 입력 모달 표시 또는 인라인 입력 영역 표시
  }

  // 대댓글 수정
  const handleEditReply = id => {
    console.log('대댓글 수정:', id)
    // 대댓글 수정 로직 구현
  }

  // 대댓글 삭제
  const handleDeleteReply = id => {
    console.log('대댓글 삭제:', id)
    // 대댓글 삭제 로직 구현
    comments.value.forEach(comment => {
      if (comment.replies) {
        comment.replies = comment.replies.filter(reply => reply.id !== id)
      }
    })
  }
</script>

<style lang="scss" scoped>
  .activity-section {
    margin-top: 24px;

    .comments-section {
      margin-top: 24px;

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
</style>
