import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/static/css/common.css'
import 'swiper/swiper.css'
import '../public/static/icon/iconfont.css'
import router from '@/router'
import store from '@/store'
import api from '@/request/api'
Vue.use(Element)

Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
