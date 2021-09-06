import {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  Service,
} from '@vtex/api'

import { Clients } from './clients'
import { resolvers } from './resolvers'

const TIMEOUT_MS = 600000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
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
