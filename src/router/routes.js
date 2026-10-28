const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/ThirtySecondsPage.vue'),
      },
    ],
  },
]

export default routes
