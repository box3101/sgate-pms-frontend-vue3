<template>
  <div class="flex gap-10 h-100p">
    <div class="w-30p py-10 px-10" style="border: 1px solid #aaa">
      <!-- 왼쪽 콘텐츠 영역 -->
      <div class="header flex gap-10 items-center">
        <h2 class="text-xl font-semibold mb-4">나의 보드</h2>
        <div>
          <UiButton
            @click="isFilterModalOpen = true"
            variant="tertiary"
            icon-only
            title="필터"
          >
            <Icon name="heroicons:magnifying-glass" size="20" />
          </UiButton>
          <UiFilterModal
            v-model="isFilterModalOpen"
            title="나의 필터"
            size="small"
            :show-footer="true"
          >
            <UiMultiSelect
              v-model="selectedDepartments"
              :options="departmentOptions"
              placeholder="부서를 선택해주세요."
            />

            <div class="selected-departments">
              <p>선택된 부서: {{ selectedDepartments.join(", ") }}</p>
            </div>
            <template #footerActions>
              <UiButton variant="tertiary" @click="isFilterModalOpen = false"
                >닫기</UiButton
              >
              <UiButton variant="primary" @click="isFilterModalOpen = false"
                >저장</UiButton
              >
            </template>
          </UiFilterModal>
        </div>
      </div>
    </div>
    <div class="w-70p py-10 px-10" style="border: 1px solid #aaa">
      34
      <!-- 오른쪽 콘텐츠 영역 -->
    </div>
  </div>
</template>

<script setup>
// 필터 모달
const isFilterModalOpen = ref(false);

// 선택된 부서
const selectedDepartments = ref([]);

// 부서 옵션
const departmentOptions = [
  { value: '생산', label: '생산' },
  { value: '마케팅', label: '마케팅' },
  { value: '인사', label: '인사' },
  { value: '제조공장', label: '제조공장' },
];
</script>

<style scoped>
.selected-departments {
  margin-top: 10px;
  font-size: $font-size-sm;
  color: #999;
}

</style>

