export type MediaType = 'video' | 'image' | 'gif';

export interface MediaFile {
  id: string;
  filename: string;
  fileUrl: string;
  type: MediaType;
}

export interface Folder {
  id: string;
  name: string;
  fileIds: string[];
}

export type MediaTypeFilterState = {
  video: boolean;
  image: boolean;
  gif: boolean;
}

export type Filter<T> = {
  defaultState: T;
  label: string;
  options?: {
    value: MediaType;
    label: string;
  }[];
  filterFn: (item: MediaFile, filterState: T) => boolean
}