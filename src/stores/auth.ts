import type { Tables } from '@/types/supabase'
import type { Session, User } from '@supabase/supabase-js'
import { profileQuery } from '@/utils/supaQueries'
import supabase from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data, error } = await profileQuery(user.value.id)
      if (error) {
        console.error(error)
        profile.value = null
        return
      }
      profile.value = data
    }
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error(error)
      return
    }
    if (data.session?.user) {
      await setAuth(data.session)
    }
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
