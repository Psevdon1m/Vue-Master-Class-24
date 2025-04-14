<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute<'/tasks/[id]'>()
const taskId = route.params.id
</script>

<template>
  <div>
    <h1>Task ID: {{ taskId }}</h1>
    <RouterLink to="/tasks">Tasks</RouterLink>
  </div>
</template>
