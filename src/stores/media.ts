import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MediaFile {
  id: string;
  filename: string;
  fileUrl: string;
  type: 'image' | 'video';
}

export interface Folder {
  id: string;
  name: string;
  fileIds: string[];
}

interface MediaStore {
  folders: { [key: string]: Folder };
  files: { [key: string]: MediaFile };
  addFile: (folderId: string, file: MediaFile) => void;
  deleteFile: (folderId: string, fileId: string) => void;
  // renameFile: (fileId: string, newFilename: string) => void;
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set, get) => ({
      folders: {
        'your-folder': {
          id: 'your-folder',
          name: 'Your folder',
          fileIds: ['file-1', 'file-2', 'file-3', 'file-4', 'file-5'],
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
          filename: 'file-1.png',
          fileUrl: 'https://picsum.photos/200/300',
          type: 'image',
        },
        'file-2': {
          id: 'file-2',
          filename: 'file-2.png',
          fileUrl: 'https://picsum.photos/200/300',
          type: 'image',
        },
        'file-3': {
          id: 'file-3',
          filename: 'file-3.png',
          fileUrl: 'https://picsum.photos/200/300',
          type: 'image',
        },
        'file-4': {
          id: 'file-4',
          filename: 'file-4.png',
          fileUrl: 'https://picsum.photos/200/300',
          type: 'image',
        },
        'file-5': {
          id: 'file-5',
          filename: 'file-5.png',
          fileUrl: 'https://picsum.photos/200/300',
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
      deleteFile: (folderId, fileId) => {
        const currentFolder = get().folders[folderId];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [fileId]: _, ...remainingFiles } = get().files;

        set((state) => ({
          files: {
            ...remainingFiles,
          },
          folders: {
            ...state.folders,
            [folderId]: {
              ...currentFolder,
              fileIds: [...currentFolder.fileIds.filter((id) => id !== fileId)],
            },
          },
        }));
      },
    }),
    { name: 'media-storage' },
  ),
);
