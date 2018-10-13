import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('components/Login.vue')
const Layout = () => import('components/Layout.vue')
const Home = () => import('components/Home.vue')

const Goods = () => import('components/Goods.vue')
const GoodsDetail = () => import('components/GoodsDetail.vue')
const GoodsList = () => import('components/GoodsList.vue')

const Assessment = () => import('components/Assessment.vue')
const Order = () => import('components/Order.vue')
const Rotate = () => import('components/Rotate.vue')
const VipAdmin = () => import('components/VipAdmin.vue')

export const allRoutesMap = [
    {
        path: '/home',
        name: '首页',
        component: Layout,
        children: [
            {
                path: '',
                name: '首页-欢迎',
                component: Home
            },
            {
                path: 'goods',
                name: '商品列表',
                component: Goods,
                redirect:'/home/goods/goodsList',
                children: [
                    {
                        path: 'goodsList',
                        name: '商品-列表',
                        component: GoodsList,
                    },
                    {
                        path: 'goodsdetail',
                        name: '商品详情',
                        component: GoodsDetail
                    }
                ]
            },

            {
                path: 'order',
                name: '订单管理',
                component: Order
            },
            {
                path: 'assessment',
                name: '评价管理',
                component: Assessment
            },
            {
                path: 'rotate',
                name: '轮播图管理',
                component: Rotate
            }
        ]
    },
    {
        path: '/vip',
        component: Layout,
        name: '会员',
        children: [
            {
                path: '',
                name: '会员-欢迎',
                component: VipAdmin
            },
            {
                path: 'vipAdmin',
                name: '会员管理',
                component: VipAdmin
            }
        ]
    }
]

export const constantRouterMap = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export default new VueRouter({routes: constantRouterMap})