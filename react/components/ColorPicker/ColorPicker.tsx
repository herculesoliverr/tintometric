import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

const CSS_HANDLES = ['colorpicker--container', 'colorPicker--item'];


const ColorPicker = ({ family, action }: ColorPickerProps) => {
    console.log(family)
    const handles = useCssHandles(CSS_HANDLES);
    return (
        <div onClick={action} className={handles['colorpicker--container']}>
            <label>{family.name}</label>
            <span
                className={handles['colorPicker--item']}
                style={{ backgroundColor: `${family.color}` }}
            ></span>
        </div>
    )
}

export default ColorPicker;