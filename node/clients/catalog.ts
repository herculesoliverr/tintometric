import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'

import { statusToError } from '../utils'

const CATALOG_GRAPHQL_APP = 'vtex.catalog-graphql@1.x'

const CATEGORIES_QUERY = `
  query GetCategories ($active: Boolean, $page: Int!) {
    categories(term:"*", page: $page, pageSize: 50, active: $active) {
      items {
        id
        name
      }
      paging {
        pages
      }
    }
  }
`

const PRODUCTS_QUERY = `
  query getProducts ($active: Boolean, $page: Int!) {
    products(term:"*", page: $page, pageSize: 50, active: $active) {
      items {
        skus{id}
      }
      paging {
        pages
      }
    }
  }
`
interface CategoryResponse {
    categories: {
        items: Array<{ id: string; name: string }>
        paging: {
            pages: number
        }
    }
}
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

export class CatalogGQL extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions) {
        super(CATALOG_GRAPHQL_APP, ctx, opts)
    }

    public getCategories = async (active = true) => {
        try {
            const response = await this.getCategoriesPerPage({ active, page: 1 })
            const {
                items,
                paging: { pages },
            } = (response.data as CategoryResponse).categories
            const collectItems = items
            const responsePromises = []

            for (let i = 2; i <= pages; i++) {
                const promise = this.getCategoriesPerPage({ active, page: i })
                responsePromises.push(promise)
            }

            const resolvedPromises = await Promise.all(responsePromises)

            const flattenResponse = resolvedPromises.reduce((acc, curr) => {
                return [...acc, ...(curr.data as CategoryResponse).categories.items]
            }, collectItems)

            return flattenResponse
        } catch (error) {
            return statusToError(error)
        }
    }

    private getCategoriesPerPage = ({
        active = true,
        page,
    }: {
        active: boolean
        page: number
    }) =>
        this.graphql.query<CategoryResponse, { active: boolean; page: number }>({
            query: CATEGORIES_QUERY,
            variables: {
                active,
                page,
            },
        })

    public getProducts = async (active = true) => {
        try {
            const response = await this.getProductsPerPage({ active, page: 1 })
            const {
                items,
                paging: { pages },
            } = (response.data as ProductResponse).products
            const collectItems = items
            const responsePromises = []

            for (let i = 2; i <= pages; i++) {
                const promise = this.getProductsPerPage({ active, page: i })
                responsePromises.push(promise)
            }

            const resolvedPromises = await Promise.all(responsePromises)

            const flattenResponse = resolvedPromises.reduce((acc, curr) => {
                return [...acc, ...(curr.data as ProductResponse).products.items.sku]
            }, collectItems)

            return flattenResponse
        } catch (error) {
            return statusToError(error)
        }
    }

    private getProductsPerPage = ({
        active = true,
        page,
    }: {
        active: boolean
        page: number
    }) =>
        this.graphql.query<ProductResponse, { active: boolean; page: number }>({
            query: PRODUCTS_QUERY,
            variables: {
                active,
                page,
            },
        })

}