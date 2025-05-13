<template>
  <div class="performance-items-container container-large">
    <div class="performance-items-content">
      <!-- 헤더 영역 -->
      <div class="performance-items-header page-header flex justify-between items-center">
        <div class="header-left flex items-center gap-5">
          <label class="year-label">기준년도</label>
          <UiSelect v-model="selectedYear" :options="yearOptions" style="width: 120px" />
        </div>
        <div class="header-right flex items-center gap-5">
          <UiTooltip title="평가항목그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                평가항목그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 평가항목그룹 중 하나를 선택하여 복사합니다.</p>
          </UiTooltip>
          <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
            전년도 데이터 복사
            <i class="icon-md icon-copy icon-primary"></i>
          </UiButton>
        </div>
      </div>

      <div class="performance-items-layout">
        <!-- 왼쪽 영역 - 평가항목 그룹 -->
        <div class="evaluation-group-container">
          <div class="section-header flex items-center justify-between">
            <h2 class="heading-4">평가항목 그룹</h2>
            <div class="button-group flex items-center gap-5">
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-plus"></i>
              </UiButton>
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-delete"></i>
              </UiButton>
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-sort"></i>
              </UiButton>
              <UiButton type="button" variant="primary">저장</UiButton>
            </div>
          </div>
          <div class="section-body">
            <UiTable>
              <template #header>
                <tr>
                  <th style="width: 40px">
                    <UiCheckbox
                      v-model="allEvaluationGroupsSelected"
                      @update:modelValue="toggleAllEvaluationGroups"
                      size="large"
                    />
                  </th>
                  <th>평가항목</th>
                  <th>문항수</th>
                </tr>
              </template>
              <template #body>
                <tr
                  v-for="(item, index) in evaluationGroups"
                  :key="index"
                  @click="selectEvaluationGroup(item)"
                  :class="{
                    selected: selectedEvaluationGroup && selectedEvaluationGroup.id === item.id
                  }"
                >
                  <td>
                    <UiCheckbox
                      v-model="item.selected"
                      @update:modelValue="toggleEvaluationGroup(item)"
                      size="large"
                      @click.stop
                    />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="item.name" size="large" :clearable="true" @click.stop />
                  </td>
                  <td class="grade-count text-center" @click.stop="selectEvaluationGroup(item)">
                    {{ item.questionCount }}
                  </td>
                </tr>
              </template>
            </UiTable>
          </div>
        </div>

        <!-- 오른쪽 영역 - 배분표 관리 -->
        <div class="distribution-container" v-if="selectedEvaluationGroup">
          <div class="section-header flex items-center justify-between">
            <h2>배분표 관리</h2>
            <div class="button-group flex items-center gap-5">
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-plus"></i>
              </UiButton>
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-delete"></i>
              </UiButton>
              <UiButton type="button" variant="secondary-line" icon-only>
                <i class="icon-md icon-sort"></i>
              </UiButton>
              <UiButton type="button" variant="primary">저장</UiButton>
            </div>
          </div>
          <div class="section-body">
            <UiTable>
              <template #colgroup>
                <col style="width: 40px" />
                <col />
                <col style="width: 100px" />
                <col style="width: 100px" />
              </template>
              <template #header>
                <tr>
                  <th>
                    <UiCheckbox
                      v-model="allDistributionItemsSelected"
                      @update:modelValue="toggleAllDistributionItems"
                      size="large"
                    />
                  </th>
                  <th>평가항목</th>
                  <th>배점</th>
                  <th>평가척도</th>
                </tr>
              </template>
              <template #body>
                <tr v-for="(item, index) in selectedEvaluationGroup.distributionItems" :key="index">
                  <td>
                    <UiCheckbox v-model="item.selected" size="large" @click.stop />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="item.name" size="large" :clearable="true" @click.stop />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="item.score" size="large" type="number" @click.stop />
                  </td>
                  <td class="text-center">
                    <div class="grade-scale" @click.stop="openGradeScaleModal(item)">
                      {{ item.gradeScaleDisplay }}
                    </div>
                  </td>
                </tr>
              </template>
            </UiTable>
          </div>
        </div>

        <!-- 오른쪽 영역 - 선택된 항목이 없을 때 -->
        <div class="distribution-container empty" v-else>
          <div class="empty-message">
            <p>왼쪽에서 평가항목 그룹을 선택하면<br />상세 정보가 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 평가척도 선택 모달 -->
    <UiModal v-model="showGradeScaleModal" title="평가척도 선택" width="500px">
      <div class="grade-scale-options">
        <div
          v-for="(option, index) in gradeScaleOptions"
          :key="index"
          class="grade-scale-option"
          :class="{ selected: selectedGradeScale && selectedGradeScale.value === option.value }"
          @click="selectGradeScale(option)"
        >
          {{ option.display }}
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UiButton variant="secondary-line" @click="showGradeScaleModal = false">취소</UiButton>
          <UiButton variant="primary" @click="confirmGradeScale">확인</UiButton>
        </div>
      </template>
    </UiModal>
  </div>
</template>

