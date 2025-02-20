import {
  GifIcon,
  GifSmallIcon,
  PictureIcon,
  PlayIcon,
  PlaySmallIcon,
} from '@/components/icons';

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
