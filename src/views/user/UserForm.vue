<template>
  <div class="registration-container">
    <el-card class="registration-form">
      <template #header>
        <div class="form-header">
          <el-page-header @back="goBack" title="返回" :content="title" />
        </div>
      </template>
      
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        
        <el-form-item label="小区" prop="community">
          <el-select
            v-model="form.community"
            filterable
            allow-create
            placeholder="请选择或输入小区名称"
            style="width: 100%"
          >
            <el-option
              v-for="item in communities"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="详细地址" prop="address">
          <div class="map-container">
            <div id="map" style="height: 300px;"></div>
            <el-input
              v-model="form.address"
              type="textarea"
              rows="2"
              placeholder="请输入详细地址或在地图上选择位置"
            ></el-input>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 100%">提交登记</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AMapLoader from '@amap/amap-jsapi-loader'

const router = useRouter()
const title = '用户信息登记'

const formRef = ref(null)
const form = ref({
  name: '',
  phone: '',
  community: '',
  address: '',
  location: {
    lat: null,
    lng: null
  }
})

const communities = ref([])
let map = null

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  community: [{ required: true, message: '请选择或输入小区', trigger: 'change' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
}

const goBack = () => {
  router.push('/')
}

// 初始化地图
const initMap = async () => {
  try {
    window._AMapSecurityConfig = {
      securityJsCode: 'YOUR_SECURITY_JS_CODE' // 需要替换为实际的安全密钥
    }
    
    const AMap = await AMapLoader.load({
      key: 'YOUR_AMAP_KEY', // 需要替换为实际的高德地图 Key
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.PlaceSearch']
    })
    
    map = new AMap.Map('map', {
      zoom: 11,
      center: [116.397428, 39.90923]
    })
    
    // 添加点击事件
    map.on('click', async (e) => {
      const geocoder = new AMap.Geocoder()
      const lnglat = e.lnglat
      form.value.location = {
        lat: lnglat.getLat(),
        lng: lnglat.getLng()
      }
      
      geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          form.value.address = result.regeocode.formattedAddress
        }
      })
    })
  } catch (e) {
    console.error('地图加载失败：', e)
  }
}

// 获取小区列表
const fetchCommunities = async () => {
  try {
    // TODO: 替换为实际的 API 调用
    communities.value = [
      { id: 1, name: '示例小区1' },
      { id: 2, name: '示例小区2' }
    ]
  } catch (e) {
    console.error('获取小区列表失败：', e)
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // TODO: 替换为实际的 API 调用
        console.log('提交的表单数据：', form.value)
        ElMessage.success('提交成功')
        router.push('/')
      } catch (e) {
        console.error('提交失败：', e)
        ElMessage.error('提交失败，请重试')
      }
    }
  })
}

onMounted(() => {
  initMap()
  fetchCommunities()
})
</script>

<style scoped lang="scss">
.registration-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.registration-form {
  .form-header {
    padding: 10px 0;
  }
  
  .map-container {
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    
    #map {
      border: 1px solid #dcdfe6;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }
}
</style>
