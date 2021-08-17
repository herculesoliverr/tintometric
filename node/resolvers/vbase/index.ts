export const queries = {
  getData: async (_: unknown, { key }: any, ctx: Context): Promise<any> => {
    const aux = await ctx.clients.vbase.getJSON<{ key: string }>(
      'tintometricData',
      key
    )

    return aux
  },
}

export const mutations = {
  saveData: async (
    _: unknown,
    { key, value }: any,
    ctx: Context
  ): Promise<void> => {
    await ctx.clients.vbase.saveJSON('tintometricData', key, value)
  },
}
