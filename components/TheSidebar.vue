<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <!-- 메뉴 아이템들 -->
      <ul class="menu-list">
        <template v-for="(item, index) in menuItems" :key="index">
          <li class="menu-item">
            <NuxtLink :to="item.path" class="menu-link">
              <div class="menu-icon">
                <Icon :name="item.icon" size="24" />
              </div>
              <div class="menu-text">{{ item.text }}</div>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>

<script setup>
const menuItems = [
  { text: '대시보드', path: '/', icon: 'uil:dashboard' },
  { text: '업무', path: '/cnt01', icon: 'uil:clipboard-notes' },
  { text: 'PMS', path: '/cnt02', icon: 'uil:chart-pie' },
  { text: '개인성과', path: '/cnt03', icon: 'uil:chart-line' },
  { text: '조직성과', path: '/cnt04', icon: 'uil:chart-growth' },
  { text: '조직평가', path: '/cnt05', icon: 'uil:analytics' },
  { text: '인사평가', path: '/cnt06', icon: 'uil:users-alt' },
  { text: '온보딩', path: '/cnt07', icon: 'uil:user-plus' },
  { text: '인사관리', path: '/cnt08', icon: 'uil:user-check' },
  { text: '커뮤니티', path: '/cnt09', icon: 'uil:comments' },
  { text: '설정관리', path: '/cnt10', icon: 'uil:setting' },
  { text: '고객지원', path: '/cnt11', icon: 'uil:headphones' },
];
</script>

<style scoped>
.sidebar {
  width: 60px;
  height: 100vh;
  background-color: #ffff;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  transition: width 0.3s;
  overflow: hidden;
  border-right: 1px solid #fff;
}

.sidebar:hover {
  width: 180px;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #fff;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-item {
  width: 100%;
  margin-bottom: 4px;
  border-bottom: 1px solid #fff;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: #a0aec0;
  white-space: nowrap;
  transition: all 0.2s;
  border-left: 2px solid #fff;
}

.menu-link:hover {
 background-color: #4a5568; /* 세련된 다크 그레이 */
  color: white;
  span{
    background: #fff;
  }
}

.menu-icon {
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    background: #333;
  }
}

.menu-text {
  margin-left: 12px;
  font-size: 14px;
  border-bottom: 1px dashed #fff;
}
.menu-item.active .menu-link {
  color: #38b2ac; /* 청록색 - 강조색으로 추천 */
  border-left: 3px solid #38b2ac;
}

/* 상단에 파란색 바 스타일 추가 */
.sidebar::before {
  content: "";
  display: block;
  height: 4px;
  width: 100%;
  border-bottom: 1px solid #fff;
}
</style>