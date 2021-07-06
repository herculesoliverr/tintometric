import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'
import FamilyPicker from '../FamilyPicker/FamilyPicker'
import { ButtonPlain } from 'vtex.styleguide'
import data from "./../../utils/data.json"
import { Modal, InputSearch } from 'vtex.styleguide'
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'
import "./styles.css"

const CSS_HANDLES = ['container', 'header', 'header-title', 'header-subtitle', 'buttonGroup-container', 'button', 'button--active', 'colorPicker-container'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  const [activeFamily, setActiveFamily] = useState(families[0])
  const [selectedColor, setSelectedColor] = useState(products.find(product => product.family == activeFamily.id))
  const [modalOpen, setModalOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  //const [filteredProducts, setFilteredProducts] = useState(products.filter(item => item.family === activeFamily.id))
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()
  const [searchVal, setSearchVal] = useState('')
  const filteredProducts = products.filter(item => item.family === activeFamily.id);
  console.log("productContextValue", productContextValue)

/*   function handleSearch(searchVal: string) {
    console.log(searchVal)
    setFilteredProducts()
  } */

  return (
    <>
      <ButtonPlain onClick={() => setModalOpen(true)}>
        Tintometric
      </ButtonPlain>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={`${handles['header']} c-on-base`}>
          <h4 className={`${handles['header-title']} mv2`}>Vamos a encontrar sua cor!</h4>
          <span className={`${handles['header-subtitle']}`}>Busque pela matriz ou pelo nome.
          </span>
        </div>

        <div className={`${handles['buttonGroup-container']} flex justify-between mt5 c-on-base`}>
          <p>Visualizar por: </p>
          <button
            className={`${handles['button']} ${!showSearch ? 'button--active c-action-primary' : ''}`}
            onClick={() => setShowSearch(false)}>
            Matriz
          </button>
          <button
            className={`${handles['button']} ${showSearch ? 'button--active c-action-primary' : ''}`}
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
                  <InputSearch
                    placeholder="Search..."
                    value={searchVal}
                    size="regular"
                    onChange={(
                      ev: EventInterface,
                    ): void => setSearchVal(ev.target.value)}
                  /*  onSubmit={(e: React.FormEvent<HTMLInputElement>) => {
                     e.preventDefault()
                     console.log('submitted! search this: ', e.currentTarget.value)
                   }} */
                  />
                  <ColorList layout="list" setSelectedColor={setSelectedColor} items={filteredProducts} familyName={activeFamily.name} />
                </>
            }
          </div>

          {selectedColor && <ColorDetail color={selectedColor} />}
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
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    }
  },
}

export default Tintometric
