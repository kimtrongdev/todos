const routes = [
    {
      path: '/',
      redirect :{name:'List'}
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/List.vue')
    },
    {
      path: '/scheduled',
      name: 'Scheduled',
      component: () => import('../views/AllScheduled.vue')
    },
    {
      path: '/today',
      name: 'Today',
      component: () => import('../views/Today.vue')
    }
  ]
  
  export default routes