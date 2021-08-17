import {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  LRUCache,
  Service,
} from '@vtex/api'

import { Clients } from './clients'
import { resolvers } from './resolvers'

const TIMEOUT_MS = 600000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, Context>({
  clients,
  graphql: { resolvers },
})
