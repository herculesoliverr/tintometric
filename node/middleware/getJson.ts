import { parseBuffer } from '../utils'

export async function getJson(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
  } = ctx

  const { data: vbFile } = await vbase.getFile('tintometric', 'json')
  const parsedFile = parseBuffer(vbFile)

  ctx.body = JSON.stringify(parsedFile)

  await next()
}
