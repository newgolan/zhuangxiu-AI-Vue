<template>
  <div class="registration-form">
    <div class="form-header">
      <el-page-header @back="router.back()" title="返回" content="服务登记" />
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="registration-form-content"
    >
      <!-- 服务类型 -->
      <el-form-item label="服务类型" prop="serviceType">
        <el-select 
          v-model="form.serviceType" 
          class="service-type-select"
          :disabled="!!route.query.serviceType"
        >
          <el-option 
            v-if="route.query.serviceType" 
            :label="route.query.serviceType" 
            :value="route.query.serviceType" 
          />
        </el-select>
      </el-form-item>

      <!-- 其他服务需求描述 -->
      <el-form-item 
        v-if="form.serviceType === '其他服务'" 
        label="需求描述" 
        prop="serviceDescription"
      >
        <el-input
          v-model="form.serviceDescription"
          type="textarea"
          :maxlength="100"
          :rows="4"
          show-word-limit
          placeholder="请详细描述您的服务需求（最多100字）"
        />
      </el-form-item>

      <!-- 基本信息 -->
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入您的姓名" />
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入您的联系电话" />
      </el-form-item>

      <el-form-item label="服务地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入服务地址" />
      </el-form-item>

      <el-form-item label="预约时间" prop="appointmentTime">
        <el-date-picker
          v-model="form.appointmentTime"
          type="datetime"
          placeholder="选择预约时间"
          format="YYYY-MM-DD HH:mm"
          value-format="YYYY-MM-DD HH:mm"
          :disabled-date="disabledDate"
          :disabled-hours="disabledHours"
        />
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="form.remarks"
          type="textarea"
          :rows="3"
          placeholder="其他需要说明的事项（选填）"
        />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm" class="submit-button">
          提交登记
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)

// 表单数据
const form = ref({
  serviceType: '瓷砖美缝', // 默认选择瓷砖美缝
  serviceDescription: '',
  name: '',
  phone: '',
  address: '',
  appointmentTime: '',
  remarks: ''
})

// 表单验证规则
const rules = {
  serviceType: [
    { required: true, message: '请选择服务类型', trigger: 'change' }
  ],
  serviceDescription: [
    { required: true, message: '请填写服务需求描述', trigger: 'blur' },
    { max: 100, message: '描述不能超过100字', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, message: '姓名至少2个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入服务地址', trigger: 'blur' }
  ],
  appointmentTime: [
    { required: true, message: '请选择预约时间', trigger: 'change' }
  ]
}

// 禁用今天之前的日期
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}

// 禁用非工作时间
const disabledHours = () => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    if (i < 9 || i >= 18) { // 9:00-18:00 之外的时间禁用
      hours.push(i)
    }
  }
  return hours
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 这里添加提交表单的逻辑
      ElMessage.success('登记成功！')
      router.push('/registration-success')
    } else {
      console.log('表单验证失败:', fields)
    }
  })
}

// 根据路由参数设置初始服务类型
onMounted(() => {
  const serviceType = route.query.serviceType
  if (serviceType) {
    form.value.serviceType = serviceType
  }
})
</script>

<style scoped lang="scss">
.registration-form {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;

  .form-header {
    margin-bottom: 20px;
  }

  .registration-form-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .service-type-select {
      width: 100%;
    }

    .submit-button {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
</style>
