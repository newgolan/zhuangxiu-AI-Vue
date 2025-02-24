<template>
  <div class="department-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">部门管理</span>
      <el-icon class="add-icon" @click="showAddDialog"><Plus /></el-icon>
    </div>

    <!-- 部门列表 -->
    <div class="department-list">
      <el-card v-for="dept in departments" :key="dept.id" class="department-item">
        <div class="department-info">
          <div class="department-header">
            <span class="department-name">{{ dept.name }}</span>
            <el-tag size="small" :type="dept.status === 'active' ? 'success' : 'info'">
              {{ dept.status === 'active' ? '正常' : '停用' }}
            </el-tag>
          </div>
          <div class="department-desc">{{ dept.description }}</div>
          <div class="department-stats">
            <span>工人数量: {{ dept.workerCount }}</span>
            <span>主管: {{ dept.manager }}</span>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" size="small" @click="editDepartment(dept)">
            <el-icon><Edit /></el-icon> 编辑
          </el-button>
          <el-button 
            :type="dept.status === 'active' ? 'warning' : 'success'" 
            size="small" 
            @click="toggleStatus(dept)"
          >
            <el-icon><Switch /></el-icon>
            {{ dept.status === 'active' ? '停用' : '启用' }}
          </el-button>
          <el-button type="danger" size="small" @click="deleteDepartment(dept)">
            <el-icon><Delete /></el-icon> 删除
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 添加/编辑部门对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingDepartment ? '编辑部门' : '新增部门'"
      width="90%"
      class="mobile-dialog"
    >
      <el-form ref="formRef" :model="departmentForm" :rules="rules" label-position="top">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="departmentForm.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" prop="description">
          <el-input
            v-model="departmentForm.description"
            type="textarea"
            rows="3"
            placeholder="请输入部门描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门主管" prop="manager">
          <el-input v-model="departmentForm.manager" placeholder="请输入部门主管姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="departmentForm.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="departmentForm.status"
            :active-value="'active'"
            :inactive-value="'inactive'"
            active-text="启用"
            inactive-text="停用"
          ></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDepartment">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, Plus, Edit, Delete, Switch, Search,
  Phone, Location, User 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const dialogVisible = ref(false)
const editingDepartment = ref(null)

// 表单数据
const departmentForm = ref({
  name: '',
  description: '',
  manager: '',
  phone: '',
  status: 'active'
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入部门描述', trigger: 'blur' }],
  manager: [{ required: true, message: '请输入部门主管姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 模拟部门数据
const departments = ref([
  {
    id: 1,
    name: '保洁部',
    description: '负责日常保洁、深度保洁等清洁服务',
    manager: '张三',
    phone: '13800138000',
    status: 'active',
    workerCount: 12
  },
  {
    id: 2,
    name: '维修部',
    description: '负责水电维修、家具维修等维修服务',
    manager: '李四',
    phone: '13900139000',
    status: 'active',
    workerCount: 8
  },
  {
    id: 3,
    name: '绿化部',
    description: '负责园林养护、绿植维护等绿化服务',
    manager: '王五',
    phone: '13700137000',
    status: 'inactive',
    workerCount: 6
  }
])

// 显示添加对话框
const showAddDialog = () => {
  editingDepartment.value = null
  departmentForm.value = {
    name: '',
    description: '',
    manager: '',
    phone: '',
    status: 'active'
  }
  dialogVisible.value = true
}

// 编辑部门
const editDepartment = (department) => {
  editingDepartment.value = department
  departmentForm.value = {
    name: department.name,
    description: department.description,
    manager: department.manager,
    phone: department.phone,
    status: department.status
  }
  dialogVisible.value = true
}

// 保存部门
const saveDepartment = () => {
  // TODO: 调用后端API保存数据
  const newDepartment = {
    id: editingDepartment.value?.id || Date.now(),
    ...departmentForm.value,
    workerCount: editingDepartment.value?.workerCount || 0
  }

  if (editingDepartment.value) {
    const index = departments.value.findIndex(dept => dept.id === editingDepartment.value.id)
    if (index !== -1) {
      departments.value[index] = newDepartment
    }
    ElMessage.success('部门修改成功')
  } else {
    departments.value.push(newDepartment)
    ElMessage.success('部门添加成功')
  }
  dialogVisible.value = false
}

// 切换部门状态
const toggleStatus = (department) => {
  department.status = department.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(`部门已${department.status === 'active' ? '启用' : '停用'}`)
}

// 删除部门
const deleteDepartment = (department) => {
  ElMessageBox.confirm(
    '确定要删除该部门吗？删除后无法恢复。',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = departments.value.findIndex(dept => dept.id === department.id)
    if (index !== -1) {
      departments.value.splice(index, 1)
    }
    ElMessage.success('部门删除成功')
  })
}
</script>

<style scoped>
.department-page {
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

.department-list {
  padding: 15px;
}

.department-item {
  margin-bottom: 15px;
}

.department-info {
  margin-bottom: 15px;
}

.department-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.department-name {
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
}

.department-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.department-stats {
  display: flex;
  gap: 15px;
  color: #909399;
  font-size: 14px;
}

.actions {
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
