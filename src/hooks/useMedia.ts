import { useMediaStore } from '@/stores/media';
import { useShallow } from 'zustand/react/shallow';

export const useMedia = () => {
  return useMediaStore(
    useShallow((state) => ({
      folders: state.folders,
      files: state.files,
      currentFolder: (folderId: string) => state.folders[folderId],
      addFiles: state.addFile,
      moveFiles: state.moveFiles,
      deleteFiles: state.deleteFile,
    }))
  );
};