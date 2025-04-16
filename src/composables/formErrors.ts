import type { AuthError } from '@supabase/supabase-js'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

type FormErrors<T> = {
  [K in keyof T]: string[]
}
export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErrors<LoginForm | RegisterForm> | undefined>()

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidation')

    const emailErrors = validateEmail(formData.email)
    const passwordErrors = validatePassword(formData.password)

    if (emailErrors.length > 0) realtimeErrors.value.email = emailErrors
    if (passwordErrors.length > 0) realtimeErrors.value.password = passwordErrors
  }
  return { serverError, handleServerError, realtimeErrors, handleLoginForm }
}
