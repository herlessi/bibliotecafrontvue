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
      { path:'viewusuario', component: () => import('../views/ViewEditarPerfil.vue') },
      { path:'viewlistagem', component: () => import('../views/ViewListagem.vue') },
      { path:'viewchamados', component: () => import('../views/ViewChamados.vue') },
      { path:'viewsocket', component: () => import('../views/ViewSocket.vue') },
      // { path:'listagem', component: () => import('../componentes/Listagem.vue') },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
