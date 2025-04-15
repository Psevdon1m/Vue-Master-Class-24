<script setup lang="ts">
import type { CustomError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
defineProps<{
  code: number | string
  message: string
  error: CustomError | Error | PostgrestError | null
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="text-7xl text-destructive" />
    <h1 class="font-extrabold text-7xl text-secondary">{{ code }}</h1>
    <p class="text-3xl font-extrabold text-primary">{{ message }}</p>
    <p v-if="error && 'hint' in error">{{ error.hint }}</p>
    <p v-if="error && 'details' in error">{{ error.details }}</p>
    <div class="flex flex-col items-center justify-center gap-5 mt-6 font-light">
      <p class="text-lg text-muted-foreground">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
