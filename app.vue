<template>
  <div class="app-layout">
    <TheSidebar />
    <TheHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
}

/* 전역 스타일 */
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
}
</style>