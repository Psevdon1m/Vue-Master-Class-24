<script setup lang="ts">
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectColumns'
const projects = ref<Projects | null>(null)

usePageStore().pageData.title = 'Projects'

const fetchProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) {
    console.error('Error fetching projects', error)
    return
  }
  projects.value = data
}
await fetchProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
