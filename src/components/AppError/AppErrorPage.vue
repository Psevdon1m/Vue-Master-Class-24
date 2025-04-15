<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)
const message = ref('')
const code = ref(0)
if (error.value) {
  message.value = error.value.message
  code.value = Number(error.value.code ?? 0)
}

router.afterEach(() => {
  errorStore.hideErrorPage()
})
console.log(import.meta.env)
const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))
</script>

<template>
  <section
    class="mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh]"
  >
    <ErrorTemplate
      :code="code"
      :message="message"
      :error="error"
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>
