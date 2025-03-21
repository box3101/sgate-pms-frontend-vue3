<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <!-- 메뉴 아이템들 -->
      <ul class="menu-list">
        <li class="menu-item" v-for="menu in menus" :key="menu.id">
          <NuxtLink :to="menu.link" class="menu-link">
            <div class="menu-icon">
              <Icon :name="menu.icon" size="24" />
            </div>
            <div class="menu-text">{{menu.text}}</div>
          </NuxtLink>
        </li>
        <!-- <li class="menu-item">
          <NuxtLink to="/cnt01" class="menu-link">
            <div class="menu-icon">
              <Icon name="uil:clipboard-notes" size="24" />
            </div>
            <div class="menu-text">업무</div>
          </NuxtLink>
        </li>
        <li class="menu-item">
          <NuxtLink to="/cnt02" class="menu-link">
            <div class="menu-icon">
              <Icon name="uil:chart-pie" size="24" />
            </div>
            <div class="menu-text">PMS</div>
          </NuxtLink>
        </li> -->
      </ul>
    </div>
  </aside>
</template>

<script setup>

 const menus = [
  {
    id: 1,
    link: '/',
    icon: 'uil:dashboard',
    text: '대시보드'
  },
  {
    id: 2,
    link: '/cnt01',
    icon: 'uil:clipboard-notes',
    text: '업무1'
  },
  {
    id: 3,
    link: '/cnt02',
    icon: 'uil:clipboard-notes',
    text: '업무2'
  },
  {
    id: 4,
    link: '/cnt03',
    icon: 'uil:clipboard-notes',
    text: '업무3'
  },
 ]

</script>

<style scoped>
</style>

