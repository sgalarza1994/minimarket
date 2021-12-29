import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {path: '/home', name: 'ConsultaPedido', component : () => import('../views/ConsultaPedido.vue')},
      {path: '/producto', name: 'Producto', component : () => import('../views/Producto.vue')},
    ]
  },
  {
    path: '/homeCliente',
    name: 'HomeCliente',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeCliente.vue')
  },
  {
    path: '/pedido',
    name: 'Pedido',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pedido.vue')
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: () => import(/* webpackChunkName: "about" */ '../views/Carrito.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Security/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) =>{
  let token = localStorage.getItem("token");
  if(!to.matched.length)
  {
    next({name : 'Login'})
  }
  else 
  {
    if(to.name !== 'Login' && !token)
    {
      next({name: 'Login'})
    }
    else
    {
      next();
    }
  }
})

export default router
