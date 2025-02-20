import { useFiltersStore } from '@/stores/filters';
import { Input } from '../ui/input';
import { SidebarFilter } from './accordion';

export const SearchFilter = () => {
  const search = useFiltersStore((state) => state.filters.search);
  const setSearch = useFiltersStore((state) => state.setSearch);

  return (
    <SidebarFilter trigger="Search" type="search">
      <Input
        type="text"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search for media"
        className="w-full px-2 py-[5px] mt-1 text-sm text-secondary-100"
      />
    </SidebarFilter>
  );
};
