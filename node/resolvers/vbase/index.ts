// import { Readable } from 'stream'

import { parseBuffer } from '../../utils'

export const queries = {
  getData: async (
    _: unknown,
    { key }: { key: string },
    ctx: Context
  ): Promise<any> => {
    const aux = await ctx.clients.vbase.getJSON<{ key: string }>(
      'tintometric',
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
    await ctx.clients.vbase.saveJSON('tintometric', key, value)
  },

  saveFile: async (
    _: unknown,
    { file, key }: { file: any; key: string },
    ctx: Context
  ): Promise<string> => {
    try {
      const file2 = await file
      const stream = file2.createReadStream(file2)

      await ctx.clients.vbase.saveFile('tintometric', key, stream)

      return file2.filename
    } catch (e) {
      return e
    }
  },

  deleteFile: async (
    _: unknown,
    { key }: { key: string },
    ctx: Context
  ): Promise<any> => {
    const aux = await ctx.clients.vbase.deleteFile('tintometric', key)

    console.log('aux', aux)

    return aux
  },
}
