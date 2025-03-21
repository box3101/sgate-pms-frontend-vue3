<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <!-- 메뉴 아이템들 -->
      <ul class="menu-list">
        <li class="menu-item">
          <NuxtLink to="/" class="menu-link">
            <div class="menu-icon">
              <Icon name="uil:dashboard" size="24" />
            </div>
            <div class="menu-text">대시보드</div>
          </NuxtLink>
        </li>
        <li class="menu-item">
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
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
</style>

