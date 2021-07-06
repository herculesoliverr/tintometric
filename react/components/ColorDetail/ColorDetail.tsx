import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import "./styles.css"
import { Link } from "vtex.render-runtime";
import { Button } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = ['colorDetail-container', 'colorDetail-title', 'colorDetail-info--container', 'colorDetail-image', 'colorDetail-name', 'colorDetail-code', 'confirm-button'];
const ColorDetail = ({ color }: ColorDetailProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const runtime = useRuntime()
  
    function handleSlug(){
        const initialSlug = runtime?.route?.params?.slug.split('-');
        initialSlug.splice(-2)
        console.log("acaaa")
        return initialSlug.join('-')
    }

    return (
        <section className={handles['colorDetail-container']}>
            <p className={`${handles['colorDetail-title']} ma0 mb2`}>Cor Escolhida:</p>
            <div
                style={{ backgroundColor: `rgb(${color.R}, ${color.G}, ${color.B})` }}
                className={`${handles['colorDetail-info--container']}`}
            >
                <span className={`${handles['colorDetail-name']} fw3`}>{color.name}</span>
                <h5 className={`t-heading-5 b mv0 ${handles['colorDetail-code']}`}>{color.code}</h5>
            </div>
            <img className={`${handles['colorDetail-image']} mv4`} src={color.image} alt={color.name} />
            <Button>
                <Link className={handles['confirm-button']} to={`/${handleSlug()}-${color.code}`}>
                    confirmar
                </Link>
            </Button>
        </section>
    )
}

export default ColorDetail