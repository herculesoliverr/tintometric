import { IOClients } from '@vtex/api'

import Status from './status'
import Pricing from './pricing'
import Catalog from './catalog'



// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  
  public get pricing() {
    return this.getOrSet('pricing', Pricing)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
