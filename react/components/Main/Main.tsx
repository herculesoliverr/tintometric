import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Modal, InputSearch, IconCaretDown } from 'vtex.styleguide'

import FamilyPicker from '../FamilyPicker/FamilyPicker'
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'
import './styles.css'
import { useTintometricContext } from '../../context'
import getDataGQL from '../../graphql/getData.gql'

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
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>()
  const [showSearch, setShowSearch] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const jsonFileQuery = useQuery(getDataGQL, { variables: { key: 'jsonFile' } })

  const {
    getData,
    products,
    modalOpen,
    handleModalClick,
    activeFamily,
    activeProduct,
    selectedColor,
    setActiveFamily,
    activeProductType,
  } = useTintometricContext()

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    jsonFileQuery.data?.getData && getData(jsonFileQuery.data?.getData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonFileQuery])
  useEffect(() => {
    activeFamily &&
      setFilteredProducts(
        products.filter(
          product =>
            product.family === activeFamily?.id &&
            product.products?.find(item => item === activeProductType?.id)
        )
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        placeholder="Search..."
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
  )
}

export default Main
