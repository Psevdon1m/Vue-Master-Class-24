import type { ProfilesByIds } from '@/utils/supaQueries'

export type GroupedCollabs = {
  [key: string]: ProfilesByIds
}
