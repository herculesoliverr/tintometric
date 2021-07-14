import {
    queries as pricingQueries,
    mutations as pricingMutations,
} from './pricing'

import {
    queries as vbaseQueries,
    mutations as vbaseMutations,
} from './vbase'

export const resolvers = {
    Query: {
        ...pricingQueries,
        ...vbaseQueries,
    },
    Mutation: {
        ...pricingMutations,
        ...vbaseMutations,
    }
}