<template>
  <div class="services-container">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索服务项目"
        clearable
        prefix-icon="Search"
      >
      </el-input>
    </div>

    <!-- 服务分类 -->
    <div class="service-categories">
      <el-tabs v-model="activeCategory">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="美缝服务" name="meifeng"></el-tab-pane>
        <el-tab-pane label="瓷砖维修" name="tile"></el-tab-pane>
        <el-tab-pane label="防水工程" name="waterproof"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 服务列表 -->
    <div class="service-list">
      <div v-for="service in filteredServices" :key="service.id" class="service-card">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="service.image" class="service-image">
          <div class="service-info">
            <h3>{{ service.name }}</h3>
            <p class="description">{{ service.description }}</p>
            <div class="price-action">
              <div class="price">
                <span class="amount">¥{{ service.price }}</span>
                <span class="unit">/{{ service.unit }}</span>
              </div>
              <el-button type="primary" size="small" @click="bookService(service)">
                立即预约
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchText = ref('')
const activeCategory = ref('all')

// 模拟服务数据
const services = [
  {
    id: 1,
    name: '瓷砖美缝',
    description: '专业美缝施工，品质保证，美观持久',
    price: 38,
    unit: '米',
    category: 'meifeng',
    image: 'https://example.com/meifeng.jpg' // 需要替换为实际图片
  },
  {
    id: 2,
    name: '瓷砖修复',
    description: '专业修复破损瓷砖，恢复如新',
    price: 150,
    unit: '片',
    category: 'tile',
    image: 'https://example.com/tile-repair.jpg'
  },
  {
    id: 3,
    name: '卫生间防水',
    description: '专业防水施工，彻底解决渗水问题',
    price: 180,
    unit: '平米',
    category: 'waterproof',
    image: 'https://example.com/waterproof.jpg'
  }
]

// 过滤服务列表
const filteredServices = computed(() => {
  let result = services
  
  // 按分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter(service => service.category === activeCategory.value)
  }
  
  // 按搜索关键词筛选
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(service => 
      service.name.toLowerCase().includes(keyword) ||
      service.description.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 预约服务
const bookService = (service) => {
  router.push({
    path: '/registration',
    query: { serviceId: service.id }
  })
}
</script>

<style scoped lang="scss">
.services-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 56px); // 减去底部导航栏的高度

  .search-bar {
    margin-bottom: 20px;
  }

  .service-categories {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 10px;
  }

  .service-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;

    .service-card {
      .service-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .service-info {
        padding: 15px;

        h3 {
          margin: 0 0 8px;
          font-size: 16px;
          color: #303133;
        }

        .description {
          margin: 0 0 12px;
          font-size: 14px;
          color: #909399;
          line-height: 1.4;
        }

        .price-action {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            .amount {
              font-size: 20px;
              font-weight: bold;
              color: #f56c6c;
            }

            .unit {
              font-size: 14px;
              color: #909399;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .service-list {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
