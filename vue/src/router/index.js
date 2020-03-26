import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//       if (localStorage.getItem('token') == null) {
//           next({
//               path: '/login'
//           })
//       } else {
//           let user = JSON.parse(localStorage.getItem('user'))
          
//       }
  
// })
export default router
