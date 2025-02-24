<template>
  <div class="order-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>工单列表</h3>
          <el-form :inline="true" :model="searchForm">
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="选择状态">
                <el-option label="全部" value="" />
                <el-option label="待处理" value="pending" />
                <el-option label="已排期" value="scheduled" />
                <el-option label="处理中" value="processing" />
                <el-option label="已完成" value="completed" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchOrders">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="id" label="工单号" width="100" />
        <el-table-column prop="name" label="客户姓名" width="120" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="community" label="小区名称" width="150" />
        <el-table-column prop="address" label="详细地址" min-width="200" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="worker" label="指派工人" width="120">
          <template #default="{ row }">
            <el-select 
              v-model="row.workerId" 
              placeholder="选择工人"
              :disabled="row.status === 'completed'"
              @change="(value) => assignWorker(row.id, value)"
            >
              <el-option
                v-for="worker in workers"
                :key="worker.id"
                :label="worker.name"
                :value="worker.id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="排期时间" width="180">
          <template #default="{ row }">
            <el-date-picker
              v-model="row.scheduledTime"
              type="datetime"
              placeholder="选择时间"
              :disabled="row.status === 'completed'"
              @change="(value) => scheduleOrder(row.id, value)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button 
              v-if="row.status === 'completed'"
              type="primary" 
              link
              @click="viewFeedback(row)"
            >
              查看反馈
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 反馈详情对话框 -->
    <el-dialog
      v-model="feedbackDialogVisible"
      title="客户反馈"
      width="500px"
    >
      <div v-if="selectedOrder">
        <p><strong>评分：</strong> {{ selectedOrder.feedback?.rating }} / 5</p>
        <p><strong>反馈内容：</strong></p>
        <p>{{ selectedOrder.feedback?.content || '暂无反馈内容' }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchForm = ref({
  status: ''
})

const orders = ref([])
const workers = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const feedbackDialogVisible = ref(false)
const selectedOrder = ref(null)

// 获取订单列表
const fetchOrders = async () => {
  try {
    // TODO: 替换为实际的 API 调用
    orders.value = [
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        community: '示例小区',
        address: '北京市朝阳区示例路1号',
        status: 'pending',
        workerId: null,
        scheduledTime: null,
        feedback: null
      }
    ]
    total.value = 1
  } catch (e) {
    console.error('获取订单列表失败：', e)
    ElMessage.error('获取订单列表失败')
  }
}

// 获取工人列表
const fetchWorkers = async () => {
  try {
    // TODO: 替换为实际的 API 调用
    workers.value = [
      { id: 1, name: '工人1' },
      { id: 2, name: '工人2' }
    ]
  } catch (e) {
    console.error('获取工人列表失败：', e)
    ElMessage.error('获取工人列表失败')
  }
}

// 分配工人
const assignWorker = async (orderId, workerId) => {
  try {
    // TODO: 替换为实际的 API 调用
    console.log('分配工人：', { orderId, workerId })
    ElMessage.success('分配工人成功')
  } catch (e) {
    console.error('分配工人失败：', e)
    ElMessage.error('分配工人失败')
  }
}

// 排期
const scheduleOrder = async (orderId, time) => {
  try {
    // TODO: 替换为实际的 API 调用
    console.log('排期：', { orderId, time })
    ElMessage.success('排期成功')
  } catch (e) {
    console.error('排期失败：', e)
    ElMessage.error('排期失败')
  }
}

// 查看反馈
const viewFeedback = (order) => {
  selectedOrder.value = order
  feedbackDialogVisible.value = true
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

// 搜索订单
const searchOrders = () => {
  currentPage.value = 1
  fetchOrders()
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchOrders()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchOrders()
}

onMounted(() => {
  fetchOrders()
  fetchWorkers()
})
</script>

<style scoped lang="scss">
.order-list {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h3 {
      margin: 0;
    }
  }
  
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
