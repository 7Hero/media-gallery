import { MediaFile } from '@/stores/media';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueFilename = (files: { [key: string]: MediaFile }, originalName: string): string => {
  if (!Object.values(files).some(file => file.filename === originalName)) {
    return originalName;
  }

  let counter = 1;
  const ext = originalName.includes('.') ? `.${originalName.split('.').pop()}` : '';
  const baseName = originalName.includes('.') ? originalName.slice(0, originalName.lastIndexOf('.')) : originalName;

  while (Object.values(files).some(file => file.filename === `${baseName} (${counter})${ext}`)) {
    counter++;
  }

  return `${baseName} (${counter})${ext}`;
};