<template>
  <div class="work-order-detail">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">工单详情</span>
    </div>

    <!-- 工单基本信息 -->
    <div class="detail-section">
      <div class="section-title">基本信息</div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="工单号">{{ workOrder.orderNumber }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(workOrder.status)">
            {{ getStatusText(workOrder.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ workOrder.createTime }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 客户信息 -->
    <div class="detail-section">
      <div class="section-title">客户信息</div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="客户姓名">{{ workOrder.customerName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">
          <a :href="'tel:' + workOrder.phone">{{ workOrder.phone }}</a>
        </el-descriptions-item>
        <el-descriptions-item label="服务地址">{{ workOrder.address }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 服务信息 -->
    <div class="detail-section">
      <div class="section-title">服务信息</div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="服务类型">{{ workOrder.serviceType }}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{ workOrder.appointmentTime }}</el-descriptions-item>
        <el-descriptions-item label="服务描述">{{ workOrder.description }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 处理记录 -->
    <div class="detail-section">
      <div class="section-title">处理记录</div>
      <el-timeline>
        <el-timeline-item
          v-for="record in workOrder.records"
          :key="record.time"
          :timestamp="record.time"
          :type="record.type"
        >
          {{ record.content }}
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 图片记录 -->
    <div class="detail-section" v-if="workOrder.images && workOrder.images.length">
      <div class="section-title">现场图片</div>
      <div class="image-list">
        <el-image
          v-for="(image, index) in workOrder.images"
          :key="index"
          :src="image"
          :preview-src-list="workOrder.images"
          fit="cover"
          class="service-image"
        />
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-actions" v-if="workOrder.status !== 'completed'">
      <template v-if="workOrder.status === 'pending'">
        <el-button type="primary" @click="handleProcess">开始处理</el-button>
      </template>
      <template v-else-if="workOrder.status === 'processing'">
        <el-button type="primary" @click="uploadImage">上传照片</el-button>
        <el-button type="success" @click="handleComplete">完成工单</el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const workOrderId = route.params.id

// 模拟工单数据
const workOrder = ref({
  orderNumber: 'WO202502230001',
  status: 'processing',
  createTime: '2025-02-23 15:30',
  customerName: '张三',
  phone: '13800138000',
  address: '北京市朝阳区某小区1号楼1单元101',
  serviceType: '瓷砖美缝',
  appointmentTime: '2025-02-24 09:00',
  description: '厨房和卫生间的瓷砖需要美缝处理，面积约20平方米',
  records: [
    {
      time: '2025-02-23 15:30',
      type: 'primary',
      content: '工单创建'
    },
    {
      time: '2025-02-23 16:00',
      type: 'success',
      content: '师傅已接单'
    },
    {
      time: '2025-02-23 16:30',
      type: 'warning',
      content: '联系客户确认时间'
    }
  ],
  images: []
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

// 开始处理
const handleProcess = () => {
  workOrder.value.status = 'processing'
  workOrder.value.records.push({
    time: new Date().toLocaleString(),
    type: 'primary',
    content: '开始处理工单'
  })
  ElMessage.success('已开始处理工单')
}

// 上传图片
const uploadImage = () => {
  // TODO: 实现图片上传功能
  ElMessage.info('图片上传功能开发中')
}

// 完成工单
const handleComplete = () => {
  workOrder.value.status = 'completed'
  workOrder.value.records.push({
    time: new Date().toLocaleString(),
    type: 'success',
    content: '工单处理完成'
  })
  ElMessage.success('工单已完成')
}

// 获取工单详情
onMounted(async () => {
  // TODO: 调用后端API获取工单详情
  console.log('获取工单详情:', workOrderId)
})
</script>

<style scoped>
.work-order-detail {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 80px;
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

.detail-section {
  margin: 15px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #303133;
}

.image-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.service-image {
  width: 100%;
  height: 100px;
  border-radius: 4px;
  cursor: pointer;
}

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 15px;
  background-color: #fff;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.bottom-actions .el-button {
  flex: 1;
}

:deep(.el-descriptions__cell) {
  padding: 12px !important;
}

:deep(.el-timeline-item__content) {
  color: #606266;
}
</style>
