import { IOClients } from '@vtex/api'

import Pricing from './pricing'
import Catalog from './catalog'
import Files from './files'
import Compositions from './compositions'
import VtexID from './vtexID'
import MasterData from './masterdata'

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

  public get compositions() {
    return this.getOrSet('compositions', Compositions)
  }

  public get vtexID() {
    return this.getOrSet('vtexID', VtexID)
  }

  public get masterData() {
    return this.getOrSet('masterData', MasterData)
  }
}
