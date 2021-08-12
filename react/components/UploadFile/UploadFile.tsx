import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import Dropzone from 'react-dropzone'

import { Spinner, Button } from 'vtex.styleguide'

import UploadFileQuery from './../../graphql/uploadFile.gql'
import DeleteFileQuery from './../../graphql/deleteFile.gql'

import ErrorAlert from './ErrorAlert'
import EmptyState from './EmptyState'
import saveDataGQL from './../../graphql/saveData.gql'
import getDataGQL from './../../graphql/getData.gql'

import { defaultData } from "../../utils/defaultData";
import { downloadFile } from "./../../utils/downloadFile";

interface State {
    error: string | null
    isLoading: boolean,
    fileName: string,
    fileUrl: string | undefined,
    pathFile: string
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
        id: 'admin.app.tintometric.generic.error',
    },
})
interface UploadFileProps {
    setFileLoaded: Dispatch<SetStateAction<boolean>>
}

const UploadFile = ({ setFileLoaded }: UploadFileProps) => {
    const [saveData] = useMutation(saveDataGQL)
    const intl = useIntl()
    const jsonNameQuery = useQuery(getDataGQL, { variables: { key: 'jsonName' } })
    const jsonUrlQuery = useQuery(getDataGQL, { variables: { key: 'jsonFile' } })
    const [uploadFile, { loading: loadingUploadFile, error: errorUploadFile, data: dataUploadFile }] = useMutation(UploadFileQuery)
    const [deleteFile, { loading: loadingDeleteFile, error: errorDeleteFile, data: dataDeleteFile }] = useMutation(DeleteFileQuery)

    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        fileName: intl.formatMessage(messages.fileEmpty),
        fileUrl: "",
        pathFile: ""
    })

    useEffect(() => {
        jsonNameQuery.data && setState(prevState => ({ ...prevState, fileName: jsonNameQuery.data?.getData }))
        jsonUrlQuery.data?.getData !== "" && setState(prevState => ({
            ...prevState,
            fileUrl: jsonUrlQuery.data?.getData,
            pathFile: jsonUrlQuery.data?.getData.split("/")[jsonUrlQuery.data?.getData.split("/").length - 1]
        }))
    }, [jsonNameQuery, jsonUrlQuery])


    useEffect(() => {
        if (loadingUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: true }))
        }
        if (errorUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: false, error: intl.formatMessage(messages.genericError) }))
            setFileLoaded(false)
        }

        if (dataUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: false, jsonFile: dataUploadFile.uploadFile.fileUrl, pathFile: dataUploadFile.uploadFile.fileUrl.split("/")[dataUploadFile.uploadFile.fileUrl.split('/').length - 1] }))
            saveData({ variables: { key: "jsonFile", value: dataUploadFile.uploadFile.fileUrl } })
            saveData({ variables: { key: "jsonName", value: state.fileName } })
        }
    }, [loadingUploadFile, errorUploadFile, dataUploadFile])

    useEffect(() => {
        if (loadingDeleteFile) setState(prevState => ({ ...prevState, isLoading: true }))
        if (dataDeleteFile) {
            saveData({ variables: { key: "jsonFile", value: "" } })
            saveData({ variables: { key: "jsonPath", value: "" } })
            saveData({ variables: { key: "jsonName", value: "" } })
            setState(prevState => ({ ...prevState, isLoading: false, fileName: intl.formatMessage(messages.fileEmpty), pathFile: "" }))
            setFileLoaded(false)
        }
        if (errorDeleteFile) {
            setState(prevState => ({ ...prevState, isLoading: false, error: intl.formatMessage(messages.genericError) }))
        }
    }, [dataDeleteFile, errorDeleteFile, loadingDeleteFile])

    const handleDropFile = async (acceptedFiles: File[]) => {
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

    const removeFile = async () => {
        setState(prevState => ({ ...prevState, isLoading: true }))
        deleteFile({
            variables: { path: state.pathFile },
        })
    }

    return (
        <>
            <span className={"mv5 db"}>
                <FormattedMessage id="admin.app.tintometric.uploadFile" />
            </span>
            <Dropzone
                onDrop={acceptedFiles => handleDropFile(acceptedFiles)}
                accept="application/json"
            >
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
            <span className="mv4 db flex">
                <Button
                    variation="tertiary"
                    onClick={() => downloadFile("template_tintometric.json", JSON.stringify(defaultData))}>
                    <FormattedMessage id="admin.app.tintometric.downloadTemplate" />
                </Button>
                {("state.pathFile", state.pathFile)}
                {state.pathFile && <Button
                    variation="tertiary"
                    onClick={() => removeFile()}
                >
                    <FormattedMessage id="admin.app.tintometric.removeFile" />
                </Button>}
            </span>

            {state.error && <ErrorAlert message={state.error} />}
        </>
    )
}

export default UploadFile;