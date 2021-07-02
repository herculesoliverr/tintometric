import { ReactNode, SetStateAction, Dispatch } from 'react';
declare global {
  export interface ColorPickerProps {
    family: {
      id: number,
      name: string,
      slug: string,
      color: string,
      products: number[]
    },
    action: () => void
  }
}