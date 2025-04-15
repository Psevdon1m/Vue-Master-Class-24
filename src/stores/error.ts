import type { CustomError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | PostgrestError>(null)
  const isCustomError = ref(false)
  const showErrorPage = ({
    error,
    code,
  }: {
    error: string | PostgrestError | Error | CustomError
    code?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? new Error(error) : error
      activeError.value.code = code || 500
      return
    }
    activeError.value = error
    activeError.value.code = code?.toString() || '500'
  }
  const hideErrorPage = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return { activeError, showErrorPage, hideErrorPage, isCustomError }
})
