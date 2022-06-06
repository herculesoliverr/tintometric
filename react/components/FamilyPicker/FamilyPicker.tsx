/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'
import { SliderLayout } from 'vtex.slider-layout'

import { useTintometricContext } from '../../context'

const CSS_HANDLES = [
  'familyPicker-container',
  'familyPicker-item',
  'familyPicker-span',
  'familyPicker-item--isActive',
]

const FamilyPicker = ({ action, activeId, itemsFamilyDesktop, itemsFamilyMobile }: FamilyPickerProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { families } = useTintometricContext()

  return (
    <div className={handles['familyPicker-container']}>
      <SliderLayout
        itemsPerPage={{
          desktop: itemsFamilyDesktop,
          phone: itemsFamilyMobile,
        }}
        fullWidth
        showPaginationDots="never"
        arrowSize={15}
        showNavigationArrows="always"
        centerMode
      >
        {families.map(family => {
          return (
            <div
              role="button"
              tabIndex={family.id}
              key={family.id}
              onClick={() => action(family)}
              className={`${handles['familyPicker-item']} ${
                family.id === activeId
                  ? handles['familyPicker-item--isActive']
                  : ''
              }`}
            >
              <span
                className={handles['familyPicker-span']}
                style={{ backgroundColor: `${family.color}` }}
              />
            </div>
          )
        })}
      </SliderLayout>
    </div>
  )
}

export default FamilyPicker
