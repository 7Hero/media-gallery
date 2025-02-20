import { Navigate } from 'react-router';
import { useMedia } from '@/hooks/useMedia';

export const DefaultRoute = () => {
  const { folders } = useMedia();
  const firstFolder = Object.values(folders)[0];
  const firstFolderId = firstFolder?.id || 'your-folder';

  return <Navigate to={`/folder/${firstFolderId}`} replace />;
};
