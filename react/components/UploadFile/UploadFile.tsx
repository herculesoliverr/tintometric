/* eslint-disable no-console */
/* eslint-disable vtex/prefer-early-return */
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import Dropzone from 'react-dropzone'
import { Spinner, Button } from 'vtex.styleguide'
import { CSVLink } from 'react-csv'

import UploadFileQuery from '../../graphql/uploadFile.gql'
import DeleteFileQuery from '../../graphql/deleteFile.gql'
import ErrorAlert from './ErrorAlert'
import EmptyState from './EmptyState'
import saveDataGQL from '../../graphql/saveData.gql'
import getDataGQL from '../../graphql/getData.gql'
import { defaultJSON, defaultCSV } from '../../utils/defaultData'
import { downloadFile } from '../../utils/downloadFile'

interface State {
  error: string | null
  isLoading: boolean
  fileName: string
  fileUrl: string | undefined
  pathFile: string
}

const messages = defineMessages({
  fileSizeError: {
    defaultMessage:
      'File exceeds the size limit of 4MB. Please choose a smaller one.',
    id: 'admin/pages.editor.image-uploader.error.file-size',
  },
  genericError: {
    defaultMessage: 'Something went wrong. Please try again.',
    id: 'admin/admin.app.tintometric.generic.error',
  },
})

interface UploadFileProps {
  action: Dispatch<SetStateAction<boolean>>
  query: string
  templateFile: string
}

const UploadFile = ({ action, query, templateFile }: UploadFileProps) => {
  const [saveData] = useMutation(saveDataGQL)
  const intl = useIntl()

  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    fileName: '',
    fileUrl: '',
    pathFile: '',
  })

  const fileNameQuery = useQuery(getDataGQL, {
    variables: { key: `${query}Name` },
  })

  const fileUrlQuery = useQuery(getDataGQL, {
    variables: { key: `${query}File` },
  })

  const [
    uploadFile,
    {
      loading: loadingUploadFile,
      error: errorUploadFile,
      data: dataUploadFile,
    },
  ] = useMutation(UploadFileQuery)

  const [
    deleteFile,
    {
      loading: loadingDeleteFile,
      error: errorDeleteFile,
      data: dataDeleteFile,
    },
  ] = useMutation(DeleteFileQuery)

  useEffect(() => {
    fileNameQuery.data &&
      setState(prevState => ({
        ...prevState,
        fileName: fileNameQuery.data?.getData,
      }))
    if (fileUrlQuery.data?.getData) {
      action(true)
      setState(prevState => ({
        ...prevState,
        fileUrl: fileUrlQuery.data?.getData,
        pathFile: fileUrlQuery.data?.getData.split('/')[
          fileUrlQuery.data?.getData.split('/').length - 1
        ],
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileNameQuery, fileUrlQuery])

  const saveOldFile = async () => {
    await saveData({
      variables: {
        key: `${query}File_old`,
        value: state.fileUrl,
      },
    })
  }

  useEffect(() => {
    if (loadingUploadFile) {
      setState(prevState => ({ ...prevState, isLoading: true }))
    }

    if (errorUploadFile) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: intl.formatMessage(messages.genericError),
      }))
      action(false)
    }

    if (dataUploadFile) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        pathFile: dataUploadFile.uploadFile.fileUrl.split('/')[
          dataUploadFile.uploadFile.fileUrl.split('/').length - 1
        ],
      }))
      // before saving csvFile save csvFileOld
      saveOldFile()

      saveData({
        variables: {
          key: `${query}File`,
          value: dataUploadFile.uploadFile.fileUrl,
        },
      })
      saveData({ variables: { key: `${query}Name`, value: state.fileName } })
      action(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUploadFile, errorUploadFile, dataUploadFile])

  useEffect(() => {
    if (loadingDeleteFile)
      setState(prevState => ({ ...prevState, isLoading: true }))
    if (dataDeleteFile) {
      saveData({ variables: { key: `${query}File`, value: '' } })
      // saveData({ variables: { key: 'jsonPath', value: '' } })
      saveData({ variables: { key: `${query}Name`, value: '' } })
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        fileName: '',
        pathFile: '',
      }))
      action(false)
    }

    if (errorDeleteFile) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: intl.formatMessage(messages.genericError),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Dropzone
        onDrop={acceptedFiles => handleDropFile(acceptedFiles)}
        accept={query === 'json' ? 'application/json' : '.csv'}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className={`
                                ${state.isLoading &&
                'ba b--dashed bw1 b--light-gray bg-white b--solid'}
                                `}
            >
              <input {...getInputProps()} />
              {state.isLoading ? (
                <div className="w-100 h-100 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <EmptyState fileName={state.fileName} />
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <span className="mv7 db flex">
        {state.pathFile && (
          <Button variation="primary" onClick={() => removeFile()}>
            <FormattedMessage id="admin/admin.app.tintometric.removeFile" />
          </Button>
        )}
        {query === 'json' ? (
          <Button
            variation="tertiary"
            onClick={() =>
              downloadFile(templateFile, JSON.stringify(defaultJSON))
            }
          >
            <FormattedMessage id="admin/admin.app.tintometric.downloadTemplate" />
          </Button>
        ) : (
          <Button variation="tertiary">
            <CSVLink filename="bases" data={defaultCSV}>
              <FormattedMessage id="admin/admin.app.tintometric.downloadTemplate" />
            </CSVLink>
          </Button>
        )}
      </span>

      {state.error && <ErrorAlert message={state.error} />}
    </>
  )
}

export default UploadFile
