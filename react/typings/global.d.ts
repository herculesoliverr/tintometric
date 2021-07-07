import { ReactNode, SetStateAction, Dispatch } from 'react';
declare global {
  export interface TintometricProps {
    title: string,
    subtitle: string,
    buttonGrid: string,
    buttonList: string,
    colorDetailTitle: string,
    confirmButton: string
  }
  export interface FamilyPickerProps {
    action: (family) => void,
    activeId: number
  }

  export interface ColorListProps {
    items: ColorProps[],
    familyName: string,
    setSelectedColor: function,
    layout?: string
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
    skuId?: number,
    order?: number,
    page?: number,
    image?: string
  }

  interface ColorDetailProps {
    color: ColorProps,
    setModalOpen: function,
    productTypeSlug: string | undefined,
    colorDetailTitle: string,
    confirmButton: string
  }

  interface EventInterface{
    target: {
      value: string
    }
  }
}