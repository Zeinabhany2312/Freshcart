import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export function UserContextProvider({ children }) {

    let [userToken, setUserToken] = useState(null)
    let [data,setData] = useState(null)

    useEffect(() => {

        if (userToken != null) {
            data = jwtDecode(userToken)
            console.log(data);
            setData(data)
        }
        
    }, [userToken])

    return <UserContext.Provider value={{ data, userToken, setUserToken }}>
        {children}
    </UserContext.Provider>
}