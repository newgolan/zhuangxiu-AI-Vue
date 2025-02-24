<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TabBar from './components/TabBar.vue'

// 添加禁用双击缩放
const meta = document.createElement('meta')
meta.name = 'viewport'
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
document.head.appendChild(meta)
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  touch-action: manipulation; /* 禁用双击缩放 */
  -webkit-tap-highlight-color: transparent; /* 禁用点击高亮 */
}

#app {
  height: 100%;
  padding-bottom: 56px; /* 为底部导航栏留出空间 */
}
</style>
