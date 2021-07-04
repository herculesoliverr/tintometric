import { ReactNode, SetStateAction, Dispatch } from 'react';
declare global {
  export interface ColorPickerProps {
    action: (family) => void,
    activeId: number
  }
  export interface ColorListProps {
    items: {
      R: number,
      G: number,
      B: number,
      code: string,
      family: number,
      name: string,
      order: number,
      page: number,
      products?: number[],
      slug: string
    }[]
  }
  export interface TintometricProps {
    targetDate: string
  }
  interface LabelProps {
    name: string,
    code: string
}
}