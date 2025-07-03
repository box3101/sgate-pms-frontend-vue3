<template>
  <UiModal title="보고서 설정" v-model="isOpen" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleCreateReport">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서생성</span>
      </UiButton>
    </template>

    <UiFormLayout>
      <!-- 보고서명 설정 -->
      <UiFormItem label="보고서명">
        <div class="flex gap-10 items-center">
          <UiSelect
            class="w-200"
            v-model="localConfigData.reportType"
            placeholder="일간보고"
            :options="reportTypeOptions"
          />
          <UiDatePicker class="w-170" v-model="localConfigData.reportDate" />
        </div>
      </UiFormItem>

      <!-- 표시할 내용 설정 -->
      <UiFormItem label="표시할내용">
        <div class="flex flex-col gap-5">
          <!-- KPI 설정 -->
          <div class="flex gap-10 items-center">
            <UiCheckbox
              class="w-60"
              v-model="localConfigData.includeKPI"
              size="large"
              label="KPI"
            />
            <UiSelect
              class="w-150"
              v-model="localConfigData.kpiYear"
              placeholder="2025"
              :options="yearOptions"
            />
          </div>
          <!-- OKR 설정 -->
          <div class="flex gap-10 items-center">
            <UiCheckbox
              class="w-60"
              v-model="localConfigData.includeOKR"
              size="large"
              label="OKR"
            />
            <UiSelect
              class="w-150"
              v-model="localConfigData.okrYear"
              placeholder="2025"
              :options="yearOptions"
            />
            <UiSelect
              class="w-150"
              v-model="localConfigData.okrQuarter"
              placeholder="1분기"
              :options="quarterOptions"
            />
          </div>
        </div>
      </UiFormItem>

      <!-- 실적 작성 방법 설정 -->
      <UiFormItem label="실적작성방법">
        <div class="flex flex-col gap-5">
          <!-- 활동 방식 선택 -->
          <div class="flex gap-10 items-center">
            <UiRadio
              v-model="localConfigData.achievementInputMethod"
              value="activity"
              name="achievementMethod"
              label="활동"
            />
            <div class="flex gap-10 is-border">
              <UiRadio
                v-model="localConfigData.activityDateType"
                value="activity"
                name="activityDate"
                label="활동일"
              />
              <UiRadio
                v-model="localConfigData.activityDateType"
                value="created"
                name="activityDate"
                label="작성일"
              />
            </div>
            <div class="is-border">
              <UiCheckbox
                v-model="localConfigData.includeMyActivityOnly"
                label="나의 활동만 가져오기"
              />
            </div>
            <div class="is-border">
              <UiCheckbox
                v-model="localConfigData.includeFeedbackInActivity"
                label="피드백도 포함해서 가져오기"
              />
            </div>
          </div>
          <!-- 직접 입력 방식 -->
          <UiRadio
            v-model="localConfigData.achievementInputMethod"
            value="manual"
            name="achievementMethod"
            label="직접입력"
          />
        </div>
      </UiFormItem>

      <!-- 프로젝트 실적 작성 방법 설정 -->
      <UiFormItem label="Project 실적작성방법">
        <div class="flex flex-col gap-5">
          <!-- 프로젝트 활동 방식 -->
          <div class="flex gap-10 items-center">
            <UiRadio
              v-model="localConfigData.projectInputMethod"
              value="activity"
              name="projectMethod"
              label="활동"
            />
            <div class="flex gap-10 is-border">
              <UiRadio
                v-model="localConfigData.projectDateType"
                value="activity"
                name="projectDate"
                label="활동일"
              />
              <UiRadio
                v-model="localConfigData.projectDateType"
                value="created"
                name="projectDate"
                label="작성일"
              />
            </div>
            <div class="is-border">
              <UiCheckbox
                v-model="localConfigData.includeMyProjectOnly"
                label="나의 활동만 가져오기"
              />
            </div>
            <div class="is-border">
              <UiCheckbox
                v-model="localConfigData.includeFeedbackInProject"
                label="피드백도 포함해서 가져오기"
              />
            </div>
          </div>
          <!-- 프로젝트 직접 입력 방식 -->
          <UiRadio
            v-model="localConfigData.projectInputMethod"
            value="manual"
            name="projectMethod"
            label="직접입력"
          />
        </div>
      </UiFormItem>
    </UiFormLayout>
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
    configData: {
      type: Object,
      required: true
    }
  })

  // Emits
  const emit = defineEmits(['update:modelValue', 'create-report'])

  // v-model 처리
  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })

  // 로컬 설정 데이터 (props와 동기화)
  const localConfigData = ref({ ...props.configData })

  // 셀렉트 박스 옵션들
  const reportTypeOptions = ref([
    { value: '일간보고', label: '일간보고' },
    { value: '주간보고', label: '주간보고' }
  ])

  const yearOptions = ref([
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' }
  ])

  const quarterOptions = ref([
    { value: '1분기', label: '1분기' },
    { value: '2분기', label: '2분기' },
    { value: '3분기', label: '3분기' },
    { value: '4분기', label: '4분기' }
  ])

  // 보고서 생성 핸들러
  const handleCreateReport = () => {
    emit('create-report', localConfigData.value)
  }

  // props 변경 감지하여 로컬 데이터 동기화
  watch(
    () => props.configData,
    newData => {
      localConfigData.value = { ...newData }
    },
    { deep: true }
  )
</script>

<style lang="scss" scoped>
  // 보고서 설정 모달 스타일링
  .is-border {
    // 구분선이 있는 그룹 스타일링
    padding: 8px 12px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 4px;
    background: var(--color-gray-5, #f4f5f6);
  }

  // 폼 레이아웃 커스터마이징
  :deep(.UiFormItem) {
    margin-bottom: 24px;

    .flex {
      flex-wrap: wrap;

      &.flex-col {
        flex-wrap: nowrap;
      }
    }
  }

  // 체크박스와 라디오 버튼 간격 조정
  :deep(.UiCheckbox),
  :deep(.UiRadio) {
    margin-right: 8px;
  }

  // 반응형 미디어 쿼리
  @media (max-width: 768px) {
    .flex {
      // 모바일에서 세로 배치
      flex-direction: column !important;
      gap: 8px !important;

      .w-150,
      .w-60 {
        width: 100% !important;
      }
    }

    .is-border {
      margin-top: 8px;
    }
  }
</style>
