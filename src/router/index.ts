
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
  ]
})
