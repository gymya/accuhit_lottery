import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBaseStore = defineStore('base', () => {
  const isInitLiff = ref(false)
  const setIsInitLiff = (value) => {
    isInitLiff.value = value
  }

  const lineToken = ref(null)
  const setLineToken = (value) => {
    lineToken.value = value
  }

  const userName = ref(null)
  const setUserName = (value) => {
    userName.value = value
  }

  const userPic = ref(null)
  const setUserPic = (value) => {
    userPic.value = value
  }

  const loading = ref(false)
  const loadingText = ref(false)
  const setLoading = (value, text = '請稍候...') => {
    loading.value = value
    loadingText.value = text
  }

  const alert = ref({
    show: false,
    title: null,
    message: null,
    primary: null,
    secondary: null,
    close: null
  })

  const setAlert = ({
    show = false,
    title = null,
    message = null,
    primary = null,
    secondary = null,
    close = null
  }) => {
    alert.value = { show, title, message, primary, secondary, close }
  }

  const retailerMemberPageWarn = ref(false)
  const setRetailerMemberPageWarn = (value) => {
    retailerMemberPageWarn.value = value
  }

  return {
    isInitLiff,
    setIsInitLiff,
    lineToken,
    setLineToken,
    userName,
    setUserName,
    userPic,
    setUserPic,
    loading,
    loadingText,
    setLoading,
    alert,
    setAlert,
    retailerMemberPageWarn,
    setRetailerMemberPageWarn
  }
})
