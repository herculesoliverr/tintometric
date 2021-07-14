import React from 'react'
import Main from "./components/Main/Main";

import { TintometricProvider } from './context/index';

const Tintometric: StorefrontFunctionComponent<TintometricProps> = ({
    title = "VAMOS ENCONTRAR A SUA COR!", subtitle = "BUSQUE PELA MATRIZ OU PELO NOME", buttonGrid = "Matriz", buttonList = "Nome", colorDetailTitle = "Cor Escolhida:", confirmButton = "Confirme", file
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
                file={file}
            />
        </TintometricProvider>
    );
}

export default Tintometric;

Tintometric.schema = {
    title: 'editor.tintometric.title',
    description: 'editor.tintometric.description',
    type: 'object',
    properties: {
        title: {
            title: 'Title',
            description: 'Title used in the modal',
            type: 'string',
            default: 'VAMOS ENCONTRAR A SUA COR!',
        },
        subtitle: {
            title: 'Subtitle',
            description: 'Subtitle used in the modal',
            type: 'string',
            default: 'BUSQUE PELA MATRIZ OU PELO NOME',
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
            default: 'Nome',
        },
        colorDetailTitle: {
            title: 'List Button Label',
            description: 'List button label used in the modal',
            type: 'string',
            default: 'Cor Escolhida:',
        },
        confirmButton: {
            title: 'Confirm Button Label',
            description: 'Confirm button label used in the modal',
            type: 'string',
            default: 'Confirme',
        },
        file: {
            title: 'File',
            type: 'string',
            widget: {
                'ui:widget': 'file',
            },
        }
    }
}
