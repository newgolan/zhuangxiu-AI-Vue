<template>
  <div class="order-query-container">
    <el-card class="query-form">
      <template #header>
        <div class="form-header">
          <el-page-header @back="goBack" title="返回" content="订单查询" />
        </div>
      </template>

      <el-form :model="queryForm" ref="queryFormRef">
        <el-form-item>
          <el-input
            v-model="queryForm.phone"
            placeholder="请输入手机号码查询订单"
            clearable
          >
            <template #append>
              <el-button type="primary" @click="queryOrder">
                <el-icon><Search /></el-icon>
                查询
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 订单列表 -->
      <div v-if="orders.length > 0" class="order-list">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="订单编号">{{ order.id }}</el-descriptions-item>
            <el-descriptions-item label="服务类型">{{ order.serviceType }}</el-descriptions-item>
            <el-descriptions-item label="服务地址">{{ order.address }}</el-descriptions-item>
            <el-descriptions-item label="预约时间">{{ order.scheduledTime }}</el-descriptions-item>
            <el-descriptions-item label="订单状态">
              <el-tag :type="getStatusType(order.status)">
                {{ getStatusText(order.status) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <!-- 评价按钮 -->
          <div v-if="order.status === 'completed' && !order.hasRated" class="action-buttons">
            <el-button type="primary" @click="showRateDialog(order)" plain>
              评价服务
            </el-button>
          </div>
        </div>
      </div>

      <!-- 无订单提示 -->
      <el-empty
        v-else-if="hasSearched"
        description="未找到相关订单"
      />
    </el-card>

    <!-- 评价对话框 -->
    <el-dialog
      v-model="rateDialogVisible"
      title="服务评价"
      width="500px"
    >
      <el-form :model="rateForm" ref="rateFormRef" label-width="80px">
        <el-form-item label="服务评分" required>
          <el-rate
            v-model="rateForm.rating"
            :texts="['很差', '较差', '一般', '较好', '很好']"
            show-text
          />
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input
            v-model="rateForm.content"
            type="textarea"
            rows="4"
            placeholder="请输入您的评价内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitRate">
            提交评价
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const queryForm = ref({
  phone: ''
})
const orders = ref([])
const hasSearched = ref(false)
const rateDialogVisible = ref(false)
const rateForm = ref({
  orderId: null,
  rating: 0,
  content: ''
})

const goBack = () => {
  router.push('/')
}

// 查询订单
const queryOrder = async () => {
  if (!queryForm.value.phone) {
    ElMessage.warning('请输入手机号码')
    return
  }

  try {
    // TODO: 替换为实际的 API 调用
    orders.value = [
      {
        id: 'ORDER2024001',
        serviceType: '美缝服务',
        address: '北京市朝阳区示例小区1号楼1单元101',
        scheduledTime: '2024-02-25 14:00',
        status: 'scheduled',
        hasRated: false
      }
    ]
    hasSearched.value = true
  } catch (e) {
    console.error('查询订单失败：', e)
    ElMessage.error('查询订单失败，请重试')
  }
}

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: '',
    scheduled: 'warning',
    processing: 'primary',
    completed: 'success'
  }
  return types[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    pending: '待处理',
    scheduled: '已排期',
    processing: '处理中',
    completed: '已完成'
  }
  return texts[status] || status
}

// 显示评价对话框
const showRateDialog = (order) => {
  rateForm.value = {
    orderId: order.id,
    rating: 0,
    content: ''
  }
  rateDialogVisible.value = true
}

// 提交评价
const submitRate = async () => {
  if (rateForm.value.rating === 0) {
    ElMessage.warning('请选择评分')
    return
  }

  try {
    // TODO: 替换为实际的 API 调用
    console.log('提交评价：', rateForm.value)
    ElMessage.success('评价提交成功')
    rateDialogVisible.value = false
    
    // 更新订单列表中的评价状态
    const order = orders.value.find(o => o.id === rateForm.value.orderId)
    if (order) {
      order.hasRated = true
    }
  } catch (e) {
    console.error('提交评价失败：', e)
    ElMessage.error('提交评价失败，请重试')
  }
}
</script>

<style scoped lang="scss">
.order-query-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;

  .query-form {
    .form-header {
      padding: 10px 0;
    }
  }

  .order-list {
    margin-top: 20px;

    .order-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .action-buttons {
        margin-top: 15px;
        text-align: right;
      }
    }
  }
}

:deep(.el-descriptions) {
  margin-bottom: 0;
}
</style>
