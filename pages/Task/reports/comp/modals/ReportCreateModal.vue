<template>
  <UiModal title="보고서 작성" v-model="isOpen" :size="'xlarge'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleSubmitReport">제출</UiButton>
    </template>

    <UiFormLayout>
      <!-- 보고서 작성 헤더 -->
      <UiFormItem label="">
        <div class="flex gap-5 items-center com-header">
          <!-- 사용자 정보 -->
          <div class="user-label gap-5">
            <i class="icon icon-md icon-user"></i>
            <div class="user-name">{{ localCreateData.currentUserName }}</div>
          </div>

          <!-- 보고서 정보 -->
          <div>
            <ul class="daily-report">
              <li>{{ localCreateData.reportType }}</li>
              <li>{{ localCreateData.reportDate }} 제출</li>
            </ul>
          </div>

          <!-- 제출 대상 선택 -->
          <div class="submit-target flex gap-5 items-center">
            <span class="label">제출대상:</span>
            <UiMultiSelect
              class="w-400"
              v-model="localCreateData.submitTargets"
              placeholder="협업자 이름을 입력해주세요"
              :options="collaboratorOptions"
            />
          </div>

          <!-- 액션 버튼들 -->
          <UiButton variant="secondary" @click="handleOpenAiSummary">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>

          <UiButton variant="secondary">직접입력</UiButton>
          <UiButton variant="secondary">활동재생성</UiButton>
          <UiButton variant="secondary" @click="handleOpenActivityModal">업무 활동 추가</UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>

    <!-- 실적/계획 입력 테이블 -->
    <UiTable v-model="createReportData" scrollable striped bordered maxHeight="calc(100vh - 220px)">
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
            <div class="p-3">
              <UiTextarea
                v-model="localCreateData.weeklyAchievementInput"
                placeholder="금주 실적을 입력하세요"
                :rows="10"
              />
            </div>
          </td>
          <td>
            <div class="p-3">
              <UiTextarea
                v-model="localCreateData.nextWeekPlanInput"
                placeholder="차주 계획을 입력하세요"
                :rows="10"
              />
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 의견/기타 입력 -->
    <UiTable
      class="mt-20"
      title="의견/기타"
      v-model="createMiscData"
      layout="horizontal"
      striped
      bordered
    >
      <template #body>
        <tr>
          <th>의견/기타</th>
          <td>
            <UiTextarea
              v-model="localCreateData.miscInput"
              :rows="5"
              placeholder="의견이나 기타 사항을 입력하세요"
            />
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 첨부파일 업로드 -->
    <UiTable class="mt-20" title="첨부파일" layout="horizontal" striped bordered>
      <template #body>
        <tr>
          <th>첨부파일</th>
          <td>
            <UiAttachment v-model="localCreateData.uploadedFiles" :initialOpen="true" />
          </td>
        </tr>
      </template>
    </UiTable>
  </UiModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  createData: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit-report', 'open-activity-modal', 'open-ai-summary'])

// v-model 처리
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 로컬 생성 데이터
const localCreateData = ref({ ...props.createData })

// 테이블 데이터
const createReportData = ref([])
const createMiscData = ref([])

// 협업자 옵션
const collaboratorOptions = ref([
  { value: 'user1', label: '형광민[기업]' },
  { value: 'user2', label: '땡땡땡[기업]' }
])

// 이벤트 핸들러
const handleSubmitReport = () => {
  emit('submit-report', localCreateData.value)
}

const handleOpenActivityModal = () => {
  emit('open-activity-modal')
}

const handleOpenAiSummary = () => {
  emit('open-ai-summary')
}

// props 변경 감지
watch(() => props.createData, (newData) => {
  localCreateData.value = { ...newData }
}, { deep: true })
</script>

<style lang="scss" scoped>
// 보고서 작성 모달 스타일링
.com-header {
  // 헤더 영역 스타일링
  background: var(--color-gray-5, #f4f5f6);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  .user-label {
    // 사용자 정보 영역
    display: flex;
    align-items: center;
    gap: 8px;
    
    .user-name {
      font-weight: 700;
      color: var(--color-gray-90, #1a1a1a);
    }
  }
  
  .daily-report {
    // 보고서 정보 영역
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      font-weight: 600;
      color: var(--color-gray-70, #464c53);
      margin-bottom: 4px;
    }
  }
  
  .submit-target {
    // 제출 대상 영역
    .label {
      font-weight: 600;
      color: var(--color-gray-70, #464c53);
      white-space: nowrap;
    }
  }
}

// 테이블 내용 스타일링
:deep(.p-3) {
  padding: 12px;
  
  .UiTextarea {
    width: 100%;
    border: none;
    resize: vertical;
    
    &:focus {
      outline: 2px solid var(--color-primary-50, #0066cc);
      outline-offset: 2px;
    }
  }
}

// 첨부파일 영역 스타일링
:deep(.UiAttachment) {
  width: 100%;
}

// 반응형 미디어 쿼리
@media (max-width: 1024px) {
  .com-header {
    // 태블릿에서 세로 배치
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px !important;
    
    .flex {
      width: 100%;
      justify-content: flex-start;
    }
    
    .w-400 {
      width: 100% !important;
    }
  }
}

@media (max-width: 768px) {
  .com-header {
    // 모바일에서 간격 조정
    padding: 12px;
    
    .user-label,
    .daily-report,
    .submit-target {
      width: 100%;
    }
    
    // 버튼들 세로 배치
    .UiButton {
      width: 100%;
      margin-top: 8px;
    }
  }
}
</style>
