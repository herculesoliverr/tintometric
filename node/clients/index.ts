import { IOClients } from '@vtex/api'

import Pricing from './pricing'
import Catalog from './catalog'
import Files from './files'

export class Clients extends IOClients {
  public get pricing() {
    return this.getOrSet('pricing', Pricing)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get files() {
    return this.getOrSet('files', Files)
  }
}
