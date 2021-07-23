import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'

import { statusToError } from '../utils'

const CATALOG_GRAPHQL_APP = 'vtex.catalog-graphql@1.x'

const PRODUCTS_QUERY = `
  query getProducts ($page: Int!) {
    products(term:"", page: $page, pageSize: 50) {
      items {
        skus{id, isActive}
      }
      paging {
        total
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
            total: number
        }
    }
}

interface Skus {
    id: string
}

interface PromiseInterface {
    data: {
        products: {
            items: {
                skus: Skus[]
            }[]
        }
    }
}



export default class Catalog extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions) {
        super(CATALOG_GRAPHQL_APP, ctx, opts)
    }

    public getProducts = async () => {
        try {
            const response = await this.getProductsPerPage({ page: 1 })
            const {
                paging: { total },
            } = (response.data as ProductResponse).products
            const responsePromises = []
            // console.log("total----", total)
            for (let i = 1; i <= total; i++) {
                const promise = this.getProductsPerPage({ page: i })
                responsePromises.push(promise)
            }

            const resolvedPromises: any = await Promise.all(responsePromises)
            let flattenResponse: PromiseInterface[] = []

            flattenResponse = resolvedPromises.map((x: any) => x.data.products.items.map((y: any) => y.skus)).flat(2).map((item: any) => item.isActive && item.id);
            console.log("flattenResponse----", JSON.stringify(flattenResponse))
            return flattenResponse
        } catch (error) {
            return statusToError(error)
        }
    }

    public getProductsPerPage = async ({
        page,
    }: {
        page: number
    }) => {
        await new Promise(r => setTimeout(r, 1000));
        return this.graphql.query<ProductResponse, { page: number }>({
            query: PRODUCTS_QUERY,
            variables: {
                page,
            },
        })
    }

}