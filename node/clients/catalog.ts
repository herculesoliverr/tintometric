import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'

import { statusToError } from '../utils'

const CATALOG_GRAPHQL_APP = 'vtex.catalog-graphql@1.x'

const PRODUCTS_QUERY = `
  query getProducts ($page: Int!) {
    products(term:"", page: $page, pageSize: 50) {
      items {
        skus{id}
      }
      paging {
        pages
      }
    }
  }
`

interface ProductResponse {
    products: {
        items: {
            sku: Array<{ id: string }>
        }
        paging: {
            pages: number
        }
    }
}

export default class Catalog extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions) {
        super(CATALOG_GRAPHQL_APP, ctx, opts)
    }

    public getProducts = async () => {
        try {
            console.log("getProducts1")
            const response = await this.getProductsPerPage({page: 1 })
            console.log("getProducts2", response)
            const {
                items,
                paging: { pages },
            } = (response.data as ProductResponse).products
            const collectItems = items
            const responsePromises = []
            console.log(pages)
            for (let i = 2; i <= 4; i++) {
                const promise = this.getProductsPerPage({ page: i })
                responsePromises.push(promise)
            }

            const resolvedPromises = await Promise.all(responsePromises)
            console.log("resolvedPromises", resolvedPromises)
            console.log("collectItems", collectItems)
            const flattenResponse: any[] = []
            // const flattenResponse = resolvedPromises.reduce((acc, curr) => {
            //     console.log("acc", acc)
            //     console.log("curr", curr)

            //     return [...acc.sku, ...(curr.data as ProductResponse).products.items.sku]
            // }, collectItems)

            return flattenResponse
        } catch (error) {
            return statusToError(error)
        }
    }

    public getProductsPerPage = ({
        page,
    }: {
        page: number
    }) => {
        return this.graphql.query<ProductResponse, { page: number }>({
            query: PRODUCTS_QUERY,
            variables: {
                page,
            },
        })
    }

}