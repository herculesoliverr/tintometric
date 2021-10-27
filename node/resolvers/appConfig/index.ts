export const queries = {
  getConfig: async (_: any, __: any, ctx: Context) => {
    const {
      clients: { apps },
    } = ctx

    const appId = process.env.VTEX_APP_ID
    const { sellerMasterId } = await apps.getAppSettings(appId)

    return {
      sellerMasterId,
    }
  },
}
