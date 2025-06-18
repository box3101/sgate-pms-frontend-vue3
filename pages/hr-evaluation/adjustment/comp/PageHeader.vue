<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group flex items-center">
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
          <span class="select-label">평가군</span>
          <UiSelect
            v-model="selectedEvalGroup"
            :options="evalGroupOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="select-item">
          <span class="select-label">조정상태</span>
          <UiSelect
            v-model="selectedAdjustStatus"
            :options="adjustStatusOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="notification-text text-green-500 ml-4">
          "이크파크-영업" 평가군의 평가종합 산출이 확정 되었습니다.
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiButton variant="secondary-line" size="medium">
          평가군별 엑셀다운로드(관리자)
          <i class="icon-md icon-excel"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>
