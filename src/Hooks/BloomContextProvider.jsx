import React, { useState, createContext } from 'react'

export const BloomContext= createContext()

const BloomContextProvider = (props) => {
  const [blooms, setBlooms] = useState([])

  return (
    <BloomContext.Provider value={{blooms, setBlooms}}>
        {props.children}
    </BloomContext.Provider>
  )
}

export default BloomContextProvider