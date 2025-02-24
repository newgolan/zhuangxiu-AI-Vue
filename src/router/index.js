import { createRouter, createWebHistory } from 'vue-router'
import Registration from '../views/user/Registration.vue'
import RegistrationForm from '../views/user/RegistrationForm.vue'
import UserForm from '../views/user/UserForm.vue'
import OrderQuery from '../views/user/OrderQuery.vue'
import Services from '../views/user/Services.vue'
import Profile from '../views/user/Profile.vue'
import WorkOrderMobile from '../views/admin/WorkOrderMobile.vue'
import CommunityMobile from '../views/admin/CommunityMobile.vue'
import WorkerMobile from '../views/admin/WorkerMobile.vue'
import About from '../views/user/About.vue'

const routes = [
  {
    path: '/',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/registration-form',
    name: 'RegistrationForm',
    component: RegistrationForm
  },
  {
    path: '/user-form',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/order-query',
    name: 'OrderQuery',
    component: OrderQuery
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/work-orders',
    name: 'WorkOrders',
    component: WorkOrderMobile
  },
  {
    path: '/work-order/:id',
    name: 'WorkOrderDetail',
    component: () => import('../views/admin/WorkOrderDetail.vue')
  },
  {
    path: '/communities',
    name: 'Communities',
    component: CommunityMobile
  },
  {
    path: '/workers',
    name: 'Workers',
    component: WorkerMobile
  },
  {
    path: '/departments',
    name: 'Departments',
    component: () => import('../views/admin/DepartmentMobile.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/user/Address.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/user/Favorites.vue')
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: () => import('../views/user/Coupons.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/user/Settings.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
