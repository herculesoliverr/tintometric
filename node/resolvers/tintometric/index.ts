// import { base64ToCSV, csvJSON } from '../../utils'

import { parseCSVToJson } from '../../utils'

export const queries = {}

export const mutations = {
  updateSkusPrices: async (
    _: unknown,
    {
      tinter1,
      tinter2,
      tinter3,
      tinter4,
      tinter5,
      tinter6,
      tinter7,
      tinter8,
      tinter9,
      tinter10,
      tinter11,
      oldPrices,
    }: {
      tinter1: number
      tinter2: number
      tinter3: number
      tinter4: number
      tinter5: number
      tinter6: number
      tinter7: number
      tinter8: number
      tinter9: number
      tinter10: number
      tinter11: number
      oldPrices: boolean
    },
    { clients: { pricing, catalog, vbase, files } }: Context
  ): Promise<string> => {
    const products: any = await catalog.getProducts()

    try {
      const jsonUrl = await vbase.getJSON<string>('tintometricData', 'jsonFile')
      const csvUrl = await vbase.getJSON<string>('tintometricData', 'csvFile')
      const { data } = await files.getFile(csvUrl)

      const csv: Array<{ base: string; price: string }> = parseCSVToJson(data)

      console.log('csv---', csv)

      // save CSV in vbase

      csv.forEach(async (element: { base: string; price: string }) => {
        try {
          const aux = await vbase.saveJSON(
            'tintometricData',
            element.base,
            element.price
          )

          console.log('aux----', aux)
        } catch (err) {
          console.log(err)
        }
      })

      const jsonFileContent = await files.getFile(jsonUrl)
      const jsonProducts = jsonFileContent.data?.products
      const priceType = oldPrices ? 'oldPrices' : 'newPrices'
      const skusNotFound: number[] = []
      const skusBadStructure: number[] = []
      const baseNotFound: number[] = []

      jsonProducts.forEach((item: JsonItem) => {
        if (!item.skuId) return
        const skuId = products.find((element: string) => {
          return Number(element) === item.skuId
        })

        if (!skuId) {
          skusNotFound.push(item.skuId)
        } else if (item.composition) {
          const base = 0

          /*           const baseJson: any = Object.entries(
            item.composition[priceType]
          ).find((arrayOfItem: any) => arrayOfItem[0].includes('base')) */

          /* const basePrice =
            baseJson && csv.find((csvItem: any) => csvItem.base === baseJson[0])

          if (!basePrice) {
            baseJson
              ? baseNotFound.push(baseJson[0])
              : baseNotFound.push(item.skuId)
          } else if (!baseJson) {
            skusBadStructure.push(item.skuId)
          } else {
            base = baseJson[1] * basePrice.price
          } */

          const price =
            tinter1 * item?.composition?.[priceType]?.tinter1 +
            tinter2 * item?.composition?.[priceType]?.tinter2 +
            tinter3 * item?.composition?.[priceType]?.tinter3 +
            tinter4 * item?.composition?.[priceType]?.tinter4 +
            tinter5 * item?.composition?.[priceType]?.tinter5 +
            tinter6 * item?.composition?.[priceType]?.tinter6 +
            tinter7 * item?.composition?.[priceType]?.tinter7 +
            tinter8 * item?.composition?.[priceType]?.tinter8 +
            tinter9 * item?.composition?.[priceType]?.tinter9 +
            tinter10 * item?.composition?.[priceType]?.tinter10 +
            tinter11 * item?.composition?.[priceType]?.tinter11 +
            base

          if (Number.isNaN(price)) {
            skusBadStructure.push(item.skuId)
          } else {
            try {
              pricing.updateSkuPrice(item.skuId, price, price, price * 1.3)
            } catch (err) {
              return err
            }
          }
        }
      })

      return JSON.stringify({
        skusNotFound,
        skusBadStructure,
        baseNotFound,
      })
    } catch (err) {
      return err
    }
  },
}
