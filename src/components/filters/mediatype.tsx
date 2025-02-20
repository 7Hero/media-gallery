import { Checkbox } from '@/components/ui/checkbox';
import { mediaTypeFilter } from '@/lib/constants';
import { useFiltersStore, filterDefinitions } from '@/stores/filters';
import { SidebarFilter } from './filter';

export const MediaTypeFilter = () => {
  const mediaTypes = useFiltersStore((state) => state.filters.mediaTypes);
  const toggleMediaType = useFiltersStore((state) => state.toggleMediaType);

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
