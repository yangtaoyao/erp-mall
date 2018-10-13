import router, { allRoutesMap } from 'routes'
import store from 'store'
import { getToken } from 'assets/js/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'  // Progress 进度条样式
// import { getNavList } from 'api'

const list = [
    { // 一级
        title: '首页',
        link: '/home',
        iconName: 'home',
        list: [
            { // 二级
                title: '商品管理',
                link: '',
                iconName: 'goods',
                list: [
                    { // 三级
                        title: '商品列表',
                        link: '/home/goods',
                        iconName: ''
                    }
                ]
            },
            {
                title: '订单管理',
                link: '',
                iconName: 'tickets',
                list: [
                    {
                        title: '订单管理',
                        link: '/home/order',
                        iconName: ''
                    }
                ]
            },
            {
                title: '评价管理',
                link: '',
                iconName: 'message',
                list: [
                    {
                        title: '评价管理',
                        link: '/home/assessment',
                        iconName: ''
                    }
                ]
            },
            {
                title: '轮播图管理',
                link: '',
                iconName: 'picture-outline',
                list: [
                    {
                        title: '轮播图管理',
                        link: '/home/rotate',
                        iconName: ''
                    }
                ]
            }
        ]
    },
    {
        title: '会员',
        link: '/vip',
        iconName: 'task',
        list: [
            {
                title: '会员管理',
                link: '',
                iconName: 'menu',
                list: [
                    {
                        title: '会员管理',
                        link: '/vip/vipAdmin',
                        iconName: ''
                    }
                ]
            }
        ]
    }
]

// 不重定向白名单
const whiteList = ['/login']

// 生成路由列表方法
const GenerateRoutes = (routesMap, navList) => {
    // console.log(routesMap, navList)

    const routes = routesMap.map(item => {
        if (navList.some(val => item.name === val.title)){
            return item
        }
    })

    routes.forEach(item => {
        let _arr = []
        let element = navList.find(val => val.title === item.name)
        element.list.forEach(val => {_arr = _arr.concat(val.list)})
        for (let i = 0; i < item.children.length; i++){
            if (item.children[i].path != '' && !(_arr.some(val => item.children[i].name === val.title))){
                item.children.splice(i, 1)
                i--
            }
        }
    })

    routes.push({ path: '*', redirect: routes[0].path, hidden: true })

    return routes
}

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if ( getToken() ){ // 判断是否登录，成功登录
        if (to.path === '/login'){
            next('/')
        } else { // 判断是否已经动态生成了路由表
            if ( store.getters.navList.length == 0 ){
                // 获取应用导航列表
                //const response = await getNavList()
                // 通过 vuex 管理导航数据
                store.dispatch('createNavList', list)
                // 生成可访问的路由表
                router.addRoutes(GenerateRoutes(allRoutesMap, list))
                // hack 方法 确保 addRoutes 已完成
                next({ ...to, replace: true })
            } else {
                next()
            }
        }
    } else { // 非登录
        if (whiteList.indexOf(to.path) !== -1){
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
