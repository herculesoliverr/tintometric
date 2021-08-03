import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export default class Pricing extends JanusClient {
    private baseUrl = 'pricing/prices'

    constructor(context: IOContext, options?: InstanceOptions) {
        super(context, {
            ...options,
            headers: {
                ...options?.headers,
                VtexIdclientAutCookie:
                    context.storeUserAuthToken ?? context.adminUserAuthToken ?? context.authToken ?? '',
                'x-vtex-user-agent': context.userAgent,
            },
        })
    }

    public async updateSkuPrice(skuId: string, costPrice: number, basePrice: number, listPrice: number): Promise<string> {
        let body = {
            costPrice: costPrice,
            basePrice: basePrice,
            listPrice: listPrice
        }
        return this.http.put(`/${this.context.account}/${this.baseUrl}/${skuId}?an=${this.context.account}`, body, { metric: 'pricing__update' })
    }
}
