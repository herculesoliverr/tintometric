export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5 }: any,
        { clients: { pricing, catalog } }: Context
    ): Promise<String> => {
        console.log(base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5)
        return await pricing.updateSkuPrice("1", 1, 1, 2)
    }
}