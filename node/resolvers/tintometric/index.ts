
export const mutations = {
    updateSkusPrices: async (
        _: unknown,
        { base1, base2, base3, base4, tinter1, tinter2, tinter3, tinter4, tinter5 }: any,
        { clients: { pricing, catalog, vbase/* , files */ } }: Context
    ): Promise<String> => {

        console.log(`bases--- ${base1} ${base2} ${base3} ${base4} ${tinter1} ${tinter2} ${tinter3} ${tinter4} ${tinter5}`)

        const res = await catalog.getProducts();

        /*        const file = await files.getFile({ key: "jsonFile" });
       
               console.log("file----", file) */

        try {
            const jsonUrl = await vbase.getJSON<{ key: string }>('tintometricData', "jsonFile")
            console.log("jsonUrl---", jsonUrl)
            res.forEach(item => {
                /*
                1. traer todos los productos √
                2. iterarlos, si el skuId no está en el json saltearlo
                3. aplicar la fórmula tomando las cantidades de tinter y bases que tengan cargadas en el json
                4. hacer el post a updateSkuPrice
                */

                /* FORMULA: 
                base+qty*tinter1+qty2*tinter2+qty3*tinter3+qty4*tinter4+qty5*tinter5 */

                console.log("each item", item)
            })

            await pricing.updateSkuPrice("45582", 1, 1, 2)
            return "end"
        } catch (err) {
            console.log("error tintometric", err)
            return "end"
        }


    }
}