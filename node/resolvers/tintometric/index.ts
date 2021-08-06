export const queries = {
}

export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, base5, tinter1, tinter2, tinter3, tinter4, tinter5, tinter6, tinter7, tinter8, tinter9, tinter10, tinter11, oldPrices }: any,
        { clients: { pricing, catalog, vbase, files } }: Context
    ): Promise<String> => {
        const products: any = await catalog.getProducts();
        try {
            const jsonUrl = await vbase.getJSON<string>('tintometricData', "jsonFile")
            const jsonFileContent = await files.getFile(jsonUrl)
            const jsonProducts = jsonFileContent['products']

            products.forEach(async (item: string) => {
                // this timeOut is to avoid 429
                await new Promise(r => setTimeout(r, 100));
                const jsonProduct = jsonProducts.find((element: any) => {
                    return element.skuId == item
                })

                if (jsonProduct && jsonProduct['composition']) {
                    if (oldPrices) {
                        let base = 0
                        if (jsonProduct['composition']?.oldPrices?.base1) {
                            base = base1
                        }
                        if (jsonProduct['composition']?.oldPrices?.base2) {
                            base = base2
                        }
                        if (jsonProduct['composition']?.oldPrices?.base3) {
                            base = base3
                        }
                        if (jsonProduct['composition']?.oldPrices?.base4) {
                            base = base4
                        }
                        if (jsonProduct['composition']?.oldPrices?.base4) {
                            base = base4
                        }
                        if (jsonProduct['composition']?.oldPrices?.base5) {
                            base = base5
                        }

                        let price = tinter1 * jsonProduct?.composition?.oldPrices?.tinter1 +
                            tinter2 * jsonProduct?.composition?.oldPrices?.tinter2 +
                            tinter3 * jsonProduct?.composition?.oldPrices?.tinter3 +
                            tinter4 * jsonProduct?.composition?.oldPrices?.tinter4 +
                            tinter5 * jsonProduct?.composition?.oldPrices?.tinter5 +
                            tinter6 * jsonProduct?.composition?.oldPrices?.tinter6 +
                            tinter7 * jsonProduct?.composition?.oldPrices?.tinter7 +
                            tinter8 * jsonProduct?.composition?.oldPrices?.tinter8 +
                            tinter9 * jsonProduct?.composition?.oldPrices?.tinter9 +
                            tinter10 * jsonProduct?.composition?.oldPrices?.tinter10 +
                            tinter11 * jsonProduct?.composition?.oldPrices?.tinter11 +
                            base
                        try {
                            pricing.updateSkuPrice(item, price, price, price * 1.3)

                        } catch (err) {
                            console.log("error---", err)
                        }
                    }
                    else {
                        let base = 0
                        if (jsonProduct['composition']?.newPrices?.base1) {
                            base = base1
                        }
                        if (jsonProduct['composition']?.newPrices?.base2) {
                            base = base2
                        }
                        if (jsonProduct['composition']?.newPrices?.base3) {
                            base = base3
                        }
                        if (jsonProduct['composition']?.newPrices?.base4) {
                            base = base4
                        }
                        if (jsonProduct['composition']?.newPrices?.base4) {
                            base = base4
                        }
                        if (jsonProduct['composition']?.newPrices?.base5) {
                            base = base5
                        }

                        let price = tinter1 * jsonProduct?.composition?.newPrices?.tinter1 +
                            tinter2 * jsonProduct?.composition?.newPrices?.tinter2 +
                            tinter3 * jsonProduct?.composition?.newPrices?.tinter3 +
                            tinter4 * jsonProduct?.composition?.newPrices?.tinter4 +
                            tinter5 * jsonProduct?.composition?.newPrices?.tinter5 +
                            tinter6 * jsonProduct?.composition?.newPrices?.tinter6 +
                            tinter7 * jsonProduct?.composition?.newPrices?.tinter7 +
                            tinter8 * jsonProduct?.composition?.newPrices?.tinter8 +
                            tinter9 * jsonProduct?.composition?.newPrices?.tinter9 +
                            tinter10 * jsonProduct?.composition?.newPrices?.tinter10 +
                            tinter11 * jsonProduct?.composition?.newPrices?.tinter11 +
                            base
                        pricing.updateSkuPrice(item, price, price, price * 1.3)
                    }
                }

            })
            return "end"
        } catch (err) {
            return err
        }


    }
}