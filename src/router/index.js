import { createRouter, createWebHistory } from 'vue-router'
import { useBaseStore } from '@/stores/base'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'Home',
      meta: { auth: true },
      component: () => import('@/views/HomeView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const redirect = checkAuth(to)
  console.log('redirect:', redirect)
  if (redirect) return redirect
})

const checkAuth = ({ meta }) => {
  if (!meta.auth) return false

  const baseStore = useBaseStore()
  if (baseStore.user) return false

  return { name: 'Login', replace: true }
}

export default router
