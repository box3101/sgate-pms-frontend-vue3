<template>
  <!-- 보고서 헤더 정보 -->
  <div class="header flex items-center justify-between">
    <p class="heading-4 mt-5">
      <span>{{ selectedReport.type }}</span>
    </p>
    <p class="heading-4 mt-5">
      <span>{{ selectedReport.date }}</span>
      <span class="ml-5 mt-5">{{ selectedReport.status }}</span>
      <span class="color-gray text-lg mt-5 ml-10"> 제출대상 : {{ selectedReport.target }} </span>
    </p>
  </div>

  <!-- 실적/계획 테이블 -->
  <UiTable
    v-model="props.reportDetailData"
    scrollable
    striped
    bordered
    maxHeight="calc(100vh - 222px)"
    alignTop
  >
    <template #colgroup>
      <col width="50%" />
      <col width="50%" />
    </template>

    <template #header>
      <tr>
        <th class="text-center">금주실적</th>
        <th class="text-center">차주계획</th>
      </tr>
    </template>

    <template #body>
      <tr>
        <td>
          <div class="p-3" v-html="props.reportDetailData[0].weeklyAchievement"></div>
        </td>
        <td>
          <div class="p-3" v-html="props.reportDetailData[0].nextWeekPlan"></div>
        </td>
      </tr>
    </template>
  </UiTable>

  <!-- 의견/기타 섹션 -->
  <UiTable
    v-model="props.miscContent"
    class="mt-20"
    title="의견/기타"
    layout="horizontal"
    striped
    bordered
  >
    <template #body>
      <tr>
        <th>의견/기타</th>
        <td>{{ props.miscContent }}</td>
      </tr>
    </template>
  </UiTable>

  <!-- 첨부파일 섹션 -->
  <UiTable
    v-model="props.attachmentFiles"
    class="mt-20"
    title="첨부파일"
    layout="horizontal"
    striped
    bordered
  >
    <template #body>
      <tr>
        <th>첨부파일</th>
        <td>
          <div class="flex flex-col gap-2">
            <div v-for="file in attachmentFiles" :key="file.id" class="flex items-center gap-3">
              <i class="icon icon-md icon-file"></i>
              <span>{{ file.name }}</span>
              <UiButton size="small" variant="text" @click="handleDownloadFile(file)">
                <span class="text-underline">다운로드</span>
              </UiButton>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </UiTable>

  <!-- 피드백 섹션 -->
  <UiTable
    v-model="props.feedbackList"
    class="mt-20"
    title="피드백"
    layout="horizontal"
    striped
    bordered
  >
    <template #body>
      <tr>
        <th>피드백</th>
        <td>
          <div class="flex flex-col gap-4">
            <div v-for="feedback in feedbackList" :key="feedback.id" class="p-3 bg-gray-50 rounded">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-bold">{{ feedback.author }}</span>
                <span class="text-gray-500 text-sm">{{ feedback.createdAt }}</span>
              </div>
              <p>{{ feedback.content }}</p>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  // Props
  const props = defineProps({
    selectedReport: {
      type: Object,
      required: true
    },
    reportDetailData: {
      type: Array,
      default: () => []
    },
    miscContent: {
      type: String,
      default: ''
    },
    attachmentFiles: {
      type: Array,
      default: () => []
    },
    feedbackList: {
      type: Array,
      default: () => []
    }
  })

  // Emits
  const emit = defineEmits(['download-file'])

  // 이벤트 핸들러
  const handleDownloadFile = file => {
    emit('download-file', file)
  }
</script>
