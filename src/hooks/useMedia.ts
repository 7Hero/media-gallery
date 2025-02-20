import { useMediaStore } from '@/stores/media';
import { useShallow } from 'zustand/react/shallow';

export const useMedia = () => {
  return useMediaStore(
    useShallow((state) => ({
      folders: state.folders,
      files: state.files,
      addFiles: state.addFile,
      moveFiles: state.moveFiles,
      deleteFiles: state.deleteFiles,
      renameFile: state.renameFile,
    }))
  );
};