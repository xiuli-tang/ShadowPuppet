<!-- <template>
  <div id="app">
    <nav class="side-menu">
      <h2>项目控制台</h2>
      <router-link to="/">🏠 首页</router-link>
      <router-link to="/puppet">🎭 皮影小项目</router-link>
      <router-link to="/ai-chat">🤖 AI 对话</router-link>
    </nav>
    
    <main class="content">
      <router-view></router-view> </main>
  </div>
</template>

<style>
#app { display: flex; height: 100vh; }
.side-menu { width: 200px; background: #2c3e50; color: white; display: flex; flex-direction: column; padding: 20px; }
.side-menu a { color: #ecf0f1; text-decoration: none; margin: 10px 0; }
.side-menu a.router-link-exact-active { color: #42b983; font-weight: bold; }
.content { flex: 1; padding: 20px; overflow-y: auto; }
</style> -->

<template>
  <div id="app">
    <router-view /> <!-- 路由渲染出口 -->
  </div>
</template>

<script setup>
// 无需额外逻辑，仅承载路由视图
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>