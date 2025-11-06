import { createRouter, createWebHistory } from 'vue-router'
import VersionPage from '../pages/VersionPage.vue'
import Character from '../pages/Character.vue'
import HomePage from '../pages/Home.vue'
import { useLoading } from '../composables/useLoading'

const routes = [
  { path: '/', component: HomePage },
  { path: '/versions', component: VersionPage },
  { path: '/characters', component: Character }
]

// Use Vite's base when creating history to ensure correct routing in dev/production
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to show loading overlay
router.beforeEach((to, from, next) => {
  // Only show loading if we're actually navigating between different routes
  if (to.path !== from.path) {
    const { showLoading, hideLoading } = useLoading()
    showLoading()
    
    // Show loading for 1.5 seconds before navigating
    setTimeout(() => {
      hideLoading()
      next()
    }, 1500)
  } else {
    next()
  }
})

export default router
