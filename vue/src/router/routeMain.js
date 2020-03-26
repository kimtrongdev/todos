import children from './routes'
const routes = [
    {
      path: '/',
      redirect: { name: 'Dashboard' }
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/MainPage.vue'),
      children: children
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
  ]
  // AIzaSyAvdZ047TtqtSMLf2bibNhN84Qzajyf_Uk
  
  export default routes