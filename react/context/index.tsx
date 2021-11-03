/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useEffect, useContext } from 'react'
import { useRuntime } from 'vtex.render-runtime'

export const TintometricContext = createContext(
  {} as TintometricContextInterface
)

export const useTintometricContext = () => useContext(TintometricContext)

export function TintometricProvider({ children }: ContextChildren) {
  const runtime = useRuntime()
  const [data, setData] = useState<DataProps>()
  const [families, setFamilies] = useState<Family[]>([])
  const [products, setProducts] = useState<ProductProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [activeFamily, setActiveFamily] = useState<Family | undefined>()
  const [selectedColor, setSelectedColor] = useState<ProductProps>()
  const [activeProductType, setActiveProductType] = useState<ProductType>()
  const activeProduct = products?.find(
    product => product.code.toLowerCase() === getActualCode()
  )

  useEffect(() => {
    const actualSlugType = runtime?.route?.params?.slug
      ?.toLowerCase()
      .replace(
        `-${activeProduct?.slug.toLowerCase()}-${activeProduct?.code.toLowerCase()}`,
        ''
      )

    activeProduct &&
      setActiveProductType(
        data?.productType.find(type => type.slug === actualSlugType)
      )
  }, [activeProduct])

  useEffect(() => {
    // sets the activeFamily to the current family active
    activeProduct &&
      setActiveFamily(
        families.find(family => family.id === activeProduct.family)
      )
  }, [families, activeProduct])

  useEffect(() => {
    data && setProducts(data?.products)
  }, [data])

  useEffect(() => {
    // shows only the families that have the actual productType (taken from the url, example: tinta-alba-familia-protegida-acetinado)
    const filteredFamilies = data?.families.filter(family =>
      family.productType?.find(item => item === activeProductType?.id)
    )

    filteredFamilies && setFamilies(filteredFamilies)
  }, [data, activeProductType])

  useEffect(() => {
    if (products) {
      activeFamily &&
        setSelectedColor(
          products.find(product => product.family === activeFamily.id)
        )
    }
  }, [activeFamily])

  const handleModalClick = (state: boolean) => {
    setModalOpen(state)
  }

  function getActualCode() {
    const initialSlug = runtime?.route?.params?.slug
      .split('-')
      .splice(-1)
      .join('-')

    return initialSlug?.toLocaleLowerCase()
  }

  return (
    <TintometricContext.Provider
      value={{
        setData,
        families,
        setActiveFamily,
        activeFamily,
        products,
        activeProduct,
        handleModalClick,
        setSelectedColor,
        activeProductType,
        selectedColor,
        modalOpen,
      }}
    >
      {children}
    </TintometricContext.Provider>
  )
}
