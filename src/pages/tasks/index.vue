<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasksLoaderStore = useTasksStore()

const { tasks } = storeToRefs(tasksLoaderStore)
const { fetchTasks } = tasksLoaderStore
const { getGroupedCollabs, groupedCollabs } = useCollabs()

await fetchTasks()

getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>
