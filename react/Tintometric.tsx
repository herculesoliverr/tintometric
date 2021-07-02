import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import useProduct from 'vtex.product-context/useProduct'
import ColorPicker from './components/ColorPicker/ColorPicker';
/* import { Modal } from 'vtex.styleguide' */
import data from "./utils/data.json";

interface TintometricProps {
  targetDate: string
}

const CSS_HANDLES = ['Tintometric'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  console.log("products", products)
  const handles = useCssHandles(CSS_HANDLES);
  const { product } = useProduct();

  return (
    <>
      {console.log(product)}
      <h1>tintometric</h1>
      <div className={handles.Tintometric}>
        {families.map((family) => {
          return (
            <ColorPicker
              family={family}
              action={() => console.log('clicked')}
            />
          )
        })}
      </div>
      {/* <Modal children="<p>holis</p>" isOpen={true}></Modal> */}
    </>
  )
}

Tintometric.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
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
