import React, { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext({} as TintometricContextInterface)

export default function StoreContextContainer({ children }: ContextChildren) {

  const [test, setTest] = useState("holi")

  useEffect(() => {
    console.log("entro---")
    setTest("chau")
  }, [])
  // const [families, setFamilies] = useState<Family[]>([])


  function getFamilies(file: string) {
    console.log("file---", file)
    return `file------ ${file}`
  }

  return (
    <StoreContext.Provider
      value={{
        getFamilies,
        test
        // families
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
