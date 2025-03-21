<template>
  <SearchableSelect class="w-200" />
  <UiButton @click="openModal">모달 열기</UiButton>
  <div class="ui-form">
    <div class="ui-form__content">
      <ul class="ui-form__list">
        <li class="ui-form-item">
          <div class="ui-form-item__label">카테고리</div>
          <div class="ui-form-item__content">
            <UiSelect placeholder="카테고리 선택" />
          </div>
        </li>
        <li class="ui-form-item">
          <div class="ui-form-item__label">실행기간</div>
          <div class="ui-form-item__content">
            <UiDatePicker
              v-model="dateRange"
              isRange
              label="기간 선택"
              startPlaceholder="시작일"
              endPlaceholder="종료일"
            />
          </div>
        </li>
        <li class="ui-form-item">
          <div class="ui-form-item__label">업무명</div>
          <div class="ui-form-item__content">
            <UiInput placeholder="업무명 입력" block />
          </div>
        </li>
        <li class="ui-form-item">
          <div class="ui-form-item__label">예상 결과</div>
          <div class="ui-form-item__content">
            <UiInput placeholder="예상 결과 입력" block />
          </div>
        </li>
        <li class="ui-form-item">
          <div class="ui-form-item__label">내용</div>
          <div class="ui-form-item__content">
            <UiTextarea placeholder="내용 입력" />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Modal
    v-model="isModalOpen"
    :title="modalTitle"
    @close="closeModal"
    position="right"
    noDim="true"
  >
    3
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import SearchableSelect from "~/components/UI/UiSearchableSelect.vue";
import Modal from "~/components/UI/UiModal.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiSelect from "~/components/UI/UiSelect.vue";
import UiTextarea from "~/components/UI/UiTextarea.vue";

const isModalOpen = ref(false);
const modalTitle = ref("모달 제목");

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>
