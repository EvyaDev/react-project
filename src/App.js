import React, { createContext, useEffect, useState } from 'react';
import Router from './Router';
import AppBar from './components/AppBar';
import Snackbar from './components/Snackbar';
import RouterAuth from './RouterAuth';
import logo from "./Asset8logo-blue.png"
import '././style/App.css';
import "./style/responsive.css"
import Footer from './components/Footer';


export const APP_NAME = "המתכונים שלי";
export const darkContext = createContext();
export const generalContext = createContext()
export const token = "3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0"

export const LOGO = ({ width }) => {
    return (
        <img alt='logo' style={{ width: width || 40 + "px", margin: "0 auto" }} src={logo}></img>
    )
};

export function checkPermission(roles, role) {
    return roles.includes(role);
}

export const RoleTypes = {
    ADMIN: "admin",
    USER: "user",
    BUSINESS: "business",
    NONE: "none",
}

export const colorsPalette = {
    BLUE: "#5bcdfc",
    RED: "#eb6e6e",
    YELLOW: "#cccc41",
    GREEN: "#7bcc7b",
}


export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [colorPalette, setColorPalette] = useState(colorsPalette.BLUE);
    const [cardChanged, setCardChanged] = useState(0);
    const [isLogged, setIsLogged] = useState();
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState(RoleTypes.NONE);
    const [isShow, setIsShow] = useState(false);
    const [snackText, setSnackText] = useState("");

    //DEFAULT COLOR THEME
    useEffect(() => {
        setColorPalette(localStorage.colorPlatte ? JSON.parse(localStorage.colorPlatte) : colorsPalette.BLUE)
    }, [colorPalette])

    //SNACKBAR
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
            .catch(err => console.log(err));
    }, [])

    //check login status every 10 minutes
    function checkLoginStatus() {
        fetch(`https://api.shipap.co.il/clients/login`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return;
                } else {
                    setUser("")
                    setIsLogged(false)
                    setUserRole(RoleTypes.NONE);
                    throw new Error("המשתמש לא מחובר");
                }
            })
            .then(() => {
                setIsLogged(true)
            })
            .catch(err => {
                console.log(err);
            })
        setTimeout(() => checkLoginStatus(), 10 * 60 * 1000);
    }

    useEffect(() => {
        checkLoginStatus()
        /* eslint-disable-next-line */
    }, [])

    return (
        <darkContext.Provider value={{ darkMode, setDarkMode }}>
            <generalContext.Provider value={{
                colorPalette, setColorPalette,
                cardChanged, setCardChanged,
                userRole, setUserRole,
                user, setUser,
                isLogged, setIsLogged,
                snackbar
            }}>
                <div className="App" style={{ "--mainColor": colorPalette }}>
                    <AppBar />
                    <div className="frame">
                        {isLogged ? <RouterAuth /> : <Router />}
                        <Footer />
                        <Snackbar show={isShow} text={snackText} />
                    </div>
                </div>
            </generalContext.Provider>
        </darkContext.Provider >
    );
}