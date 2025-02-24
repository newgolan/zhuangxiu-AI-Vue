<template>
  <div class="coupons-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <el-icon class="back-icon" @click="router.back()"><ArrowLeft /></el-icon>
      <span class="title">我的优惠券</span>
    </div>

    <!-- 标签页 -->
    <el-tabs v-model="activeTab" class="coupon-tabs">
      <el-tab-pane label="可使用" name="valid">
        <div class="coupon-list" v-if="validCoupons.length > 0">
          <div v-for="coupon in validCoupons" :key="coupon.id" class="coupon-item">
            <div class="coupon-left">
              <div class="amount">
                <span class="symbol">¥</span>
                <span class="number">{{ coupon.amount }}</span>
              </div>
              <div class="condition">满{{ coupon.minSpend }}可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-desc">{{ coupon.description }}</div>
              <div class="coupon-time">{{ coupon.validUntil }} 前有效</div>
              <el-button type="primary" size="small" @click="useCoupon(coupon)">
                立即使用
              </el-button>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无可用优惠券" />
      </el-tab-pane>

      <el-tab-pane label="已使用" name="used">
        <div class="coupon-list" v-if="usedCoupons.length > 0">
          <div v-for="coupon in usedCoupons" :key="coupon.id" class="coupon-item used">
            <div class="coupon-left">
              <div class="amount">
                <span class="symbol">¥</span>
                <span class="number">{{ coupon.amount }}</span>
              </div>
              <div class="condition">满{{ coupon.minSpend }}可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-desc">{{ coupon.description }}</div>
              <div class="coupon-time">已使用</div>
            </div>
            <div class="used-mark">已使用</div>
          </div>
        </div>
        <el-empty v-else description="暂无已使用优惠券" />
      </el-tab-pane>

      <el-tab-pane label="已过期" name="expired">
        <div class="coupon-list" v-if="expiredCoupons.length > 0">
          <div v-for="coupon in expiredCoupons" :key="coupon.id" class="coupon-item expired">
            <div class="coupon-left">
              <div class="amount">
                <span class="symbol">¥</span>
                <span class="number">{{ coupon.amount }}</span>
              </div>
              <div class="condition">满{{ coupon.minSpend }}可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-desc">{{ coupon.description }}</div>
              <div class="coupon-time">已过期</div>
            </div>
            <div class="expired-mark">已过期</div>
          </div>
        </div>
        <el-empty v-else description="暂无已过期优惠券" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const activeTab = ref('valid')

// 模拟优惠券数据
const validCoupons = ref([
  {
    id: 1,
    name: '新用户专享券',
    description: '仅限首次预约使用',
    amount: 50,
    minSpend: 100,
    validUntil: '2025-03-31'
  },
  {
    id: 2,
    name: '全场通用券',
    description: '可用于任意服务',
    amount: 20,
    minSpend: 200,
    validUntil: '2025-03-15'
  }
])

const usedCoupons = ref([
  {
    id: 3,
    name: '节日特惠券',
    description: '限时优惠',
    amount: 30,
    minSpend: 150,
    validUntil: '2025-02-20'
  }
])

const expiredCoupons = ref([
  {
    id: 4,
    name: '周年庆优惠券',
    description: '限时特惠',
    amount: 100,
    minSpend: 500,
    validUntil: '2025-01-31'
  }
])

// 使用优惠券
const useCoupon = (coupon) => {
  router.push({
    path: '/services',
    query: { couponId: coupon.id }
  })
}
</script>

<style scoped>
.coupons-page {
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

.coupon-tabs {
  :deep(.el-tabs__header) {
    margin: 0;
    background: #fff;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }

  :deep(.el-tabs__item) {
    font-size: 14px;
  }
}

.coupon-list {
  padding: 15px;
}

.coupon-item {
  display: flex;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 25%;
    top: 0;
    width: 1px;
    height: 100%;
    background: repeating-linear-gradient(#e4e7ed 0, #e4e7ed 6px, transparent 6px, transparent 12px);
  }

  &.used,
  &.expired {
    opacity: 0.6;
  }
}

.coupon-left {
  width: 25%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f56c6c;
  color: #fff;
}

.amount {
  display: flex;
  align-items: baseline;
}

.symbol {
  font-size: 16px;
}

.number {
  font-size: 28px;
  font-weight: bold;
}

.condition {
  font-size: 12px;
  margin-top: 5px;
}

.coupon-right {
  flex: 1;
  padding: 15px;
}

.coupon-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.coupon-desc {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.coupon-time {
  font-size: 12px;
  color: #606266;
  margin-bottom: 8px;
}

.used-mark,
.expired-mark {
  position: absolute;
  right: -20px;
  top: 10px;
  background: #909399;
  color: #fff;
  transform: rotate(45deg);
  padding: 2px 25px;
  font-size: 12px;
}

:deep(.el-empty) {
  padding: 60px 0;
}
</style>
