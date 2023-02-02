import { json } from 'co-body';

class MasterDataService {
  public static async createTintometricConfigInMasterData(context: Context) {
    const contextRequestPayload = await json(context.req)
    const {
      clients: { masterData, apps },
    } = context

    const appId = process.env.VTEX_APP_ID
    const { appKey, appToken } = await apps.getAppSettings(appId)

    const config = {
      "family_url": contextRequestPayload.family_url,
      "products_type_url": contextRequestPayload.products_type_url,
      "products_url": contextRequestPayload.products_url
    }

    const repsonse = await masterData.createTintometricConfigInMasterData(config, appKey, appToken);

    context.status = repsonse.status;
    context.body = repsonse.body;
  }

  public static async getTintometricConfigFromMasterData(context: Context) {
    const {
      clients: { masterData },
    } = context

    const repsonse = await masterData.searchTintometricConfig();

    context.status = repsonse.status;
    context.body = repsonse.body;
  }
}

export default MasterDataService
