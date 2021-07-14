import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { Button } from 'vtex.styleguide'

import { InputCurrency } from 'vtex.styleguide'

import updateSkuPriceGQL from './graphql/updateSkuPrice.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'

import useInput from "./hooks/useInput"

const TintometricAdmin: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [updateSkuPrice] = useMutation(updateSkuPriceGQL)
    const [saveData] = useMutation(saveDataGQL)
    const base1Query = useQuery(getDataGQL, { variables: { key: 'base1' } })
    const base2Query = useQuery(getDataGQL, { variables: { key: 'base2' } })
    const base3Query = useQuery(getDataGQL, { variables: { key: 'base3' } })
    const base4Query = useQuery(getDataGQL, { variables: { key: 'base4' } })

    const tinter1Query = useQuery(getDataGQL, { variables: { key: 'tinter1' } })
    const tinter2Query = useQuery(getDataGQL, { variables: { key: 'tinter2' } })
    const tinter3Query = useQuery(getDataGQL, { variables: { key: 'tinter3' } })
    const tinter4Query = useQuery(getDataGQL, { variables: { key: 'tinter4' } })
    const tinter5Query = useQuery(getDataGQL, { variables: { key: 'tinter5' } })


    const base1 = useInput(base1Query.data?.getData);
    const base2 = useInput(base2Query.data?.getData);
    const base3 = useInput(base3Query.data?.getData);
    const base4 = useInput(base4Query.data?.getData);

    const tinter1 = useInput(tinter1Query.data?.getData);
    const tinter2 = useInput(tinter2Query.data?.getData);
    const tinter3 = useInput(tinter3Query.data?.getData);
    const tinter4 = useInput(tinter4Query.data?.getData);
    const tinter5 = useInput(tinter5Query.data?.getData);

    const handleSubmit = () => {
        setIsLoading(false)
        saveData({ variables: { key: 'base1', value: base1.value.toString() } })
    }
    console.log(base1?.value)
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
        return () => { }
    }, [isLoading])

    if (base1Query.loading || base2Query.loading) {
        return (<Layout>"Loading...."</Layout>)
    }
    if (base1Query.error || base2Query.error) {
        return (
            <Layout>`Error! ${base1Query?.error?.message} ${base2Query?.error?.message}`</Layout>
        )
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
                    label="Base 1"
                    name="base1"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...base1}
                /*  value={values.base1}
                 onChange={(
                     ev: EventInterface,
                 ): void => setValues({ ...values, base1: ev.target.value })} */
                />
                <InputCurrency
                    label="Base 2"
                    name="base2"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...base2}
                />
                <InputCurrency
                    label="Base 3"
                    name="base3"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...base3}

                />
                <InputCurrency
                    label="Base 4"
                    name="base4"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...base4}

                />
                <InputCurrency
                    label="Tinter 1"
                    name="tinter1"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...tinter1}

                />
                <InputCurrency
                    label="Tinter 2"
                    name="tinter2"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...tinter2}

                />
                <InputCurrency
                    label="Tinter 3"
                    name="tinter3"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...tinter3}

                />
                <InputCurrency
                    label="Tinter 4"
                    name="tinter4"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...tinter4}

                />
                <InputCurrency
                    label="Tinter 5"
                    name="tinter5"
                    size="small"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    {...tinter5}

                /*   value={base2Query.data.getData}
                  onChange={(e: any) => {
                      saveData({ variables: { key: 'base2', value: e.target.value.toString() } })
                  }} */
                />
            </PageBlock>
            <span className="mr4">
                <Button
                    variation="primary"
                    onClick={() => {
                        handleSubmit()
                    }}
                    isLoading={isLoading}
                >
                    <FormattedMessage id="admin.app.tintometric.update_skus_prices" />
                </Button>
            </span>
        </Layout>
    )
}

export default TintometricAdmin