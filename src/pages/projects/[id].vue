<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute<'/projects/[id]'>()
const projectId = route.params.id
</script>

<template>
  <div>
    <h1>Project ID: {{ projectId }}</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>
