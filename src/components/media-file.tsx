import { cn } from '@/lib/utils';

export type MediaFileProps = {
  filename: string;
  thumbnailUrl: string;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected: number | boolean;
};

export const MediaFile = ({
  filename,
  thumbnailUrl,
  onSelect,
  selected,
}: MediaFileProps) => (
  <div className="flex flex-col group">
    <div
      className={cn(
        'aspect-square flex items-center justify-center p-2 overflow-hidden relative group-hover:bg-black/20 rounded-[0.5rem]',
        {
          'group-hover:bg-primary-100/10 bg-primary-100/10 outline-1 outline-primary-100 -outline-offset-1':
            selected,
        },
      )}
    >
      <button
        className={cn(
          'h-5 w-5 absolute bottom-1 left-1 group-hover:flex hidden z-10 rounded-sm -outline-offset-[1.5px] outline-white outline-[1.5px] hover:outline-white/20 text-[10px] text-white justify-center items-center',
          { 'block bg-primary-100 outline-primary-100': selected },
        )}
        onClick={(e) => {
          onSelect?.(e);
        }}
      >
        {selected}
      </button>
      <img
        src={thumbnailUrl}
        alt={filename}
        className="object-contain max-w-full max-h-full border-neutral-60 border-[2px] rounded-sm"
      />
    </div>
    <p className="p-[6px] text-secondary-80 text-xs text-center">{filename}</p>
  </div>
);
