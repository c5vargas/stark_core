import { create } from 'zustand';
import { Category } from '../libs/types';
import getCategories from '../actions/getCategories';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  getCategories: (includes: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  getCategories: async (includes) => {
    set({ loading: true, error: null });
    try {
      const resp = await getCategories(includes);
      set({ categories: resp, loading: false });
    } catch (error: any) {
      console.log(error)
      set({ error: error.message, loading: false });
    }
  }
}));
