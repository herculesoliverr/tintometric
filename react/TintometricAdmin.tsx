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
  Toggle,
  PageHeader,
  Input
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import updateSkusPricesGQL from './graphql/updateSkusPrices.gql'
import getDataGQL from './graphql/getData.gql'
import getConfig from './graphql/getConfig.gql'
import getSellers from './graphql/getSellers.gql'
import saveDataGQL from './graphql/saveData.gql'
import useInput from './hooks/useInput'
import UploadFile from './components/UploadFile/UploadFile'
import ErrorAlert from './components/UploadFile/ErrorAlert'
import { getPercentage } from './utils/getPercentage'

const TintometricAdmin: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [oldPrices, setOldPrices] = useState(false)
  const [jsonFile, ] = useState(false)
  const [csvFile, setCsvFile] = useState(false)
  const [masterSeller, setMasterSeller] = useState('')
  const [formValidated, setFormValidated] = useState(false)
  const [state, setState] = useState({
    success: false,
    error: false,
    generalError: '',
    skusNotFound: '',
    skusBadStructure: '',
    baseNotFound: '',
    errorValidatePrice: '',
  })

  const [updateSkusPrices] = useMutation(updateSkusPricesGQL)
  const [saveData] = useMutation(saveDataGQL)
  const intl = useIntl()

  const [isFranchise, setIsFranchise] = useState<boolean>()

  const { account: currentAccount } = useRuntime()
  const { data: dataConfig } = useQuery(getConfig)
  const { data: sellers, error: errorSellers } = useQuery(getSellers)
  const [formState, setFormState] = useState({
    familyUrl: '',
    productUrl: '',
    productTypeUrl: ''
  })

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${window.origin}/v1/master-data`);

        if(response.status === 200) {
          const body = await response.json();
          if(body.message) {
            alert(body.message)
            return;
          }

          setFormState({
            familyUrl: body.family_url,
            productTypeUrl: body.products_type_url,
            productUrl: body.products_url
          })
        }
      } catch (error) {
        alert("Não foi possivel listar as urls")
      }
     })()
  }, [])

  useEffect(() => {
    if (dataConfig?.getConfig?.sellerMasterId)
      setMasterSeller(dataConfig.getConfig?.sellerMasterId.toLowerCase())
  }, [dataConfig])

  useEffect(() => {
    if (sellers) {
      const currentSeller = sellers.sellers?.items?.find(
        (seller: Seller) => seller.account === currentAccount
      )

      masterSeller && setIsFranchise(currentSeller.account !== masterSeller)
    }
  }, [sellers, errorSellers, masterSeller, currentAccount])

  // ACOTONE
  const acotoneTinter1Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter1' },
  })

  const acotoneTinter2Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter2' },
  })

  const acotoneTinter3Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter3' },
  })

  const acotoneTinter4Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter4' },
  })

  const acotoneTinter5Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter5' },
  })

  const acotoneTinter6Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter6' },
  })

  const acotoneTinter7Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter7' },
  })

  const acotoneTinter8Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter8' },
  })

  const acotoneTinter9Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter9' },
  })

  const acotoneTinter10Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter10' },
  })

  const acotoneTinter11Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter11' },
  })

  const acotoneTinter12Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter12' },
  })

  const acotoneTinter13Query = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinter13' },
  })

  const acotoneTinter1 = useInput(acotoneTinter1Query?.data?.getData)
  const acotoneTinter2 = useInput(acotoneTinter2Query?.data?.getData)
  const acotoneTinter3 = useInput(acotoneTinter3Query?.data?.getData)
  const acotoneTinter4 = useInput(acotoneTinter4Query?.data?.getData)
  const acotoneTinter5 = useInput(acotoneTinter5Query?.data?.getData)
  const acotoneTinter6 = useInput(acotoneTinter6Query?.data?.getData)
  const acotoneTinter7 = useInput(acotoneTinter7Query?.data?.getData)
  const acotoneTinter8 = useInput(acotoneTinter8Query?.data?.getData)
  const acotoneTinter9 = useInput(acotoneTinter9Query?.data?.getData)
  const acotoneTinter10 = useInput(acotoneTinter10Query?.data?.getData)
  const acotoneTinter11 = useInput(acotoneTinter11Query?.data?.getData)
  const acotoneTinter12 = useInput(acotoneTinter12Query?.data?.getData)
  const acotoneTinter13 = useInput(acotoneTinter13Query?.data?.getData)

  // LOC
  const locTinter1Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter1' },
  })

  const locTinter2Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter2' },
  })

  const locTinter3Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter3' },
  })

  const locTinter4Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter4' },
  })

  const locTinter5Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter5' },
  })

  const locTinter6Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter6' },
  })

  const locTinter7Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter7' },
  })

  const locTinter8Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter8' },
  })

  const locTinter9Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter9' },
  })

  const locTinter10Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter10' },
  })

  const locTinter11Query = useQuery(getDataGQL, {
    variables: { key: 'locTinter11' },
  })

  const locTinter1 = useInput(locTinter1Query?.data?.getData)
  const locTinter2 = useInput(locTinter2Query?.data?.getData)
  const locTinter3 = useInput(locTinter3Query?.data?.getData)
  const locTinter4 = useInput(locTinter4Query?.data?.getData)
  const locTinter5 = useInput(locTinter5Query?.data?.getData)
  const locTinter6 = useInput(locTinter6Query?.data?.getData)
  const locTinter7 = useInput(locTinter7Query?.data?.getData)
  const locTinter8 = useInput(locTinter8Query?.data?.getData)
  const locTinter9 = useInput(locTinter9Query?.data?.getData)
  const locTinter10 = useInput(locTinter10Query?.data?.getData)
  const locTinter11 = useInput(locTinter11Query?.data?.getData)

  // TINTERS LABELS
  const { data: acotoneTinterLabel1 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel1' },
  })

  const { data: acotoneTinterLabel2 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel2' },
  })

  const { data: acotoneTinterLabel3 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel3' },
  })

  const { data: acotoneTinterLabel4 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel4' },
  })

  const { data: acotoneTinterLabel5 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel5' },
  })

  const { data: acotoneTinterLabel6 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel6' },
  })

  const { data: acotoneTinterLabel7 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel7' },
  })

  const { data: acotoneTinterLabel8 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel8' },
  })

  const { data: acotoneTinterLabel9 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel9' },
  })

  const { data: acotoneTinterLabel10 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel10' },
  })

  const { data: acotoneTinterLabel11 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel11' },
  })

  const { data: acotoneTinterLabel12 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel12' },
  })

  const { data: acotoneTinterLabel13 } = useQuery(getDataGQL, {
    variables: { key: 'acotoneTinterLabel13' },
  })

  const { data: locTinterLabel1 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel1' },
  })

  const { data: locTinterLabel2 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel2' },
  })

  const { data: locTinterLabel3 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel3' },
  })

  const { data: locTinterLabel4 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel4' },
  })

  const { data: locTinterLabel5 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel5' },
  })

  const { data: locTinterLabel6 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel6' },
  })

  const { data: locTinterLabel7 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel7' },
  })

  const { data: locTinterLabel8 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel8' },
  })

  const { data: locTinterLabel9 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel9' },
  })

  const { data: locTinterLabel10 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel10' },
  })

  const { data: locTinterLabel11 } = useQuery(getDataGQL, {
    variables: { key: 'locTinterLabel11' },
  })

  const compositionValues = {
    acotoneTinter1: acotoneTinter1.value,
    acotoneTinter2: acotoneTinter2.value,
    acotoneTinter3: acotoneTinter3.value,
    acotoneTinter4: acotoneTinter4.value,
    acotoneTinter5: acotoneTinter5.value,
    acotoneTinter6: acotoneTinter6.value,
    acotoneTinter7: acotoneTinter7.value,
    acotoneTinter8: acotoneTinter8.value,
    acotoneTinter9: acotoneTinter9.value,
    acotoneTinter10: acotoneTinter10.value,
    acotoneTinter11: acotoneTinter11.value,
    acotoneTinter12: acotoneTinter12.value,
    acotoneTinter13: acotoneTinter13.value,
    locTinter1: locTinter1.value,
    locTinter2: locTinter2.value,
    locTinter3: locTinter3.value,
    locTinter4: locTinter4.value,
    locTinter5: locTinter5.value,
    locTinter6: locTinter6.value,
    locTinter7: locTinter7.value,
    locTinter8: locTinter8.value,
    locTinter9: locTinter9.value,
    locTinter10: locTinter10.value,
    locTinter11: locTinter11.value,
  }

  const formValidation = () => {
    if (!oldPrices) {
      if (
        Number(compositionValues.acotoneTinter1) &&
        Number(compositionValues.acotoneTinter2) &&
        Number(compositionValues.acotoneTinter3) &&
        Number(compositionValues.acotoneTinter4) &&
        Number(compositionValues.acotoneTinter5) &&
        Number(compositionValues.acotoneTinter6) &&
        Number(compositionValues.acotoneTinter7) &&
        Number(compositionValues.acotoneTinter8) &&
        Number(compositionValues.acotoneTinter9) &&
        Number(compositionValues.acotoneTinter10) &&
        Number(compositionValues.acotoneTinter11) &&
        Number(compositionValues.acotoneTinter12) &&
        Number(compositionValues.acotoneTinter13) &&
        csvFile
      ) {
        setFormValidated(true)
      } else {
        setFormValidated(false)
      }
    } else if (
      Number(compositionValues.locTinter1) &&
      Number(compositionValues.locTinter2) &&
      Number(compositionValues.locTinter3) &&
      Number(compositionValues.locTinter4) &&
      Number(compositionValues.locTinter5) &&
      Number(compositionValues.locTinter6) &&
      Number(compositionValues.locTinter7) &&
      Number(compositionValues.locTinter8) &&
      Number(compositionValues.locTinter9) &&
      Number(compositionValues.locTinter10) &&
      Number(compositionValues.locTinter11) &&
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
      generalError: '',
      skusNotFound: '',
      skusBadStructure: '',
      baseNotFound: '',
      errorValidatePrice: '',
    })
  }, [jsonFile])

  if (acotoneTinter1Query.loading || acotoneTinter13Query.loading) {
    return (
      <div className="flex items-center justify-center mv8">
        <Spinner />
      </div>
    )
  }

  const handleChangeFormState = (event: {target: {name?: any; value?: any}}) => {
    const value = event.target.value
    const name = event.target.name
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmitUrlApi = async (event: any) => {
    event.preventDefault()

    const urlData = {
      "family_url": formState.familyUrl,
      "products_type_url": formState.productTypeUrl,
      "products_url": formState.productUrl
    }

    const response = await fetch(`${window.origin}/v1/master-data?${Date.now()}`, {
      method: 'POST',
      body: JSON.stringify(urlData),
    });

    if(response.status === 200) {
      alert("Dados atualizados com sucesso!");
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setState({
      success: false,
      error: false,
      generalError: '',
      skusNotFound: '',
      skusBadStructure: '',
      baseNotFound: '',
      errorValidatePrice: '',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await Object.entries(compositionValues).forEach(([key, val]: any) =>
      saveData({ variables: { key, value: val.toString() } })
    )
    updateSkusPrices({
      variables: {
        tinter1: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter1)
          : parseFloat(compositionValues.locTinter1),
        tinter2: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter2)
          : parseFloat(compositionValues.locTinter2),
        tinter3: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter3)
          : parseFloat(compositionValues.locTinter3),
        tinter4: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter4)
          : parseFloat(compositionValues.locTinter4),
        tinter5: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter5)
          : parseFloat(compositionValues.locTinter5),
        tinter6: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter6)
          : parseFloat(compositionValues.locTinter6),
        tinter7: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter7)
          : parseFloat(compositionValues.locTinter7),
        tinter8: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter8)
          : parseFloat(compositionValues.locTinter8),
        tinter9: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter9)
          : parseFloat(compositionValues.locTinter9),
        tinter10: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter10)
          : parseFloat(compositionValues.locTinter10),
        tinter11: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter11)
          : parseFloat(compositionValues.locTinter11),
        tinter12: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter12)
          : 0,
        tinter13: !oldPrices
          ? parseFloat(compositionValues.acotoneTinter13)
          : 0,
        oldPrices,
        masterSeller,
      },
    }).then(({ data }) => {
      const res = JSON.parse(data.updateSkusPrices)

      if (res.status === 404) {
        setState(prevState => ({
          ...prevState,
          error: true,
          generalError: res.message,
          isLoading: false,
        }))
      } else {
        const {
          skusNotFound,
          skusBadStructure,
          baseNotFound,
          errorValidatePrice,
        } = res

        setIsLoading(false)
        if (
          skusNotFound.length ||
          skusBadStructure.length ||
          baseNotFound.length ||
          errorValidatePrice.length
        ) {
          setState({
            success: false,
            error: true,
            generalError: '',
            skusNotFound: `${skusNotFound}`,
            skusBadStructure: `${skusBadStructure}`,
            baseNotFound: `${baseNotFound}`,
            errorValidatePrice: `${errorValidatePrice || ''}`,
          })
        } else {
          setState(prevState => ({ ...prevState, success: true }))
        }
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
          {!masterSeller ? (
            <>
              <FormattedMessage id="admin/admin.app.tintometric.noMasterSeller" />
            </>
          ) : (
            <>
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
              {state.error && state.generalError.length > 0 && (
                <div className="mt5">
                  <ErrorAlert message={state.generalError} />
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
              {state.error && state.errorValidatePrice?.length > 0 && (
                <div className="mt5">
                  <ErrorAlert
                    message={`${intl.formatMessage({
                      id: 'admin/admin.app.tintometric.errorValidatePrice',
                    })} ${state.errorValidatePrice}`}
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
              {!isFranchise ? (
                <span className="mv5 db">
                  <span className="mt5 db">
                    <FormattedMessage id="admin/admin.app.tintometric.uploadJson" />
                  </span>
                  <span className="mv2 mb5 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                    <FormattedMessage id="admin/admin.app.tintometric.uploadJson.subtitle" />
                  </span>
                  {/* <UploadFile
                    templateFile="template_tintometric.json"
                    query="json"
                    action={setJsonFile}
                  /> */}
                  <form onSubmit={(e) => handleSubmitUrlApi(e)}>
                  <Input
                            label={'Url API Family'}
                            name="familyUrl"
                            size="large"
                            onChange={handleChangeFormState}
                            value={formState.familyUrl}
                            placeholder="Api Family"
                            // defaultValue="http://localhost:3000/family"
                          />
                          <br />
                                            <Input
                            label={'Url API Products'}
                            name="productUrl"
                            size="large"
                            onChange={handleChangeFormState}
                            value={formState.productUrl}
                            placeholder="Api Products"
                            // defaultValue="http://localhost:3000/products"
                          />
                          <br />
                          <Input
                            label={'Url API ProductsType'}
                            name="productTypeUrl"
                            onChange={handleChangeFormState}
                            value={formState.productTypeUrl}
                            size="large"
                            placeholder="Api ProductsType"
                            // defaultValue="http://localhost:3000/productstypemkp"
                          />
                          <br />
                                            <span className="mr4 mb8 db">
                    <Button
                      type="submit"
                      variation="primary"
                    >
                      <FormattedMessage id="admin/admin.app.tintometric.update_url_api" />
                    </Button>
                    </span>
                  </form>

                </span>

              ) : (
                <>
                  <div className="mb9">
                    <span className="mt5 db">
                      <FormattedMessage id="admin/admin.app.tintometric.uploadCSV" />
                    </span>
                    <span className="mv2 mb5 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                      <FormattedMessage id="admin/admin.app.tintometric.uploadCSV.subtitle" />
                    </span>
                    <UploadFile
                      templateFile=""
                      query="csv"
                      action={setCsvFile}
                    />
                  </div>
                  <span className="mv2 db">
                    <div className="flex items-center">
                      <div className="mr5">
                        <FormattedMessage id="admin/admin.app.tintometric.newPricesLabel" />
                      </div>
                      <Toggle
                        checked={oldPrices}
                        name="default-checkbox-group"
                        onChange={() => setOldPrices(!oldPrices)}
                        size="large"
                      />
                      <div className="ml5">
                        <FormattedMessage id="admin/admin.app.tintometric.oldPrices" />
                        <span className="mv4 pa3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                          Language of Colour
                        </span>
                      </div>
                    </div>
                    <div className="mb4 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                      <FormattedMessage id="admin/admin.app.tintometric.oldPrices-subtitle" />
                    </div>
                  </span>
                  {!oldPrices ? (
                    <>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel1 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 1
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel1
                                ? acotoneTinterLabel1?.getData
                                : 'Tinter 1'
                            }
                            name="tinter1"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter1 ||
                              (getPercentage(
                                acotoneTinter1Query?.data?.getData,
                                acotoneTinter1.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter1}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel2 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 2
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel2
                                ? acotoneTinterLabel2?.getData
                                : 'Tinter 2'
                            }
                            name="tinter2"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter2 ||
                              (getPercentage(
                                acotoneTinter2Query?.data?.getData,
                                acotoneTinter2.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter2}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel3 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 3
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel3
                                ? acotoneTinterLabel3?.getData
                                : 'Tinter 3'
                            }
                            name="tinter3"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter3 ||
                              (getPercentage(
                                acotoneTinter3Query?.data?.getData,
                                acotoneTinter3.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter3}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel4 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 4
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel4
                                ? acotoneTinterLabel4?.getData
                                : 'Tinter 4'
                            }
                            name="tinter4"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter4 ||
                              (getPercentage(
                                acotoneTinter4Query?.data?.getData,
                                acotoneTinter4.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter4}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel5 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 5
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel5
                                ? acotoneTinterLabel5?.getData
                                : 'Tinter 5'
                            }
                            name="tinter5"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter5 ||
                              (getPercentage(
                                acotoneTinter5Query?.data?.getData,
                                acotoneTinter5.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter5}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel6 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 6
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel6
                                ? acotoneTinterLabel6?.getData
                                : 'Tinter 6'
                            }
                            name="tinter6"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter6 ||
                              (getPercentage(
                                acotoneTinter6Query?.data?.getData,
                                acotoneTinter6.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter6}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel7 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 7
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel7
                                ? acotoneTinterLabel7?.getData
                                : 'Tinter 7'
                            }
                            name="tinter7"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter7 ||
                              (getPercentage(
                                acotoneTinter7Query?.data?.getData,
                                acotoneTinter7.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter7}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel8 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 8
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel8
                                ? acotoneTinterLabel8?.getData
                                : 'Tinter 8'
                            }
                            name="tinter8"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter8 ||
                              (getPercentage(
                                acotoneTinter8Query?.data?.getData,
                                acotoneTinter8.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter8}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel9 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 9
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel9
                                ? acotoneTinterLabel9?.getData
                                : 'Tinter 9'
                            }
                            name="tinter9"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter9 ||
                              (getPercentage(
                                acotoneTinter9Query?.data?.getData,
                                acotoneTinter9.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter9}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel10 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 10
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel10
                                ? acotoneTinterLabel10?.getData
                                : 'Tinter 10'
                            }
                            name="tinter10"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter10 ||
                              (getPercentage(
                                acotoneTinter10Query?.data?.getData,
                                acotoneTinter10.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter10}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel11 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 11
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel11
                                ? acotoneTinterLabel11?.getData
                                : 'Tinter 11'
                            }
                            name="tinter11"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter11 ||
                              (getPercentage(
                                acotoneTinter11Query?.data?.getData,
                                acotoneTinter11.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter11}
                          />
                        </span>
                        <span className="w-50">
                          {acotoneTinterLabel12 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 12
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel12
                                ? acotoneTinterLabel12?.getData
                                : 'Tinter 12'
                            }
                            name="tinter12"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter12 ||
                              (getPercentage(
                                acotoneTinter12Query?.data?.getData,
                                acotoneTinter12.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter12}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {acotoneTinterLabel13 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 13
                            </div>
                          )}
                          <InputCurrency
                            label={
                              acotoneTinterLabel13
                                ? acotoneTinterLabel13?.getData
                                : 'Tinter 13'
                            }
                            name="tinter13"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.acotoneTinter13 ||
                              (getPercentage(
                                acotoneTinter13Query?.data?.getData,
                                acotoneTinter13.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...acotoneTinter13}
                          />
                        </span>
                        <span className="w-50" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel1 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 1
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel1
                                ? locTinterLabel1?.getData
                                : 'Tinter 1'
                            }
                            name="tinter1"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter1 ||
                              (getPercentage(
                                locTinter1Query?.data?.getData,
                                locTinter1.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter1}
                          />
                        </span>
                        <span className="w-50">
                          {locTinterLabel2 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 2
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel2
                                ? locTinterLabel2?.getData
                                : 'Tinter 2'
                            }
                            name="tinter2"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter2 ||
                              (getPercentage(
                                locTinter2Query?.data?.getData,
                                locTinter2.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter2}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel3 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 3
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel3
                                ? locTinterLabel3?.getData
                                : 'Tinter 3'
                            }
                            name="tinter3"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter3 ||
                              (getPercentage(
                                locTinter3Query?.data?.getData,
                                locTinter3.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter3}
                          />
                        </span>
                        <span className="w-50">
                          {locTinterLabel4 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 4
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel4
                                ? locTinterLabel4?.getData
                                : 'Tinter 4'
                            }
                            name="tinter4"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter4 ||
                              (getPercentage(
                                locTinter4Query?.data?.getData,
                                locTinter4.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter4}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel5 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 5
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel5
                                ? locTinterLabel5?.getData
                                : 'Tinter 5'
                            }
                            name="tinter5"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter5 ||
                              (getPercentage(
                                locTinter5Query?.data?.getData,
                                locTinter5.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter5}
                          />
                        </span>
                        <span className="w-50">
                          {locTinterLabel6 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 6
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel6
                                ? locTinterLabel6?.getData
                                : 'Tinter 6'
                            }
                            name="tinter6"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter6 ||
                              (getPercentage(
                                locTinter6Query?.data?.getData,
                                locTinter6.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter6}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel7 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 7
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel7
                                ? locTinterLabel7?.getData
                                : 'Tinter 7'
                            }
                            name="tinter7"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter7 ||
                              (getPercentage(
                                locTinter7Query?.data?.getData,
                                locTinter7.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter7}
                          />
                        </span>
                        <span className="w-50">
                          {locTinterLabel8 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 8
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel8
                                ? locTinterLabel8?.getData
                                : 'Tinter 8'
                            }
                            name="tinter8"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter8 ||
                              (getPercentage(
                                locTinter8Query?.data?.getData,
                                locTinter8.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter8}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel9 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 9
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel9
                                ? locTinterLabel9?.getData
                                : 'Tinter 9'
                            }
                            name="tinter9"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter9 ||
                              (getPercentage(
                                locTinter9Query?.data?.getData,
                                locTinter9.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter9}
                          />
                        </span>
                        <span className="w-50">
                          {locTinterLabel10 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 10
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel10
                                ? locTinterLabel10?.getData
                                : 'Tinter 10'
                            }
                            name="tinter10"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter10 ||
                              (getPercentage(
                                locTinter10Query?.data?.getData,
                                locTinter10.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter10}
                          />
                        </span>
                      </div>
                      <div className="flex mv5 db">
                        <span className="w-50 mr6">
                          {locTinterLabel11 && (
                            <div className="mv2 pv3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 hover-b-muted-3 active-b-muted-3">
                              Tinter 11
                            </div>
                          )}
                          <InputCurrency
                            label={
                              locTinterLabel11
                                ? locTinterLabel11?.getData
                                : 'Tinter 11'
                            }
                            name="tinter11"
                            size="large"
                            placeholder="Type a monetary value"
                            locale="en-US"
                            currencyCode="USD"
                            errorMessage={
                              !compositionValues.locTinter11 ||
                              (getPercentage(
                                locTinter11Query?.data?.getData,
                                locTinter11.value
                              ) &&
                                intl.formatMessage({
                                  id: 'admin/admin.app.tintometric.minText',
                                }))
                            }
                            {...locTinter11}
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
                </>
              )}
            </>
          )}
        </PageBlock>
      </Layout>
    </>
  )
}

export default TintometricAdmin
