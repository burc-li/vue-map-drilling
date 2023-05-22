export default [
  {
    path: '/',
    redirect: '/map',
  },
  {
    path: '/map',
    name: 'map',

    component: resolve => require(['@/views/map/index.vue'], resolve),
  },
]
