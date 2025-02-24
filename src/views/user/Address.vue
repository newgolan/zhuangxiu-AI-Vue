<template>
  <div class="address-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">我的地址</span>
      <el-icon class="add-icon" @click="showAddDialog"><Plus /></el-icon>
    </div>

    <!-- 地址列表 -->
    <div class="address-list">
      <el-card v-for="address in addresses" :key="address.id" class="address-item">
        <div class="address-info">
          <div class="user-info">
            <span class="name">{{ address.name }}</span>
            <span class="phone">{{ address.phone }}</span>
            <el-tag size="small" type="success" v-if="address.isDefault">默认</el-tag>
          </div>
          <div class="address-text">{{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}</div>
        </div>
        <div class="actions">
          <el-button type="text" size="small" @click="editAddress(address)">
            <el-icon><Edit /></el-icon> 编辑
          </el-button>
          <el-button type="text" size="small" @click="setDefault(address)" v-if="!address.isDefault">
            <el-icon><Star /></el-icon> 设为默认
          </el-button>
          <el-button type="text" size="small" @click="deleteAddress(address)">
            <el-icon><Delete /></el-icon> 删除
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 添加/编辑地址对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingAddress ? '编辑地址' : '新增地址'"
      width="90%"
      class="mobile-dialog"
    >
      <el-form ref="formRef" :model="addressForm" :rules="rules" label-position="top">
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addressForm.name" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="region">
          <el-cascader
            v-model="addressForm.region"
            :options="regionOptions"
            placeholder="请选择所在地区"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input
            v-model="addressForm.detail"
            type="textarea"
            rows="3"
            placeholder="请输入详细地址，如街道、门牌号等"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addressForm.isDefault">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAddress">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Edit, Star, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const dialogVisible = ref(false)
const editingAddress = ref(null)

// 表单数据
const addressForm = ref({
  name: '',
  phone: '',
  region: [],
  detail: '',
  isDefault: false
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  region: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
  detail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
}

// 模拟地址数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '某某小区1号楼1单元101',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '某某花园2号楼3单元303',
    isDefault: false
  }
])

// 模拟地区数据
const regionOptions = [
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '北京市',
        label: '北京市',
        children: [
          { value: '朝阳区', label: '朝阳区' },
          { value: '海淀区', label: '海淀区' }
        ]
      }
    ]
  }
]

// 显示添加对话框
const showAddDialog = () => {
  editingAddress.value = null
  addressForm.value = {
    name: '',
    phone: '',
    region: [],
    detail: '',
    isDefault: false
  }
  dialogVisible.value = true
}

// 编辑地址
const editAddress = (address) => {
  editingAddress.value = address
  addressForm.value = {
    name: address.name,
    phone: address.phone,
    region: [address.province, address.city, address.district],
    detail: address.detail,
    isDefault: address.isDefault
  }
  dialogVisible.value = true
}

// 保存地址
const saveAddress = () => {
  // TODO: 调用后端API保存数据
  const [province, city, district] = addressForm.value.region
  const newAddress = {
    id: editingAddress.value?.id || Date.now(),
    name: addressForm.value.name,
    phone: addressForm.value.phone,
    province,
    city,
    district,
    detail: addressForm.value.detail,
    isDefault: addressForm.value.isDefault
  }

  if (addressForm.value.isDefault) {
    addresses.value.forEach(addr => addr.isDefault = false)
  }

  if (editingAddress.value) {
    const index = addresses.value.findIndex(addr => addr.id === editingAddress.value.id)
    if (index !== -1) {
      addresses.value[index] = newAddress
    }
    ElMessage.success('地址修改成功')
  } else {
    addresses.value.push(newAddress)
    ElMessage.success('地址添加成功')
  }
  dialogVisible.value = false
}

// 设置默认地址
const setDefault = (address) => {
  addresses.value.forEach(addr => addr.isDefault = addr.id === address.id)
  ElMessage.success('默认地址设置成功')
}

// 删除地址
const deleteAddress = (address) => {
  ElMessageBox.confirm(
    '确定要删除该地址吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = addresses.value.findIndex(addr => addr.id === address.id)
    if (index !== -1) {
      addresses.value.splice(index, 1)
    }
    ElMessage.success('地址删除成功')
  })
}
</script>

<style scoped>
.address-page {
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

.address-list {
  padding: 15px;
}

.address-item {
  margin-bottom: 15px;
}

.address-info {
  margin-bottom: 15px;
}

.user-info {
  margin-bottom: 8px;
}

.name {
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
}

.phone {
  color: #606266;
  margin-right: 10px;
}

.address-text {
  color: #303133;
  line-height: 1.4;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
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
