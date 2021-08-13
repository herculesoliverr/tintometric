import {
  queries as tintometricQueries,
  mutations as tintometricMutations,
} from './tintometric'

import { queries as vbaseQueries, mutations as vbaseMutations } from './vbase'

export const resolvers = {
  Query: {
    ...tintometricQueries,
    ...vbaseQueries,
  },
  Mutation: {
    ...tintometricMutations,
    ...vbaseMutations,
  },
}
