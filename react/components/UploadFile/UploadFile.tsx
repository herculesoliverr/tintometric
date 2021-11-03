/* eslint-disable no-console */
/* eslint-disable vtex/prefer-early-return */
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import Dropzone from 'react-dropzone'
import { Spinner, Button, Alert } from 'vtex.styleguide'
import { CSVLink } from 'react-csv'

import saveFileMutation from '../../graphql/saveFile.gql'
import ErrorAlert from './ErrorAlert'
import EmptyState from './EmptyState'
import saveDataGQL from '../../graphql/saveData.gql'
import getDataGQL from '../../graphql/getData.gql'
import getFileGQL from '../../graphql/getFile.gql'
import { defaultJSON, defaultCSV } from '../../utils/defaultData'
import { downloadFile } from '../../utils/downloadFile'

interface State {
  error: string | null
  isLoading: boolean
  fileName: string
  pathFile: string
  success: boolean
  oldFile: string
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
    pathFile: '',
    success: false,
    oldFile: '',
  })

  const fileNameQuery = useQuery(getDataGQL, {
    variables: { key: `${query}Name` },
  })

  const oldCSVFile = useQuery(getFileGQL, {
    variables: { key: `csv` },
  })

  const [
    uploadFile,
    {
      loading: loadingUploadFile,
      error: errorUploadFile,
      data: dataUploadFile,
    },
  ] = useMutation(saveFileMutation)

  useEffect(() => {
    if (oldCSVFile.data) {
      setState(prevState => ({ ...prevState, oldFile: oldCSVFile.data }))
    }
  }, [oldCSVFile])

  useEffect(() => {
    if (fileNameQuery.data) {
      setState(prevState => ({
        ...prevState,
        fileName: fileNameQuery.data?.getData,
      }))
      action(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileNameQuery])

  const saveOldFile = async () => {
    const res = await oldCSVFile.refetch()

    await saveData({
      variables: {
        key: `${query}_old`,
        value: res.data?.getFile,
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
        fileName: dataUploadFile.saveFile,
        pathFile: dataUploadFile.saveFile,
        success: true,
      }))
      saveData({
        variables: { key: `${query}Name`, value: dataUploadFile.saveFile },
      })
      action(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUploadFile, errorUploadFile, dataUploadFile])

  const handleDropFile = async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setState(prevState => ({ ...prevState, isLoading: true }))

      await saveOldFile()

      uploadFile({
        variables: {
          file: acceptedFiles[0],
          key: query,
        },
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
      {state.success && (
        <div className="mv5">
          <Alert
            onClose={() =>
              setState(prevState => ({ ...prevState, success: false }))
            }
            type="success"
          >
            <FormattedMessage id="admin/admin.app.tintometric.fileUploaded_success" />
          </Alert>
        </div>
      )}
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
