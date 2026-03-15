import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
  mode: 'hash', 
  routes,
  // 切换路由时自动回到顶部，增强丝滑感
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局前置守卫（预留）
router.beforeEach((to, from, next) => {
  // 可以在这里处理页面标题等
  if (to.meta.title) {
    document.title = `智赋千影 - ${to.meta.title}`;
  }
  next()
})

export default router