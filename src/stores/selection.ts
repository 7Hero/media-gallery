import { create } from 'zustand'

type SelectionStore = {
  selectedIds: Set<string>
  toggleSelection: (id: string) => void
  clearSelection: () => void
  isSelected: (id: string) => boolean
  getSelectionIndex: (id: string) => number | false
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedIds: new Set<string>(),
  toggleSelection: (id: string) => set((state) => {
    const newSet = new Set(state.selectedIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    return { selectedIds: newSet }
  }),
  clearSelection: () => set({ selectedIds: new Set() }),
  isSelected: (id: string) => get().selectedIds.has(id),
  getSelectionIndex: (id: string) => {
    const { selectedIds } = get()
    return selectedIds.has(id)
      ? [...selectedIds].indexOf(id) + 1
      : false
  }
}))