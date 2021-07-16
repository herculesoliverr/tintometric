export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5 }: any,
        { clients: { pricing, catalog } }: Context
    ): Promise<String> => {
        console.log(base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5)
        // console.log("getProducts")
        // catalog.getProducts()
        console.log("getProductsPerPage1")
        console.log((await catalog.getProductsPerPage({page: 1})).data?.products.items)
        console.log("getProductsPerPage2")
        console.log(await (await catalog.getProductsPerPage({page: 2})).data?.products.items)
        await pricing.updateSkuPrice("1", 1, 1, 2)
        return "end"
    }
}