import { useMediaStore } from '@/stores/media';
import { useParams } from 'react-router';
import { Selected } from './selected';
import { Divider } from './divider';
import { Media } from './media';
import { useEffect } from 'react';
import { SelectFolder } from './select-folder';
import { useSelectionStore } from '@/stores/selection';
import { useShallow } from 'zustand/react/shallow';

export const MediaGrid = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { clearSelection, selectedImages } = useSelectionStore(
    useShallow((state) => ({
      clearSelection: state.clearSelection,
      selectedImages: state.selectedIds,
    })),
  );

  const { currentFolder, files } = useMediaStore(
    useShallow((state) => ({
      currentFolder: state.folders[folderId!],
      files: state.files,
    })),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('hi');
      if (e.key === 'Escape') {
        clearSelection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="py-4 px-2 flex gap-6">
        <div className="flex gap-2 items-center py-[6px]">
          <Selected isActive={selectedImages.size > 0} />
          <p className="text-secondary-60">{selectedImages.size} selected</p>
        </div>
        {selectedImages.size > 0 && <SelectFolder />}
      </div>
      <Divider className="mx-2" />
      {/* Media Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-2">
        {currentFolder.fileIds.map((fileId) => (
          <Media key={fileId} file={files[fileId]} />
        ))}
      </div>
    </main>
  );
};
