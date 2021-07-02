import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

const CSS_HANDLES = ['colorPicker--container', 'colorPicker--item'];

const ColorPicker = ({ family, action, activeId }: ColorPickerProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    console.log(activeId)
    return (
        <div onClick={() => action(family)} className={handles['colorPicker--item']}>
            {family.id === activeId && <label>{family.name}</label>}
            <span
                style={{ backgroundColor: `${family.color}` }}
            ></span>
        </div>
    )
}

export default ColorPicker;