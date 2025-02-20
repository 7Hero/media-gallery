import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMedia } from '@/hooks/useMedia';
import { useSelection } from '@/hooks/useSelection';
import { useNavigate, useParams } from 'react-router';

export function SelectFolder() {
  const { folderId } = useParams<{ folderId: string }>();

  const navigate = useNavigate();

  const { moveFiles, folders } = useMedia();
  const { selectedIds, clearSelection } = useSelection();

  const handleFolderChange = (targetFolderId: string) => {
    moveFiles(Array.from(selectedIds), folderId!, targetFolderId);
    clearSelection();
    navigate(`/folder/${targetFolderId}`);
  };

  return (
    <Select value={folderId} onValueChange={handleFolderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(folders).map((folder) => (
            <SelectItem key={folder.id} value={folder.id}>
              {folder.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
