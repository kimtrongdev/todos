const routes = [
  {
    path: '/',
    redirect: { name: 'Dashboard' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'el-icon-s-grid',
    component: () => import('../views/Dashboard/index.dashboard.vue')
  },
  {
    path: '/todos/list',
    name: 'List',
    icon: 'el-icon-document',
    component: () => import('../views/Todos/index.todos.vue'),
    children: [
      {
        path: '/',
        name: 'List',
        icon: 'el-icon-document',
        component: () => import('../views/Todos/List.vue'),
      },
      {
        path: 'scheduled',
        name: 'Scheduled',
        component: () => import('../views/Todos/AllScheduled.vue')
      },
      {
        path: 'today',
        name: 'Today',
        component: () => import('../views/Todos/Today.vue')
      }
    ]
  },
  {
    path: '/youtube',
    name: 'Youtube',
    icon: 'el-icon-film',
    component: () => import('../views/Youtube/index.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    icon: 'el-icon-s-tools',
    component: () => import('../views/Setting/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    icon: 'el-icon-s-tools',
    component: () => import('../views/Login.vue')
  },
]
// AIzaSyAvdZ047TtqtSMLf2bibNhN84Qzajyf_Uk

export default routes