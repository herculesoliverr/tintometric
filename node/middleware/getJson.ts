export async function getJson(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
  } = ctx

  const jsonUrl = await vbase.getJSON<string>('tintometricData', 'jsonFile')

  ctx.body = jsonUrl

  await next()
}
