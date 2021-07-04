import React from 'react'



const ColorDetail = ({ color }: ColorDetailProps) => {
    console.log("color----", color)
    return (
        <div>
            <h5 className={`t-heading-5 `}>{color.name}</h5>
        </div>
    )
}

export default ColorDetail