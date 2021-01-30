import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'my', component: () => import('../views/main.vue')},
]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router