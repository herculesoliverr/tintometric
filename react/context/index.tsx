import React, { useState, createContext, useEffect, useContext } from 'react';
import base64ToJson from './../utils/base64ToJson';
import { useRuntime } from "vtex.render-runtime";

export const TintometricContext = createContext({} as TintometricContextInterface)

export const useTintometricContext = () => useContext(TintometricContext);

export function TintometricProvider({ children }: ContextChildren) {
   const runtime = useRuntime()
   const [data, setData] = useState<DataProps>()
   const [families, setFamilies] = useState<Family[]>([])
   const [products, setProducts] = useState<ProductProps[]>([])
   const [modalOpen, setModalOpen] = useState(false)
   const [activeFamily, setActiveFamily] = useState<Family | undefined>()
   const [selectedColor, setSelectedColor] = useState<ProductProps>()
   const [activeProductType, setActiveProductType] = useState<ProductType>()
   const activeProduct = products?.find(product => product.code.toLowerCase() === getActualCode())

   useEffect(() => {
      // Extracts active slug type from the url
      const actualSlugType = runtime?.route?.params?.slug?.toLowerCase().replace(`-${activeProduct?.slug.toLowerCase()}-${activeProduct?.code.toLowerCase()}`, '');

      //finds the productType of the active product from the json file
      activeProduct && setActiveProductType(data?.productType.find(type => type.slug === actualSlugType))
   }, [activeProduct])

   useEffect(() => {
      families.length && setActiveFamily(families[0])
   }, [families])


   useEffect(() => {
      const filteredFamilies = data?.families.filter(family => family.products?.find(item => item === activeProductType?.id));
      filteredFamilies && setFamilies(filteredFamilies)
   }, [data, activeProductType])

   useEffect(() => {
      activeFamily && setSelectedColor(products.find(product => product.family == activeFamily.id))
   }, [activeFamily])

   const handleModalClick = (state: boolean) => {
      setModalOpen(state)
   }

   function getActualCode() {
      const initialSlug = runtime?.route?.params?.slug
         .split('-')
         .splice(-1)
         .join('-');
      return initialSlug?.toLocaleLowerCase();
   }


   function getData(file: string) {
      const dataFile: DataProps = base64ToJson(file);
      setData(dataFile)
      setProducts(dataFile.products)
   }

   return (
      <TintometricContext.Provider
         value={{
            getData,
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
   );
}