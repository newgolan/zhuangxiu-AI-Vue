<template>
  <div class="worker-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">工人管理</span>
      <el-icon class="add-icon" @click="showAddDialog"><Plus /></el-icon>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-card">
      <div class="stat-item">
        <div class="stat-number">{{ workerStats.total }}</div>
        <div class="stat-label">总人数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ workerStats.active }}</div>
        <div class="stat-label">在职</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ workerStats.working }}</div>
        <div class="stat-label">工作中</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ workerStats.free }}</div>
        <div class="stat-label">空闲</div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="filter-section">
      <el-input
        v-model="searchText"
        placeholder="搜索工人姓名或电话"
        clearable
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div class="filter-tags">
        <el-select
          v-model="filterStatus"
          placeholder="工作状态"
          clearable
          class="status-filter"
        >
          <el-option label="全部" value="all" />
          <el-option label="空闲" value="free" />
          <el-option label="工作中" value="working" />
          <el-option label="请假" value="leave" />
        </el-select>
        <el-select
          v-model="departmentFilter"
          placeholder="选择部门"
          clearable
          class="department-filter"
        >
          <el-option
            v-for="dept in departments"
            :key="dept.id"
            :label="dept.name"
            :value="dept.id"
          />
        </el-select>
      </div>
    </div>

    <!-- 工人列表 -->
    <div class="worker-list">
      <el-card v-for="worker in filteredWorkers" :key="worker.id" class="worker-card">
        <div class="worker-header">
          <div class="worker-avatar">
            <el-avatar :size="50" :src="worker.avatar">{{ worker.name.charAt(0) }}</el-avatar>
          </div>
          <div class="worker-basic">
            <div class="name-status">
              <span class="worker-name">{{ worker.name }}</span>
              <el-tag 
                :type="getStatusType(worker.status)" 
                size="small"
                class="status-tag"
              >
                {{ getStatusText(worker.status) }}
              </el-tag>
            </div>
            <div class="worker-info">
              <span class="phone">{{ worker.phone }}</span>
              <span class="department">{{ getDepartmentName(worker.departmentId) }}</span>
            </div>
          </div>
          <div class="worker-rating">
            <el-rate
              v-model="worker.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
        </div>
        <div class="worker-body">
          <div class="skill-tags">
            <el-tag 
              v-for="skill in worker.skills" 
              :key="skill"
              class="skill-tag"
              effect="plain"
            >
              {{ skill }}
            </el-tag>
          </div>
          <div class="stats-row">
            <div class="stat-box">
              <span class="stat-value">{{ worker.completedOrders }}</span>
              <span class="stat-label">完成订单</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ worker.satisfaction }}%</span>
              <span class="stat-label">满意度</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ worker.responseRate }}%</span>
              <span class="stat-label">响应率</span>
            </div>
          </div>
        </div>
        <div class="worker-footer">
          <el-button type="primary" size="small" @click="editWorker(worker)">
            <el-icon><Edit /></el-icon> 编辑
          </el-button>
          <el-button 
            :type="worker.status === 'active' ? 'warning' : 'success'" 
            size="small" 
            @click="toggleStatus(worker)"
          >
            <el-icon><Switch /></el-icon>
            {{ worker.status === 'active' ? '离职' : '复职' }}
          </el-button>
          <el-button type="danger" size="small" @click="deleteWorker(worker)">
            <el-icon><Delete /></el-icon> 删除
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 添加/编辑工人对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingWorker ? '编辑工人信息' : '新增工人'"
      width="90%"
      class="mobile-dialog"
    >
      <el-form ref="formRef" :model="workerForm" :rules="rules" label-position="top">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="workerForm.name" placeholder="请输入工人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="workerForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentId">
          <el-select v-model="workerForm.departmentId" placeholder="请选择所属部门" style="width: 100%">
            <el-option
              v-for="dept in departments"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="技能" prop="skills">
          <el-select
            v-model="workerForm.skills"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入技能"
            style="width: 100%"
          >
            <el-option
              v-for="skill in skillOptions"
              :key="skill"
              :label="skill"
              :value="skill"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="workerForm.status" placeholder="请选择状态" style="width: 100%">
            <el-option label="空闲" value="free" />
            <el-option label="工作中" value="working" />
            <el-option label="请假" value="leave" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveWorker">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, Plus, Edit, Delete, Switch, Search,
  Phone, Location, User 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const searchText = ref('')
const filterStatus = ref('all')
const departmentFilter = ref('')
const dialogVisible = ref(false)
const editingWorker = ref(null)

// 工人统计
const workerStats = ref({
  total: 48,
  active: 42,
  working: 28,
  free: 14
})

// 表单数据
const workerForm = ref({
  name: '',
  phone: '',
  departmentId: '',
  skills: [],
  status: 'free'
})

