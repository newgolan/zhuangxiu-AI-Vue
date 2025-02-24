<template>
  <div class="about-container">
    <!-- 头部 -->
    <div class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>鑫永佳专业美缝</h2>
      <p>匠心施工店</p>
    </div>

    <!-- 公司简介视频 -->
    <div class="video-section">
      <video 
        class="intro-video" 
        :src="'http://t.cn/A61SM1AM'" 
        poster="@/assets/video-poster.jpg"
        controls
        preload="none"
      >
        您的浏览器不支持视频播放
      </video>
    </div>

    <!-- 服务优势 -->
    <div class="advantages-section">
      <h3>服务优势</h3>
      <div class="advantages-grid">
        <div class="advantage-item">
          <el-icon><Medal /></el-icon>
          <h4>专业品质</h4>
          <p>十年施工经验，专业团队保障</p>
        </div>
        <div class="advantage-item">
          <el-icon><Timer /></el-icon>
          <h4>快速响应</h4>
          <p>24小时内上门，高效服务</p>
        </div>
        <div class="advantage-item">
          <el-icon><PriceTag /></el-icon>
          <h4>透明定价</h4>
          <p>明码标价，无隐形收费</p>
        </div>
        <div class="advantage-item">
          <el-icon><Service /></el-icon>
          <h4>优质服务</h4>
          <p>贴心售后，品质保障</p>
        </div>
      </div>
    </div>

    <!-- 服务展示 -->
    <div class="services-section">
      <h3>服务项目</h3>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="service in services" :key="service.name">
          <div class="service-card" :style="{ backgroundImage: `url(${service.image})` }">
            <div class="service-info">
              <h4>{{ service.name }}</h4>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 用户评价 -->
    <div class="testimonials-section">
      <h3>用户评价</h3>
      <el-carousel :interval="3000" indicator-position="outside" height="180px">
        <el-carousel-item v-for="testimonial in testimonials" :key="testimonial.name">
          <div class="testimonial-card">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="user-avatar" />
            <div class="testimonial-content">
              <h4>{{ testimonial.name }}</h4>
              <el-rate
                v-model="testimonial.rating"
                disabled
                show-score
                text-color="#ff9900"
              />
              <p>{{ testimonial.comment }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 资质认证 -->
    <div class="certifications-section">
      <h3>资质认证</h3>
      <div class="cert-grid">
        <div v-for="cert in certifications" :key="cert.name" class="cert-item">
          <img :src="cert.image" :alt="cert.name" />
          <span>{{ cert.name }}</span>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="contact-section">
      <h3>联系我们</h3>
      <div class="contact-info">
        <div class="contact-item">
          <el-icon><Phone /></el-icon>
          <a href="tel:400-888-8888">400-888-8888</a>
        </div>
        <div class="contact-item">
          <el-icon><Location /></el-icon>
          <span>浙江省杭州市西湖区文三路XXX号</span>
        </div>
        <div class="contact-item">
          <el-icon><Clock /></el-icon>
          <span>工作时间：09:00-18:00</span>
        </div>
      </div>
      <div class="qrcode">
        <img src="/qrcode.jpg" alt="微信二维码" />
        <span>扫码关注公众号</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Medal, Timer, PriceTag, Service, Phone, Location, Clock } from '@element-plus/icons-vue'

const services = ref([
  {
    name: '瓷砖美缝',
    description: '专业美缝施工，品质保证',
    image: '/services/cleaning.jpg'
  },
  {
    name: '装修服务',
    description: '一站式装修解决方案',
    image: '/services/deep-cleaning.jpg'
  },
  {
    name: '维修服务',
    description: '快速响应，及时检修',
    image: '/services/appliance.jpg'
  },
  {
    name: '清洁服务',
    description: '专业清洗，焕然一新',
    image: '/services/maternal.jpg'
  }
])

const testimonials = ref([
  {
    name: '张先生',
    rating: 5,
    comment: '服务很专业，施工质量很好，非常满意！',
    avatar: '/avatars/user1.jpg'
  },
  {
    name: '李女士',
    rating: 5,
    comment: '师傅很细心，价格透明，服务到位。',
    avatar: '/avatars/user2.jpg'
  },
  {
    name: '王先生',
    rating: 4.5,
    comment: '响应速度快，服务态度好，推荐。',
    avatar: '/avatars/user3.jpg'
  }
])

const certifications = ref([
  {
    name: 'ISO9001认证',
    image: '/certs/iso9001.jpg'
  },
  {
    name: '3A级信用',
    image: '/certs/aaa.jpg'
  },
  {
    name: '健康安全',
    image: '/certs/health.jpg'
  },
  {
    name: '服务认证',
    image: '/certs/service.jpg'
  }
])
</script>

<style scoped lang="scss">
.about-container {
  background-color: #f5f7fa;
  min-height: 100vh;

  .header {
    background: linear-gradient(135deg, #409EFF 0%, #2c88e6 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;

    .logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

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

  .video-section {
    margin: 20px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .intro-video {
      width: 100%;
      display: block;
    }
  }

  .advantages-section,
  .services-section,
  .testimonials-section,
  .certifications-section,
  .contact-section {
    margin: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    h3 {
      margin: 0 0 20px;
      font-size: 18px;
      color: #303133;
      text-align: center;
    }
  }

  .advantages-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .advantage-item {
      text-align: center;
      padding: 15px;
      border-radius: 8px;
      background: #f5f7fa;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      .el-icon {
        font-size: 32px;
        color: #409EFF;
        margin-bottom: 10px;
      }

      h4 {
        margin: 0 0 5px;
        font-size: 16px;
        color: #303133;
      }

      p {
        margin: 0;
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .service-card {
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    position: relative;

    .service-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      border-radius: 0 0 8px 8px;

      h4 {
        margin: 0 0 5px;
        font-size: 16px;
      }

      p {
        margin: 0;
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }

  .testimonial-card {
    padding: 20px;
    display: flex;
    align-items: center;

    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 15px;
    }

    .testimonial-content {
      flex: 1;

      h4 {
        margin: 0 0 5px;
        font-size: 16px;
        color: #303133;
      }

      .el-rate {
        margin: 5px 0;
      }

      p {
        margin: 10px 0 0;
        font-size: 14px;
        color: #606266;
      }
    }
  }

  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .cert-item {
      text-align: center;

      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 5px;
      }

      span {
        font-size: 12px;
        color: #606266;
      }
    }
  }

  .contact-section {
    .contact-info {
      margin-bottom: 20px;

      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .el-icon {
          font-size: 20px;
          color: #409EFF;
          margin-right: 10px;
        }

        a {
          color: #409EFF;
          text-decoration: none;
          font-size: 16px;
        }

        span {
          color: #606266;
          font-size: 14px;
        }
      }
    }

    .qrcode {
      text-align: center;

      img {
        width: 150px;
        height: 150px;
        margin-bottom: 10px;
      }

      span {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>
