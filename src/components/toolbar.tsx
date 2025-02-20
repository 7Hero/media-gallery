import { useSelection } from '@/hooks/useSelection';
import { Selected } from './selected';
import { Button } from './ui/button';
import { useMedia } from '@/hooks/useMedia';
import { useParams } from 'react-router';
import { SelectFolder } from './select-folder';

export const Toolbar = () => {
  const { folderId } = useParams();

  const { clearSelection, selectedIds } = useSelection();
  const { deleteFiles } = useMedia();

  const handleFilesDelete = () => {
    deleteFiles(folderId!, Array.from(selectedIds));
    clearSelection();
  };

  return (
    <div className="py-4 px-2 flex gap-6">
      <div className="flex gap-2 items-center py-[6px]">
        <Selected isActive={selectedIds.size > 0} />
        <p className="text-secondary-60">{selectedIds.size} selected</p>
      </div>
      {selectedIds.size > 0 && <SelectFolder />}
      <div className="flex-1" />
      {selectedIds.size > 0 && (
        <Button variant="destructive" onClick={handleFilesDelete}>
          Delete file{selectedIds.size > 1 ? 's' : ''}
        </Button>
      )}
    </div>
  );
};
