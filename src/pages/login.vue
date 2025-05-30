<script setup lang="ts">
import { login, signInWithGoogle } from '@/utils/supaAuth'
import { debouncedWatch } from '@vueuse/core'

const router = useRouter()
const formData = ref({
  email: '',
  password: '',
})

debouncedWatch(
  formData,
  async () => {
    await handleLoginForm(formData.value)
  },
  {
    debounce: 1000,
    deep: true,
  },
)

const { serverError, handleServerError, realtimeErrors, handleLoginForm } = useFormErrors()

const signin = async () => {
  const { error } = await login(formData.value)
  if (!error) return router.push('/')
  handleServerError(error)
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button @click="signInWithGoogle" variant="outline" class="w-full">
            Login with Google
          </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
            />
            <ul
              v-if="realtimeErrors && realtimeErrors?.email?.length > 0"
              class="text-sm text-left text-red-500"
            >
              <li v-for="error in realtimeErrors.email" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <!-- <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a> -->
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-500': serverError }"
            />
            <ul
              v-if="realtimeErrors && realtimeErrors?.password?.length > 0"
              class="text-sm text-left text-red-500"
            >
              <li v-for="error in realtimeErrors.password" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="
              (realtimeErrors && realtimeErrors?.email?.length > 0) ||
              (realtimeErrors && realtimeErrors?.password?.length > 0)
            "
          >
            Login
          </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
