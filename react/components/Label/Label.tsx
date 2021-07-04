import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['tooltip-name', 'tooltip-code']

const Label = ({ name, code }: LabelProps) => {
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <>
            <span className={`${handles['tooltip-name']}`}>{name}</span>
            <h4 className={`${handles['tooltip-code']} mb0 mt3`}>{code}</h4>
        </>
    )
}

export default Label;