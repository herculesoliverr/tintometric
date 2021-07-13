import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';
// import data from "../../utils/data.json";
import { SliderLayout } from "vtex.slider-layout"
import { useTintometricContext } from '../../context'

const CSS_HANDLES = ['familyPicker-container', 'familyPicker-item', 'familyPicker-span', 'familyPicker-item--isActive'];

const FamilyPicker = ({ action, activeId }: FamilyPickerProps) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        families
    } = useTintometricContext();
    return (
        <div className={handles["familyPicker-container"]}>
            <SliderLayout
                infinite={true}
                itemsPerPage={{
                    desktop: 7,
                    phone: 4
                }}
                fullWidth={true}
                showPaginationDots={"never"}
                arrowSize={15}
                showNavigationArrows={"always"}
                centerMode={true}>
                {
                    families.map((family) => {
                        return (
                            <div onClick={() => action(family)} className={`${handles['familyPicker-item']} ${family.id === activeId ? handles['familyPicker-item--isActive'] : ''}`}>
                                <span
                                    className={handles['familyPicker-span']}
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

export default FamilyPicker;