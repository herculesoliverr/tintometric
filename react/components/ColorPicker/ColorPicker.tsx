import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';
import data from "./../../utils/data.json";
import { SliderLayout } from "vtex.slider-layout"

const CSS_HANDLES = ['colorPicker-container', 'colorPicker-item', 'colorPicker-span', 'colorPicker-item--isActive'];

const ColorPicker = ({ action, activeId }: ColorPickerProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { families } = data;
    return (
        <div className={handles["colorPicker-container"]}>
            <SliderLayout
                infinite={true}
                itemsPerPage={{
                    desktop: 9,
                    phone: 4
                }}
                showNavigationArrows={"always"}
                centerMode={true}>
                {
                    families.map((family) => {
                        return (
                            <div onClick={() => action(family)} className={`${handles['colorPicker-item']} ${family.id === activeId ? handles['colorPicker-item--isActive'] : ''}`}>
                                <span
                                    className={handles['colorPicker-span']}
                                    style={{ backgroundColor: `${family.color}` }}
                                ></span>
                            </div>
                        )
                    })
                }
            </SliderLayout>
        </div >
    )
}

export default ColorPicker;