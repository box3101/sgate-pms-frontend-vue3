<template>
  <SearchableSelect class="w-200" />
  <UiButton @click="openModal">모달 열기</UiButton>

  <Modal v-model="isModalOpen" :title="modalTitle" @close="closeModal" position="right" noDim="true">
     3
   </Modal>
</template>

<script setup>
import { ref } from 'vue';
import SearchableSelect from '~/components/UI/UiSearchableSelect.vue';
import Modal from '~/components/UI/UiModal.vue';
import UiButton from '~/components/UI/UiButton.vue';

const isModalOpen = ref(false);
const modalTitle = ref('모달 제목');

function openModal() {
 isModalOpen.value = true;
}

function closeModal() {
 isModalOpen.value = false;
}

</script>