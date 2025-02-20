import { cn } from "@/lib/utils";
import React from "react";

export type DividerProps = React.ComponentProps<'hr'>;

export const Divider = ({ className, ...props }: DividerProps) => <hr {...props} className={cn('border-t border-t-secondary-10', className)} />