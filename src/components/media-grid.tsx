import { useMediaStore } from '@/stores/media';
import { useParams } from 'react-router';
import { Divider } from './divider';
import { Media } from './media';
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSelection } from '@/hooks/useSelection';
import { filterDefinitions, useFiltersStore } from '@/stores/filters';
import { EmptyState } from './empty-grid';
import { Toolbar } from './toolbar';

export const MediaGrid = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { clearSelection } = useSelection();

  const { currentFolder, files } = useMediaStore(
    useShallow((state) => ({
      currentFolder: state.folders[folderId!],
      files: state.files,
    })),
  );

  const filters = useFiltersStore((state) => state.filters);

  const filteredFiles = useMemo(() => {
    let results = [...currentFolder.fileIds];

    // Media filter
    results = results.filter((item) =>
      filterDefinitions.mediaTypes.filterFn(files[item], filters.mediaTypes),
    );

    // Search filter
    results = results.filter((item) =>
      filterDefinitions.search.filterFn(files[item], filters.search),
    );

    return results;
  }, [currentFolder.fileIds, filters, files]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);

  return (
    <main className="flex-1 flex flex-col">
      <Toolbar />
      <Divider className="mx-2" />
      {filteredFiles.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-2">
          {filteredFiles.map((fileId) => (
            <Media key={fileId} file={files[fileId]} folderId={folderId!} />
          ))}
        </div>
      )}
      {filteredFiles.length === 0 && <EmptyState />}
    </main>
  );
};
