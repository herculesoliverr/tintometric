import {
  InstanceOptions,
  IOContext,
  ExternalClient,
  IOResponse,
} from '@vtex/api'

export default class Files extends ExternalClient {
  // convertir a Janus client
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexassets.com`, context, options)
  }

  public async getFile(fileUrl: string): Promise<IOResponse<any>> {
    const fileName = fileUrl.split('/')[fileUrl.split('/').length - 1]

    return this.http.getRaw(
      `/assets/vtex.file-manager-graphql/images/${fileName}`
    )
  }
}
