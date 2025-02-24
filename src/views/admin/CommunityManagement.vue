<template>
  <div class="community-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>小区管理</h3>
          <el-button type="primary" @click="showAddDialog">添加小区</el-button>
        </div>
      </template>

      <el-table :data="communities" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="小区名称" />
        <el-table-column prop="address" label="小区地址" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editCommunity(row)">
              编辑
            </el-button>
            <el-button type="danger" link @click="deleteCommunity(row)">
              删除
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

    <!-- 添加/编辑小区对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加小区' : '编辑小区'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="小区名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入小区名称" />
        </el-form-item>
        <el-form-item label="小区地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入小区地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const communities = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)

const form = ref({
  name: '',
  address: ''
})

const rules = {
  name: [
    { required: true, message: '请输入小区名称', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入小区地址', trigger: 'blur' }
  ]
}

// 获取小区列表
const fetchCommunities = async () => {
  try {
    // TODO: 替换为实际的 API 调用
    communities.value = [
      {
        id: 1,
        name: '示例小区1',
        address: '北京市朝阳区示例路1号',
        createTime: '2024-02-23 10:00:00'
      }
    ]
    total.value = 1
  } catch (e) {
    console.error('获取小区列表失败：', e)
    ElMessage.error('获取小区列表失败')
  }
}

// 显示添加对话框
const showAddDialog = () => {
  dialogType.value = 'add'
  form.value = {
    name: '',
    address: ''
  }
  dialogVisible.value = true
}

// 编辑小区
const editCommunity = (row) => {
  dialogType.value = 'edit'
  form.value = {
    id: row.id,
    name: row.name,
    address: row.address
  }
  dialogVisible.value = true
}

// 删除小区
const deleteCommunity = async (row) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该小区吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // TODO: 替换为实际的 API 调用
    console.log('删除小区：', row.id)
    ElMessage.success('删除成功')
    fetchCommunities()
  } catch (e) {
    if (e !== 'cancel') {
      console.error('删除小区失败：', e)
      ElMessage.error('删除小区失败')
    }
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // TODO: 替换为实际的 API 调用
        console.log('提交的表单数据：', {
          type: dialogType.value,
          data: form.value
        })
        
        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        dialogVisible.value = false
        fetchCommunities()
      } catch (e) {
        console.error('提交失败：', e)
        ElMessage.error('提交失败，请重试')
      }
    }
  })
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchCommunities()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchCommunities()
}

onMounted(() => {
  fetchCommunities()
})
</script>

<style scoped lang="scss">
.community-management {
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
