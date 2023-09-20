import React, { useContext } from 'react'
import Cards from './cards/Cards'
import Snackbar from './Snackbar'
import { userContext } from '../App'


export default function Home({ ch }) {
    return (
        <>
            <h1>כל הכרטיסים </h1>
            <Cards />
        </>
    )
}