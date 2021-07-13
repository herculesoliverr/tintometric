import React, { useState, createContext, useEffect, useContext } from 'react';
import base64ToJson from './../utils/base64ToJson';
import { useRuntime } from "vtex.render-runtime";

export const TintometricContext = createContext({} as TintometricContextInterface)

export const useTintometricContext = () => useContext(TintometricContext);




export function TintometricProvider({ children }: ContextChildren) {
   const runtime = useRuntime()
   const [families, setFamilies] = useState<Family[]>([])
   const [products, setProducts] = useState<ProductProps[]>([])
   const [modalOpen, setModalOpen] = useState(false)
   const [activeFamily, setActiveFamily] = useState<Family | undefined>()
   const activeProduct = products.find(product => product.code.toLowerCase() === getActualCode())

   useEffect(() => {
      families.length && setActiveFamily(families[0])
   }, [families])

   /*    useEffect(() => {
   
         activeFamily && setSelectedColor(products.find(product => product.family == activeFamily.id))
         activeFamily && setFilteredProducts(products.filter(item => item.family === activeFamily.id))
   
      }, [activeFamily])
    */
   const handleModalClick = (state: boolean) => {
      console.log("llegas aca --- ", state)
      setModalOpen(state)
   }

   function getActualCode() {
      const initialSlug = runtime?.route?.params?.slug
         .split('-')
         .splice(-1)
         .join('-');
      return initialSlug?.toLocaleLowerCase();
   }


   function getFamilies(file: string) {
      const dataFile: DataProps = base64ToJson(file);
      setFamilies(dataFile.families)
      setProducts(dataFile.products)
   }
   return (
      <TintometricContext.Provider
         value={{
            getFamilies,
            families,
            setActiveFamily,
            activeFamily,
            products,
            activeProduct,
            handleModalClick,
            modalOpen,
         }}
  >
         {children}
      </TintometricContext.Provider>
   );
}