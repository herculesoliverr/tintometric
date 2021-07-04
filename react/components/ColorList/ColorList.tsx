import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Tooltip } from 'vtex.styleguide';
import Label from '../Label/Label';
import "./styles.css"

const CSS_HANDLES = ['colorList-container', 'colorList-item'];

const ColorList = ({ items, familyName }: ColorListProps) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div className={handles['colorList-container']}>
            <div className={handles['familyActive-label--wrapper']}>
                <h3 className={`${handles['familyActive-label--text']} t-heading-4`}>{familyName}</h3>
            </div>
            {
                items.map((item) => {
                    console.log(item)
                    return (
                        <Tooltip label={
                            <Label name={item.name} code={item.code} />
                        }>
                            <span
                                className={handles['colorList-item']}
                                style={{ backgroundColor: `rgb(${item.R}, ${item.G}, ${item.B})` }}
                            ></span>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}

export default ColorList;