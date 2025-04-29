<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectColumns'

usePageStore().pageData.title = 'Projects'

const projectLoaderStore = useProjectsStore()

const { projects } = storeToRefs(projectLoaderStore)
const { fetchProjects } = projectLoaderStore
const { getGroupedCollabs, groupedCollabs } = useCollabs()

await fetchProjects()

getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
useMeta({
  title: 'Projects | Pulse',
  description: {
    name: 'description',
    content: 'Bla bla',
  },
})
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
