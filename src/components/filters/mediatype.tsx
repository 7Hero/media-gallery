import { Checkbox } from '@/components/ui/checkbox';
import { filterDefinitions, mediaTypeFilter } from '@/lib/constants';
import { useFiltersStore } from '@/stores/filters';
import { SidebarFilter } from './filter';
import { useMedia } from '@/hooks/useMedia';
import { useParams } from 'react-router';
import { useMemo } from 'react';

export const MediaTypeFilter = () => {
  const { folderId } = useParams();

  const mediaTypes = useFiltersStore((state) => state.filters.mediaTypes);
  const toggleMediaType = useFiltersStore((state) => state.toggleMediaType);
  const { files, folders } = useMedia();

  const currentFolder = folders[folderId!];

  const typeCounts = useMemo(() => {
    const counts = {
      video: 0,
      image: 0,
      gif: 0,
    };

    currentFolder?.fileIds.forEach((fileId) => {
      const file = files[fileId];
      if (file) {
        counts[file.type]++;
      }
    });

    return counts;
  }, [currentFolder?.fileIds, files]);

  return (
    <SidebarFilter
      trigger={filterDefinitions.mediaTypes.label}
      type="media-types"
    >
      <div className="flex flex-col gap-1">
        {filterDefinitions.mediaTypes.options!.map(({ label, value }) => (
          <div key={value} className="flex items-center px-2 py-[5px]">
            <label
              htmlFor={value}
              className="text-sm font-normal leading-[22px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 text-secondary-100 flex items-center gap-2"
            >
              {mediaTypeFilter[value]}
              {label}
              <span className="text-secondary-50">{typeCounts[value]}</span>
            </label>
            <Checkbox
              id={value}
              checked={mediaTypes[value]}
              onCheckedChange={() => toggleMediaType(value)}
            />
          </div>
        ))}
      </div>
    </SidebarFilter>
  );
};
