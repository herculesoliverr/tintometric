import React from 'react'

import Main from './components/Main/Main'
import { TintometricProvider } from './context/index'

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({
  title = "LET'S FIND YOUR COLOUR!",
  subtitle = '',
  buttonGrid = 'Matriz',
  buttonList = 'Name',
  colorDetailTitle = 'Selected colour:',
  confirmButton = 'Confirm',
  itemsFamilyDesktop = 15,
  itemsFamilyMobile = 5,
}) => {
  return (
    <TintometricProvider>
      <Main
        title={title}
        subtitle={subtitle}
        buttonGrid={buttonGrid}
        buttonList={buttonList}
        colorDetailTitle={colorDetailTitle}
        confirmButton={confirmButton}
        itemsFamilyDesktop={itemsFamilyDesktop}
        itemsFamilyMobile={itemsFamilyMobile}
      />
    </TintometricProvider>
  )
}

export default Tintometric

Tintometric.schema = {
  title: 'admin/editor.tintometric.title',
  description: 'admin/editor.tintometric.description',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      description: 'Title used in the modal',
      type: 'string',
      default: "LET'S FIND YOUR COLOUR!",
    },
    subtitle: {
      title: 'Subtitle',
      description: 'Subtitle used in the modal',
      type: 'string',
      default: '',
    },
    buttonGrid: {
      title: 'Grid Button Label',
      description: 'Grid button label used in the modal',
      type: 'string',
      default: 'Matriz',
    },
    buttonList: {
      title: 'List Button Label',
      description: 'List button label used in the modal',
      type: 'string',
      default: 'Name',
    },
    colorDetailTitle: {
      title: 'List Button Label',
      description: 'Color Detail Title',
      type: 'string',
      default: 'Selected Colour:',
    },
    confirmButton: {
      title: 'Confirm Button Label',
      description: 'Confirm button label used in the modal',
      type: 'string',
      default: 'Confirm',
    },
    itemsFamilyDesktop:{
      title: '# Items Family Destop',
      description: 'Define the quantity of items in the family desktop',
      type: 'number',
      default: 15,
    },
    itemsFamilyMobile:{
      title: '# Items Family Destop',
      description: 'Define the quantity of items in the family mobile',
      type: 'number',
      default: 5,
    }
  },
}
