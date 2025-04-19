import {
  profilesByIdsQuery,
  type ProfilesByIds,
  type Projects,
  type TasksWithProjects,
} from '@/utils/supaQueries'
import type { GroupedCollabs } from '@/types/GoupedCollabs'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfilesByIds = async (ids: string[]) => {
    const { data, error } = await profilesByIdsQuery(ids)
    if (error || !data) return []
    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length > 0)

    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))
    const result = await Promise.all(promises)
    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = result[index]
    })
    return groupedCollabs
  }
  return { getProfilesByIds, getGroupedCollabs, groupedCollabs }
}
