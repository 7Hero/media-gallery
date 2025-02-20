import { useMedia } from '@/hooks/useMedia';
import { useSelection } from '@/hooks/useSelection';
import { useDrop } from 'react-dnd';
import { Button } from './ui/button';
import { NavLink } from 'react-router';
import { FolderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Folder } from '@/types';

type FolderItemProps = {
  folder: Folder;
};

export const FolderItem = ({ folder }: FolderItemProps) => {
  const { clearSelection } = useSelection();
  const { moveFiles } = useMedia();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: (item: { fileId: string; sourceFolderId: string }) => {
      if (item.sourceFolderId === folder.id) return;
      moveFiles([item.fileId], item.sourceFolderId, folder.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Button
      ref={drop as unknown as React.Ref<HTMLButtonElement>}
      variant="ghost"
      className={cn('transition-colors text-secondary-100', {
        'bg-primary-100/10': isOver,
      })}
      asChild
      onClick={clearSelection}
    >
      <NavLink to={`folder/${folder.id}`}>
        <FolderIcon />
        {folder.name}
        <span className="text-secondary-50">{folder.fileIds.length}</span>
      </NavLink>
    </Button>
  );
};
