import { Logo } from './icons/logo';
import { useMediaStore } from '@/stores/media';
import { Button } from './ui/button';
import { Folder } from './icons/folder';

export type SidebarContentProps = {
  title: string;
  children: React.ReactNode;
};

export const SidebarContent = ({ title, children }: SidebarContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  );
};

export const Sidebar = () => {
  const folders = useMediaStore((state) => state.folders);

  return (
    <div className="w-[232px] py-4 pl-4 pr-2 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Logo />
        Media gallery
      </div>
      <SidebarContent title="Folders">
        {Object.keys(folders).map((folderName) => (
          <Button variant="ghost" key="folderName">
            <Folder />
            {folderName}
          </Button>
        ))}
      </SidebarContent>
      <SidebarContent title="Filters">etc..</SidebarContent>
    </div>
  );
};
