export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5 }: any,
        { clients: { pricing, catalog, vbase, files } }: Context
    ): Promise<String> => {

        console.log(`bases--- ${base1} ${base2} ${base3} ${base4} ${tinter1} ${tinter2} ${tinter3} ${tinter4} ${tinter5}`)

        const products: any = await catalog.getProducts();

        try {
            const jsonUrl = await vbase.getJSON<string>('tintometricData', "jsonFile")
            console.log("----jsonUrl")
            console.log(jsonUrl)
            const jsonFileContent = await files.getFile(jsonUrl)
            const jsonProducts = jsonFileContent['products']
            console.log(jsonProducts)
            
            products.forEach(async (item: string) => {
                await new Promise(r => setTimeout(r, 1000));
                console.log("item", item)
                const jsonProduct = jsonProducts.find((element: any) => {
                    // console.log(element)
                    element.skuId == item
                })
                console.log(jsonProduct)
                console.log(jsonProduct['composition'])
                if (jsonProduct && jsonProduct['composition']) {
                    let base = 0
                    if (jsonProduct['composition']['base1']){
                        base = base1
                    }
                    if (jsonProduct['composition']['base2']){
                        base = base2
                    }
                    if (jsonProduct['composition']['base3']){
                        base = base3
                    }
                    if (jsonProduct['composition']['base4']){
                        base = base4
                    }
                    let price = tinter1 * jsonProduct['composition']['tinter1'] +
                                tinter2 * jsonProduct['composition']['tinter2'] +
                                tinter3 * jsonProduct['composition']['tinter3'] +
                                tinter4 * jsonProduct['composition']['tinter4'] +
                                tinter5 * jsonProduct['composition']['tinter5'] +
                                base
                    console.log(price)
                    pricing.updateSkuPrice(item, price, price, price*1.3)
                }
            })

            // await pricing.updateSkuPrice("45582", 1, 1, 2)
            return "end"
        } catch (err) {
            console.log("error tintometric", err)
            return "end"
        }


    }
}