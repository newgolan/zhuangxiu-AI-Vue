<template>
  <div class="settings-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">设置</span>
    </div>

    <!-- 设置列表 -->
    <div class="settings-list">
      <!-- 账号设置 -->
      <div class="section-title">账号设置</div>
      <el-cell-group>
        <el-cell title="个人信息" is-link @click="router.push('/profile/edit')">
          <template #default>
            <span class="value-text">{{ userInfo.name }}</span>
          </template>
        </el-cell>
        <el-cell title="手机号码" is-link @click="showPhoneDialog">
          <template #default>
            <span class="value-text">{{ userInfo.phone }}</span>
          </template>
        </el-cell>
        <el-cell title="修改密码" is-link @click="showPasswordDialog"></el-cell>
      </el-cell-group>

      <!-- 通知设置 -->
      <div class="section-title">通知设置</div>
      <el-cell-group>
        <el-cell title="订单通知">
          <template #default>
            <el-switch v-model="settings.orderNotification" />
          </template>
        </el-cell>
        <el-cell title="优惠活动通知">
          <template #default>
            <el-switch v-model="settings.promotionNotification" />
          </template>
        </el-cell>
        <el-cell title="系统通知">
          <template #default>
            <el-switch v-model="settings.systemNotification" />
          </template>
        </el-cell>
      </el-cell-group>

      <!-- 隐私设置 -->
      <div class="section-title">隐私设置</div>
      <el-cell-group>
        <el-cell title="位置信息">
          <template #default>
            <el-switch v-model="settings.locationEnabled" />
          </template>
        </el-cell>
        <el-cell title="个人信息授权" is-link @click="showPrivacySettings"></el-cell>
      </el-cell-group>

      <!-- 其他设置 -->
      <div class="section-title">其他设置</div>
      <el-cell-group>
        <el-cell title="清除缓存" is-link @click="clearCache">
          <template #default>
            <span class="value-text">{{ cacheSize }}</span>
          </template>
        </el-cell>
        <el-cell title="检查更新" is-link @click="checkUpdate">
          <template #default>
            <span class="value-text">当前版本 {{ version }}</span>
          </template>
        </el-cell>
      </el-cell-group>

      <!-- 退出登录 -->
      <div class="logout-button">
        <el-button type="danger" @click="handleLogout">退出登录</el-button>
      </div>
    </div>

    <!-- 修改手机号码对话框 -->
    <el-dialog
      v-model="phoneDialogVisible"
      title="修改手机号码"
      width="90%"
      class="mobile-dialog"
    >
      <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormRef">
        <el-form-item label="新手机号码" prop="phone">
          <el-input v-model="phoneForm.phone" placeholder="请输入新手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="code-input">
            <el-input v-model="phoneForm.code" placeholder="请输入验证码"></el-input>
            <el-button type="primary" :disabled="countdown > 0" @click="sendCode">
              {{ countdown > 0 ? `${countdown}s后重新发送` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="phoneDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePhone">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      width="90%"
      class="mobile-dialog"
    >
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePassword">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '138****8888'
})

// 设置选项
const settings = ref({
  orderNotification: true,
  promotionNotification: true,
  systemNotification: true,
  locationEnabled: true
})

// 其他信息
const version = ref('1.0.0')
const cacheSize = ref('2.5MB')

// 手机号码修改
const phoneDialogVisible = ref(false)
const phoneForm = ref({
  phone: '',
  code: ''
})
const phoneRules = {
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
  ]
}
const countdown = ref(0)

// 密码修改
const passwordDialogVisible = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 发送验证码
const sendCode = () => {
  if (!phoneForm.value.phone) {
    ElMessage.warning('请先输入手机号码')
    return
  }
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  ElMessage.success('验证码已发送')
}

// 更新手机号码
const updatePhone = () => {
  // TODO: 调用后端API更新手机号码
  ElMessage.success('手机号码修改成功')
  phoneDialogVisible.value = false
}

// 更新密码
const updatePassword = () => {
  // TODO: 调用后端API更新密码
  ElMessage.success('密码修改成功')
  passwordDialogVisible.value = false
}

// 显示手机号码修改对话框
const showPhoneDialog = () => {
  phoneForm.value = {
    phone: '',
    code: ''
  }
  phoneDialogVisible.value = true
}

// 显示密码修改对话框
const showPasswordDialog = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  passwordDialogVisible.value = true
}

// 显示隐私设置
const showPrivacySettings = () => {
  router.push('/privacy-settings')
}

// 清除缓存
const clearCache = () => {
  ElMessageBox.confirm(
    '确定要清除缓存吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // TODO: 清除本地缓存
    ElMessage.success('缓存已清除')
    cacheSize.value = '0KB'
  })
}

// 检查更新
const checkUpdate = () => {
  ElMessage.info('当前已是最新版本')
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // TODO: 清除登录状态
    router.push('/login')
  })
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background-color: #f5f7fa;
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
  cursor: pointer;
}

.title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.section-title {
  font-size: 14px;
  color: #909399;
  padding: 15px;
  margin-bottom: -10px;
}

.value-text {
  font-size: 14px;
  color: #909399;
}

.logout-button {
  margin: 30px 15px;
}

.code-input {
  display: flex;
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
