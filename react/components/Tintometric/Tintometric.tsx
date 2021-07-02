import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import useProduct from 'vtex.product-context/useProduct'
import ColorPicker from './../ColorPicker/ColorPicker';
/* import { Modal } from 'vtex.styleguide' */
import data from "./../../utils/data.json";
import "./styles.css";

interface TintometricProps {
  targetDate: string
}

const CSS_HANDLES = ['container', 'colorPicker--container'];

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({

}) => {
  const { families, products } = data;
  //TODO: ver cómo hacer para que no renderice este componente cuando cambia la familia
  const handles = useCssHandles(CSS_HANDLES);
  const { product } = useProduct();
  const [activeFamily, setActiveFamily] = useState(families[0]);
  console.log("active", activeFamily)

  const filteredProds = products.filter(item => item.family === activeFamily.id)
  console.log(filteredProds)
  return (
    <>
      {console.log(product)}
      <section className={handles.container}>
        <div className={handles["colorPicker--container"]}>
          {families.map((family) => {
            return (
              <ColorPicker
                family={family}
                action={setActiveFamily}
                activeId={activeFamily.id}
              />
            )
          })}
        </div>
        <div>

        </div>
      </section>
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
