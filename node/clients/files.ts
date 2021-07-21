import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'

// const FILE_GRAPHQL_APP = 'vtex.file-manager-graphql@0.x'


const FILE_QUERY = `
query getData($key: String!){
    getData(key: $key)
}
`

export default class Files extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions) {
        super(FILE_QUERY, ctx, opts)
    }

    public getFile = ({
        key,
    }: {
        key: string
    }) => {
        return this.graphql.query<any, { key: string }>({
            query: FILE_QUERY,
            variables: {
                key,
            },
        })
    }
}