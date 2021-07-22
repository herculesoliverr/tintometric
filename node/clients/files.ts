import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Files extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexassets.com`, context, options)
  }

  public async getFile(fileUrl: string): Promise<any> {
    console.log(fileUrl)
    const fileName = fileUrl.split('/')[fileUrl.split('/').length-1]
    console.log(fileName)
    return this.http.get(`/assets/vtex.file-manager-graphql/images/${fileName}`)
  }

}