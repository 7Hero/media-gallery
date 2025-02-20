import { EmptyFolderIcon } from './icons';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 border-dashed border-secondary-20 rounded-[12px] border m-2 bg-neutral-80">
      <EmptyFolderIcon />
      <h2 className="text-3xl leading-[38px] text-secondary-100 font-medium mt-6">
        This folder is empty
      </h2>
      <p className="text-sm text-secondary-80">
        Try changing your filters or add images, videos and GIFs.
      </p>
    </div>
  );
};
