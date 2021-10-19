import { AuthenticationError, ForbiddenError, UserInputError } from '@vtex/api'
import { AxiosError } from 'axios'
import Papa from 'papaparse'

export const BUCKET_NAME = 'product-translation'
export const ALL_TRANSLATIONS_FILES = 'all-translations'

export const statusToError = (e: AxiosError) => {
  if (!e.response) {
    throw e
  }

  const {
    response: { status },
  } = e

  switch (status) {
    case 401: {
      throw new AuthenticationError(e)
    }

    case 403: {
      throw new ForbiddenError(e)
    }

    case 400: {
      throw new UserInputError(e)
    }

    default:
      throw new TypeError(e.message)
  }
}

export const MAX_PRODUCTS_PER_CATEGORY = 50

export const parseCSVToJson = (data: any) => {
  const { data: parsedData }: any = Papa.parse(data, {
    header: true,
  })

  return parsedData
}

export const validateNewPrices = (oldCSV: CsvItem[], newCSV: CsvItem[]) => {
  const errors: string[] = []

  newCSV.forEach((itemInNewCSV: CsvItem) => {
    const itemInOldCSV = oldCSV.find(
      (oldCSVItem: CsvItem) => oldCSVItem.base === itemInNewCSV.base
    )

    // eslint-disable-next-line vtex/prefer-early-return
    if (itemInOldCSV) {
      const res =
        ((Number(itemInOldCSV.price) - Number(itemInNewCSV.price)) /
          Number(itemInOldCSV.price)) *
        100

      if (res > 10) errors.push(itemInOldCSV.base)
    }
  })

  return errors
}
