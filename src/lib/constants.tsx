import {
  GifIcon,
  GifSmallIcon,
  PictureIcon,
  PlayIcon,
  PlaySmallIcon,
} from '@/components/icons';
import { Filter, MediaTypeFilterState } from '@/types';

export const mediaType = {
  image: undefined,
  video: <PlayIcon />,
  gif: <GifIcon />,
};

export const mediaTypeFilter = {
  video: <PlaySmallIcon />,
  image: <PictureIcon />,
  gif: <GifSmallIcon />,
};

export const filterDefinitions = {
  mediaTypes: {
    defaultState: {
      video: true,
      image: true,
      gif: true,
    },
    label: 'Media type',
    options: [
      {
        value: 'video',
        label: 'Videos',
      },
      {
        value: 'image',
        label: 'Images',
      },
      {
        value: 'gif',
        label: 'GIFs',
      },
    ],
    filterFn: (item, filterState) => filterState[item.type]
  } as Filter<MediaTypeFilterState>,
  search: {
    defaultState: '',
    label: 'Search',
    filterFn: (item, searchTerm) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return item.filename.toLowerCase().includes(term);
    }
  } as Filter<string>,
}