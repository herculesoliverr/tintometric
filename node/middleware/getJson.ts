import { parseBuffer } from '../utils'

export async function getJson(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
  } = ctx
  const withFx = ctx.request.query?.withFx ? ctx.request.query?.withFx : true

  const { data: vbFile } = await vbase.getFile('tintometric', 'json')
  const parsedFile = parseBuffer(vbFile)
    if (withFx == 'false') {
      const parseJson = JSON.parse(parsedFile)
      const jsonWithoutFx = {
        ...parseJson,
        products: parseJson.products.map((product: any) => {
          return { ...product, composition: {} }
        })
      }
      ctx.body = JSON.stringify(jsonWithoutFx)
    } else {
      ctx.body = JSON.stringify(parsedFile)
    }
  await next()
}
