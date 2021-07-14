export const queries = {
}

export const mutations = {
  updateSkuPrice: async (
    _: unknown,
    { skuId, costPrice, basePrice, listPrice }: any,
    { clients: { pricing } }: Context
  ): Promise<String> => {
    console.log('updateSkuPrice')
    return await pricing.updateSkuPrice(skuId, costPrice, basePrice, listPrice)
  },

  updateSkusPrices: async (
    _: unknown,
    { skuIds, costPrices, basePrices, listPrices }: any,
    { clients: { pricing } }: Context
  ): Promise<String> => {
    return await pricing.updateSkusPrices(skuIds, costPrices, basePrices, listPrices)
  }
  
}