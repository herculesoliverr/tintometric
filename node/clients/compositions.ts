import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

export default class Compositions extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getCompositionsFromMaster(masterSeller: string, token: string, withFx: boolean = true) {
    const headers = {
      headers: {
        VtexIdClientAutCookie: token,
      },
    }

    //const workspace = this.context.account === masterSeller.toLowerCase() ? this.context.workspace : 'master'
    const workspace = this.context.workspace

    const url = `http://app.io.vtex.com/vtexarg.tintometric/v8/${masterSeller}/${workspace}/compositionFile?withFx=${withFx}`

    const res = await this.http.getRaw(url, headers)
    return res
  }
}
