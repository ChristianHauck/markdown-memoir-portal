
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Entry {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface MemoirStore {
  entries: Entry[];
  categories: Category[];
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateEntry: (id: string, entry: Partial<Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteEntry: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => string;
  updateCategory: (id: string, category: Partial<Omit<Category, 'id'>>) => void;
  deleteCategory: (id: string) => void;
  getEntryById: (id: string) => Entry | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getEntriesByCategory: (categoryId: string) => Entry[];
  getEntriesByTag: (tag: string) => Entry[];
}

export const useMemoirStore = create<MemoirStore>()(
  persist(
    (set, get) => ({
      entries: [],
      categories: [
        { id: 'default', name: 'Uncategorized' },
        { id: 'javascript', name: 'JavaScript' },
        { id: 'python', name: 'Python' },
        { id: 'react', name: 'React' },
      ],
      addEntry: (entry) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        set((state) => ({
          entries: [
            ...state.entries,
            {
              ...entry,
              id,
              createdAt: now,
              updatedAt: now,
            },
          ],
        }));
        return id;
      },
      updateEntry: (id, entry) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id
              ? { ...e, ...entry, updatedAt: new Date().toISOString() }
              : e
          ),
        }));
      },
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        }));
      },
      addCategory: (category) => {
        const id = crypto.randomUUID();
        set((state) => ({
          categories: [...state.categories, { ...category, id }],
        }));
        return id;
      },
      updateCategory: (id, category) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        }));
      },
      deleteCategory: (id) => {
        // First update any entries in this category to the default category
        set((state) => ({
          entries: state.entries.map((e) =>
            e.categoryId === id ? { ...e, categoryId: 'default' } : e
          ),
        }));
        
        // Then delete the category
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },
      getEntryById: (id) => {
        return get().entries.find((e) => e.id === id);
      },
      getCategoryById: (id) => {
        return get().categories.find((c) => c.id === id);
      },
      getEntriesByCategory: (categoryId) => {
        return get().entries.filter((e) => e.categoryId === categoryId);
      },
      getEntriesByTag: (tag) => {
        return get().entries.filter((e) => e.tags.includes(tag));
      },
    }),
    {
      name: 'memoir-storage',
    }
  )
);
