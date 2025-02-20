export type CheckboxProps = {
  isActive?: boolean;
};

export const Selected = ({ isActive }: CheckboxProps) => {
  return (
    <div className="w-4 h-4 rounded-sm outline inset-[1px] outline-secondary-20 flex items-center justify-center">
      {isActive && <div className="w-2 h-2 bg-primary-100" />}
    </div>
  );
};
