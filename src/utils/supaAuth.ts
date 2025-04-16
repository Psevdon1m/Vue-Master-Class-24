import supabase from '@/lib/supabaseClient'
import type { RegisterForm, LoginForm } from '@/types/AuthForm'

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.error(error)
    return
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      email: formData.email,
      full_name: formData.first_name + ' ' + formData.last_name,
    })

    if (error) {
      console.log('Profile err: ', error)
      return
    }

    return true
  }

  return false
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword(formData)
  if (error) {
    console.error(error)
    return
  }

  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
  }

  return true
}
