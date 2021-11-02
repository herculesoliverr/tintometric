// import { Readable } from 'stream'

import { parseBuffer } from '../../utils'

export const queries = {
  getData: async (
    _: unknown,
    { key }: { key: string },
    ctx: Context
  ): Promise<any> => {
    const aux = await ctx.clients.vbase.getJSON<{ key: string }>(
      'tintometricData',
      key
    )

    return aux
  },
  getFile: async (
    _: unknown,
    { key }: { key: string },
    ctx: Context
  ): Promise<any> => {
    const { data: vbFile } = await ctx.clients.vbase.getFile('tintometric', key)

    const parsedFile = parseBuffer(vbFile)

    console.log('response', parsedFile)

    return parsedFile
  },
}

export const mutations = {
  saveData: async (
    _: unknown,
    {
      key,
      value,
    }: {
      key: string
      value: string
    },
    ctx: Context
  ): Promise<void> => {
    await ctx.clients.vbase.saveJSON('tintometricData', key, value)
  },

  saveFile: async (
    _: unknown,
    { file, key }: { file: any; key: string },
    ctx: Context
  ): Promise<string> => {
    try {
      const file2 = await file
      const stream = file2.createReadStream(file2)

      const res = await ctx.clients.vbase.saveFile('tintometric', key, stream)

      console.log('res', res)

      // const response = { ...res[0], ...file2 }

      // console.log('res saveFile', response)

      return file2.filename
    } catch (e) {
      console.log('Error trying to save order to VB =>', e.response)

      return e
    }
  },
}
