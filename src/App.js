import React, { useEffect, useState } from 'react';
import Router from './Router';
import AppBar from './components/AppBar/AppBar';
import './App.css';

export const userContext = React.createContext("")
export const token = "3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0"

export function checkPermission(roles, role) {
    return roles.includes(role);
}
export const RoleTypes = {
    ADMIN: "admin",
    USER: "user",
    BUSINESS: "business",
    NONE: "none",
}

export default function App() {

    const [isLogged, setIsLogged] = useState();
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState(RoleTypes.NONE);

    //check login status
    useEffect(() => {
        fetch(`https://api.shipap.co.il/clients/login`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setIsLogged(true)
                setUser(data)
                setUserRole(data.admin ? RoleTypes.ADMIN : data.business ? RoleTypes.BUSINESS : RoleTypes.USER)
            })
            .catch(err => {

            });
    }, [])


    return (

        <userContext.Provider value={{ userRole, setUserRole, user, setUser, isLogged, setIsLogged }}>
            <div className="App">
                <AppBar />
                <div className="frame">
                    <Router />
                </div>
            </div>
        </userContext.Provider>
    );
}