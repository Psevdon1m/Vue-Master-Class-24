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
    const { data: profileData, error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      email: formData.email,
      full_name: formData.first_name + ' ' + formData.last_name,
    })

    if (profileError) {
      console.log('Profile err: ', profileError)
      return
    }

    console.log('Profile data: ', profileData)

    return true
  }

  return false
}
export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${window.location.origin}`,
      },
    })

    if (error) throw error
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    } else {
      console.error('Error:', String(error))
    }
    throw error
  }
}

export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword(formData)

  return { error }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
  }

  return true
}
