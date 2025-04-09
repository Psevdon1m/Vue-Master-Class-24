<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '@/types/supabase'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) {
    console.error('Error fetching projects', error)
    return
  }
  projects.value = data
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </div>
</template>
