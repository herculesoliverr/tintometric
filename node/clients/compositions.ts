import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

export default class Compositions extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getCompositionsFromMaster(masterSeller: string, token: string) {
    const headers = {
      headers: {
        VtexIdClientAutCookie: token,
      },
    }

    const url = `http://app.io.vtex.com/vtexarg.tintometric/v8/${masterSeller}/${this.context.workspace}/compositionFile`

    const res = await this.http.getRaw(url, headers)

    return res
  }
}
