<template>
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
          <UiSelect
            v-model="selectedTeam"
            :options="teamOptions"
            size="medium"
            placeholder="팀 선택"
            width="150px"
          />
        </div>
        <div class="select-item">
          <UiSelect
            v-model="selectedPosition"
            :options="positionOptions"
            size="medium"
            placeholder="직위"
            width="150px"
          />
        </div>
        <div class="select-item">
          <UiSelect
            v-model="selectedRank"
            :options="rankOptions"
            size="medium"
            placeholder="직급"
            width="150px"
          />
        </div>
        <div class="select-item">
          <UiSelect
            v-model="selectedJob"
            :options="jobOptions"
            size="medium"
            placeholder="직무"
            width="150px"
          />
        </div>
        <div class="select-item">
          <UiSelect
            v-model="selectedEmployee"
            :options="employeeOptions"
            size="medium"
            placeholder="직원"
            width="150px"
          />
        </div>
      </div>
    </div>
    <div class="header-right">
      <UiButton type="button" icon-only variant="primary" size="medium" class="mr-2">
        <i class="icon-md icon-search icon-white"></i>
      </UiButton>
    </div>
  </div>
</template>
<script setup>
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const teamOptions = ref([
    { value: '팀1', label: '팀1' },
    { value: '팀2', label: '팀2' }
  ])

  const positionOptions = ref([
    { value: '직위1', label: '직위1' },
    { value: '직위2', label: '직위2' }
  ])

  const rankOptions = ref([
    { value: '직급1', label: '직급1' },
    { value: '직급2', label: '직급2' }
  ])

  const jobOptions = ref([
    { value: '직무1', label: '직무1' },
    { value: '직무2', label: '직무2' }
  ])

  const employeeOptions = ref([
    { value: '직원1', label: '직원1' },
    { value: '직원2', label: '직원2' }
  ])
</script>
