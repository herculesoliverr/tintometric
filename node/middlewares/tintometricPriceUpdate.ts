export async function tintometricPriceUpdate(ctx: Context, next: () => Promise<any>) {
    const {
      clients: { pricing: pricingClient },
    } = ctx

    // Here we need to iterate the whole Catalog and for each SKU search for the info on the JSON

    let skuId = "1"
    let costPrice = 1
    let basePrice = 1
    let listPrice = 2

    const response = pricingClient.updateSkuPrice(skuId, costPrice, basePrice, listPrice) 
  
    console.info('Status response:', response)
  
    ctx.status = 200
    ctx.body = response
  
    await next()
}