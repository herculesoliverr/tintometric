/* import {
  IOContext,
  ParamsContext,
  RecorderState,
  SegmentData,
  ServiceContext,
  MessagesLoaderV2,
} from '@vtex/api' */

// eslint-disable-next-line prettier/prettier
import type { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State>

  interface JsonItem {
    code: string
    name: string
    slug: string
    family: number
    R: number
    G: number
    B: number
    products: number[]
    skuId: number
    composition: any
  }

  interface CsvItem {
    base: string,
    price: string
  }
}
