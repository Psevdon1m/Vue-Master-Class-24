<script setup lang="ts">
const route = useRoute<'/projects/[slug]'>()
const projectSlug = route.params.slug
</script>

<template>
  <div>
    <h1>Project Slug: {{ projectSlug }}</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>
