<template>
  <div class="container-large">
    <pageHeader />

    <div class="flex-container">
      <!-- 등급척도 그룹 -->
      <div class="w-40p">
        <RatingGroup />
      </div>
      <!-- 등급척도 그룹 EEE-->

      <div class="w-60p">
        <RatingPanel />
      </div>
    </div>
  </div>

  <!-- 등급척도그룹 가져오기 -->
  <UiModal
    v-model="showGroupSelectModal"
    title="등급척도그룹 가져오기"
    size="medium"
    :show-footer="true"
  >
    <div class="flex items-center gap-10">
      <h2 class="heading-6">기준년도</h2>
      <UiSelect
        v-model="selectedYear"
        :options="yearOptions"
        size="medium"
        placeholder="선택"
        width="150px"
      />
    </div>

    <UiTable striped hover>
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 40px" />
      </template>
      <template #header>
        <tr>
          <th></th>
          <th>등급척도</th>
          <th>평가등급수</th>
        </tr>
      </template>
      <template #body>
        <tr v-for="(grade, index) in 7" :key="index">
          <td>
            <UiRadio v-model="selectedGroup" :value="index" size="large" @click.stop />
          </td>
          <td>성과평가등급그룹</td>
          <td class="text-center">5</td>
        </tr>
      </template>
    </UiTable>
    <template #footerActions>
      <UiButton variant="primary" @click="showGroupSelectModal = false">가져오기</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'
  import PageHeader from './comp/PageHeader.vue'
  import RatingGroup from './comp/RatingGroup.vue'
  import RatingPanel from './comp/RatingPanel.vue'

  const logoText = inject('logoText')
  logoText.value = '평가기본항목관리'
</script>
