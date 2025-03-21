<template>
  <SearchableSelect class="w-200" />
  <UiButton @click="openModal">모달 열기</UiButton>
  <Modal
    v-model="isModalOpen"
    :title="modalTitle"
    @close="closeModal"
    position="right"
    noDim="true"
  >
    3
  </Modal>
  <UiFormLayout>
    <UiFormItem label="카테고리">
      <UiSelect placeholder="카테고리 선택" />
    </UiFormItem>
    <UiFormItem label="실행기간">
      <UiDatePicker v-model="dateRange" isRange />
    </UiFormItem>
    <!-- 추가 항목 -->
  </UiFormLayout>
  <UiFilterModal :isOpen="isFilterModalOpen" title="검색 필터 열기">
    <!-- 필터 내용을 여기에 추가 -->
    <UiFormLayout>
      <UiFormItem label="카테고리">
        <UiSelect placeholder="카테고리 선택" />
      </UiFormItem>
      <UiFormItem label="실행기간">
        <UiDatePicker v-model="dateRange" isRange />
      </UiFormItem>
      <!-- 추가 항목 -->
    </UiFormLayout>
  </UiFilterModal>
</template>

<script setup>
import { ref } from "vue";
import SearchableSelect from "~/components/UI/UiSearchableSelect.vue";
import Modal from "~/components/UI/UiModal.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiSelect from "~/components/UI/UiSelect.vue";
import UiTextarea from "~/components/UI/UiTextarea.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiDatePicker from "~/components/UI/UiDatePicker.vue";

const isModalOpen = ref(false);
const modalTitle = ref("모달 제목");
const isFilterModalOpen = ref(false);
const filterCategory = ref("");
const filterDateRange = ref([null, null]);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function openFilterModal() {
  isFilterModalOpen.value = true;
}

function closeFilterModal() {
  isFilterModalOpen.value = false;
}

function applyFilters() {
  // 필터 적용 로직
  console.log("필터 적용:", {
    category: filterCategory.value,
    dateRange: filterDateRange.value,
  });
  closeFilterModal();
}

function resetFilters() {
  // 필터 초기화 로직
  filterCategory.value = "";
  filterDateRange.value = [null, null];
}
</script>
