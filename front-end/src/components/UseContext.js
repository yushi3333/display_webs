import React, {createContext, useState, useContext} from 'react';

const UseContext = createContext();

export const useUser = ()=>useContext(UseContext);

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState({
        username: localStorage.getItem("username") || null,
        role: localStorage.getItem("role") || null,
        token: localStorage.getItem("token") || null,
    });
    const login = (username, role, token) =>{
        setUser({username, role, token});
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
    }
    return (
        <UseContext.Provider value={{user,login}}>
            {children}


        </UseContext.Provider>
    )
}
