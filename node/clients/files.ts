import {
  InstanceOptions,
  IOContext,
  ExternalClient,
  IOResponse,
} from '@vtex/api'

export default class Files extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexassets.com`, context, options)
  }

  public async getFile(
    fileUrl: string,
    masterSeller: string
  ): Promise<IOResponse<any>> {
    const fileName = fileUrl.split('/')[fileUrl.split('/').length - 1]

    return this.http.getRaw(
      `http://${masterSeller ||
        this.context
          .account}.vtexassets.com/assets/vtex.file-manager-graphql/images/${fileName}`
    )
    /* return this.http.getRaw(
      `/assets/vtex.file-manager-graphql/images/${fileName}`
    ) */
  }
}
