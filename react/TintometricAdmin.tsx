import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'

import { InputCurrency, Button, Layout, PageBlock, Spinner, Alert, Checkbox } from 'vtex.styleguide'

import updateSkusPricesGQL from './graphql/updateSkusPrices.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'
import useInput from "./hooks/useInput"
import UploadFile from './components/UploadFile/UploadFile'


const TintometricAdmin: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formValidated, setFormValidated] = useState(false)
    const [updateSkusPrices] = useMutation(updateSkusPricesGQL)
    const intl = useIntl()
    const [oldPrices, setOldPrices] = useState(false)
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

    const minArray = ["minbase1", "minbase2", "minbase3", "minbase4", "minbase5", "mintinter1", "mintinter2", "mintinter3", "mintinter4", "mintinter5", "mintinter6", "mintinter7", "mintinter8", "mintinter9", "mintinter10", "mintinter11"]

    const data: any = {
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

    const minResponses: any = {};

    minArray.forEach((item): any => {
        const res = useQuery(getDataGQL, { variables: { key: item } })
        res.data?.getData ? minResponses[item] = res.data?.getData : minResponses[item] = 1
    })

    const formValidation = () => {
        if (Number(data.base1) > minResponses.minbase1 &&
            Number(data.base2) > minResponses.minbase2 &&
            Number(data.base3) > minResponses.minbase3 &&
            Number(data.base4) > minResponses.minbase4 &&
            Number(data.base5) > minResponses.minbase5 &&
            Number(data.tinter1) > minResponses.mintinter1 &&
            Number(data.tinter2) > minResponses.mintinter2 &&
            Number(data.tinter3) > minResponses.mintinter3 &&
            Number(data.tinter4) > minResponses.mintinter4 &&
            Number(data.tinter5) > minResponses.mintinter5 &&
            Number(data.tinter6) > minResponses.mintinter6 &&
            Number(data.tinter7) > minResponses.mintinter7 &&
            Number(data.tinter8) > minResponses.mintinter8 &&
            Number(data.tinter9) > minResponses.mintinter9 &&
            Number(data.tinter10) > minResponses.mintinter10 &&
            Number(data.tinter11) > minResponses.mintinter11
        ) {
            setFormValidated(true)
        } else {
            setFormValidated(false)
        }
    }


    const handleSubmit = async () => {
        setIsLoading(true)
        setSuccess(false)
        await Object.entries(data).forEach(([key, val]: any) => saveData({ variables: { key: key, value: val.toString() } }))

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
                tinter11: parseFloat(data.tinter11),
                oldPrices: oldPrices
            }
        }).then(() => {
            setIsLoading(false)
            setSuccess(true)
        })
    }

    useEffect(() => {
        formValidation()
    }, [data])

    if (base1Query.loading || base2Query.loading) {
        return (<div className="flex items-center justify-center mv8"><Spinner /></div>)
    }

    return (
        <>
            <Layout>
                <PageBlock
                    title={intl.formatMessage({
                        id: 'admin.app.tintometric.title'
                    })}
                    subtitle={intl.formatMessage({
                        id: 'admin.app.tintometric.description'
                    })}
                    variation="full">
                    {success &&
                        <div className={`mt5`}>
                            <Alert type="success" >
                                <FormattedMessage id="admin.app.tintometric.update_success" />
                            </Alert>
                        </div>
                    }
                    <span className={"mv5 db"}>
                        <Checkbox
                            checked={oldPrices}
                            id="option-0"
                            label={intl.formatMessage({
                                defaultMessage: 'Old Prices',
                                id: 'admin.app.tintometric.oldPrices',
                            })}
                            name="default-checkbox-group"
                            onChange={() => setOldPrices(!oldPrices)}
                            value="option-0"
                        />
                    </span>
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
                        {data.base1 < minResponses.minbase1 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.minbase1}
                            </Alert>
                        }
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
                        {data.base2 < minResponses.minbase2 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.minbase2}
                            </Alert>
                        }
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
                        {data.base3 < minResponses.minbase3 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.minbase3}
                            </Alert>
                        }
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
                        {data.base4 < minResponses.minbase4 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.minbase4}
                            </Alert>
                        }
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
                        {data.base5 < minResponses.minbase5 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.minbase5}
                            </Alert>
                        }
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
                        {data.tinter1 < minResponses.mintinter1 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter1}
                            </Alert>
                        }
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
                        {data.tinter2 < minResponses.mintinter2 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter2}
                            </Alert>
                        }
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
                        {data.tinter3 < minResponses.mintinter3 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter3}
                            </Alert>
                        }
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
                        {data.tinter4 < minResponses.mintinter4 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter4}
                            </Alert>
                        }
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
                        {data.tinter5 < minResponses.mintinter5 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter5}
                            </Alert>
                        }
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
                        {data.tinter6 < minResponses.mintinter6 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter6}
                            </Alert>
                        }
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
                        {data.tinter7 < minResponses.mintinter7 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter7}
                            </Alert>
                        }
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
                        {data.tinter8 < minResponses.mintinter8 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter8}
                            </Alert>
                        }
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
                        {data.tinter9 < minResponses.mintinter9 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter9}
                            </Alert>
                        }
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
                        {data.tinter10 < minResponses.mintinter10 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter10}
                            </Alert>
                        }
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
                        {data.tinter11 < minResponses.mintinter11 &&
                            <Alert type="error" >
                                <FormattedMessage id="admin.app.tintometric.minText" /> {minResponses.mintinter11}
                            </Alert>
                        }
                    </span>
                    <span className={"mv5 db"}>
                        <UploadFile />
                    </span>
                    <span className="mr4 mb8 db">
                        <Button
                            variation="primary"
                            onClick={() => {
                                handleSubmit()
                            }}
                            isLoading={isLoading}
                            disabled={!formValidated}
                        >
                            <FormattedMessage id="admin.app.tintometric.update_skus_prices" />
                        </Button>
                    </span>
                </PageBlock>

            </Layout>
        </>
    )
}

export default TintometricAdmin
