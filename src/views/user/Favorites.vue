<template>
  <div class="favorites-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">我的收藏</span>
    </div>

    <!-- 收藏列表 -->
    <div class="favorites-list" v-if="favorites.length > 0">
      <el-card v-for="item in favorites" :key="item.id" class="favorite-item">
        <div class="service-info">
          <img :src="item.image" class="service-image" />
          <div class="service-details">
            <div class="service-name">{{ item.name }}</div>
            <div class="service-desc">{{ item.description }}</div>
            <div class="service-price">¥{{ item.price }}</div>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" size="small" @click="orderService(item)">
            立即预约
          </el-button>
          <el-button type="danger" size="small" @click="removeFavorite(item)">
            取消收藏
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 空状态 -->
    <el-empty
      v-else
      description="暂无收藏"
      :image-size="200"
    >
      <el-button type="primary" @click="router.push('/services')">去浏览服务</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 模拟收藏数据
const favorites = ref([
  {
    id: 1,
    name: '标准保洁服务',
    description: '专业保洁人员提供2小时标准保洁服务',
    price: 99,
    image: 'https://example.com/cleaning.jpg'
  },
  {
    id: 2,
    name: '管道疏通服务',
    description: '专业工具，快速疏通各类管道堵塞',
    price: 150,
    image: 'https://example.com/plumbing.jpg'
  }
])

// 预约服务
const orderService = (service) => {
  router.push({
    path: '/registration-form',
    query: { serviceId: service.id }
  })
}

// 取消收藏
const removeFavorite = (service) => {
  ElMessageBox.confirm(
    '确定要取消收藏该服务吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = favorites.value.findIndex(item => item.id === service.id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    }
    ElMessage.success('已取消收藏')
  })
}
</script>

<style scoped>
.favorites-page {
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

.favorites-list {
  padding: 15px;
}

.favorite-item {
  margin-bottom: 15px;
}

.service-info {
  display: flex;
  margin-bottom: 15px;
}

.service-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.service-details {
  flex: 1;
}

.service-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.service-desc {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 500;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

:deep(.el-empty) {
  padding: 60px 0;
}
</style>
