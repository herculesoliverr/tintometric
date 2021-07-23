export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, base5, tinter1, tinter2, tinter3, tinter4, tinter5, tinter6, tinter7, tinter8, tinter9, tinter10, tinter11 }: any,
        { clients: { pricing, catalog, vbase, files } }: Context
    ): Promise<String> => {
    
        const products: any = await catalog.getProducts();
        
        try {
            const jsonUrl = await vbase.getJSON<string>('tintometricData', "jsonFile")
            // console.log("----jsonUrl")
            // console.log(jsonUrl)
            const jsonFileContent = await files.getFile(jsonUrl)
            const jsonProducts = jsonFileContent['products']
            console.log("products from json", jsonProducts)

            products.forEach(async (item: string) => {
                await new Promise(r => setTimeout(r, 1000));
                console.log("skuId from admin-----", item)
                const jsonProduct = jsonProducts.find((element: any) => {
                    console.log("skuId from json-----", element.skuId)
                    return element.skuId == item
                })
                console.log("jsonProduct----", jsonProduct)
                // console.log(jsonProduct['composition'])
                if (jsonProduct && jsonProduct['composition']) {
                    let base = 0
                    if (jsonProduct['composition']['base1']) {
                        base = base1
                    }
                    if (jsonProduct['composition']['base2']) {
                        base = base2
                    }
                    if (jsonProduct['composition']['base3']) {
                        base = base3
                    }
                    if (jsonProduct['composition']['base4']) {
                        base = base4
                    }
                    if (jsonProduct['composition']['base4']) {
                        base = base4
                    }
                    if (jsonProduct['composition']['base5']) {
                        base = base5
                    }

                    let price = tinter1 * jsonProduct?.composition?.tinter1 +
                        tinter2 * jsonProduct?.composition?.tinter2 +
                        tinter3 * jsonProduct?.composition?.tinter3 +
                        tinter4 * jsonProduct?.composition?.tinter4 +
                        tinter5 * jsonProduct?.composition?.tinter5 +
                        tinter6 * jsonProduct?.composition?.tinter6 +
                        tinter7 * jsonProduct?.composition?.tinter7 +
                        tinter8 * jsonProduct?.composition?.tinter8 +
                        tinter9 * jsonProduct?.composition?.tinter9 +
                        tinter10 * jsonProduct?.composition?.tinter10 +
                        tinter11 * jsonProduct?.composition?.tinter11 +
                        base
                    pricing.updateSkuPrice(item, price, price, price * 1.3)
                }
            })
            return "end"
        } catch (err) {
            console.log("error tintometric", err)
            return "end"
        }


    }
}