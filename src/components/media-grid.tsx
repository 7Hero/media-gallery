import { useMediaStore } from '@/stores/media';
import { useParams } from 'react-router';
import { Selected } from './selected';
import { Divider } from './divider';
import { MediaFile } from './media-file';
import { useState } from 'react';

// TODO: I can extract the selectImages state into a zustand store and prevent re-renders on selection.
export const MediaGrid = () => {
  const { folderId } = useParams<{ folderId: string }>();

  const activeFolder = useMediaStore((state) => state.folders[folderId!]);
  const files = useMediaStore((state) => state.files);

  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleSelectedImages = (fileId: string) => {
    const value = new Set(selectedImages);

    if (selectedImages.has(fileId)) {
      value.delete(fileId);
    } else {
      value.add(fileId);
    }

    setSelectedImages(value);
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="py-4 px-2">
        <div className="flex gap-2 items-center py-[5px]">
          <Selected isActive={selectedImages.size > 0} />
          <p className="text-secondary-60">{selectedImages.size} selected</p>
        </div>
      </div>
      <Divider className="mx-2" />
      {/* Media Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-2">
        {activeFolder.fileIds.map((fileId) => (
          <MediaFile
            key={fileId}
            filename={files[fileId].filename}
            thumbnailUrl={files[fileId].fileUrl}
            selected={
              selectedImages.has(fileId)
                ? [...selectedImages].indexOf(fileId) + 1
                : false
            }
            onSelect={() => toggleSelectedImages(fileId)}
          />
        ))}
      </div>
    </main>
  );
};
