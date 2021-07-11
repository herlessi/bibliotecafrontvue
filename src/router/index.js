import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/biblioteca',
    component:() => import('../views/Biblioteca.vue'),
    children:[
      { path:'viewlogin',          component: () => import('../views/ViewLogin.vue') },
      { path:'viewrecuperarsenha', component: () => import('../views/ViewRecuperarSenha.vue') },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
