<script setup lang="ts">
const { activeError } = storeToRefs(useErrorStore())
import type { CustomError } from '@/types/Error'

const authStore = useAuthStore()
const { menuOpen } = useMenu()

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

useMeta({
  title: 'Pulse',
})
</script>

<template>
  <metainfo> </metainfo>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div class="w-full h-full" :key="route.path">
            <Suspense v-if="Component" :timeout="0">
              <Component :is="Component" :key="route.name" />
              <template #fallback>
                <div
                  class="absolute top-16 left-0 right-0 flex justify-center items-center bg-background bg-opacity-90 h-[90vh] z-50"
                  :class="{ 'lg:ml-52': menuOpen, 'ml-24': !menuOpen }"
                >
                  <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
