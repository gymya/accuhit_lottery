import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBaseStore = defineStore('base', () => {
  const user = ref(sessionStorage.getItem('user') || null)
  const setUser = (data) => {
    user.value = data
    sessionStorage.setItem('user', data)
  }

  const isAdmin = computed(() => user.value?.split('@')[0] === 'admin')

  const loading = ref(false)
  const setLoading = (value) => {
    loading.value = value
  }

  return {
    user,
    setUser,
    isAdmin,
    loading,
    setLoading
  }
})
