import React, { useState, useEffect } from 'react'
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
        id: 'admin/pages.editor.image-uploader.error.generic',
    },
})

const UploadFile = () => {
    const [saveData] = useMutation(saveDataGQL)
    const intl = useIntl()
    const jsonNameQuery = useQuery(getDataGQL, { variables: { key: 'jsonName' } })
    const jsonUrlQuery = useQuery(getDataGQL, { variables: { key: 'jsonFile' } })
    const jsonPathQuery = useQuery(getDataGQL, { variables: { key: 'jsonPath' } })

    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        fileName: intl.formatMessage(messages.fileEmpty),
        fileUrl: "",
        pathFile: ""
    })

    useEffect(() => {
        jsonNameQuery.data?.getData !== "" && setState(prevState => ({ ...prevState, fileName: jsonNameQuery.data?.getData }))
        jsonUrlQuery.data?.getData !== "" && setState(prevState => ({ ...prevState, fileUrl: jsonUrlQuery.data?.getData }))

    }, [jsonNameQuery, jsonUrlQuery])

    const [uploadFile, { loading: loadinUploadFile, error: errorUploadFile, data: dataUploadFile }] = useMutation(UploadFileQuery)

    const [deleteFile, { loading: loadinDeleteFile, error: errorDeleteFile, data: dataDeleteFile }] = useMutation(DeleteFileQuery)

    console.log("loadinDeleteFile", loadinDeleteFile)
    console.log("errorDeleteFile", errorDeleteFile)
    console.log("dataDeleteFile", dataDeleteFile)

    useEffect(() => {
        if (loadinUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: true }))
        }
        if (errorUploadFile) {
            setState({
                error: intl.formatMessage(messages.genericError),
                isLoading: false,
                fileName: intl.formatMessage(messages.fileEmpty),
                fileUrl: "",
                pathFile: ""
            })
        }
        if (dataUploadFile) {
            setState(prevState => ({ ...prevState, isLoading: false }))
            saveData({ variables: { key: "jsonFile", value: dataUploadFile.uploadFile.fileUrl } })
            saveData({ variables: { key: "jsonName", value: state.fileName } })
            saveData({ variables: { key: "jsonPath", value: state.pathFile } })
        }
    }, [loadinUploadFile, errorUploadFile, dataUploadFile])


    const handleDropFile = async (acceptedFiles: File[]) => {
        console.log(acceptedFiles[0])
        setState(prevState => ({ ...prevState, pathFile: acceptedFiles[0].name }))
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
        console.log("jsonPathQuery.data?.getData", jsonPathQuery.data?.getData)
        deleteFile({
            variables: { path: jsonPathQuery.data?.getData },
        })
    }

    console.log(removeFile)

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
                {/*  {state.fileUrl && <Button
                    variation="tertiary"
                    onClick={() => removeFile()}
                >
                    <FormattedMessage id="admin.app.tintometric.removeFile" />
                </Button>} */}
            </span>

            {state.error && <ErrorAlert message={state.error} />}
        </>
    )
}

export default UploadFile;
