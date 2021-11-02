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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct])

  useEffect(() => {
    console.log('ActiveProd', activeProduct)
    // sets the activeFamily to the current family active
    activeProduct &&
      setActiveFamily(
        families.find(family => family.id === activeProduct.family)
      )
    // families.length && setActiveFamily(families[0])
  }, [families, activeProduct])
  data && console.log('activeFamily', activeFamily)

  useEffect(() => {
    data && setProducts(data?.products)
  }, [data])

  useEffect(() => {
    // shows only the families that have the actual productType (taken from the url, example: tinta-alba-familia-protegida-acetinado)
    console.log('data?.families', typeof data)
    const filteredFamilies = data?.families.filter(family =>
      family.products?.find(item => item === activeProductType?.id)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
