import { generateUniqueFilename } from '@/lib/utils';
import { Folder, MediaFile } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MediaStore {
  folders: { [key: string]: Folder };
  files: { [key: string]: MediaFile };
  addFile: (folderId: string, file: MediaFile) => void;
  deleteFiles: (folderId: string, fileIds: string[]) => void;
  renameFile: (fileId: string, newFilename: string) => void;
  moveFiles: (fileIds: string[], folderId: string, targetFolderId: string) => void;
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set, get) => ({
      folders: {
        'your-folder': {
          id: 'your-folder',
          name: 'Your folder',
          fileIds: ['file-1', 'file-2', 'file-3', 'file-4', 'file-5', 'file-6'],
        },
        'new-folder2': {
          id: 'new-folder2',
          name: 'New folder',
          fileIds: [],
        },
      },
      files: {
        'file-1': {
          id: 'file-1',
          filename: 'file-1.mp4',
          fileUrl: 'https://picsum.photos/600/900',
          type: 'video',
        },
        'file-2': {
          id: 'file-2',
          filename: 'file-2.png',
          fileUrl: 'https://picsum.photos/900/600',
          type: 'image',
        },
        'file-3': {
          id: 'file-3',
          filename: 'file-3.png',
          fileUrl: 'https://picsum.photos/600',
          type: 'image',
        },
        'file-4': {
          id: 'file-4',
          filename: 'file-4.png',
          fileUrl: 'https://picsum.photos/600/100',
          type: 'image',
        },
        'file-5': {
          id: 'file-5',
          filename: 'file-5.gif',
          fileUrl: 'https://picsum.photos/1920/1080',
          type: 'gif',
        },
        'file-6': {
          id: 'file-6',
          filename: 'file-6.png',
          fileUrl: 'https://picsum.photos/400/800',
          type: 'image',
        },
      },
      addFile: (folderId, file) => {
        const currentFolder = get().folders[folderId];

        if (!currentFolder) console.error('No folder with given ID', folderId);

        set((state) => ({
          files: { ...state.files, [file.id]: file },
          folders: {
            ...state.folders,
            [folderId]: {
              ...currentFolder,
              fileIds: [...currentFolder.fileIds, file.id],
            },
          },
        }));
      },
      renameFile: (fileId, newFilename) => set((state) => {
        const files = get().files;
        const uniqueFilename = generateUniqueFilename(files, newFilename);

        return {
          files: {
            ...state.files,
            [fileId]: {
              ...state.files[fileId],
              filename: uniqueFilename,
            },
          },
        }
      }),
      moveFiles: (fileIds, folderId, targetFolderId) => set((state) => {
        const currentFolder = state.folders[folderId];
        const targetFolder = state.folders[targetFolderId];

        return {
          folders: {
            ...state.folders,
            [folderId]: {
              ...currentFolder,
              fileIds: currentFolder.fileIds.filter((id) => !fileIds.includes(id)),
            },
            [targetFolderId]: {
              ...targetFolder,
              fileIds: [...targetFolder.fileIds, ...fileIds],
            },
          }
        }
      }),
      deleteFiles: (folderId, fileIds) => {
        const currentFolder = get().folders[folderId];

        const remainingFiles = Object.fromEntries(
          Object.entries(get().files).filter(([id]) => !fileIds.includes(id))
        );

        set((state) => ({
          files: {
            ...remainingFiles,
          },
          folders: {
            ...state.folders,
            [folderId]: {
              ...currentFolder,
              fileIds: [...currentFolder.fileIds.filter((id) => !fileIds.includes(id))],
            },
          },
        }));
      },
    }),
    { name: 'media-storage' },
  ),
);
