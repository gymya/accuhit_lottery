import { useBaseStore } from '@/stores/base'

export const mockAPI = (result, isError) => {
  const baseStore = useBaseStore()

  baseStore.setLoading(true)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      baseStore.setLoading(false)
      if (isError) {
        reject(result)
        return
      }
      resolve(result)
    }, 1000)
  })
}
