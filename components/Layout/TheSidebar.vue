<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <!-- 메뉴 아이템들 -->
      <ul class="menu-list">
        <template v-for="(item, index) in menuItems" :key="index">
          <li class="menu-item" :class="{ 'has-submenu': item.children }">
            <NuxtLink v-if="!item.children" :to="item.path" class="menu-link">
              <div class="menu-icon">
                <Icon :name="item.icon" size="24" />
              </div>
              <div class="menu-text">{{ item.text }}</div>
            </NuxtLink>
            <div v-else class="menu-link" @click="toggleSubmenu(index)">
              <div class="menu-icon">
                <Icon :name="item.icon" size="24" />
              </div>
              <div class="menu-text">{{ item.text }}</div>
              <div class="menu-arrow">
                <Icon :name="item.expanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" size="16" />
              </div>
            </div>
            <ul v-if="item.children && item.expanded" class="submenu">
              <li v-for="(child, childIndex) in item.children" :key="childIndex" class="submenu-item">
                <NuxtLink v-if="!child.children" :to="child.path" class="submenu-link">
                  <div class="menu-text">{{ child.text }}</div>
                </NuxtLink>
                <div v-else class="submenu-link" @click="toggleNestedSubmenu(index, childIndex)">
                  <div class="menu-text">{{ child.text }}</div>
                  <div class="menu-arrow">
                    <Icon :name="child.expanded ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" size="16" />
                  </div>
                </div>
                <ul v-if="child.children && child.expanded" class="nested-submenu">
                  <li v-for="(grandchild, grandchildIndex) in child.children" :key="grandchildIndex" class="nested-submenu-item">
                    <NuxtLink :to="grandchild.path" class="nested-submenu-link">
                      <div class="menu-text">{{ grandchild.text }}</div>
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive } from 'vue';

const menuItems = reactive([
  { text: '대시보드', path: '/', icon: 'uil:dashboard' },
  { 
    text: '업무', 
    icon: 'uil:clipboard-notes', 
    expanded: false,
    children: [
      { 
        text: '업무/협업', 
        expanded: false,
        children: [
          { text: '나의 업무', path: '/task/my-task' },
          { text: '팀 업무', path: '/task/team-task' }
        ]
      },
      { 
        text: '일일/주간보고', 
        expanded: false,
        children: [
          { text: '일일보고', path: '/task/daily-report' },
          { text: '주간보고', path: '/task/weekly-report' }
        ]
      },
      { text: '업무인수인계', path: '/task/handover' }
    ]
  },
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
  { text: 'select', path: '/cmp/select', icon: 'uil:headphones' },
]);

const toggleSubmenu = (index) => {
  menuItems[index].expanded = !menuItems[index].expanded;
};

const toggleNestedSubmenu = (parentIndex, childIndex) => {
  menuItems[parentIndex].children[childIndex].expanded = !menuItems[parentIndex].children[childIndex].expanded;
};
</script>

<style scoped>
.sidebar {
  margin-top: 72px;
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
  border-right: 1px solid #aaa;
}

.sidebar:hover {
  width: 240px;
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
  cursor: pointer;
}

.menu-link:hover {
  background-color: #4a5568;
  color: white;
  span {
    background: #fff;
  }
}

.menu-icon {
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    background: #333;
  }
}

.menu-text {
  margin-left: 12px;
  font-size: 14px;
}

.menu-arrow {
  margin-left: auto;
}

.menu-item.active .menu-link {
  color: #38b2ac;
  border-left: 3px solid #38b2ac;
}

.submenu {
  list-style-type: none;
  padding-left: 40px;
  background-color: rgba(0, 0, 0, 0.03);
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  text-decoration: none;
  color: #a0aec0;
  white-space: nowrap;
  transition: all 0.2s;
  cursor: pointer;
}

.submenu-link:hover {
  color: white;
  background-color: rgba(74, 85, 104, 0.8);
}

.nested-submenu {
  list-style-type: none;
  padding-left: 20px;
  background-color: rgba(0, 0, 0, 0.05);
}

.nested-submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #a0aec0;
  white-space: nowrap;
  transition: all 0.2s;
}

.nested-submenu-link:hover {
  color: white;
  background-color: rgba(74, 85, 104, 0.6);
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