import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext();

 const Context = ({children}) => {
    const [logIn,setLogin] = useState(false);

  return (
    <AppContext.Provider value={{logIn,setLogin}}>
        {children}
    </AppContext.Provider>
  )
}
export default Context;


export const useAppContext = ()=> useContext(AppContext);