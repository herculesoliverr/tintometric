import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Pricing extends JanusClient {
  private baseUrl = 'pricing/prices'

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
        'x-vtex-user-agent': context.userAgent,
      },
    })
  }

  // eslint-disable-next-line max-params
  public async updateSkuPrice(
    skuId: number,
    costPrice: number,
    basePrice: number,
    listPrice: number
  ): Promise<string> {
    const body = {
      costPrice,
      basePrice,
      listPrice,
    }

    return this.http.put(
      `/${this.context.account}/${this.baseUrl}/${skuId}?an=${this.context.account}`,
      body,
      { metric: 'pricing__update' }
    )
  }
}
