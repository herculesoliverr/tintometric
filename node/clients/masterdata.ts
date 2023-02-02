import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class MasterData extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        VtexIdclientAuthCookie: context.authToken,
        'Proxy-Authorization': context.authToken,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vtex.ds.v10+json',
      },
    })
  }

  async createTintometricConfigInMasterData(config: any, appKey: string, appToken: string): Promise<any> {
    try {
      await this.http.post('api/dataentities/TI/documents', config, {
        headers: {
          'X-VTEX-API-AppKey': appKey,
          'X-VTEX-API-AppToken': appToken,
        }
      });

      return {
        status: 200,
        body: {
          success: true
        }
      }
    } catch (error) {
      console.log(error)
      return {
        status: 400,
        body: {
          success: false
        }
      }
    }
  }

  async searchTintometricConfig(): Promise<any> {
    try {
      const response = await this.http.get('api/dataentities/TI/search', {
        params: {
          _fields: 'family_url,products_type_url,products_url',
          // _where: 'familly_url is not null and products_type_url is not null and products_url is not null'
        }
      });

      if(response.length) {
        return {
          status: 200,
          body: response[0]
        };
      }

      return {
        status: 400,
        body: {
          success: false,
          message: "Nenhuma configuracao encontrada"
        }
      }
    } catch (error) {
      console.log(error)
      return {
        status: 400,
        body: {
          success: false
        }
      }
    }
  }
}
