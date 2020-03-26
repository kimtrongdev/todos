import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routeMain'
import store from './../store/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if (to.name !== 'Login') {
    //if(to.matched.some(record => record.meta.requiresAuth)) {
      console.log(store.getters.isAuth)
    if (store.getters.isAuth) {
      next()
      return
    }
    next('/login')
    // } else {
    //   next() 
    // }
  }else next()

})
export default router
