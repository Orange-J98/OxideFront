import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { UsersApi } from './api/UsersApi'
import './assets/tailwind.css'
import './plugins/element.js'
import * as echarts from 'echarts'
import moment from 'moment'
Vue.prototype.$moment = moment;

Vue.prototype.$echarts = echarts
Vue.prototype.$currentIndex = '1'

Vue.config.productionTip = false

Vue.prototype.usersApi = new UsersApi(Vue.prototype.axios)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
}),
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.global = {
  me: null
}

Vue.mixin({
  methods: {
    success(message) {
      this.$message({
        message: message,
        type: "success",
      });
    },
    errmsg(msg) {
      this.$message({
        message: msg,
        type: "error",
      });
    },
  }


})
