import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
//import Login from './views/login'
import ElementUI from 'element-ui'
import Chat from 'vue-beautiful-chat'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale })
Vue.use(Chat)
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
