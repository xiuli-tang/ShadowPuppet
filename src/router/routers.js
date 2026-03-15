// 路由规则定义
const routes = [
  {
    path: '/',
    // 使用 Layout 组件包裹子路由，实现菜单栏持久化
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomePage/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'culture',
        name: '文化百科',
        component: () => import('@/views/CultureEncyclopedia/index.vue'),
        meta: { title: '文化百科' }
      },
      {
        path: 'workshop',
        name: '影戏工坊',
        component: () => import('@/views/ShadowPlayWorkshop/index.vue'),
        meta: { title: '影戏工坊' }
      },
      {
        path: 'journal',
        name: '影艺志',
        component: () => import('@/views/ShadowArtJournal/index.vue'),
        meta: { title: '影艺志' }
      },
      {
        path: 'about',
        name: '关于我们',
        component: () => import('@/views/AboutUs/index.vue'),
        meta: { title: '关于我们' }
      },
      {
        path: 'aistage',
        name: 'AI皮影戏',
        component: () => import('@/views/AIShadowPlay/index.vue'),
        meta: { title: 'AI皮影戏' }
      }
    ]
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('@/views/LoadingPage/index.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes