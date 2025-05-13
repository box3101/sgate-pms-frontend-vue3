<template>
  <div class="basic-items-container container-large">
    <div class="basic-items-content">
      <!-- 헤더 영역 -->
      <div class="basic-items-header page-header flex justify-between items-center">
        <div class="header-left flex items-center gap-5">
          <label class="year-label">기준년도</label>
          <UiSelect v-model="selectedYear" :options="yearOptions" style="width: 120px" />
        </div>
        <div class="header-right flex items-center gap-5">
          <UiTooltip title="등급척도그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                등급척도그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 등급척도그룹 중 하나를 선택하여 복사합니다.</p>
          </UiTooltip>
          <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
            전년도 데이터 복사
            <i class="icon-md icon-copy icon-primary"></i>
          </UiButton>
        </div>
      </div>

      <div class="basic-items-layout">
        <div class="scale-group-container">
          <div class="section-header flex items-center justify-between">
            <h2 class="heading-4">등급척도 그룹</h2>
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
                      v-model="allScaleGroupsSelected"
                      @update:modelValue="toggleAllScaleGroups"
                      size="large"
                    />
                  </th>
                  <th>등급척도</th>
                  <th>평가등급수</th>
                </tr>
              </template>
              <template #body>
                <tr
                  v-for="(item, index) in scaleGroups"
                  :key="index"
                  @click="selectScaleGroup(item)"
                  :class="{ selected: selectedScaleGroup && selectedScaleGroup.id === item.id }"
                >
                  <td>
                    <UiCheckbox
                      v-model="item.selected"
                      @update:modelValue="toggleScaleGroup(item)"
                      size="large"
                      @click.stop
                    />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="item.name" size="large" :clearable="true" @click.stop />
                  </td>
                  <td class="grade-count text-center" @click.stop="selectScaleGroup(item)">
                    {{ item.gradeCount }}
                  </td>
                </tr>
              </template>
            </UiTable>
          </div>
        </div>

        <div class="scale-detail-container" v-if="selectedScaleGroup">
          <div class="section-header flex items-center justify-between">
            <h2>평가등급 지정</h2>
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
              </template>
              <template #header>
                <tr>
                  <th>
                    <UiCheckbox
                      v-model="allScaleDetailsSelected"
                      @update:modelValue="toggleAllScaleDetails"
                      size="large"
                    />
                  </th>
                  <th>등급척도</th>
                  <th>평가등급점수</th>
                </tr>
              </template>
              <template #body>
                <tr v-for="(detail, index) in selectedScaleGroup.details" :key="index">
                  <td>
                    <UiCheckbox v-model="detail.selected" size="large" @click.stop />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="detail.name" size="large" :clearable="true" @click.stop />
                  </td>
                  <td class="text-center">
                    <UiInput v-model="detail.score" size="large" type="number" @click.stop />
                  </td>
                </tr>
              </template>
            </UiTable>
          </div>
        </div>

        <!-- 오른쪽 영역 - 선택된 항목이 없을 때 -->
        <div class="scale-detail-container empty" v-else>
          <div class="empty-message">
            <p>왼쪽에서 등급척도 그룹을 선택하면<br />상세 정보가 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, computed } from 'vue'
  import UiTable from '~/components/UI/UiTable.vue'
  import UiInput from '~/components/UI/UiInput.vue'
  import UiSelect from '~/components/UI/UiSelect.vue'
  import UiButton from '~/components/UI/UiButton.vue'
  import UiCheckbox from '~/components/UI/UiCheckbox.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '평가기본항목관리'

  // 연도 옵션 데이터
  const currentYear = new Date().getFullYear()
  const yearOptions = ref([
    { value: currentYear.toString(), label: `${currentYear}년` },
    { value: (currentYear - 1).toString(), label: `${currentYear - 1}년` },
    { value: (currentYear - 2).toString(), label: `${currentYear - 2}년` },
    { value: (currentYear - 3).toString(), label: `${currentYear - 3}년` },
    { value: (currentYear - 4).toString(), label: `${currentYear - 4}년` }
  ])

  // 선택된 연도
  const selectedYear = ref(currentYear.toString())

  // 등급척도 그룹 데이터
  const scaleGroups = ref([
    {
      id: 1,
      name: '평가등급',
      gradeCount: 5,
      selected: false,
      details: [
        { id: 1, name: 'A', score: 100, selected: false },
        { id: 2, name: 'B', score: 80, selected: false },
        { id: 3, name: 'C', score: 60, selected: false },
        { id: 4, name: 'D', score: 40, selected: false },
        { id: 5, name: 'E', score: 20, selected: false }
      ]
    },
    {
      id: 2,
      name: '평가등급',
      gradeCount: 3,
      selected: false,
      details: [
        { id: 1, name: '상', score: 100, selected: false },
        { id: 2, name: '중', score: 70, selected: false },
        { id: 3, name: '하', score: 40, selected: false }
      ]
    },
    {
      id: 3,
      name: '평가등급',
      gradeCount: 4,
      selected: false,
      details: [
        { id: 1, name: '매우우수', score: 100, selected: false },
        { id: 2, name: '우수', score: 80, selected: false },
        { id: 3, name: '보통', score: 60, selected: false },
        { id: 4, name: '미흡', score: 40, selected: false }
      ]
    }
  ])

  // 선택된 등급척도 그룹
  const selectedScaleGroup = ref(null)

  // 등급척도 그룹 선택
  const selectScaleGroup = item => {
    selectedScaleGroup.value = item
  }

  // 등급척도 그룹 체크박스 토글
  const toggleScaleGroup = item => {
    item.selected = !item.selected
  }

  // 모든 등급척도 그룹 체크박스 토글
  const toggleAllScaleGroups = newState => {
    scaleGroups.value.forEach(group => {
      group.selected = newState
    })
  }

  // 모든 등급척도 그룹이 선택되었는지 확인
  const allScaleGroupsSelected = computed(() => {
    return scaleGroups.value.length > 0 && scaleGroups.value.every(item => item.selected)
  })

  // 모든 등급척도 상세 체크박스 토글
  const toggleAllScaleDetails = newState => {
    if (!selectedScaleGroup.value) return

    selectedScaleGroup.value.details.forEach(detail => {
      detail.selected = newState
    })
  }

  // 모든 등급척도 상세가 선택되었는지 확인
  const allScaleDetailsSelected = computed(() => {
    if (!selectedScaleGroup.value || selectedScaleGroup.value.details.length === 0) return false
    return selectedScaleGroup.value.details.every(detail => detail.selected)
  })
</script>
