export const queries = {
  getCompositionFile: async (
    _: unknown,
    { masterSeller }: { masterSeller: string },
    ctx: Context
  ): Promise<any> => {
    console.log('masterSeller', masterSeller)
    const { data } = await ctx.clients.compositions.getCompositionsFromMaster(
      masterSeller
    )

    return data
  },
}
