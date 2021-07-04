import { ReactNode, SetStateAction, Dispatch } from 'react';
declare global {
  export interface ColorPickerProps {
    action: (family) => void,
    activeId: number
  }

  export interface ColorListProps {
    items: ColorProps[],
    familyName: string
  }

  export interface TintometricProps {
    targetDate: string
  }

  export interface LabelProps {
    name: string,
    code: string
  }

  interface ColorProps {
    R: number,
    G: number,
    B: number,
    code: string,
    family: number,
    name: string,
    slug: string,
    products?: number[],
    order: number,
    page: number
  }

  interface ColorDetailProps {
    color: ColorProps
  }
}