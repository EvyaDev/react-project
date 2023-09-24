import React from 'react'
import { Route, Routes } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import AddCard from './components/cards/AddCard'
import Signup from './components/userArea/Signup'
import Login from './components/userArea/Login'
import Cards from './components/cards/Cards'
import Home from './components/Home'
import Logout from './components/userArea/Logout'
import EditCard from './components/cards/EditCard'
import CardPage from './components/cards/CardPage'
import CardList from './components/cards/CardList'
import Clients from './components/userArea/Clients'
import EditUser from './components/userArea/EditUser'
import Favorite from './components/cards/Favorite'
import MyCards from './components/cards/MyCards'
import SearchPage from './SearchPage'
import About from './About'

export default function RouterAuth() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addCard" element={<AddCard />} />
            <Route path="/editCard/:id" element={<EditCard />} />
            <Route path="/cards" element={<MyCards />} />
            <Route path="/my-favorite" element={<Favorite />} />
            <Route path="/card-single-page/:id" element={<CardPage />} />
            <Route path="/cardlist" element={<CardList />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/search-page/:query?" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}