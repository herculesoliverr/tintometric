import { ReactNode, SetStateAction, Dispatch } from 'react';
declare global {
  export interface ColorPickerProps {
    action: (family) => void,
    activeId: number
  }
  export interface ColorListProps {
    action: (family) => void,
    activeId: number
  }
}