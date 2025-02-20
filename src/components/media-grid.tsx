import { useMediaStore } from '@/stores/media';
import { useParams } from 'react-router';
import { Selected } from './selected';
import { Divider } from './divider';
import { Media } from './media';
import { useEffect, useMemo } from 'react';
import { SelectFolder } from './select-folder';
import { useShallow } from 'zustand/react/shallow';
import { useSelection } from '@/hooks/useSelection';
import { Button } from './ui/button';
import { filterDefinitions, useFiltersStore } from '@/stores/filters';
import { EmptyState } from './empty-grid';

export const MediaGrid = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { clearSelection, selectedIds } = useSelection();

  const { currentFolder, files, deleteFiles } = useMediaStore(
    useShallow((state) => ({
      currentFolder: state.folders[folderId!],
      files: state.files,
      deleteFiles: state.deleteFiles,
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

  const handleFilesDelete = () => {
    deleteFiles(folderId!, Array.from(selectedIds));
    clearSelection();
  };

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
      {/* Top Bar */}
      <div className="py-4 px-2 flex gap-6">
        <div className="flex gap-2 items-center py-[6px]">
          <Selected isActive={selectedIds.size > 0} />
          <p className="text-secondary-60">{selectedIds.size} selected</p>
        </div>
        {selectedIds.size > 0 && <SelectFolder />}
        <div className="flex-1" />
        {selectedIds.size > 0 && (
          <Button variant="destructive" onClick={handleFilesDelete}>
            Delete files
          </Button>
        )}
      </div>
      <Divider className="mx-2" />
      {/* Media Grid */}
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
