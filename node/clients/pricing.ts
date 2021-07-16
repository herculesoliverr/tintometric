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
                context.storeUserAuthToken ?? context.adminUserAuthToken ?? context.authToken ??'',
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

    // public async updateSkusPrices(skuIds: [string], costPrices: [number], basePrices: [number], listPrices: [number]): Promise<string> {
    //     if (costPrices.length != skuIds.length || basePrices.length != skuIds.length || listPrices.length != skuIds.length) {
    //         return 'strings length do not match'
    //     }

    //     let body = {
    //         costPrice: 0,
    //         basePrice: 0,
    //         listPrice: 0
    //     }

    //     for (let i = 0; i < skuIds.length; i++) {
    //         body.costPrice = costPrices[i]
    //         body.basePrice = basePrices[i]
    //         body.listPrice = listPrices[i]
    //         this.http.put(`/${this.context.account}/${this.baseUrl}/${skuIds[i]}?an=${this.context.account}`, body, { metric: 'pricing__update' })
    //     }

    //     return 'iteration update ended'
    // }

}
