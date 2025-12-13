import { create } from 'zustand'
import { Category } from '../libs/types'
import { isErrorWithMessage } from '@/contexts/shared/libs/isErrorWithMessage'

interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
  getCategories: (includes: string) => void
}

export const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  loading: false,
  error: null,

  getCategories: () => {
    set({ loading: true, error: null })
    try {
      // const resp = await getCategories(includes)
      set({ categories: [], loading: false })
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        set({ error: error.message, loading: false })
      } else {
        set({ error: 'Unexpected error occurred', loading: false })
      }
    }
  },
}))
