<template>
  <Props message="안녕하세요" />
  <Emit @btnClick="handleClick"></Emit>
</template>

<script setup>
  import Props from './comp/Props.vue'
  import Emit from './comp/Emit.vue'

  const handleClick = data => {
    console.log('이벤트 발생')
    console.log(data)
  }
</script>
