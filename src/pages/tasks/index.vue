<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '@/types/supabase'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select('*')
  if (error) {
    console.error('Error fetching tasks', error)
    return
  }
  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h2>{{ task.name }}</h2>
        <p>{{ task.description }}</p>
      </li>
    </ul>
  </div>
</template>
