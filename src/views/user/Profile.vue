<template>
  <div class="profile-page">
    <!-- 顶部用户信息卡片 -->
    <div class="user-card">
      <div class="user-info">
        <el-avatar :size="64" :src="userInfo.avatar || '/default-avatar.png'" />
        <div class="user-details">
          <div class="user-name">{{ userInfo.name || '未登录' }}</div>
          <div class="user-phone">{{ userInfo.phone || '点击登录' }}</div>
        </div>
      </div>
      <div class="order-stats">
        <div class="stat-item" @click="viewOrders('all')">
          <div class="stat-number">{{ stats.total }}</div>
          <div class="stat-label">全部订单</div>
        </div>
        <div class="stat-item" @click="viewOrders('pending')">
          <div class="stat-number">{{ stats.pending }}</div>
          <div class="stat-label">待处理</div>
        </div>
        <div class="stat-item" @click="viewOrders('processing')">
          <div class="stat-number">{{ stats.processing }}</div>
          <div class="stat-label">进行中</div>
        </div>
        <div class="stat-item" @click="viewOrders('completed')">
          <div class="stat-number">{{ stats.completed }}</div>
          <div class="stat-label">已完成</div>
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="feature-list">
      <div class="section-title">常用功能</div>
      <div class="grid-menu">
        <div class="grid-item" @click="router.push('/address')">
          <el-icon class="grid-icon"><Location /></el-icon>
          <span>我的地址</span>
        </div>
        <div class="grid-item" @click="router.push('/favorites')">
          <el-icon class="grid-icon"><Star /></el-icon>
          <span>我的收藏</span>
        </div>
        <div class="grid-item" @click="router.push('/coupons')">
          <el-icon class="grid-icon"><Ticket /></el-icon>
          <span>优惠券</span>
        </div>
        <div class="grid-item" @click="router.push('/order-query')">
          <el-icon class="grid-icon"><Document /></el-icon>
          <span>订单查询</span>
        </div>
      </div>

      <!-- 管理模块 -->
      <div class="section-title">管理中心</div>
      <div class="grid-menu">
        <div class="grid-item" @click="router.push('/work-orders')">
          <el-icon class="grid-icon"><Tickets /></el-icon>
          <span>工单管理</span>
        </div>
        <div class="grid-item" @click="router.push('/communities')">
          <el-icon class="grid-icon"><House /></el-icon>
          <span>小区管理</span>
        </div>
        <div class="grid-item" @click="router.push('/workers')">
          <el-icon class="grid-icon"><User /></el-icon>
          <span>工人管理</span>
        </div>
        <div class="grid-item" @click="router.push('/departments')">
          <el-icon class="grid-icon"><OfficeBuilding /></el-icon>
          <span>部门管理</span>
        </div>
      </div>

      <!-- 其他设置 -->
      <div class="section-title">其他设置</div>
      <div class="list-menu">
        <div class="list-item" @click="handleContact">
          <el-icon class="list-icon"><Service /></el-icon>
          <span>联系客服</span>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </div>
        <div class="list-item" @click="router.push('/about')">
          <el-icon class="list-icon"><InfoFilled /></el-icon>
          <span>关于我们</span>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </div>
        <div class="list-item" @click="router.push('/settings')">
          <el-icon class="list-icon"><Setting /></el-icon>
          <span>设置</span>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Location, Star, Ticket, Service, Setting, Tickets, 
  House, User, Document, InfoFilled, ArrowRight, OfficeBuilding 
} from '@element-plus/icons-vue'

const router = useRouter()

// 处理联系客服
const handleContact = () => {
  window.location.href = 'tel:400-888-8888'
}

// 用户信息
const userInfo = ref({
  phone: null,
  name: null,
  avatar: null
})

// 订单统计
const stats = ref({
  total: 0,
  pending: 0,
  processing: 0,
  completed: 0
})

// 查看订单
const viewOrders = (status) => {
  router.push({
    path: '/order-query',
    query: { status }
  })
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 20px;
}

.user-card {
  background: linear-gradient(135deg, #409eff, #2c80ff);
  color: white;
  padding: 20px;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-details {
  margin-left: 15px;
}

.user-name {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}

.user-phone {
  font-size: 14px;
  opacity: 0.9;
}

.order-stats {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.stat-item {
  text-align: center;
  cursor: pointer;
}

.stat-number {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
}

.section-title {
  font-size: 16px;
  color: #303133;
  font-weight: 500;
  padding: 15px;
  margin-bottom: -10px;
}

.grid-menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 15px;
  background: white;
  gap: 15px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.grid-icon {
  font-size: 24px;
  color: #409eff;
  margin-bottom: 8px;
  padding: 10px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 50%;
}

.list-menu {
  background: white;
  margin-top: 15px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
}

.list-item:last-child {
  border-bottom: none;
}

.list-icon {
  font-size: 20px;
  color: #409eff;
  margin-right: 10px;
}

.arrow-icon {
  margin-left: auto;
  color: #c0c4cc;
}

:deep(.el-avatar) {
  border: 2px solid rgba(255, 255, 255, 0.8);
}
</style>
