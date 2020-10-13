import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const ShopCart = () => import('views/shopcart/ShopCart.vue')
const Profile = () => import('views/profile/Profile.vue')
const GoodsDetail = () => import('views/detail/GoodsDetail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: []
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/ShopCart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: GoodsDetail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