<script setup>
  import { inject, ref, computed } from 'vue'
  import UiTable from '~/components/UI/UiTable.vue'
  import UiInput from '~/components/UI/UiInput.vue'
  import UiSelect from '~/components/UI/UiSelect.vue'
  import UiButton from '~/components/UI/UiButton.vue'
  import UiCheckbox from '~/components/UI/UiCheckbox.vue'
  import UiModal from '~/components/UI/UiModal.vue'
  import UiTooltip from '~/components/UI/UiTooltip.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '성과평가항목관리'

  // 연도 옵션 데이터
  const currentYear = 2025
  const yearOptions = ref([
    { value: currentYear.toString(), label: `${currentYear}년` },
    { value: (currentYear - 1).toString(), label: `${currentYear - 1}년` },
    { value: (currentYear - 2).toString(), label: `${currentYear - 2}년` },
    { value: (currentYear - 3).toString(), label: `${currentYear - 3}년` },
    { value: (currentYear - 4).toString(), label: `${currentYear - 4}년` }
  ])

  // 선택된 연도
  const selectedYear = ref(currentYear.toString())

  // 평가항목 그룹 데이터
  const evaluationGroups = ref([
    {
      id: 1,
      name: '핵심성과지표',
      questionCount: 3,
      selected: false,
      distributionItems: [
        {
          id: 1,
          name: 'KPI 달성률',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 2,
          name: '업무 수행능력',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 3,
          name: '업무 기여도',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        }
      ]
    },
    {
      id: 2,
      name: '역량평가',
      questionCount: 5,
      selected: false,
      distributionItems: [
        {
          id: 1,
          name: '리더십',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 2,
          name: '커뮤니케이션',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 3,
          name: '문제해결능력',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 4,
          name: '협업능력',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 5,
          name: '전문성',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        }
      ]
    },
    {
      id: 3,
      name: '목표달성도',
      questionCount: 2,
      selected: false,
      distributionItems: [
        {
          id: 1,
          name: '개인목표',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        },
        {
          id: 2,
          name: '팀목표',
          score: 25,
          gradeScale: 'S,A,B,C,D',
          gradeScaleDisplay: 'S(100),A(90),B(80),C(70),D(60)',
          selected: false
        }
      ]
    }
  ])

  // 선택된 평가항목 그룹
  const selectedEvaluationGroup = ref(null)

  // 전체 평가항목 그룹 선택 상태
  const allEvaluationGroupsSelected = computed({
    get: () => {
      return (
        evaluationGroups.value.length > 0 && evaluationGroups.value.every(item => item.selected)
      )
    },
    set: value => {
      evaluationGroups.value.forEach(item => {
        item.selected = value
      })
    }
  })

  // 전체 배분표 항목 선택 상태
  const allDistributionItemsSelected = computed({
    get: () => {
      if (!selectedEvaluationGroup.value) return false
      return (
        selectedEvaluationGroup.value.distributionItems.length > 0 &&
        selectedEvaluationGroup.value.distributionItems.every(item => item.selected)
      )
    },
    set: value => {
      if (!selectedEvaluationGroup.value) return
      selectedEvaluationGroup.value.distributionItems.forEach(item => {
        item.selected = value
      })
    }
  })

  // 평가항목 그룹 선택 함수
  const selectEvaluationGroup = group => {
    selectedEvaluationGroup.value = group
  }

  // 평가항목 그룹 토글 함수
  const toggleEvaluationGroup = group => {
    // 체크박스 클릭 이벤트 처리
  }

  // 전체 평가항목 그룹 토글 함수
  const toggleAllEvaluationGroups = () => {
    // 전체 체크박스 클릭 이벤트 처리
  }

  // 전체 배분표 항목 토글 함수
  const toggleAllDistributionItems = () => {
    // 전체 체크박스 클릭 이벤트 처리
  }

  // 평가척도 모달 관련
  const showGradeScaleModal = ref(false)
  const currentEditingItem = ref(null)
  const gradeScaleOptions = ref([
    { value: 'S,A,B,C,D', display: 'S(100),A(90),B(80),C(70),D(60)' },
    { value: 'A,B,C,D,E', display: 'A(100),B(80),C(60),D(40),E(20)' },
    { value: '5,4,3,2,1', display: '5(100),4(80),3(60),2(40),1(20)' }
  ])
  const selectedGradeScale = ref(null)

  // 평가척도 모달 열기
  const openGradeScaleModal = item => {
    currentEditingItem.value = item
    selectedGradeScale.value =
      gradeScaleOptions.value.find(option => option.value === item.gradeScale) || null
    showGradeScaleModal.value = true
  }

  // 평가척도 선택
  const selectGradeScale = option => {
    selectedGradeScale.value = option
  }

  // 평가척도 선택 확인
  const confirmGradeScale = () => {
    if (currentEditingItem.value && selectedGradeScale.value) {
      currentEditingItem.value.gradeScale = selectedGradeScale.value.value
      currentEditingItem.value.gradeScaleDisplay = selectedGradeScale.value.display
    }
    showGradeScaleModal.value = false
  }
</script>
