import { Button } from './ui/button';
import { NavLink } from 'react-router';
import { FolderIcon, LogoIcon } from './icons';
import { useMedia } from '@/hooks/useMedia';
import { useSelection } from '@/hooks/useSelection';

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

export const Sidebar = () => {
  const { folders } = useMedia();
  const { clearSelection } = useSelection();

  return (
    <div className="w-[232px] py-4 pl-4 pr-2 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <LogoIcon />
        Media gallery
      </div>
      <SidebarContent title="Folders">
        <div className="gap-1 flex flex-col">
          {Object.values(folders).map((folder) => (
            <Button
              variant="ghost"
              key={folder.id}
              className="text-secondary-100"
              onClick={clearSelection}
              asChild
            >
              <NavLink to={`folder/${folder.id}`}>
                <FolderIcon />
                {folder.name}
                <span className="text-secondary-50">
                  {folder.fileIds.length}
                </span>
              </NavLink>
            </Button>
          ))}
        </div>
      </SidebarContent>
      <SidebarContent title="Filters">etc..</SidebarContent>
    </div>
  );
};
