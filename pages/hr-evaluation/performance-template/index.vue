<template>
  <div class="page-container">
    <Header />
    <div class="flex-container">
      <div class="w-40p">
        <TemplateList />
      </div>
      <div class="w-60p">
        <TemplateEditor />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from './comp/Header.vue'
  import TemplateList from './comp/TemplateList.vue'
  import TemplateEditor from './comp/TemplateEditor.vue'
</script>

<style scoped>
  .page-container {
    padding: 20px;
  }

  .flex-container {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .w-40p {
    width: 40%;
  }
  .w-60p {
    width: 60%;
  }
</style>
