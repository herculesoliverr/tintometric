import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';
import data from "./../../utils/data.json";



const CSS_HANDLES = ['colorPicker--container', 'colorPicker--item'];

const ColorPicker = ({ action, activeId }: ColorPickerProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { families } = data;

    console.log(activeId)
    return (
        <div className={handles["colorPicker--container"]}>
            {families.map((family) => {
                return (
                    <div onClick={() => action(family)} className={handles['colorPicker--item']}>
                        {family.id === activeId && <label>{family.name}</label>}
                        <span
                            style={{ backgroundColor: `${family.color}` }}
                        ></span>
                    </div>
                )
            })}
        </div>
    )
}

export default ColorPicker;