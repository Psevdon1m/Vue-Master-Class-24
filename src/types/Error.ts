import type { PostgrestError } from '@supabase/supabase-js'

export interface CustomError extends Error {
  code?: number
  hint?: string
  details?: string
}
