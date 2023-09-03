import React from 'react'
import { Route, Routes } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import AddCard from './components/card/addCard'
import Signup from './components/userArea/Signup'
import Login from './components/userArea/Login'
import Cards from './components/card/Cards'
import Home from './components/Home'
import Logout from './components/userArea/Logout'

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addCard" element={<AddCard />} />
            <Route path="/cards" element={<Cards />} />
        </Routes>
    )
}
