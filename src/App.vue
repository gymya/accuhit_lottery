<script setup>
  import { RouterView } from 'vue-router'
  // import { RouterView, useRouter } from 'vue-router'
  // import { onAuthStateChanged } from 'firebase/auth'
  // import { auth } from '@/plugins/firebase'
  // import { useBaseStore } from '@/stores/base'
  // import { logout } from '@/apis/base'

  // const router = useRouter()
  // const baseStore = useBaseStore()

  // onAuthStateChanged(auth, (user) => {
  //   console.log('onAuthStateChanged user:', user)
  //   if (user) return
  //   baseStore.setUser(null)
  //   router.replace({ name: 'Login' })
  // })

  // const logoutHandler = async () => {
  //   try {
  //     await logout()
  //   } catch (error) {}
  // }
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
  <!-- <q-btn
    label="登出"
    color="secondary"
    @click="logoutHandler"
    class="fixed bottom-1 left-1"
  /> -->
</template>
