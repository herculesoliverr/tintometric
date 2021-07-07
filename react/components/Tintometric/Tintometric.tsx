import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import FamilyPicker from '../FamilyPicker/FamilyPicker'
// import { ButtonPlain } from 'vtex.styleguide'
import data from "./../../utils/data.json"
import { Modal, InputSearch } from 'vtex.styleguide'
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'
import { useRuntime } from "vtex.render-runtime";
import "./styles.css"
import { IconCaretDown } from 'vtex.styleguide'

const CSS_HANDLES = ['container', 'header', 'header-title', 'header-subtitle', 'buttonGroup-container', 'button', 'button--active', 'colorPicker-container', 'modal-button--trigger', 'modal-button--trigger-icon', 'inputSearch--container'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({
  title = "VAMOS ENCONTRAR A SUA COR!", subtitle = "BUSQUE PELA MATRIZ OU PELO NOME"
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const runtime = useRuntime()
  const { families, products } = data;
  const [activeFamily, setActiveFamily] = useState(families[0])
  const [selectedColor, setSelectedColor] = useState(products.find(product => product.family == activeFamily.id))
  const [modalOpen, setModalOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products.filter(item => item.family === activeFamily.id))
  const [searchVal, setSearchVal] = useState('')
  const activeProduct = products.find(product => product.code.toLowerCase() === actualCode())
  const productTypeSlug = runtime?.route?.params?.slug.toLowerCase().replace(`-${activeProduct?.slug.toLowerCase()}-${activeProduct?.code.toLowerCase()}`, '')

  useEffect(() => {
    setFilteredProducts(products.filter(item => item.family === activeFamily.id))
  }, [activeFamily])

  function actualCode() {
    const initialSlug = runtime?.route?.params?.slug
      .split('-')
      .splice(-1)
      .join('-');
    return initialSlug?.toLocaleLowerCase();
  }

  function handleSearch(search: string) {
    setSearchVal(search)
    setFilteredProducts(products.filter(
      product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.code.toLowerCase().includes(search.toLowerCase())
    ))
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)}
        className={` ${handles['modal-button--trigger']} mv5 b c-on-base`} style={{ backgroundColor: `rgb(${activeProduct?.R}, ${activeProduct?.G}, ${activeProduct?.B})` }}>
        {activeProduct?.code} - {activeProduct?.name} <span className={`${handles['modal-button--trigger-icon']} ph5`}><IconCaretDown /></span>
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={`${handles['header']} c-on-base`}>
          <h4 className={`${handles['header-title']} mv2`}>{title}</h4>
          <span className={`${handles['header-subtitle']}`}>{subtitle}
          </span>
        </div>

        <div className={`${handles['buttonGroup-container']} flex justify-between mt5 c-on-base`}>
          <button
            className={`${handles['button']} ${!showSearch ? `${handles['button--active']} c-action-primary` : ''}`}
            onClick={() => setShowSearch(false)}>
            Matriz
          </button>
          <button
            className={`${handles['button']} ${showSearch ? `${handles['button--active']} c-action-primary` : ''}`}
            onClick={() => setShowSearch(true)}>
            Nome
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

          {selectedColor && <ColorDetail productTypeSlug={productTypeSlug} setModalOpen={setModalOpen} color={selectedColor} />}

        </section>

      </Modal>
    </>
  )
}

Tintometric.schema = {
  title: 'editor.tintometric.title',
  description: 'editor.tintometric.description',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      description: 'Title used in the modal3',
      type: 'string',
      default: null,
    },
    subtitle: {
      title: 'Subtitle',
      description: 'Subtitle used in the modal3',
      type: 'string',
      default: null,
    }
  },
}

export default Tintometric
