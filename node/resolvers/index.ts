import { mutations as tintometricMutations } from './tintometric'
import { queries as vbaseQueries, mutations as vbaseMutations } from './vbase'
import { queries as appConfigQueries } from './appConfig'

export const resolvers = {
  Query: {
    ...vbaseQueries,
    ...appConfigQueries,
  },
  Mutation: {
    ...tintometricMutations,
    ...vbaseMutations,
  },
}
