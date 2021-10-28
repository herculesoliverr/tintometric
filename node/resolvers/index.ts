import { mutations as tintometricMutations } from './tintometric'
import { queries as vbaseQueries, mutations as vbaseMutations } from './vbase'
import { queries as appConfigQueries } from './appConfig'
import { queries as compositionsQueries } from './compositions'

export const resolvers = {
  Query: {
    ...vbaseQueries,
    ...appConfigQueries,
    ...compositionsQueries,
  },
  Mutation: {
    ...tintometricMutations,
    ...vbaseMutations,
  },
}
