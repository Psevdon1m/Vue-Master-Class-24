<script setup lang="ts">
const { activeError } = storeToRefs(useErrorStore())
import type { CustomError } from '@/types/Error'
import supabase from './lib/supabaseClient'

const authStore = useAuthStore()

onErrorCaptured((error) => {
  console.log({ error })
  const hint = error.stack?.split('\n')[1] || ''
  const customError = new Error(error.message) as CustomError
  customError.hint = hint

  useErrorStore().showErrorPage({
    error: customError,
    code: 500,
  })
})

onMounted(async () => {
  await authStore.trackAuth()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('@/components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/Layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <span class="loading loading-spinner loading-lg"></span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
