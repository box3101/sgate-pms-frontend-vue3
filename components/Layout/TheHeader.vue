<template>
  <header class="header">
    <div class="header-container">
      <!-- 로고 부분 -->
      <div class="logo">
        <NuxtLink to="/">
          <Icon name="mdi:information-outline" class="logo-icon" />
          <span class="logo-text">개인성과</span>
        </NuxtLink>
      </div>

      <!-- 우측 아이콘 메뉴 -->
      <div class="icon-menu">
        <button class="icon-button">
          <Icon name="mdi:information-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:bell-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:cog-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:account-circle-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:earth" size="24" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'  // 이 이름으로 등록됩니다
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  max-width: 97%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.logo-text {
  font-weight: bold;
  font-size: 16px;
}

.icon-menu {
  display: flex;
  align-items: center;
}

.icon-button {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.icon-button:hover {
  background-color: #f5f5f5;
}

/* 아이콘 스타일 - 실제 아이콘은 별도 설정 필요 */
.icon-info,
.icon-notification,
.icon-setting,
.icon-user,
.icon-language {
  width: 20px;
  height: 20px;
  display: block;
}
</style>