import React, { createContext, useEffect, useState } from 'react';
import Router from './Router';
import AppBar from './components/AppBar';
import Snackbar from './components/Snackbar';
import RouterAuth from './RouterAuth';
import '././style/App.css';

export const userContext = createContext()
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
    const [countFavorite, setCountFavorite] = useState(0);
    const [isLogged, setIsLogged] = useState();
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState(RoleTypes.NONE);
    const [isShow, setIsShow] = useState(false);
    const [snackText, setSnackText] = useState("");

    const snackbar = (text) => {
        setIsShow(true)
        setSnackText(text)

        setTimeout(() => {
            setIsShow(false)
        }, 3 * 1000)

    }

    //check login status first time
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
                console.log(err);
            });
    }, [])


    //check login status every 10 minutes
    useEffect(() => {
        setInterval(() => {
            fetch(`https://api.shipap.co.il/clients/login`, {
                credentials: 'include',
            })
                .then(res => {
                    if (res.ok) {
                        return;
                    } else {
                        setIsLogged(false)
                        setUser("")
                        setUserRole(RoleTypes.NONE);
                        throw new Error("המשתמש לא מחובר");
                    }
                })
                .then(() => {
                    console.log("מחובר");
                    setIsLogged(true)
                })
                .catch(err => console.log(err))

        }, 10 * 60 * 1000)
    }, [])

    return (

        <userContext.Provider value={{ countFavorite, setCountFavorite, snackbar, userRole, setUserRole, user, setUser, isLogged, setIsLogged }}>
            <div className="App">
                <AppBar />
                <div className="frame">
                    {isLogged ? <RouterAuth /> : <Router />}
                    <Snackbar show={isShow} text={snackText} />
                </div>
            </div>
        </userContext.Provider>
    );
}