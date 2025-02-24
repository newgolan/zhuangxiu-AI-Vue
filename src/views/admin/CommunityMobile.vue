<template>
  <div class="community-mobile">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">小区管理</span>
      <el-icon class="add-icon" @click="showAddDialog"><Plus /></el-icon>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索小区名称"
        clearable
        prefix-icon="Search"
      >
      </el-input>
    </div>

    <!-- 小区列表 -->
    <div class="community-list">
      <el-card v-for="item in filteredCommunities" :key="item.id" class="community-item">
        <div class="community-info">
          <h3>{{ item.name }}</h3>
          <p class="address">
            <el-icon><Location /></el-icon>
            {{ item.address }}
          </p>
          <div class="stats">
            <span class="stat-item">
              <el-icon><House /></el-icon>
              {{ item.buildingCount }}栋楼
            </span>
            <span class="stat-item">
              <el-icon><User /></el-icon>
              {{ item.unitCount }}户
            </span>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" size="small" @click="editCommunity(item)">编辑</el-button>
          <el-button type="danger" size="small" @click="confirmDelete(item)">删除</el-button>
        </div>
      </el-card>
    </div>

    <!-- 加载更多 -->
    <div class="load-more" v-if="hasMore">
      <el-button type="text" @click="loadMore">加载更多</el-button>
    </div>

    <!-- 添加/编辑小区对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingCommunity ? '编辑小区' : '添加小区'"
      width="90%"
      class="mobile-dialog"
    >
      <el-form ref="formRef" :model="communityForm" :rules="rules" label-position="top">
        <el-form-item label="小区名称" prop="name">
          <el-input v-model="communityForm.name" placeholder="请输入小区名称"></el-input>
        </el-form-item>
        <el-form-item label="小区地址" prop="address">
          <el-input v-model="communityForm.address" placeholder="请输入小区地址"></el-input>
        </el-form-item>
        <el-form-item label="楼栋数量" prop="buildingCount">
          <el-input-number v-model="communityForm.buildingCount" :min="1" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="户数" prop="unitCount">
          <el-input-number v-model="communityForm.unitCount" :min="1" controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCommunity">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Location, House, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const searchText = ref('')
const dialogVisible = ref(false)
const editingCommunity = ref(null)
const page = ref(1)
const hasMore = ref(true)

// 表单数据
const communityForm = ref({
  name: '',
  address: '',
  buildingCount: 1,
  unitCount: 1
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入小区地址', trigger: 'blur' }],
  buildingCount: [{ required: true, message: '请输入楼栋数量', trigger: 'blur' }],
  unitCount: [{ required: true, message: '请输入户数', trigger: 'blur' }]
}

// 模拟小区数据
const communities = ref([
  {
    id: 1,
    name: '阳光花园',
    address: '北京市朝阳区阳光街100号',
    buildingCount: 12,
    unitCount: 1200
  },
  {
    id: 2,
    name: '翠湖园',
    address: '北京市海淀区翠湖路88号',
    buildingCount: 8,
    unitCount: 800
  }
])

// 根据搜索过滤小区列表
const filteredCommunities = computed(() => {
  if (!searchText.value) return communities.value
  const keyword = searchText.value.toLowerCase()
  return communities.value.filter(item => 
    item.name.toLowerCase().includes(keyword) ||
    item.address.toLowerCase().includes(keyword)
  )
})

// 显示添加对话框
const showAddDialog = () => {
  editingCommunity.value = null
  communityForm.value = {
    name: '',
    address: '',
    buildingCount: 1,
    unitCount: 1
  }
  dialogVisible.value = true
}

// 编辑小区
const editCommunity = (community) => {
  editingCommunity.value = community
  communityForm.value = { ...community }
  dialogVisible.value = true
}

// 保存小区
const saveCommunity = async () => {
  // TODO: 调用后端API保存数据
  if (editingCommunity.value) {
    const index = communities.value.findIndex(item => item.id === editingCommunity.value.id)
    if (index !== -1) {
      communities.value[index] = { ...editingCommunity.value, ...communityForm.value }
    }
    ElMessage.success('小区信息已更新')
  } else {
    communities.value.push({
      id: Date.now(),
      ...communityForm.value
    })
    ElMessage.success('小区添加成功')
  }
  dialogVisible.value = false
}

// 确认删除
const confirmDelete = (community) => {
  ElMessageBox.confirm(
    '确定要删除该小区吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用后端API删除数据
    const index = communities.value.findIndex(item => item.id === community.id)
    if (index !== -1) {
      communities.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
  })
}

// 加载更多
const loadMore = () => {
  page.value++
  // TODO: 调用后端API加载更多数据
  hasMore.value = false
}
</script>

<style scoped>
.community-mobile {
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

.search-bar {
  padding: 10px 15px;
  background-color: #fff;
  position: sticky;
  top: 44px;
  z-index: 1;
}

.community-list {
  padding: 10px 15px;
}

.community-item {
  margin-bottom: 10px;
}

.community-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #303133;
}

.address {
  margin: 0 0 8px;
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stats {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #909399;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.load-more {
  text-align: center;
  margin-top: 20px;
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
