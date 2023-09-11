import React from 'react'
import { Route, Routes } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import AddCard from './components/card/AddCard'
import Signup from './components/userArea/Signup'
import Login from './components/userArea/Login'
import Cards from './components/card/Cards'
import Home from './components/Home'
import Logout from './components/userArea/Logout'
import EditCard from './components/card/EditCard'
import CardPage from './components/card/CardPage'
import CardList from './components/card/CardList'
import Clients from './components/userArea/clients/Clients'
import EditUser from './components/userArea/EditUser'
import Favorite from './components/card/Favorite'

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addCard" element={<AddCard />} />
            <Route path="/editCard/:id" element={<EditCard />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/my-favorite" element={<Favorite />} />
            <Route path="/card-single-page/:id" element={<CardPage />} />
            <Route path="/cardlist" element={<CardList />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/editUser" element={<EditUser />} />
        </Routes>
    )
}
