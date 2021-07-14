import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { Button } from 'vtex.styleguide'

import { InputCurrency } from 'vtex.styleguide'

import updateSkuPriceGQL from './graphql/updateSkuPrice.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'


const TintometricAdmin: FC = () => {

    const [isLoading, setIsLoading] = useState(false)

    // const [base1, setBase1] = useState()
    // const [base2, setBase2] = useState()
    // const [base3, setBase3] = useState()
    // const [base4, setBase4] = useState()

    // const [tint1, setTint1] = useState()
    // const [tint2, setTint2] = useState()
    // const [tint3, setTint3] = useState()
    // const [tint4, setTint4] = useState()

    const base1Query = useQuery(getDataGQL, { variables: { key: 'base1' } })
    const base2Query = useQuery(getDataGQL, { variables: { key: 'base2' } })

    useEffect(() => {
        if (isLoading) {
            updateSkuPrice({ variables: { skuId: '1', costPrice: 3, basePrice: 3, listPrice: 5 } })
            const timeout = setTimeout(() => {
                setIsLoading(!isLoading)
            }, 1000);
          
            return () => {
                clearTimeout(timeout)
            }
        }
        return () => {}
    }, [isLoading])

    const [saveData] = useMutation(saveDataGQL)
    const [updateSkuPrice] = useMutation(updateSkuPriceGQL)

    if (base1Query.loading || base2Query.loading) {
        return (<Layout>"Loading...."</Layout>)
    }
    if (base1Query.error || base2Query.error) {
        return (<Layout>`Error! ${base1Query?.error?.message} ${base2Query?.error?.message}`</Layout>)
    }

    return (
        <Layout
            pageHeader={
                <PageHeader
                title={<FormattedMessage id="admin.app.tintometric.title" />}
                />
            }
            >
            <PageBlock variation="full">
                <InputCurrency
                    label="Small"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    value={ base1Query.data.getData }
                    onChange={ (e: any) => {
                        console.log(e)
                        saveData({ variables: { key: 'base1', value: e.target.value.toString() } } )
                    } }
                />
                <InputCurrency
                    label="Small"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    value={ base2Query.data.getData }
                    onChange={ (e: any) => {
                        saveData({ variables: { key: 'base2', value: e.target.value.toString() } } )
                    } }
                />
            </PageBlock>
            <span className="mr4">
                <Button
                    variation="primary"
                    onClick={() => { 
                        setIsLoading(!isLoading)
                    }}
                    isLoading={ isLoading }
                    >
                    <FormattedMessage id="admin.app.tintometric.update_skus_prices" />
                </Button>
            </span>
        </Layout>
    )
}

export default TintometricAdmin