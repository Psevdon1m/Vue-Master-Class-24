import {
  taskQuery,
  tasksWithProjectsQuery,
  type TasksWithProjects,
  type Task,
  updateTaskQuery,
  deleteTaskQuery,
} from '@/utils/supaQueries'

import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (key: string) => await taskQuery(key))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          return
        } else {
          loadTasks.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const fetchTasks = async () => {
    tasks.value = null
    const { data, error } = await loadTasks('tasks')
    if (error) return useErrorStore().showErrorPage({ error })
    if (data) tasks.value = data

    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const getTask = async (slug: string): Promise<void> => {
    task.value = null
    const { data, error, status } = await loadTask(slug)
    if (error) {
      useErrorStore().showErrorPage({ error, code: status })
      return
    }
    task.value = data

    validateCache({ ref: task, query: taskQuery, key: slug, loaderFn: loadTask })
  }

  const updateTask = async () => {
    if (!task.value) return

    const { projects, id, ...taskProperties } = task.value
    const { data: updatedData, error, status } = await updateTaskQuery(taskProperties, id)
    console.log({ updatedData, error, status })

    if (error) {
      useErrorStore().showErrorPage({ error, code: status })
      return
    }
  }

  const deleteTask = async () => {
    if (!task.value) return
    const { error, status } = await deleteTaskQuery(task.value.id)
    if (error) {
      useErrorStore().showErrorPage({ error, code: status })
      return
    }
  }
  return { tasks, fetchTasks, getTask, task, updateTask, deleteTask }
})
