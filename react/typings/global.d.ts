import { ReactNode } from 'react'

declare global {
  export interface TintometricProps {
    title: string
    subtitle: string
    buttonGrid: string
    buttonList: string
    colorDetailTitle: string
    confirmButton: string
  }

  export interface FamilyPickerProps {
    action: (family) => void
    activeId: number
  }

  export interface ProductType {
    id: number
    name: string
    slug: string
  }

  export interface DataProps {
    families: Family[]
    productType: ProductType[]
    products: ProductProps[]
  }

  export interface ColorListProps {
    items: ProductProps[] | undefined
    familyName: string
    layout?: string
  }

  export interface LabelProps {
    name: string
    code: string
  }

  interface ProductProps {
    R: number
    G: number
    B: number
    code: string
    family: number
    name: string
    slug: string
    productType: number
    skuId?: number
    order?: number
    page?: number
    image?: string
  }

  interface ColorDetailProps {
    handleClick: function
    colorDetailTitle: string
    confirmButton: string
  }

  interface EventInterface {
    target: {
      value: string
      name: string
    }
  }

  interface Family {
    color: string
    id: number
    name: string
    productType: number[]
    slug: string
  }

  interface TintometricContextInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData: (file: any) => void
    families: Family[]
    activeFamily: Family | undefined
    setActiveFamily: (Family) => void
    products: ProductProps[]
    handleModalClick: (state: boolean) => void
    modalOpen: boolean
    activeProduct: ProductProps | undefined
    activeProductType: ProductType | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedColor: any
    setSelectedColor: (product: ProductProps) => void
  }

  export interface ContextChildren {
    children: ReactNode
  }

  interface Seller {
    account: string
    id: string
  }
}
