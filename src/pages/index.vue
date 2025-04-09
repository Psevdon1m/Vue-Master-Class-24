<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
console.log(supabase)
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 'ello' } }">Projects ello</RouterLink>
  </div>
</template>
