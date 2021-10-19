import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'
import {
  InputCurrency,
  Button,
  Layout,
  PageBlock,
  Spinner,
  Alert,
  // Checkbox,
  Toggle,
  PageHeader,
} from 'vtex.styleguide'

import updateSkusPricesGQL from './graphql/updateSkusPrices.gql'
import getDataGQL from './graphql/getData.gql'
import saveDataGQL from './graphql/saveData.gql'
import useInput from './hooks/useInput'
import UploadFile from './components/UploadFile/UploadFile'
import ErrorAlert from './components/UploadFile/ErrorAlert'

const TintometricAdmin: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [oldPrices, setOldPrices] = useState(false)
  const [jsonFile, setJsonFile] = useState(false)
  const [csvFile, setCsvFile] = useState(false)
  const [formValidated, setFormValidated] = useState(false)
  const [state, setState] = useState({
    success: false,
    error: false,
    skusNotFound: '',
    skusBadStructure: '',
    baseNotFound: '',
  })

  const [updateSkusPrices] = useMutation(updateSkusPricesGQL)
  const [saveData] = useMutation(saveDataGQL)
  const intl = useIntl()

  /*   const base1Query = useQuery(getDataGQL, { variables: { key: 'base1' } })
  const base2Query = useQuery(getDataGQL, { variables: { key: 'base2' } })
  const base3Query = useQuery(getDataGQL, { variables: { key: 'base3' } })
  const base4Query = useQuery(getDataGQL, { variables: { key: 'base4' } })
  const base5Query = useQuery(getDataGQL, { variables: { key: 'base5' } }) */

  const tinter1Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC1' },
  })

  const tinter2Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC2' },
  })

  const tinter3Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC3' },
  })

  const tinter4Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC4' },
  })

  const tinter5Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC5' },
  })

  const tinter6Query = useQuery(getDataGQL, {
    variables: { key: 'tintertinterLOC6' },
  })

  const tinter7Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC7' },
  })

  const tinter8Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC8' },
  })

  const tinter9Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC9' },
  })

  const tinter10Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC10' },
  })

  const tinter11Query = useQuery(getDataGQL, {
    variables: { key: 'tinterLOC11' },
  })

  const mintinter1 = useQuery(getDataGQL, { variables: { key: 'mintinter1' } })
  const mintinter2 = useQuery(getDataGQL, { variables: { key: 'mintinter2' } })
  const mintinter3 = useQuery(getDataGQL, { variables: { key: 'mintinter3' } })
  const mintinter4 = useQuery(getDataGQL, { variables: { key: 'mintinter4' } })
  const mintinter5 = useQuery(getDataGQL, { variables: { key: 'mintinter5' } })
  const mintinter6 = useQuery(getDataGQL, { variables: { key: 'mintinter6' } })
  const mintinter7 = useQuery(getDataGQL, { variables: { key: 'mintinter7' } })
  const mintinter8 = useQuery(getDataGQL, { variables: { key: 'mintinter8' } })
  const mintinter9 = useQuery(getDataGQL, { variables: { key: 'mintinter9' } })
  const mintinter10 = useQuery(getDataGQL, {
    variables: { key: 'mintinter10' },
  })

  const mintinter11 = useQuery(getDataGQL, {
    variables: { key: 'mintinter11' },
  })

  // TINTERS LABELS
  const { data: tinterLabel1 } = useQuery(getDataGQL, {
    variables: { key: 'tinterLabel1' },
  })

  console.log('tinterLabel1', tinterLabel1)

  const tinter1 = useInput(tinter1Query.data?.getData)
  const tinter2 = useInput(tinter2Query.data?.getData)
  const tinter3 = useInput(tinter3Query.data?.getData)
  const tinter4 = useInput(tinter4Query.data?.getData)
  const tinter5 = useInput(tinter5Query.data?.getData)
  const tinter6 = useInput(tinter6Query.data?.getData)
  const tinter7 = useInput(tinter7Query.data?.getData)
  const tinter8 = useInput(tinter8Query.data?.getData)
  const tinter9 = useInput(tinter9Query.data?.getData)
  const tinter10 = useInput(tinter10Query.data?.getData)
  const tinter11 = useInput(tinter11Query.data?.getData)

  const minResponses = {
    /*   base1: minbase1.data?.getData || 1,
    base2: minbase2.data?.getData || 1,
    base3: minbase3.data?.getData || 1,
    base4: minbase4.data?.getData || 1,
    base5: minbase5.data?.getData || 1, */
    tinter1: mintinter1.data?.getData || 1,
    tinter2: mintinter2.data?.getData || 1,
    tinter3: mintinter3.data?.getData || 1,
    tinter4: mintinter4.data?.getData || 1,
    tinter5: mintinter5.data?.getData || 1,
    tinter6: mintinter6.data?.getData || 1,
    tinter7: mintinter7.data?.getData || 1,
    tinter8: mintinter8.data?.getData || 1,
    tinter9: mintinter9.data?.getData || 1,
    tinter10: mintinter10.data?.getData || 1,
    tinter11: mintinter11.data?.getData || 1,
  }

  const compositionValues = {
    /* base1: base1.value,
    base2: base2.value,
    base3: base3.value,
    base4: base4.value,
    base5: base5.value, */
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
    tinter11: tinter11.value,
  }

  const formValidation = () => {
    if (
      /*       Number(compositionValues.base1) >= minResponses.base1 &&
      Number(compositionValues.base2) >= minResponses.base2 &&
      Number(compositionValues.base3) >= minResponses.base3 &&
      Number(compositionValues.base4) >= minResponses.base4 &&
      Number(compositionValues.base5) >= minResponses.base5 && */
      Number(compositionValues.tinter1) >= minResponses.tinter1 &&
      Number(compositionValues.tinter2) >= minResponses.tinter2 &&
      Number(compositionValues.tinter3) >= minResponses.tinter3 &&
      Number(compositionValues.tinter4) >= minResponses.tinter4 &&
      Number(compositionValues.tinter5) >= minResponses.tinter5 &&
      Number(compositionValues.tinter6) >= minResponses.tinter6 &&
      Number(compositionValues.tinter7) >= minResponses.tinter7 &&
      Number(compositionValues.tinter8) >= minResponses.tinter8 &&
      Number(compositionValues.tinter9) >= minResponses.tinter9 &&
      Number(compositionValues.tinter10) >= minResponses.tinter10 &&
      Number(compositionValues.tinter11) >= minResponses.tinter11 &&
      jsonFile &&
      csvFile
    ) {
      setFormValidated(true)
    } else {
      setFormValidated(false)
    }
  }

  useEffect(() => {
    formValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compositionValues])

  useEffect(() => {
    setState({
      success: false,
      error: false,
      skusNotFound: '',
      skusBadStructure: '',
      baseNotFound: '',
    })
  }, [jsonFile])

  if (tinter11Query.loading || tinter11Query.loading) {
    return (
      <div className="flex items-center justify-center mv8">
        <Spinner />
      </div>
    )
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setState({
      success: false,
      error: false,
      skusNotFound: '',
      skusBadStructure: '',
      baseNotFound: '',
    })
    await Object.entries(compositionValues).forEach(([key, val]: any) =>
      saveData({ variables: { key, value: val.toString() } })
    )

    updateSkusPrices({
      variables: {
        tinter1: parseFloat(compositionValues.tinter1),
        tinter2: parseFloat(compositionValues.tinter2),
        tinter3: parseFloat(compositionValues.tinter3),
        tinter4: parseFloat(compositionValues.tinter4),
        tinter5: parseFloat(compositionValues.tinter5),
        tinter6: parseFloat(compositionValues.tinter6),
        tinter7: parseFloat(compositionValues.tinter7),
        tinter8: parseFloat(compositionValues.tinter8),
        tinter9: parseFloat(compositionValues.tinter9),
        tinter10: parseFloat(compositionValues.tinter10),
        tinter11: parseFloat(compositionValues.tinter11),
        oldPrices,
      },
    }).then(({ data }) => {
      const res = JSON.parse(data.updateSkusPrices)

      const { skusNotFound, skusBadStructure, baseNotFound } = res

      setIsLoading(false)
      if (skusNotFound.length > 0) {
        setState({
          success: false,
          error: true,
          skusNotFound: `${skusNotFound}`,
          skusBadStructure: `${skusBadStructure}`,
          baseNotFound: `${baseNotFound}`,
        })
      } else {
        setState(prevState => ({ ...prevState, success: true }))
      }
    })
  }

  return (
    <>
      <Layout
        pageHeader={
          <PageHeader
            title={<FormattedMessage id="admin/admin.app.tintometric.title" />}
          />
        }
      >
        <PageBlock
          subtitle={intl.formatMessage({
            id: 'admin/admin.app.tintometric.description',
          })}
          variation="full"
        >
          {state.success && (
            <div className="mt5">
              <Alert
                onClose={() =>
                  setState(prevState => ({ ...prevState, success: false }))
                }
                type="success"
              >
                <FormattedMessage id="admin/admin.app.tintometric.update_success" />
              </Alert>
            </div>
          )}
          {state.error && state.skusNotFound?.length > 0 && (
            <div className="mt5">
              <ErrorAlert
                message={`${intl.formatMessage({
                  id: 'admin/admin.app.tintometric.skusNotFound',
                })} ${state.skusNotFound}`}
              />
            </div>
          )}

          {state.error && state.skusBadStructure?.length > 0 && (
            <div className="mt5">
              <ErrorAlert
                message={`${intl.formatMessage({
                  id: 'admin/admin.app.tintometric.skusBadStructure',
                })} ${state.skusBadStructure}`}
              />
            </div>
          )}
          {state.error && state.baseNotFound?.length > 0 && (
            <div className="mt5">
              <ErrorAlert
                message={`${intl.formatMessage({
                  id: 'admin/admin.app.tintometric.baseNotFound',
                })} ${state.baseNotFound}`}
              />
            </div>
          )}
          <div className="flex">
            <span className="mv5 db mr9 pr8 br b--light-gray ">
              <span className="mt5 db">
                <FormattedMessage id="admin/admin.app.tintometric.uploadCSV" />
              </span>
              <span className="mv2 mb5 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                <FormattedMessage id="admin/admin.app.tintometric.uploadCSV.subtitle" />
              </span>
              <UploadFile templateFile="" query="csv" action={setCsvFile} />
            </span>
            <span className="mv5 db">
              <span className="mt5 db">
                <FormattedMessage id="admin/admin.app.tintometric.uploadJson" />
              </span>
              <span className="mv2 mb5 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                <FormattedMessage id="admin/admin.app.tintometric.uploadJson.subtitle" />
              </span>
              <UploadFile
                templateFile="template_tintometric.json"
                query="json"
                action={setJsonFile}
              />
            </span>
          </div>
          <span className="mv5 db">
            <Toggle
              checked={oldPrices}
              label={intl.formatMessage({
                defaultMessage: 'Old Prices',
                id: 'admin/admin.app.tintometric.>',
              })}
              name="default-checkbox-group"
              onChange={() => setOldPrices(!oldPrices)}
              size="large"
            />
            <div className="mv4 pa3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
              <FormattedMessage id="admin/admin.app.tintometric.oldPrices-subtitle" />
            </div>
          </span>
          {!oldPrices ? (
            <>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label={tinterLabel1 ? tinterLabel1.getData : 'Tinter 1'}
                    name="tinter1"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter1 ||
                      (compositionValues.tinter1 < minResponses.tinter1 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter1}`)
                    }
                    {...tinter1}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 2"
                    name="tinter2"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter2 ||
                      (compositionValues.tinter2 < minResponses.tinter2 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter2}`)
                    }
                    {...tinter2}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 3"
                    name="tinter3"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter3 ||
                      (compositionValues.tinter3 < minResponses.tinter3 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter3}`)
                    }
                    {...tinter3}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 4"
                    name="tinter4"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter4 ||
                      (compositionValues.tinter4 < minResponses.tinter4 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter4}`)
                    }
                    {...tinter4}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 5"
                    name="tinter5"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter5 ||
                      (compositionValues.tinter5 < minResponses.tinter5 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter5}`)
                    }
                    {...tinter5}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 6"
                    name="tinter6"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter6 ||
                      (compositionValues.tinter6 < minResponses.tinter6 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter6}`)
                    }
                    {...tinter6}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 7"
                    name="tinter7"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter7 ||
                      (compositionValues.tinter7 < minResponses.tinter7 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter7}`)
                    }
                    {...tinter7}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 8"
                    name="tinter8"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter8 ||
                      (compositionValues.tinter8 < minResponses.tinter8 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter8}`)
                    }
                    {...tinter8}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 9"
                    name="tinter9"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter9 ||
                      (compositionValues.tinter9 < minResponses.tinter9 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter9}`)
                    }
                    {...tinter9}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 10"
                    name="tinter10"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter10 ||
                      (compositionValues.tinter10 < minResponses.tinter10 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter10}`)
                    }
                    {...tinter10}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 11"
                    name="tinter11"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter11 ||
                      (compositionValues.tinter11 < minResponses.tinter11 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter11}`)
                    }
                    {...tinter11}
                  />
                </span>
                <span className="w-50" />
              </div>
            </>
          ) : (
            // NEW MACHINE
            <>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label={tinterLabel1 ? tinterLabel1.getData : 'Tinter 12'}
                    name="tinter12"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter1 ||
                      (compositionValues.tinter1 < minResponses.tinter1 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter1}`)
                    }
                    {...tinter1}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 2"
                    name="tinter2"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter2 ||
                      (compositionValues.tinter2 < minResponses.tinter2 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter2}`)
                    }
                    {...tinter2}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 3"
                    name="tinter3"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter3 ||
                      (compositionValues.tinter3 < minResponses.tinter3 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter3}`)
                    }
                    {...tinter3}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 4"
                    name="tinter4"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter4 ||
                      (compositionValues.tinter4 < minResponses.tinter4 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter4}`)
                    }
                    {...tinter4}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 5"
                    name="tinter5"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter5 ||
                      (compositionValues.tinter5 < minResponses.tinter5 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter5}`)
                    }
                    {...tinter5}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 6"
                    name="tinter6"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter6 ||
                      (compositionValues.tinter6 < minResponses.tinter6 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter6}`)
                    }
                    {...tinter6}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 7"
                    name="tinter7"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter7 ||
                      (compositionValues.tinter7 < minResponses.tinter7 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter7}`)
                    }
                    {...tinter7}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 8"
                    name="tinter8"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter8 ||
                      (compositionValues.tinter8 < minResponses.tinter8 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter8}`)
                    }
                    {...tinter8}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 9"
                    name="tinter9"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter9 ||
                      (compositionValues.tinter9 < minResponses.tinter9 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter9}`)
                    }
                    {...tinter9}
                  />
                </span>
                <span className="w-50">
                  <InputCurrency
                    label="Tinter 10"
                    name="tinter10"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter10 ||
                      (compositionValues.tinter10 < minResponses.tinter10 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter10}`)
                    }
                    {...tinter10}
                  />
                </span>
              </div>
              <div className="flex mv5 db">
                <span className="w-50 mr6">
                  <InputCurrency
                    label="Tinter 11"
                    name="tinter11"
                    size="large"
                    placeholder="Type a monetary value"
                    locale="en-US"
                    currencyCode="USD"
                    errorMessage={
                      !compositionValues.tinter11 ||
                      (compositionValues.tinter11 < minResponses.tinter11 &&
                        `${intl.formatMessage({
                          id: 'admin/admin.app.tintometric.minText',
                        })} ${minResponses.tinter11}`)
                    }
                    {...tinter11}
                  />
                </span>
                <span className="w-50" />
              </div>
            </>
          )}
          <span className="mr4 mb8 db">
            <Button
              variation="primary"
              onClick={() => {
                handleSubmit()
              }}
              isLoading={isLoading}
              disabled={!formValidated}
            >
              <FormattedMessage id="admin/admin.app.tintometric.update_skus_prices" />
            </Button>
          </span>
        </PageBlock>
      </Layout>
    </>
  )
}

export default TintometricAdmin
