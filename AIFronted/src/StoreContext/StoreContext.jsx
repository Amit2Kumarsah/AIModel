import { createContext, useEffect, useState } from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [token, setToken] = useState();
    const [response, setResponse] = useState([]);


    const url = "http://localhost:4000/api";

    
    useEffect( () =>{
        setToken(localStorage.getItem("token"));
    }, [])
    const contextValue = {
        setToken,
        token,
        response,
        setResponse,
        url
    }

    return (
        <storeContext.Provider value={contextValue}>{props.children}</storeContext.Provider>
    )
};

export default StoreContextProvider