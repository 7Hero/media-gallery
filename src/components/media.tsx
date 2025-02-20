import { cn } from '@/lib/utils';
import { MediaFile } from '@/stores/media';
import { mediaType } from '@/lib/constants';
import { useSelection } from '@/hooks/useSelection';
import { useMedia } from '@/hooks/useMedia';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

export type MediaFileProps = {
  file: MediaFile;
  folderId: string;
};

export const Media = ({ file, folderId }: MediaFileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toggleSelection, isSelected, getSelectionIndex } = useSelection();
  const { renameFile } = useMedia();
  const selected = isSelected(file.id);

  const [{ opacity }, drag] = useDrag(() => ({
    type: 'FILE',
    item: { fileId: file.id, sourceFolderId: folderId },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  return (
    <div
      className="flex flex-col group"
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      style={{ opacity }}
    >
      <div
        className={cn(
          'aspect-square flex items-center justify-center p-2 overflow-hidden relative group-hover:bg-black/20 rounded-[0.5rem]',
          {
            'group-hover:bg-primary-100/10 bg-primary-100/10 outline-1 outline-primary-100 -outline-offset-1':
              selected,
          },
        )}
      >
        <div className="absolute top-[50%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
          {mediaType[file.type]}
        </div>
        <button
          className={cn(
            'cursor-pointer h-5 w-5 absolute bottom-1 left-1 group-hover:flex hidden z-10 rounded-sm -outline-offset-[1.5px] outline-white outline-[1.5px] hover:outline-white/20 text-[10px] text-white justify-center items-center',
            { 'block bg-primary-100 outline-primary-100': selected },
          )}
          onClick={() => toggleSelection(file.id)}
        >
          {getSelectionIndex(file.id)}
        </button>
        <img
          src={file.fileUrl}
          alt={file.filename}
          className="object-contain max-w-full max-h-full border-neutral-60 border-[2px] rounded-sm"
        />
      </div>
      {isEditing ? (
        <input
          className="p-[6px] text-secondary-80 text-xs text-center w-full focus:outline-none caret-primary-100"
          defaultValue={file.filename}
          autoFocus
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              renameFile(file.id, e.currentTarget.value);
              setIsEditing(false);
            }
            if (e.key === 'Escape') {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <p
          className={cn(
            'p-[6px] text-secondary-80 text-xs text-center overflow-hidden overflow-ellipsis whitespace-nowrap',
            {
              'text-primary-100': selected,
            },
          )}
          onClick={() => setIsEditing(true)}
        >
          {file.filename}
        </p>
      )}
    </div>
  );
};
