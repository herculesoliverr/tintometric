import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
//import useProduct from 'vtex.product-context/useProduct'
import ColorPicker from './../ColorPicker/ColorPicker'
import { ButtonPlain } from 'vtex.styleguide'
import data from "./../../utils/data.json"
import { Modal } from 'vtex.styleguide'
import "./styles.css"
import ColorList from '../ColorList/ColorList'


const CSS_HANDLES = ['container', 'familyActive-label--wrapper', 'familyActive-label--text'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  const [activeFamily, setActiveFamily] = useState(families[0])
  const [modalOpen, setModalOpen] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)

  /* const { product } = useProduct(); */

  const filteredProds = products.filter(item => item.family === activeFamily.id)

  return (
    <>
      {/* {console.log(product)} */}
      <ButtonPlain onClick={() => setModalOpen(true)}>
        Tintometric
      </ButtonPlain>

      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
        <section className={handles.container}>
          <ColorPicker action={setActiveFamily} activeId={activeFamily.id} />
          <div className={handles['familyActive-label--wrapper']}>
            <h3 className={`${handles['familyActive-label--text']} t-heading-4`}>{activeFamily.name}</h3>
          </div>
        </section>
        <ColorList items={filteredProds} />
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
