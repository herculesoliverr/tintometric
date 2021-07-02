import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
//import useProduct from 'vtex.product-context/useProduct'
import ColorPicker from './../ColorPicker/ColorPicker'
import { ButtonPlain } from 'vtex.styleguide'
import data from "./../../utils/data.json"
import "./styles.css"
import ColorList from '../ColorList/ColorList'

interface TintometricProps {
  targetDate: string
}

const CSS_HANDLES = ['container', 'colorPicker--container'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  const [activeFamily, setActiveFamily] = useState(families[0]);
  const handles = useCssHandles(CSS_HANDLES);
  /* const { product } = useProduct(); */
 
  const filteredProds = products.filter(item => item.family === activeFamily.id)
  console.log(filteredProds)
  return (
    <>
      {/* {console.log(product)} */}
      <section className={handles.container}>
        <ButtonPlain >
          Matriz
        </ButtonPlain>
        <ColorPicker action={setActiveFamily} activeId={activeFamily.id} />
      </section>
      <ColorList/>
      {/* <Modal children="<p>holis</p>" isOpen={true}></Modal> */}
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
