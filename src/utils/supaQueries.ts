import supabase from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select('*, projects(id,name,slug)')
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select('*')
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
  *,
  tasks(
  id,name,status,due_date)
`,
    )
    .eq('slug', slug)
    .single()
export type Project = QueryData<ReturnType<typeof projectQuery>>

export const taskQuery = (id: string) =>
  supabase.from('tasks').select(`*, projects(id,name,slug)`).eq('id', id).single()
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = ({ col, val }: { col: string; val: string }) =>
  supabase.from('profiles').select('*').eq(col, val).single()
export type Profile = QueryData<ReturnType<typeof profileQuery>>

export const profilesByIdsQuery = (ids: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', ids)
export type ProfilesByIds = QueryData<ReturnType<typeof profilesByIdsQuery>>

export const updateProjectQuery = (
  updatedProject: Partial<Omit<Project, 'id'>>,
  id: string | number,
) => supabase.from('projects').update(updatedProject).eq('id', id)
export type UpdateProject = QueryData<ReturnType<typeof updateProjectQuery>>

export const updateTaskQuery = (updatedTask: Partial<Omit<Task, 'id'>>, id: string | number) =>
  supabase.from('tasks').update(updatedTask).eq('id', id)
export type UpdateTask = QueryData<ReturnType<typeof updateTaskQuery>>
