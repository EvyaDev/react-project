import React from 'react'
import { Route, Routes } from "react-router-dom"
import App from './App'
import ErrorPage from "./ErrorPage"
import AddCard from './components/card/addCard'
import Signup from './components/userArea/Signup'
import LoginClient from './components/userArea/LoginClient'
// import Clients from './components/userArea/Clients'
import Cards from './components/card/Cards'

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} ></Route>
            <Route path="/" element={<App />} ></Route>
            <Route path="/login" element={<LoginClient />} ></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/addCard" element={<AddCard />} ></Route>
            {/* <Route path="/clients" element={<Clients />} ></Route> */}
            <Route path="/cards" element={<Cards />} ></Route>
        </Routes>
    )
}
