import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routeMain'
import store from './../store/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next()
      return
    } else {
      store.dispatch('CHECK_AUTH',store.getters.token).then(() =>{
        next()
      }).catch( () => {
        next({ name : 'Login' })
      })
    }
  } else {
    next()
  }
})
export default router
