<template>
  <div class="ui-form-layout">
    <div class="ui-form-layout__content">
      <ul class="ui-form-layout__list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script setup>
// props나 이벤트가 필요하다면 여기에 추가
</script>

<style lang="scss" scoped>
.ui-form {

&__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #141212;
  cursor: pointer;
}

&__title {
  font-size: 16px;
  font-weight: 600;
}

&__collapse-icon {
  transition: transform 0.3s;

  &--open {
    transform: rotate(180deg);
  }
}
&__list {
  list-style: none;
  display: flex;
  flex-direction: column;
}
}

</style>