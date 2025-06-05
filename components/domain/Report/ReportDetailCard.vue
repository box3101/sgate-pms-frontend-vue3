<template>
  <div class="report-card">
    <!-- 헤더 -->
    <div class="report-header">
      <div class="report-meta">
        <span :class="['type-badge', reportTypeBadgeClass]">
          {{ reportTypeLabel }}
        </span>
        <span class="create-time">{{ report.extendedProps.createTime }}</span>
        <span class="author-info">{{ report.extendedProps.author }}</span>
        <span class="submit-target">→ {{ report.extendedProps.submitTarget }}</span>
      </div>

      <h2 class="report-title">{{ report.title }}</h2>

      <p v-if="report.extendedProps.summary" class="report-summary">
        {{ report.extendedProps.summary }}
      </p>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="report-content">
      <!-- 실제 수행 내용 -->
      <div class="content-section">
        <h3 class="section-title">수행 내용</h3>
        <div class="content-body">
          <p class="content-text">{{ report.extendedProps.actualContent }}</p>
        </div>
      </div>

      <!-- 계획 내용 -->
      <div v-if="report.extendedProps.planContent" class="content-section">
        <h3 class="section-title">다음 계획</h3>
        <div class="content-body">
          <p class="content-text">{{ report.extendedProps.planContent }}</p>
        </div>
      </div>

      <!-- 기타 의견 -->
      <div v-if="report.extendedProps.etcContent" class="content-section">
        <h3 class="section-title">기타 의견</h3>
        <div class="content-body">
          <p class="content-text">{{ report.extendedProps.etcContent }}</p>
        </div>
      </div>

      <!-- 첨부파일 -->
      <div v-if="hasAttachments" class="content-section">
        <h3 class="section-title">첨부파일</h3>
        <div class="attachments-list">
          <div
            v-for="attachment in report.extendedProps.attachments"
            :key="attachment.id"
            class="attachment-item"
          >
            <div class="attachment-icon">
              <i :class="getFileIcon(attachment.name)"></i>
            </div>
            <div class="attachment-info">
              <span class="attachment-name">{{ attachment.name }}</span>
              <span class="attachment-size">({{ formatFileSize(attachment.size) }})</span>
            </div>
            <button class="download-button" @click="downloadFile(attachment)">
              <i class="icon-download"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 피드백 -->
      <div v-if="hasFeedbacks" class="content-section">
        <h3 class="section-title">피드백</h3>
        <div class="feedbacks-list">
          <div
            v-for="feedback in report.extendedProps.feedbacks"
            :key="feedback.id"
            class="feedback-item"
          >
            <div class="feedback-header">
              <span class="feedback-author">{{ feedback.author }}</span>
              <span class="feedback-time">{{ formatFeedbackTime(feedback.createdAt) }}</span>
            </div>
            <p class="feedback-content">{{ feedback.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  // Props 정의
  const props = defineProps({
    report: {
      type: Object,
      required: true,
      validator: report => {
        return report && report.extendedProps && report.title
      }
    }
  })

  // Computed properties
  const reportTypeLabel = computed(() => {
    return props.report.extendedProps.reportType === 'daily' ? '일간보고' : '주간보고'
  })

  const reportTypeBadgeClass = computed(() => {
    return props.report.extendedProps.reportType === 'daily' ? 'daily' : 'weekly'
  })

  const hasAttachments = computed(() => {
    return (
      props.report.extendedProps.attachments && props.report.extendedProps.attachments.length > 0
    )
  })

  const hasFeedbacks = computed(() => {
    return props.report.extendedProps.feedbacks && props.report.extendedProps.feedbacks.length > 0
  })

  // Methods
  function getFileIcon(fileName) {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const iconMap = {
      pdf: 'icon-file-pdf',
      doc: 'icon-file-doc',
      docx: 'icon-file-doc',
      xls: 'icon-file-excel',
      xlsx: 'icon-file-excel',
      ppt: 'icon-file-ppt',
      pptx: 'icon-file-ppt',
      jpg: 'icon-file-image',
      jpeg: 'icon-file-image',
      png: 'icon-file-image',
      gif: 'icon-file-image',
      zip: 'icon-file-zip',
      rar: 'icon-file-zip'
    }
    return iconMap[extension] || 'icon-file-default'
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  function formatFeedbackTime(dateTime) {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateTime))
  }

  function downloadFile(attachment) {
    // 실제 환경에서는 파일 다운로드 API 호출
    console.log('파일 다운로드:', attachment.name)
    // TODO: 실제 다운로드 로직 구현
  }
</script>

<style lang="scss" scoped>
  $primary-color: #0084ff;
  $success-color: #00b248;
  $warning-color: #ff8c00;

  $gray-50: #f9fafb;
  $gray-100: #f3f4f6;
  $gray-200: #e5e7eb;
  $gray-300: #d1d5db;
  $gray-400: #9ca3af;
  $gray-500: #6b7280;
  $gray-600: #4b5563;
  $gray-700: #374151;
  $gray-800: #1f2937;
  $gray-900: #111827;

  .report-card {
    background: white;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  // 헤더
  .report-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid $gray-200;

    .report-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .type-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: -0.025em;

      &.daily {
        background: rgba($success-color, 0.1);
        color: $success-color;
        border: 1px solid rgba($success-color, 0.2);
      }

      &.weekly {
        background: rgba($primary-color, 0.1);
        color: $primary-color;
        border: 1px solid rgba($primary-color, 0.2);
      }
    }

    .create-time {
      font-size: 14px;
      color: $gray-600;
      font-weight: 500;
    }

    .author-info {
      font-size: 14px;
      color: $gray-700;
      font-weight: 600;
    }

    .submit-target {
      font-size: 14px;
      color: $gray-500;
    }

    .report-title {
      font-size: 20px;
      font-weight: 700;
      color: $gray-900;
      margin: 0 0 8px 0;
      letter-spacing: -0.025em;
    }

    .report-summary {
      font-size: 15px;
      color: $gray-600;
      margin: 0;
      font-weight: 500;
    }
  }

  // 콘텐츠
  .report-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .content-section {
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: $gray-800;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid $gray-200;
      letter-spacing: -0.025em;
    }

    .content-body {
      .content-text {
        font-family: inherit;
        font-size: 15px;
        color: $gray-700;
        white-space: pre-wrap;
        margin: 0;
        line-height: 1.7;
        word-break: keep-all;
      }
    }
  }

  // 첨부파일
  .attachments-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .attachment-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: $gray-50;
    border-radius: 8px;
    border: 1px solid $gray-200;
    transition: all 0.2s ease;

    &:hover {
      background: $gray-100;
      border-color: $gray-300;
    }

    .attachment-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 6px;
      color: $primary-color;
      font-size: 16px;
    }

    .attachment-info {
      flex: 1;
      min-width: 0;

      .attachment-name {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: $gray-800;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .attachment-size {
        font-size: 12px;
        color: $gray-500;
        margin-left: 4px;
      }
    }

    .download-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border: 1px solid $gray-300;
      border-radius: 6px;
      color: $gray-600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: $primary-color;
        color: white;
        border-color: $primary-color;
      }
    }
  }

  // 피드백
  .feedbacks-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .feedback-item {
    padding: 16px;
    background: $gray-50;
    border-radius: 8px;
    border-left: 4px solid $primary-color;

    .feedback-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      .feedback-author {
        font-size: 14px;
        font-weight: 600;
        color: $gray-800;
      }

      .feedback-time {
        font-size: 12px;
        color: $gray-500;
      }
    }

    .feedback-content {
      font-size: 14px;
      color: $gray-700;
      margin: 0;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  }

  // 반응형 디자인
  @media (max-width: 768px) {
    .report-card {
      padding: 16px;
    }

    .report-header {
      margin-bottom: 24px;
      padding-bottom: 16px;

      .report-meta {
        gap: 8px;
      }

      .report-title {
        font-size: 18px;
      }
    }

    .report-content {
      gap: 20px;
    }

    .attachment-item {
      padding: 10px 12px;

      .attachment-icon {
        width: 28px;
        height: 28px;
        font-size: 14px;
      }

      .download-button {
        width: 28px;
        height: 28px;
      }
    }
  }
</style>
