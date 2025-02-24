<template>
  <el-container class="admin-layout">
    <el-aside width="200px">
      <el-menu
        router
        :default-active="$route.path"
        class="admin-menu"
      >
        <el-menu-item index="/admin/orders">
          <el-icon><Document /></el-icon>
          <span>工单管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/communities">
          <el-icon><Location /></el-icon>
          <span>小区管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>工单管理系统</h2>
          <el-dropdown>
            <span class="user-dropdown">
              管理员 <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Document, Location, ArrowDown } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;
  
  .el-aside {
    background-color: #304156;
    
    .admin-menu {
      height: 100%;
      border-right: none;
    }
  }
  
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 20px;
    
    .header-content {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      h2 {
        margin: 0;
      }
      
      .user-dropdown {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
  
  .el-main {
    background-color: #f0f2f5;
    padding: 20px;
  }
}
</style>
