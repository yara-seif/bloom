import React from 'react'

export const useBloomContext= React.createContext(null);

const useBloomProvider = (props) => {
    const [blooms, setBlooms] = React.useState([])

  
    return <useBloomContext.Provider value={{blooms, setBlooms}}>{props.children}</useBloomContext.Provider>
  }

export default useBloomProvider