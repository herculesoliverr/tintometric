import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Tooltip } from 'vtex.styleguide';
import Label from '../Label/Label';
import "./styles.css"

const CSS_HANDLES = ['colorList-container', 'colorList-item', 'colorList-grid', 'colorList-list', 'familyActive-label--wrapper', 'familyActive-label--text'];

const ColorList = ({ items, familyName, setSelectedColor, layout = 'grid' }: ColorListProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    return (
        <div className={`${handles['colorList-container']}`}>
            {layout === 'grid' && <div className={handles['familyActive-label--wrapper']}>
                <h3 className={`${handles['familyActive-label--text']} t-heading-5 mv3`}>{familyName}</h3>
            </div>}
            <div className={`${layout === 'grid' ? handles['colorList-grid'] : handles['colorList-list']}`}>
                {
                    items?.length && items.map((item) => {
                        return (
                            layout === 'grid' ?
                                <Tooltip label={
                                    <Label name={item.name} code={item.code} />
                                }>
                                    <span
                                        onClick={() => setSelectedColor(item)}
                                        className={handles['colorList-item']}
                                        style={{ backgroundColor: `rgb(${item.R}, ${item.G}, ${item.B})` }}
                                    ></span>
                                </Tooltip>
                                :
                                <div
                                    onClick={() => setSelectedColor(item)}
                                    className={handles['colorList-item']}
                                    style={{ backgroundColor: `rgb(${item.R}, ${item.G}, ${item.B})` }}
                                >
                                    <span className={`${handles['colorDetail-name']} fw3`}>{item.name}</span>
                                    <h5 className={`t-heading-5 b mv0 ${handles['colorDetail-code']}`}>{item.code}</h5>
                                </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ColorList;