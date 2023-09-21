import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { token } from '../../App';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default function MyCards() {
    const [myCardsList, setMyCardsList] = useState([])
    const [loading, setLoading] = useState(false);

    //get all my cards
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setMyCardsList(data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

    }, [])

    return (
        <div className='MyCards'>
            <h1>הכרטיסים שלי</h1>

            {loading ? <Loader /> :
                !myCardsList.length ?
                    <div className='emptyMyCards'>
                        <p>עדיין לא יצרת מתכון, ליצירת מתכון חדש</p>
                        <Link to={'/addcard'}> לחץ כאן</Link>
                    </div>
                    :
                    <Cards addBtnShow={true} array={myCardsList.map(x => x.id)} />
            }
        </div>
    )
}
