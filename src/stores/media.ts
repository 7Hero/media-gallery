import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  folders: { [key: string]: Folder }
  files: { [key: string]: MediaFile };
  addFile: (folderId: string, file: MediaFile) => void;
  deleteFile: (folderId: string, fileId: string) => void;
  // renameFile: (fileId: string, newFilename: string) => void;
}

export const useMediaStore = create<MediaStore>()(persist((set, get) => ({
  folders: {
    'new-folder':{
      id: 'new-folder',
      name: 'New Folder',
      fileIds: ['file-1']
    },
  },
  files: {
    'file-1': {
      id: 'file-1',
      filename: 'file-1.png',
      fileUrl: 'https://picsum.photos/200/300',
      type: 'image'
    }
  },
  addFile: (folderId, file) => {
    const currentFolder = get().folders[folderId];
    
    if(!currentFolder) console.error('No folder with given ID', folderId)

    set((state) => ({
      files: {...state.files, [file.id]: file},
      folders: {
        ...state.folders, [folderId]: {
          ...currentFolder,
          fileIds: [...currentFolder.fileIds, file.id]
        }
      }
    }))
  },
  deleteFile: (folderId, fileId) => {
    const currentFolder = get().folders[folderId];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[fileId]: _, ...remainingFiles } = get().files;
    
    set((state) => ({
      files: {
        ...remainingFiles,
      },
      folders: {
        ...state.folders, [folderId]: {
          ...currentFolder,
          fileIds: [...currentFolder.fileIds.filter((id) =>  id !== fileId)]
        }
      }
    }))
  }
}), { name: 'media-storage'}))