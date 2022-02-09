import { InstanceOptions, IOContext, ExternalClient } from '@vtex/api'

export default class VtexID extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    const url = 'http://vtexid.vtexcommercestable.com.br'

    super(url, context, {
      ...options,
    })
  }

  public async login(key: string, token: string): Promise<string> {
    const body = {
      appkey: key,
      apptoken: token,
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    return this.http.post(`/api/vtexid/apptoken/login`, body, headers)
  }
}
