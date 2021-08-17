export const queries = {}

export const mutations = {
  updateSkusPrices: async (
    _: unknown,
    {
      base1,
      base2,
      base3,
      base4,
      base5,
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
    }: any,
    { clients: { pricing, catalog, vbase, files } }: Context
  ): Promise<string> => {
    const products: any = await catalog.getProducts()

    try {
      const jsonUrl = await vbase.getJSON<string>('tintometricData', 'jsonFile')
      const jsonFileContent = await files.getFile(jsonUrl)
      const jsonProducts = jsonFileContent.products
      const priceType = oldPrices ? 'oldPrices' : 'newPrices'
      const skusNotFound: any[] = []
      const skusBadStructure: any[] = []

      jsonProducts.forEach((item: any) => {
        const skuId = products.find((element: string) => {
          return element == item.skuId
        })

        if (!item.skuId) {
        } else if (!skuId) {
          skusNotFound.push(item.skuId)
        } else if (item.composition) {
          let base = 0

          if (item.composition?.[priceType]?.base1) {
            base = base1
          }

          if (item.composition?.[priceType]?.base2) {
            base = base2
          }

          if (item.composition?.[priceType]?.base3) {
            base = base3
          }

          if (item.composition?.[priceType]?.base4) {
            base = base4
          }

          if (item.composition?.[priceType]?.base4) {
            base = base4
          }

          if (item.composition?.[priceType]?.base5) {
            base = base5
          }

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
            setTimeout(() => {
              pricing.updateSkuPrice(item.skuId, price, price, price * 1.3)
            }, 100)
          }
        }
      })

      return JSON.stringify({
        skusNotFound,
        skusBadStructure,
      })
    } catch (err) {
      return err
    }
  },
}
