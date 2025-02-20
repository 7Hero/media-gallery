import { Navigate } from 'react-router';
import { useMediaStore } from '../stores/media';

export const DefaultRoute = () => {
  const folders = useMediaStore((state) => state.folders);
  const firstFolder = Object.values(folders)[0];
  const firstFolderId = firstFolder?.id || 'your-folder';

  return <Navigate to={`/folder/${firstFolderId}`} replace />;
};
