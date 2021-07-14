export const queries = {
    getData: async (
        _: unknown, 
        { key }: any, 
        ctx: Context
    ): Promise<any> => {
        console.log(key)
        const aux = await ctx.clients.vbase.getJSON<{key: string}>('tintometricData', key)
        console.log(aux)
        return aux
    }
}

export const mutations = {
    saveData: async(
        _: unknown,
        { key, value }: any,
        ctx: Context
    ): Promise<void> => {
        console.log(key)
        console.log(value)
        const aux = await ctx.clients.vbase.saveJSON('tintometricData', key, value )
        console.log(aux)
    }
  
}