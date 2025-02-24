<template>
  <div class="home-container">
    <!-- 头部 -->
    <div class="header">
      <h2>鑫永佳专业美缝</h2>
      <p>匠心施工店</p>
    </div>

    <!-- 快速功能区 -->
    <div class="quick-actions">
      <el-button type="primary" size="large" @click="quickRegister('瓷砖美缝')">
        <el-icon><Edit /></el-icon>
        快速登记
      </el-button>
      <el-button type="info" size="large" @click="router.push('/order-query')">
        <el-icon><Search /></el-icon>
        订单查询
      </el-button>
    </div>

    <!-- 服务类型 -->
    <div class="service-section">
      <h3>我们的服务</h3>
      <div class="service-grid">
        <div class="service-item" @click="quickRegister('装修服务')">
          <el-icon><House /></el-icon>
          <span>装修服务</span>
          <p>专业施工，品质保证</p>
        </div>
        <div class="service-item" @click="quickRegister('维修服务')">
          <el-icon><Tools /></el-icon>
          <span>维修服务</span>
          <p>快速响应，及时检修</p>
        </div>
        <div class="service-item" @click="quickRegister('清洁服务')">
          <el-icon><Brush /></el-icon>
          <span>清洁服务</span>
          <p>专业清洗，焕然一新</p>
        </div>
        <div class="service-item" @click="quickRegister('其他服务')">
          <el-icon><More /></el-icon>
          <span>其他服务</span>
          <p>更多服务，满足所需</p>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="contact-section">
      <h3>联系我们</h3>
      <p>贴心为您提供专业服务</p>
      <div class="contact-info">
        <a href="tel:400-888-8888" class="phone">400-888-8888</a>
        <p class="time">服务时间：周一至周日日 9:00-18:00</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { 
  Edit,
  Search,
  House,
  Tools,
  Brush,
  More
} from '@element-plus/icons-vue'

const router = useRouter()

// 快速登记函数
const quickRegister = (serviceType) => {
  router.push({
    path: '/registration-form',
    query: { serviceType }
  })
}
</script>

<style scoped lang="scss">
.home-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;

  .header {
    background: linear-gradient(135deg, #409EFF 0%, #2c88e6 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: center;

    h2 {
      margin: 0;
      font-size: 24px;
    }

    p {
      margin: 5px 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
  }

  .quick-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .el-button {
      padding: 15px 30px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: bold;

      .el-icon {
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }

  .service-section {
    margin-bottom: 30px;

    h3 {
      margin: 0 0 15px;
      font-size: 18px;
      color: #303133;
    }

    .service-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;

      .service-item {
        background: white;
        padding: 15px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
        }

        .el-icon {
          font-size: 24px;
          color: #409EFF;
          margin-bottom: 8px;
        }

        span {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        p {
          margin: 0;
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }

  .contact-section {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    h3 {
      margin: 0 0 5px;
      font-size: 18px;
      color: #303133;
    }

    p {
      margin: 0 0 15px;
      font-size: 14px;
      color: #909399;
    }

    .contact-info {
      .phone {
        display: block;
        font-size: 24px;
        color: #409EFF;
        text-decoration: none;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .time {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}
</style>
