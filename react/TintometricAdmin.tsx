import React, { FC, useState/* , useEffect  */ } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'

import { InputCurrency, Button, Layout, PageBlock, PageHeader, Spinner, Alert } from 'vtex.styleguide'

import updateSkusPricesGQL from './graphql/updateSkusPrices.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'

import useInput from "./hooks/useInput"
import UploadFile from './components/UploadFile/UploadFile'

const TintometricAdmin: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [updateSkusPrices] = useMutation(updateSkusPricesGQL)
    const [saveData] = useMutation(saveDataGQL)
    const base1Query = useQuery(getDataGQL, { variables: { key: 'base1' } })
    const base2Query = useQuery(getDataGQL, { variables: { key: 'base2' } })
    const base3Query = useQuery(getDataGQL, { variables: { key: 'base3' } })
    const base4Query = useQuery(getDataGQL, { variables: { key: 'base4' } })
    const base5Query = useQuery(getDataGQL, { variables: { key: 'base5' } })

    const tinter1Query = useQuery(getDataGQL, { variables: { key: 'tinter1' } })
    const tinter2Query = useQuery(getDataGQL, { variables: { key: 'tinter2' } })
    const tinter3Query = useQuery(getDataGQL, { variables: { key: 'tinter3' } })
    const tinter4Query = useQuery(getDataGQL, { variables: { key: 'tinter4' } })
    const tinter5Query = useQuery(getDataGQL, { variables: { key: 'tinter5' } })
    const tinter6Query = useQuery(getDataGQL, { variables: { key: 'tinter6' } })
    const tinter7Query = useQuery(getDataGQL, { variables: { key: 'tinter7' } })
    const tinter8Query = useQuery(getDataGQL, { variables: { key: 'tinter8' } })
    const tinter9Query = useQuery(getDataGQL, { variables: { key: 'tinter9' } })
    const tinter10Query = useQuery(getDataGQL, { variables: { key: 'tinter10' } })
    const tinter11Query = useQuery(getDataGQL, { variables: { key: 'tinter11' } })

    const base1 = useInput(base1Query.data?.getData);
    const base2 = useInput(base2Query.data?.getData);
    const base3 = useInput(base3Query.data?.getData);
    const base4 = useInput(base4Query.data?.getData);
    const base5 = useInput(base5Query.data?.getData);
    const tinter1 = useInput(tinter1Query.data?.getData);
    const tinter2 = useInput(tinter2Query.data?.getData);
    const tinter3 = useInput(tinter3Query.data?.getData);
    const tinter4 = useInput(tinter4Query.data?.getData);
    const tinter5 = useInput(tinter5Query.data?.getData);
    const tinter6 = useInput(tinter6Query.data?.getData);
    const tinter7 = useInput(tinter7Query.data?.getData);
    const tinter8 = useInput(tinter8Query.data?.getData);
    const tinter9 = useInput(tinter9Query.data?.getData);
    const tinter10 = useInput(tinter10Query.data?.getData);
    const tinter11 = useInput(tinter11Query.data?.getData);

    const handleSubmit = async () => {
        setIsLoading(true)

        const data = {
            base1: base1.value,
            base2: base2.value,
            base3: base3.value,
            base4: base4.value,
            base5: base5.value,
            tinter1: tinter1.value,
            tinter2: tinter2.value,
            tinter3: tinter3.value,
            tinter4: tinter4.value,
            tinter5: tinter5.value,
            tinter6: tinter6.value,
            tinter7: tinter7.value,
            tinter8: tinter8.value,
            tinter9: tinter9.value,
            tinter10: tinter10.value,
            tinter11: tinter11.value
        }

        await Object.entries(data).forEach(([key, val]) => saveData({ variables: { key: key, value: val.toString() } }))
        console.log("data", data)
        updateSkusPrices({
            variables: {
                base1: parseFloat(data.base1),
                base2: parseFloat(data.base2),
                base3: parseFloat(data.base3),
                base4: parseFloat(data.base4),
                base5: parseFloat(data.base5),
                tinter1: parseFloat(data.tinter1),
                tinter2: parseFloat(data.tinter2),
                tinter3: parseFloat(data.tinter3),
                tinter4: parseFloat(data.tinter4),
                tinter5: parseFloat(data.tinter5),
                tinter6: parseFloat(data.tinter6),
                tinter7: parseFloat(data.tinter7),
                tinter8: parseFloat(data.tinter8),
                tinter9: parseFloat(data.tinter9),
                tinter10: parseFloat(data.tinter10),
                tinter11: parseFloat(data.tinter11)
            }
        }).then(() => {
            setIsLoading(false)
            setSuccess(true)
        })

    }

    if (base1Query.loading || base2Query.loading) {
        return (<div className="flex items-center justify-center mv8"><Spinner /></div>)
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
                            label="Base 5"
                            name="base5"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...base5}
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
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 6"
                            name="tinter6"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter6}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 7"
                            name="tinter7"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter7}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 8"
                            name="tinter8"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter8}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 9"
                            name="tinter9"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter9}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 10"
                            name="tinter10"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter10}
                        />
                    </span>
                    <span className={"mv5 db"}>
                        <InputCurrency
                            label="Tinter 11"
                            name="tinter11"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            {...tinter11}
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
                    {success &&
                        <div className={`mt5`}>
                            <Alert type="success" onClose={() => setSuccess(false)}>
                                <FormattedMessage id="admin.app.tintometric.update_success" />
                            </Alert>
                        </div>
                    }
                </span>

                <UploadFile />

            </Layout>
        </>
    )
}

export default TintometricAdmin