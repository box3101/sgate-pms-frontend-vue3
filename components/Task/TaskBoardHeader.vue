<template>
  <header class="task-board-header">
    <section class="flex justify-between">
      <article class="flex gap-100">
        <div class="flex gap-5">
          <UiSearchableSelect placeholder="업무 보드명입니다" class="w-200" />
          <UiButton variant="tertiary" icon="heroicons:plus">
            보드 추가</UiButton
          >
          <UiButton variant="tertiary" iconOnly>
            <Icon name="heroicons:minus" size="24" />
          </UiButton>
          <UiButton variant="white" iconOnly>
            <Icon name="heroicons:pencil" size="24" />
          </UiButton>
          <UiButton variant="danger"> 카테고리 추가 </UiButton>
        </div>
        <div class="flex gap-5">
          <UiButton
            variant="tertiary"
            icon="heroicons:plus"
            @click="openImportantTaskModal"
            >검색필터</UiButton
          >
          <UiFilterModal :isOpen="isFilterModalOpen" title="검색 필터 열기">
            <!-- 필터 내용을 여기에 추가 -->
            <UiFormLayout>
              <UiFormItem class="mb-1" label="카테고리">
                <UiSelect size="small" placeholder="카테고리 선택" />
              </UiFormItem>
              <UiFormItem class="mb-1" label="실행기간">
                <UiDatePicker v-model="dateRange" isRange size="small" />
              </UiFormItem>
              <!-- 추가 항목 -->
            </UiFormLayout>
          </UiFilterModal>
          <UiButton variant="tertiary" icon="heroicons:plus">중요업무</UiButton>
        </div>
      </article>
      <article class="flex gap-5">
        <UiButton variant="tertiary" icon="heroicons:plus">협업</UiButton>
        <UiButton variant="tertiary" icon="heroicons:plus">공유</UiButton>
        <UiButton variant="tertiary" icon="heroicons:plus">전달</UiButton>
      </article>
    </section>
  </header>
</template>

<script setup>
import UiSearchableSelect from "~/components/UI/UiSearchableSelect.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiFormLayout from "~/components/UI/UiFormLayout.vue";
import UiFormItem from "~/components/UI/UiFormItem.vue";

const isImportantTaskModalOpen = ref(false);

function openImportantTaskModal() {
  isImportantTaskModalOpen.value = true;
}
</script>

<style scoped>
.task-board-header {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
