<template>
  <div class="tab-bar">
    <router-link to="/" class="tab-item" active-class="active">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </router-link>
    <router-link to="/profile" class="tab-item" active-class="active">
      <el-icon><User /></el-icon>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script setup>
import { House, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #909399;
  text-decoration: none;
  font-size: 12px;
  padding: 4px 0;
}

.tab-item .el-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.tab-item.active {
  color: #409EFF;
}
</style>
