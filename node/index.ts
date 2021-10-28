import {
  ClientsConfig,
  RecorderState,
  Service,
  method,
  LRUCache,
} from '@vtex/api'

import { Clients } from './clients'
import { getCompositions } from './middleware/composition'
import { resolvers } from './resolvers'

const TIMEOUT_MS = 600000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    catalog: {
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 200,
      retries: 3,
    },
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
  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, Context>({
  clients,
  graphql: { resolvers },
  routes: {
    composition: method({
      GET: [getCompositions],
    }),
  },
})
