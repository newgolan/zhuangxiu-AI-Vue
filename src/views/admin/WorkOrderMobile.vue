<template>
  <div class="work-order-mobile">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">工单管理</span>
    </div>

    <!-- 状态筛选 -->
    <div class="filter-tabs">
      <el-tabs v-model="activeStatus" @tab-change="handleStatusChange">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待处理" name="pending"></el-tab-pane>
        <el-tab-pane label="处理中" name="processing"></el-tab-pane>
        <el-tab-pane label="已完成" name="completed"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 工单列表 -->
    <div class="work-order-list">
      <el-card v-for="order in filteredOrders" :key="order.id" class="work-order-item">
        <div class="order-header">
          <span class="order-number">工单号：{{ order.orderNumber }}</span>
          <el-tag :type="getStatusType(order.status)">{{ getStatusText(order.status) }}</el-tag>
        </div>
        
        <div class="order-info">
          <div class="info-item">
            <label>客户姓名：</label>
            <span>{{ order.customerName }}</span>
          </div>
          <div class="info-item">
            <label>联系电话：</label>
            <span>{{ order.phone }}</span>
          </div>
          <div class="info-item">
            <label>服务类型：</label>
            <span>{{ order.serviceType }}</span>
          </div>
          <div class="info-item">
            <label>预约时间：</label>
            <span>{{ order.appointmentTime }}</span>
          </div>
          <div class="info-item address">
            <label>服务地址：</label>
            <span>{{ order.address }}</span>
          </div>
        </div>

        <div class="order-actions">
          <el-button type="primary" size="small" @click="handleProcess(order)" 
                     v-if="order.status === 'pending'">开始处理</el-button>
          <el-button type="success" size="small" @click="handleComplete(order)"
                     v-if="order.status === 'processing'">完成工单</el-button>
          <el-button type="info" size="small" @click="viewDetail(order)">查看详情</el-button>
        </div>
      </el-card>
    </div>

    <!-- 加载更多 -->
    <div class="load-more" v-if="hasMore">
      <el-button type="text" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const activeStatus = ref('all')
const page = ref(1)
const hasMore = ref(true)

// 模拟工单数据
const orders = ref([
  {
    id: 1,
    orderNumber: 'WO202502230001',
    status: 'pending',
    customerName: '张三',
    phone: '13800138000',
    serviceType: '瓷砖美缝',
    appointmentTime: '2025-02-24 09:00',
    address: '北京市朝阳区某小区1号楼1单元101'
  },
  {
    id: 2,
    orderNumber: 'WO202502230002',
    status: 'processing',
    customerName: '李四',
    phone: '13900139000',
    serviceType: '防水补漏',
    appointmentTime: '2025-02-24 14:00',
    address: '北京市海淀区某花园2号楼3单元303'
  }
])

// 根据状态筛选工单
const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
})

// 获取状态标签类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成'
  }
  return texts[status] || '未知'
}

// 处理状态切换
const handleStatusChange = () => {
  page.value = 1
  hasMore.value = true
  // TODO: 重新加载数据
}

// 开始处理工单
const handleProcess = (order) => {
  // TODO: 调用后端API更新工单状态
  order.status = 'processing'
  ElMessage.success('工单已开始处理')
}

// 完成工单
const handleComplete = (order) => {
  // TODO: 调用后端API更新工单状态
  order.status = 'completed'
  ElMessage.success('工单已完成')
}

// 查看工单详情
const viewDetail = (order) => {
  router.push(`/work-order/${order.id}`)
}

// 加载更多
const loadMore = () => {
  page.value++
  // TODO: 调用后端API加载更多数据
  // 模拟没有更多数据
  hasMore.value = false
}
</script>

<style scoped>
.work-order-mobile {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 20px;
}

.nav-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 44px;
  background-color: #fff;
  padding: 0 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.back-icon {
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.title {
  font-size: 16px;
  font-weight: 500;
}

.filter-tabs {
  background-color: #fff;
  margin-bottom: 10px;
}

.work-order-list {
  padding: 10px;
}

.work-order-item {
  margin-bottom: 10px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-number {
  font-size: 14px;
  color: #606266;
}

.order-info {
  margin: 15px 0;
}

.info-item {
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
}

.info-item label {
  color: #909399;
  width: 80px;
  flex-shrink: 0;
}

.info-item.address {
  align-items: flex-start;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.load-more {
  text-align: center;
  margin-top: 20px;
}
</style>
