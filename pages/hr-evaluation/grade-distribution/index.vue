<template>
  <div class="grade-distribution-page container-large">
    <!-- 헤더 영역 -->
    <div class="page-header">
      <div class="header-left">
        <div class="select-group">
          <div class="select-item">
            <span class="select-label">기준년도</span>
            <UiSelect
              v-model="selectedYear"
              :options="yearOptions"
              size="medium"
              placeholder="선택"
              width="150px"
            />
          </div>
          <div class="select-item">
            <span class="select-label">등급배분그룹</span>
            <UiSelect
              v-model="selectedGroup"
              :options="groupOptions"
              size="medium"
              placeholder="선택"
              width="150px"
            />
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiTooltip title="등급배분표 그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                등급배분표 그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 등급배분표 그룹 중 하나를 선택하여 복사합니다.</p>
          </UiTooltip>
          <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
            전년도 데이터 복사
            <i class="icon-md icon-copy icon-primary"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 콘텐츠 영역 -->
    <div class="page-content">
      <!-- 왼쪽 섹션 - 등급 관리 -->
      <div class="content-section left-section">
        <div class="section-header">
          <h3 class="heading-4">등급관리</h3>
          <div class="section-actions">
            <UiButton variant="primary-line" size="small">
              <span class="button-text">등급배분표 기준등급추가</span>
              <i class="icon-md icon-plus icon-primary"></i>
            </UiButton>

            <UiCheckbox v-model="basicCheckbox" label="구간대 설정" />

            <UiButton variant="primary" size="small">
              <span class="button-text">저장</span>
            </UiButton>
          </div>
        </div>
        <div class="section-content">
          <UiTable striped hover size="medium">
            <template #header>
              <tr>
                <th>등급</th>
                <th>이상</th>
                <th>미만</th>
                <th>환산점수</th>
                <th>관리</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="(grade, index) in grades" :key="index">
                <td class="text-center">{{ grade.name }}</td>
                <td class="text-center">{{ grade.min }}</td>
                <td class="text-center">{{ grade.max }}</td>
                <td class="text-center">{{ grade.score }}</td>
                <td class="text-center">
                  <div class="action-buttons">
                    <UiButton size="small" variant="ghost" icon-only>
                      <i class="icon-md icon-pencil icon-black"></i>
                    </UiButton>
                    <UiButton size="small" variant="ghost" icon-only>
                      <i class="icon-md icon-delete icon-black"></i>
                    </UiButton>
                  </div>
                </td>
              </tr>
            </template>
          </UiTable>
        </div>
      </div>

      <!-- 오른쪽 섹션 - 배분표 관리 -->
      <div class="content-section right-section">
        <div class="section-header">
          <h3 class="heading-4">배분표 관리</h3>
          <div class="section-actions">
            <UiButton variant="secondary-line">
              <span class="button-text">엑셀 양식 다운로드</span>
              <i class="icon-sm icon-excel"></i>
            </UiButton>
            <UiButton variant="secondary-line">
              <span class="button-text">엑셀 업로드</span>
              <i class="icon-sm icon-excel"></i>
            </UiButton>
          </div>
        </div>
        <div class="section-content">
          <UiTable hover size="medium" scrollable :max-height="'500px'">
            <template #header>
              <tr>
                <th>명수</th>
                <th>S</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="(distribution, index) in distributions" :key="index">
                <td class="text-center">{{ distribution.count }}</td>
                <td class="text-center">{{ distribution.S }}</td>
                <td class="text-center">{{ distribution.A }}</td>
                <td class="text-center">{{ distribution.B }}</td>
                <td class="text-center">{{ distribution.C }}</td>
                <td class="text-center">{{ distribution.D }}</td>
              </tr>
            </template>
          </UiTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 등급 배분 페이지
   *
   * 기준년도와 등급배분그룹을 선택하고 등급 관리 및 배분표 관리를 할 수 있는 페이지입니다.
   * 왼쪽에는 등급 관리 테이블, 오른쪽에는 배분표 관리 테이블이 표시됩니다.
   */

  import { ref } from 'vue'

  // 기준년도 선택 옵션
  const yearOptions = [
    { value: '2023', label: '2023년' },
    { value: '2024', label: '2024년' },
    { value: '2025', label: '2025년' }
  ]

  // 등급배분그룹 선택 옵션
  const groupOptions = [
    { value: '2023', label: '2023년' },
    { value: '2024', label: '2024년' },
    { value: '2025', label: '2025년' }
  ]

  // 선택된 값
  const selectedYear = ref('2025')
  const selectedGroup = ref('2025')

  // 등급 데이터
  const grades = ref([
    { name: 'S', min: 95, max: 100, score: 100 },
    { name: 'A', min: 85, max: 95, score: 90 },
    { name: 'B', min: 75, max: 85, score: 80 },
    { name: 'C', min: 65, max: 75, score: 70 },
    { name: 'D', min: 0, max: 65, score: 60 }
  ])

  // 배분표 데이터
  const distributions = ref(
    Array.from({ length: 30 }, (_, i) => {
      const count = (i + 1) * 5
      return {
        count: count,
        S: Math.max(1, Math.floor(count * 0.1)),
        A: Math.max(1, Math.floor(count * 0.2)),
        B: Math.max(2, Math.floor(count * 0.4)),
        C: Math.max(1, Math.floor(count * 0.2)),
        D: Math.max(1, Math.floor(count * 0.1))
      }
    })
  )

  // 체크박스 상태
  const basicCheckbox = ref(false)

  // 기준등급 추가 함수
  const addGrade = () => {}

  // 등급 수정 함수
  const editGrade = index => {}

  // 등급 삭제 함수
  const deleteGrade = index => {}
</script>
