import React, { FC, useState/* , useEffect  */ } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'

import { InputCurrency, Button, Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import updateSkusPricesGQL from './graphql/updateSkusPrices.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'

import useInput from "./hooks/useInput"
import UploadFile from './components/UploadFile/UploadFile'

const TintometricAdmin: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [updateSkusPrices] = useMutation(updateSkusPricesGQL)
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
        setIsLoading(true)
        const data = { base1: base1.value, base2: base2.value, base3: base3.value, base4: base4.value, tinter1: tinter1.value, tinter2: tinter2.value, tinter3: tinter3.value, tinter4: tinter4.value, tinter5: tinter5.value }

        Object.entries(data).forEach(([key, val]) => saveData({ variables: { key: key, value: val.toString() } }))

        updateSkusPrices({ variables: { base1: base1.value, base2: base2.value, base3: base3.value, base4: base4.value, tinter1: tinter1.value, tinter2: tinter2.value, tinter3: tinter3.value, tinter4: tinter4.value, tinter5: tinter5.value } })
    }


    if (base1Query.loading || base2Query.loading) {
        return (<Layout>"Loading...."</Layout>)
    }
    if (base1Query.error || base2Query.error) {
        return (
            <Layout>`Error! ${base1Query?.error?.message} ${base2Query?.error?.message}`</Layout>
        )
    }

    return (
        <>
            <Layout
                pageHeader={
                    <PageHeader
                        title={<FormattedMessage id="admin.app.tintometric.title" />}
                    />
                }
            >
                <PageBlock variation="full">
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Base 1"
                            name="base1"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...base1}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Base 2"
                            name="base2"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...base2}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Base 3"
                            name="base3"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...base3}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Base 4"
                            name="base4"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...base4}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 1"
                            name="tinter1"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter1}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 2"
                            name="tinter2"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter2}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 3"
                            name="tinter3"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter3}

                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 4"
                            name="tinter4"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter4}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 5"
                            name="tinter5"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter5}
                        />
                    </span>
                </PageBlock>
                <span className="mr4 mb8 db">
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


                <UploadFile />

                {/* <span className="mr4">
                    <Button
                        variation="primary"
                        onClick={() => {
                            handleSubmitJson()
                        }}
                        isLoading={isLoading}
                    >
                        <FormattedMessage id="admin.app.tintometric.uploadFile_button" />
                    </Button>
                </span> */}
            </Layout>
        </>
    )
}

export default TintometricAdmin