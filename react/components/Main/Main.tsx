/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Modal, InputSearch, IconCaretDown } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import FamilyPicker from '../FamilyPicker/FamilyPicker'
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'
import './styles.css'
import { useTintometricContext } from '../../context'
import getCompositionFileGQL from '../../graphql/getCompositionFile.gql'
import getConfig from '../../graphql/getConfig.gql'

const CSS_HANDLES = [
  'container',
  'header',
  'header-title',
  'header-subtitle',
  'buttonGroup-container',
  'button',
  'button--active',
  'colorPicker-container',
  'modal-button--trigger',
  'modal-button--trigger-icon',
  'inputSearch--container',
]

const Main: StorefrontFunctionComponent<TintometricProps> = ({
  title,
  subtitle,
  buttonGrid,
  buttonList,
  colorDetailTitle,
  confirmButton,
  itemsFamilyDesktop,
  itemsFamilyMobile,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>()
  const [showSearch, setShowSearch] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [, setUrlApiState] = useState({
    familyUrl: '',
    productUrl: '',
    productTypeUrl: ''
  })
  const [tintometricoConfigLoad, setTintomtricoConfigLoad] = useState(false)

  const intl = useIntl()

  const {
    setData,
    products,
    modalOpen,
    handleModalClick,
    activeFamily,
    activeProduct,
    activeProductType,
    selectedColor,
    setActiveFamily,
  } = useTintometricContext()

  const handles = useCssHandles(CSS_HANDLES)
  const [getJsonFileQuery] = useLazyQuery(getCompositionFileGQL)

  const { data: dataConfig } = useQuery(getConfig)

  useEffect(() => {
    if (dataConfig?.getConfig?.sellerMasterId) {
      getJsonFileQuery({
        variables: {
          masterSeller: dataConfig.getConfig?.sellerMasterId.toLowerCase(),
          withFx: false,
        },
      })
    }
  }, [dataConfig])

  const getFamilies = async (url: string) => {
    const response = await fetch(url)
    const json = response.json()
    return json
  }

  const getProducts = async (url: string) => {
    const response = await fetch(url)
    const json = response.json()
    return json
  }

  const getProductsType = async (url: string) => {
    const response = await fetch(url)
    const json = response.json()
    return json
  }

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

          setUrlApiState({
            familyUrl: body.family_url,
            productTypeUrl: body.products_type_url,
            productUrl: body.products_url
          });

          const families = await getFamilies(body.family_url)
          const products = await getProducts(body.products_url)
          const productType = await getProductsType(body.products_type_url)
          setData({
            families,
            products,
            productType,
          })
          setTintomtricoConfigLoad(true)
        }
      } catch (error) {
        alert("Não foi possivel listar as urls")
      }
     })()
  }, [dataConfig])

  useEffect(() => {
    // filter product by family selected and productType active (taken from the slug in the url)
    activeFamily &&
      setFilteredProducts(
        products.filter(
          product =>
            product.family === activeFamily?.id &&
            product.productType === activeProductType?.id
        )
      )
  }, [activeFamily])

  function handleSearch(search: string) {
    setSearchVal(search)
    setFilteredProducts(
      products.filter(
        product =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.code.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  return (
    <>
    {tintometricoConfigLoad && (
        <>
        {activeFamily && (
              <>
                <button
                  onClick={() => handleModalClick(true)}
                  className={` ${handles['modal-button--trigger']} mv5 b c-on-base`}
                  style={{
                    backgroundColor: `rgb(${activeProduct?.R}, ${activeProduct?.G}, ${activeProduct?.B})`,
                  }}
                >
                  {activeProduct?.code} - {activeProduct?.name}
                  <span className={`${handles['modal-button--trigger-icon']} ph5`}>
                    <IconCaretDown />
                  </span>
                </button>
                <Modal isOpen={modalOpen} onClose={() => handleModalClick(false)}>
                  <div className={`${handles.header} c-on-base`}>
                    <h4 className={`${handles['header-title']} mv2`}>{title}</h4>
                    <span className={`${handles['header-subtitle']}`}>
                      {subtitle}
                    </span>
                  </div>
                  <div
                    className={`${handles['buttonGroup-container']} flex justify-between mt5 c-on-base`}
                  >
                    <button
                      className={`${handles.button} ${
                        !showSearch
                          ? `${handles['button--active']} c-action-primary`
                          : ''
                      }`}
                      onClick={() => setShowSearch(false)}
                    >
                      {buttonGrid}
                    </button>
                    <button
                      className={`${handles.button} ${
                        showSearch
                          ? `${handles['button--active']} c-action-primary`
                          : ''
                      }`}
                      onClick={() => setShowSearch(true)}
                    >
                      {buttonList}
                    </button>
                  </div>
                  <section className={handles.container}>
                    <div className={handles['colorPicker-container']}>
                      {!showSearch ? (
                        <>
                          <FamilyPicker
                            action={setActiveFamily}
                            activeId={activeFamily.id}
                            itemsFamilyDesktop={itemsFamilyDesktop}
                            itemsFamilyMobile={itemsFamilyMobile}
                          />
                          <ColorList
                            items={filteredProducts}
                            familyName={activeFamily.name}
                          />
                        </>
                      ) : (
                        <>
                          <div className={handles['inputSearch--container']}>
                            <InputSearch
                              placeholder={intl.formatMessage({
                                id: 'store/search.placeholder',
                              })}
                              value={searchVal}
                              size="regular"
                              onChange={(ev: EventInterface): void =>
                                handleSearch(ev.target.value)
                              }
                              onSubmit={(ev: EventInterface): void =>
                                handleSearch(ev.target.value)
                              }
                            />
                          </div>
                          <ColorList
                            layout="list"
                            items={filteredProducts}
                            familyName={activeFamily.name}
                          />
                        </>
                      )}
                    </div>
                    {selectedColor && (
                      <ColorDetail
                        confirmButton={confirmButton}
                        colorDetailTitle={colorDetailTitle}
                        handleClick={handleModalClick}
                      />
                    )}
                  </section>
                </Modal>
              </>
            )}
        </>
      )}
    </>
  )
}

export default Main
