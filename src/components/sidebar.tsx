import { Button } from './ui/button';
import { NavLink } from 'react-router';
import { FolderIcon, LogoIcon } from './icons';
import { useMedia } from '@/hooks/useMedia';
import { useSelection } from '@/hooks/useSelection';
import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { Folder } from '@/stores/media';

export type SidebarContentProps = {
  title: string;
  children: React.ReactNode;
};

export const SidebarContent = ({ title, children }: SidebarContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium px-2">{title}</p>
      {children}
    </div>
  );
};

type FolderItemProps = {
  folder: Folder;
};

const FolderItem = ({ folder }: FolderItemProps) => {
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

export const Sidebar = () => {
  const { folders } = useMedia();

  return (
    <div className="w-[232px] py-4 pl-4 pr-2 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <LogoIcon />
        Media gallery
      </div>
      <SidebarContent title="Folders">
        <div className="gap-1 flex flex-col">
          {Object.values(folders).map((folder) => (
            <FolderItem key={folder.id} folder={folder} />
          ))}
        </div>
      </SidebarContent>
      <SidebarContent title="Filters">etc..</SidebarContent>
    </div>
  );
};
