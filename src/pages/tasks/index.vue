<script setup lang="ts">
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

const tasks = ref<TasksWithProjects | null>(null)

usePageStore().pageData.title = 'Tasks'

const fetchTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (error) {
    console.error('Error fetching tasks', error)
    return
  }
  tasks.value = data
}
await fetchTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
