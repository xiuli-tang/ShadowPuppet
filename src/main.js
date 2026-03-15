import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 全局样式/其他插件（如axios）可在此引入

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')