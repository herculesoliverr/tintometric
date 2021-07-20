import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import Dropzone from 'react-dropzone'
import { Spinner } from 'vtex.styleguide'
import UploadFileQuery from './../../graphql/uploadFile.gql'
import ErrorAlert from './ErrorAlert'
import EmptyState from './EmptyState'
import saveDataGQL from './../../graphql/saveData.gql'
import getDataGQL from './../../graphql/getData.gql'


import { useTintometricContext } from '../../context'

interface State {
    error: string | null
    isLoading: boolean,
    fileName: string
}

const messages = defineMessages({
    fileEmpty: {
        defaultMessage: 'Add a file',
        id: 'admin.app.tintometric.uploadFile',
    },
    fileSizeError: {
        defaultMessage:
            'File exceeds the size limit of 4MB. Please choose a smaller one.',
        id: 'admin/pages.editor.image-uploader.error.file-size',
    },
    genericError: {
        defaultMessage: 'Something went wrong. Please try again.',
        id: 'admin/pages.editor.image-uploader.error.generic',
    },
})

const UploadFile = () => {
    const [saveData] = useMutation(saveDataGQL)
    const intl = useIntl()
    const jsonNameQuery = useQuery(getDataGQL, { variables: { key: 'jsonName' } })
    const { getData } = useTintometricContext()

    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        fileName: intl.formatMessage(messages.fileEmpty)
    })

    useEffect(() => {
        jsonNameQuery.data?.getData !== "" && setState(prevState => ({ ...prevState, fileName: jsonNameQuery.data?.getData }))
    }, [jsonNameQuery])

    const [uploadFile, { loading: loadinUploadFile, error: errorUploadFile, data: dataUploadFile }] = useMutation(UploadFileQuery)

    useEffect(() => {
        if (loadinUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: true }))
        }
        if (errorUploadFile) {
            setState({
                error: intl.formatMessage(messages.genericError),
                isLoading: false,
                fileName: intl.formatMessage(messages.fileEmpty)
            })
        }
        if (dataUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: false }))
            saveData({ variables: { key: "jsonFile", value: dataUploadFile.uploadFile.fileUrl } })
            saveData({ variables: { key: "jsonName", value: state.fileName } })
            getData(dataUploadFile.uploadFile.fileUrl)
        }
    }, [loadinUploadFile, errorUploadFile, dataUploadFile])

    const handleImageDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setState(prevState => ({ ...prevState, fileName: acceptedFiles[0].name }))
            uploadFile({
                variables: { file: acceptedFiles[0] },
            })
        } else {
            setState(prevState => ({
                ...prevState,
                error: intl.formatMessage(messages.fileSizeError),
            }))
        }

    }
    return (
        <>
            <span className={"mv5 db"}>
                <FormattedMessage id="admin.app.tintometric.uploadFile" />
            </span>

            <Dropzone onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            {...getRootProps()}
                            className={
                                `
                                ${state.isLoading && 'ba b--dashed bw1 b--light-gray bg-white b--solid'}
                                `
                            }>
                            <input {...getInputProps()} />
                            {state.isLoading ?
                                (<div className="w-100 h-100 flex justify-center items-center">
                                    <Spinner />
                                </div>) :
                                (
                                    <EmptyState fileName={state.fileName} />
                                )
                            }
                        </div>
                    </section>
                )}
            </Dropzone>
            {state.error && <ErrorAlert message={state.error} />}
        </>
    )
}

export default UploadFile;