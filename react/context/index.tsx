import React, { useState, createContext, useEffect, useContext } from 'react';
import base64ToJson from './../utils/base64ToJson';
import { useRuntime } from "vtex.render-runtime";

export const GeneralContext = createContext({} as TintometricContextInterface)

export const useGeneralContext = () => useContext(GeneralContext);




export function TintometricProvider({ children }: ContextChildren) {
   const runtime = useRuntime()
   const [families, setFamilies] = useState<Family[]>([])
   const [products, setProducts] = useState<ProductProps[]>([])
   const [modalOpen, setModalOpen] = useState(false)
   const [activeFamily, setActiveFamily] = useState<Family | undefined>()
   const [activeProduct, setActiveProduct] = useState<ProductProps>()

   console.log(runtime)

   useEffect(() => {
      families.length && setActiveFamily(families[0])
   }, [families])

   useEffect(() => {
      products.length && setActiveProduct(products.find(product => product.code.toLowerCase() === getActualCode()))
   }, [products])

/*    useEffect(() => {

      activeFamily && setSelectedColor(products.find(product => product.family == activeFamily.id))
      activeFamily && setFilteredProducts(products.filter(item => item.family === activeFamily.id))

   }, [activeFamily])
 */
   // console.log("activeProduct----", activeProduct)
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

   function getFamilies(file: string) {
      const dataFile: DataProps = base64ToJson(file);
      setFamilies(dataFile.families)
      setProducts(dataFile.products)
   }
   return (
      <GeneralContext.Provider
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
      </GeneralContext.Provider>
   );
}