<script setup lang="ts">
const props = defineProps<{
  code: number | string
  message: string
  isCustomError: boolean
}>()

const error = ref<{
  code: number | string
  message: string
}>({
  code: 500,
  message: 'Oops, something went wrong',
})

if (props.isCustomError) {
  error.value = {
    code: props.code,
    message: props.message,
  }
}

if (Number(props.code) === 406) {
  error.value = {
    code: 404,
    message: 'We couldn’t find that page',
  }
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="text-7xl text-destructive" />
    <h1 class="font-extrabold text-7xl text-secondary">{{ error.code }}</h1>
    <p class="text-3xl font-extrabold text-primary">{{ error.message }}</p>
    <div class="flex flex-col items-center justify-center gap-5 mt-6 font-light">
      <p class="text-lg text-muted-foreground">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
