import {
    mutations as tintometricMutations,
} from './tintometric'

import {
    queries as vbaseQueries,
    mutations as vbaseMutations,
} from './vbase'

export const resolvers = {
    Query: {
        ...vbaseQueries,
    },
    Mutation: {
        ...tintometricMutations,
        ...vbaseMutations,
    }
}