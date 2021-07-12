import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import FamilyPicker from '../FamilyPicker/FamilyPicker'
import { Modal, InputSearch } from 'vtex.styleguide'
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'
import "./styles.css"
import { IconCaretDown } from 'vtex.styleguide'
// import data from '../../utils/data.json'
import { TintometricProvider, useGeneralContext } from '../../context'
import { useRuntime } from "vtex.render-runtime";

const CSS_HANDLES = ['container', 'header', 'header-title', 'header-subtitle', 'buttonGroup-container', 'button', 'button--active', 'colorPicker-container', 'modal-button--trigger', 'modal-button--trigger-icon', 'inputSearch--container'];

const Main: StorefrontFunctionComponent<TintometricProps> = ({
  title = "VAMOS ENCONTRAR A SUA COR!",
  subtitle = "BUSQUE PELA MATRIZ OU PELO NOME",
  buttonGrid = "Matriz",
  buttonList = "Nome",
  colorDetailTitle = "Cor Escolhida:",
  confirmButton = "Confirme",
  file
}) => {
  console.log(title, subtitle, buttonGrid, buttonList, colorDetailTitle, confirmButton)
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>()
  const [selectedColor, setSelectedColor] = useState<ProductProps>()
  const [showSearch, setShowSearch] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  const {
    getFamilies,
    products,
    modalOpen,
    handleModalClick,
    activeFamily,
    activeProduct,
    setActiveFamily
  } = useGeneralContext();



  // const [activeProduct, setActiveProduct] = useState<ProductProps>()
  console.log("activeFamily---", activeFamily)
  console.log("activeProduct---", activeProduct)
  console.log("selectedColor---", selectedColor)

  const handles = useCssHandles(CSS_HANDLES)


  
    const runtime = useRuntime()
  

  /*    const { products } = data; */

  /*   
    const [filteredProducts, setFilteredProducts] = useState(products.filter(item => item.family === activeFamily.id))
    const activeProduct = products.find(product => product.code.toLowerCase() === actualCode())
    const productTypeSlug = runtime?.route?.params?.slug.toLowerCase().replace(`-${activeProduct?.slug.toLowerCase()}-${activeProduct?.code.toLowerCase()}`, '') */
  const productTypeSlug = runtime?.route?.params?.slug.toLowerCase().replace(`-${activeProduct?.slug.toLowerCase()}-${activeProduct?.code.toLowerCase()}`, '')

  useEffect(() => {
    file.length && getFamilies(file)
  }, [])

  useEffect(() => {

    activeFamily && setSelectedColor(products.find(product => product.family == activeFamily.id))
    activeFamily && setFilteredProducts(products.filter(item => item.family === activeFamily.id))

  }, [activeFamily])


  function handleSearch(search: string) {
    setSearchVal(search)
    setFilteredProducts(products.filter(
      product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.code.toLowerCase().includes(search.toLowerCase())
    ))
  }

  return (
    <TintometricProvider>
      {activeFamily &&
        <>
          <button onClick={() => handleModalClick(true)}
            className={` ${handles['modal-button--trigger']} mv5 b c-on-base`}
            style={{ backgroundColor: `rgb(${activeProduct?.R}, ${activeProduct?.G}, ${activeProduct?.B})` }}>
            {activeProduct?.code} - {activeProduct?.name}
            <span className={`${handles['modal-button--trigger-icon']} ph5`}><IconCaretDown /></span>
          </button>

          <Modal isOpen={modalOpen} onClose={() => handleModalClick(false)}>
            <div className={`${handles['header']} c-on-base`}>
              <h4 className={`${handles['header-title']} mv2`}>{title}</h4>
              <span className={`${handles['header-subtitle']}`}>{subtitle}
              </span>
            </div>

            <div className={`${handles['buttonGroup-container']} flex justify-between mt5 c-on-base`}>
              <button
                className={`${handles['button']} ${!showSearch ? `${handles['button--active']} c-action-primary` : ''}`}
                onClick={() => setShowSearch(false)}>
                {buttonGrid}
              </button>
              <button
                className={`${handles['button']} ${showSearch ? `${handles['button--active']} c-action-primary` : ''}`}
                onClick={() => setShowSearch(true)}>
                {buttonList}
              </button>
            </div>

            <section className={handles.container}>
              <div className={handles['colorPicker-container']}>
                {
                  !showSearch ?
                    <>
                      <FamilyPicker action={setActiveFamily} activeId={activeFamily.id} />
                      <ColorList setSelectedColor={setSelectedColor} items={filteredProducts} familyName={activeFamily.name} />
                    </>
                    :
                    <>
                      <div className={handles['inputSearch--container']}>
                        <InputSearch
                          placeholder="Search..."
                          value={searchVal}
                          size="regular"
                          onChange={(
                            ev: EventInterface,
                          ): void => handleSearch(ev.target.value)}
                          onSubmit={(
                            ev: EventInterface,
                          ): void => handleSearch(ev.target.value)}
                        />
                      </div>
                      <ColorList layout="list" setSelectedColor={setSelectedColor} items={filteredProducts} familyName={activeFamily.name} />
                    </>
                }
              </div>

              {selectedColor && <ColorDetail confirmButton={confirmButton} colorDetailTitle={colorDetailTitle} productTypeSlug={productTypeSlug} handleClick={handleModalClick} color={selectedColor} />}

            </section>

          </Modal>
        </>
      }
    </TintometricProvider>
  )
}



export default Main
