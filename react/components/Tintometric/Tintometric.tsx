import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
//import useProduct from 'vtex.product-context/useProduct'
import ColorPicker from './../ColorPicker/ColorPicker'
import { ButtonPlain } from 'vtex.styleguide'
import data from "./../../utils/data.json"
import { Modal } from 'vtex.styleguide'
import "./styles.css"
import ColorList from '../ColorList/ColorList'
import ColorDetail from '../ColorDetail/ColorDetail'


const CSS_HANDLES = ['container', 'familyActive-label--wrapper', 'familyActive-label--text'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  const [activeFamily, setActiveFamily] = useState(families[0])
  // const [selectedColor, setSelectedColor] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)

  /* const { product } = useProduct(); */
  const activeColor = products.find(product => product.family == activeFamily.id)
  const filteredProds = products.filter(item => item.family === activeFamily.id)

  return (
    <>
      <ButtonPlain onClick={() => setModalOpen(true)}>
        Tintometric
      </ButtonPlain>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <section className={handles.container}>
          <div>
            <ColorPicker action={setActiveFamily} activeId={activeFamily.id} />
            <ColorList items={filteredProds} familyName={activeFamily.name} />
          </div>
          {activeColor && <ColorDetail color={activeColor} />}
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
