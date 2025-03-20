<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">홈</NuxtLink> |
        <NuxtLink to="/cnt01">CNT1</NuxtLink> |
        <NuxtLink to="/cnt02">CNT2</NuxtLink>
      </nav>
    </header>

    <!-- 여기에 현재 라우트에 해당하는 페이지 컴포넌트가 렌더링됩니다 -->
    <NuxtPage />
  </div>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-active {
  color: #42b983;
}
</style>