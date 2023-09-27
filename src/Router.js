import React from 'react'
import { Route, Routes } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Signup from './components/userArea/Signup'
import Login from './components/userArea/Login'
import Home from './components/Home'
import Logout from './components/userArea/Logout'
import CardPage from './components/cards/CardPage'
import SearchPage from './SearchPage'
import Favorite from './components/cards/Favorite'
import About from './About'

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/my-favorite" element={<Favorite />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/card-single-page/:id" element={<CardPage />} />
            <Route path="/search-page/:query?" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}