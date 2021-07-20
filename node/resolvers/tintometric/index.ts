export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5 }: any,
        { clients: { pricing, catalog } }: Context
    ): Promise<String> => {
        console.log(`bases--- ${base1} ${base2} ${base3} ${base4} ${tinter1} ${tinter2} ${tinter3} ${tinter4} ${tinter5}`)
       
        const res = await catalog.getProducts();
        console.log("res---", res)

        //TODO: mandar el updataSkuPrice en el forEach a todos los skus
        res.forEach(item => {console.log("each item", item) })
        await pricing.updateSkuPrice("1", 1, 1, 2)
        return "end"
    }
}