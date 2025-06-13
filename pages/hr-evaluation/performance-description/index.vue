<template>
  <div class="page-container">
    <PageHeader />

    <div class="page-content flex flex-col">
      <div class="page-content-header flex justify-between items-center w-full">
        <div class="left-actions">
          <UiButton variant="secondary-line" size="medium">
            피드백
            <i class="icon-md icon-feedback"></i>
          </UiButton>
        </div>
        <div class="right-actions">
          <div class="button-group">
            <UiButton variant="secondary-line" size="medium">
              성과기술서내용 가져오기
              <i class="icon-md icon-import"></i>
            </UiButton>
            <UiButton variant="secondary-line" size="medium">
              PDF 다운로드
              <i class="icon-md icon-download"></i>
            </UiButton>
            <UiButton variant="secondary-line" size="medium">
              첨부파일
              <i class="icon-md icon-excel"></i>
            </UiButton>
            <UiButton variant="secondary-line" size="medium">
              양식 가져오기
              <i class="icon-md icon-template"></i>
            </UiButton>
            <UiButton variant="primary" size="medium">
              저장
              <i class="icon-md icon-save icon-white"></i>
            </UiButton>
          </div>
        </div>
      </div>

      <div class="page-content-body">
        <TinyEditor :height="'calc(100vh - 250px)'" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import TinyEditor from '~/components/common/UI/TinyEditor.vue'
</script>
