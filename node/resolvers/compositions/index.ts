export const queries = {
  getCompositionFile: async (
    _: unknown,
    { masterSeller }: { masterSeller: string },
    ctx: Context
  ): Promise<any> => {
    const { data } = await ctx.clients.compositions.getCompositionsFromMaster(
      masterSeller
    )

    return data
  },
}