// 技能选项
const skillOptions = [
  '保洁',
  '维修',
  '安装',
  '搬运',
  '园艺',
  '电工',
  '木工',
  '油漆'
]

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  departmentId: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  skills: [{ required: true, message: '请选择技能', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 部门数据
const departments = ref([
  { id: 1, name: '保洁部' },
  { id: 2, name: '维修部' },
  { id: 3, name: '绿化部' }
])

// 模拟工人数据
const workers = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    departmentId: 1,
    skills: ['保洁', '园艺'],
    status: 'free',
    rating: 4.5,
    completedOrders: 128,
    satisfaction: 98,
    responseRate: 95,
    avatar: null
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    departmentId: 2,
    skills: ['维修', '电工'],
    status: 'working',
    rating: 4.8,
    completedOrders: 256,
    satisfaction: 99,
    responseRate: 97,
    avatar: null
  }
])

// 过滤工人列表
const filteredWorkers = computed(() => {
  let result = [...workers.value]
  
  if (filterStatus.value !== 'all') {
    result = result.filter(worker => worker.status === filterStatus.value)
  }
  
  if (departmentFilter.value) {
    result = result.filter(worker => worker.departmentId === departmentFilter.value)
  }
  
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(worker => 
      worker.name.toLowerCase().includes(keyword) ||
      worker.phone.includes(keyword)
    )
  }
  
  return result
})

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    free: 'success',
    working: 'warning',
    leave: 'info'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    free: '空闲',
    working: '工作中',
    leave: '请假'
  }
  return texts[status] || '未知'
}

// 获取部门名称
const getDepartmentName = (departmentId) => {
  const department = departments.value.find(dept => dept.id === departmentId)
  return department ? department.name : '未知'
}

// 显示添加对话框
const showAddDialog = () => {
  editingWorker.value = null
  workerForm.value = {
    name: '',
    phone: '',
    departmentId: '',
    skills: [],
    status: 'free'
  }
  dialogVisible.value = true
}

// 编辑工人
const editWorker = (worker) => {
  editingWorker.value = worker
  workerForm.value = {
    name: worker.name,
    phone: worker.phone,
    departmentId: worker.departmentId,
    skills: [...worker.skills],
    status: worker.status
  }
  dialogVisible.value = true
}

// 保存工人
const saveWorker = () => {
  // TODO: 调用后端API保存数据
  const newWorker = {
    id: editingWorker.value?.id || Date.now(),
    ...workerForm.value,
    rating: editingWorker.value?.rating || 5.0,
    completedOrders: editingWorker.value?.completedOrders || 0,
    satisfaction: editingWorker.value?.satisfaction || 100,
    responseRate: editingWorker.value?.responseRate || 100,
    avatar: editingWorker.value?.avatar || null
  }

  if (editingWorker.value) {
    const index = workers.value.findIndex(w => w.id === editingWorker.value.id)
    if (index !== -1) {
      workers.value[index] = newWorker
    }
    ElMessage.success('工人信息修改成功')
  } else {
    workers.value.push(newWorker)
    ElMessage.success('工人添加成功')
  }
  dialogVisible.value = false
}

// 切换状态
const toggleStatus = (worker) => {
  worker.status = worker.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(`已${worker.status === 'active' ? '启用' : '停用'}该工人账号`)
}

// 删除工人
const deleteWorker = (worker) => {
  ElMessageBox.confirm(
    '确定要删除该工人吗？删除后无法恢复。',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = workers.value.findIndex(w => w.id === worker.id)
    if (index !== -1) {
      workers.value.splice(index, 1)
    }
    ElMessage.success('工人删除成功')
  })
}
</script>

<style scoped>
.worker-page {
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

.back-icon, .add-icon {
  font-size: 20px;
  cursor: pointer;
}

.title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.stats-card {
  background: linear-gradient(135deg, #409eff, #2c80ff);
  color: white;
  padding: 20px;
  margin: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}

.stat-item {
  text-align: center;
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

.filter-section {
  padding: 15px;
  background: white;
  margin-bottom: 10px;
}

.search-input {
  margin-bottom: 10px;
}

.filter-tags {
  display: flex;
  gap: 10px;
}

.status-filter,
.department-filter {
  flex: 1;
}

.worker-list {
  padding: 15px;
}

.worker-card {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.worker-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.worker-avatar {
  margin-right: 15px;
}

.worker-basic {
  flex: 1;
}

.name-status {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.worker-name {
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
}

.worker-info {
  font-size: 14px;
  color: #606266;
}

.phone {
  margin-right: 15px;
}

.worker-rating {
  text-align: right;
}

.worker-body {
  margin-bottom: 15px;
}

.skill-tags {
  margin-bottom: 15px;
}

.skill-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.stats-row {
  display: flex;
  justify-content: space-around;
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
}

.stat-box {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #409eff;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.worker-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.mobile-dialog) {
  .el-dialog__body {
    padding: 20px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 20px;
  }

  .el-button {
    flex: 1;
  }
}
</style>
