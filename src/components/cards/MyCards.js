import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { token } from '../../App';

export default function MyCards() {
    const [myCardsList, setMyCardsList] = useState([])

    useEffect(() => {
        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setMyCardsList(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <h1>הכרטיסים שלי</h1>
            <Cards addBtnShow={true} array={myCardsList.map(x => x.id)} />
        </div>
    )
}
