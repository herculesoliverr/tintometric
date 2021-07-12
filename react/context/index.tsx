import React, { useState, createContext, useEffect, useContext } from 'react';
import base64ToJson from './../utils/base64ToJson';
export const GeneralContext = createContext({} as TintometricContextInterface)


export const useGeneralContext = () => useContext(GeneralContext);

export function TintometricProvider({ children }: ContextChildren) {
   const [families, setFamilies] = useState<Family[]>([])

   useEffect(() => {
     console.log("entro---")
   }, [])
 
 
   function getFamilies(file: string) {
      const dataFile: DataProps = base64ToJson(file);
      setFamilies(dataFile.families)
   }
   return (
      <GeneralContext.Provider
         value={{
            getFamilies,
            families
         }}
      >
         {children}
      </GeneralContext.Provider>
   );
}