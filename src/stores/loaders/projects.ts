import {
  projectQuery,
  projectsQuery,
  type Projects,
  type Project,
  updateProjectQuery,
} from '@/utils/supaQueries'

import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (key: string) => await projectQuery(key))

  interface ValidateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(data) === JSON.stringify(ref.value)) {
          return
        } else {
          loadProjects.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const fetchProjects = async () => {
    projects.value = null
    const { data, error } = await loadProjects('projects')
    if (error) return useErrorStore().showErrorPage({ error })
    if (data) projects.value = data

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }

  const getProject = async (slug: string): Promise<void> => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) {
      useErrorStore().showErrorPage({ error, code: status })
      return
    }
    project.value = data

    validateCache({ ref: project, query: projectQuery, key: slug, loaderFn: loadProject })
  }

  const updateProject = async () => {
    if (!project.value) return

    const { tasks, id, ...projectProperties } = project.value
    const { data: updatedData, error, status } = await updateProjectQuery(projectProperties, id)
    console.log({ updatedData, error, status })

    if (error) {
      useErrorStore().showErrorPage({ error, code: status })
      return
    }
  }
  return { projects, fetchProjects, getProject, project, updateProject }
})
