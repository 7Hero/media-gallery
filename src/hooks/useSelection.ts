import { useSelectionStore } from '@/stores/selection';
import { useShallow } from 'zustand/react/shallow';

export const useSelection = () => {
  return useSelectionStore(
    useShallow((state) => ({
      clearSelection: state.clearSelection,
      selectedIds: state.selectedIds,
      toggleSelection: state.toggleSelection,
      isSelected: state.isSelected,
      getSelectionIndex: state.getSelectionIndex,
    }))
  );
};