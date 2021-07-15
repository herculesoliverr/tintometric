import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import "./styles.css"
import { Link } from "vtex.render-runtime";
import { Button } from 'vtex.styleguide'
import { useTintometricContext } from '../../context'

const CSS_HANDLES = ['colorDetail-container', 'colorDetail-title', 'colorDetail-info--container', 'colorDetail-image', 'colorDetail-name', 'colorDetail-code', 'confirm-button'];

const ColorDetail = ({ colorDetailTitle, confirmButton }: ColorDetailProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        handleModalClick,
        selectedColor,
        activeProductType
    } = useTintometricContext();

    return (
        <section className={handles['colorDetail-container']}>
            <p className={`${handles['colorDetail-title']} ma0 mb2`}>{colorDetailTitle}</p>
            <div
                style={{ backgroundColor: `rgb(${selectedColor.R}, ${selectedColor.G}, ${selectedColor.B})` }}
                className={`${handles['colorDetail-info--container']}`}
            >
                <span className={`${handles['colorDetail-name']} fw3`}>{selectedColor.name}</span>
                <h5 className={`t-heading-5 b mv0 ${handles['colorDetail-code']}`}>{selectedColor.code}</h5>
            </div>
            <img style={{ backgroundColor: `rgb(${selectedColor.R}, ${selectedColor.G}, ${selectedColor.B})` }} className={`${handles['colorDetail-image']} mv4`} src="https://pintureriasqa.vteximg.com.br/arquivos/sala.png" alt={selectedColor.name} />
            <Button>
                <Link
                    onClick={()=>handleModalClick(false)}
                    className={handles['confirm-button']} to={`/${activeProductType?.slug}-${selectedColor.slug}-${selectedColor.code}/p`}>
                    {confirmButton}
                </Link>
            </Button>
        </section>
    )
}

export default ColorDetail