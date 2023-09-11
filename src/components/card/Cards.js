import React, { useContext, useEffect, useState } from 'react'
import Card from './card';
import Loader from '../Loader';
import "./Card.css"
import { Link } from 'react-router-dom';
import { token, userContext } from '../../App';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

export default function Cards() {

    const [cards, setCards] = useState([])
    const { isLogged } = useContext(userContext)
    const [loading, setLoading] = useState(false);

    //get all cards
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                setCards(data)
                setLoading(false)
            })
            .catch(err => console.log(err));

    }, [cards.length])

    return (
        <div className='Cards'>

            <h1>הכרטיסים שלי</h1>
            {isLogged && <Link to={"/addcard/"}> <button className='addCardBtn'> <MdOutlineAddCircleOutline />   מתכון חדש</button> </Link>}

            <section className='cardsList'>
                {cards.length ? cards.map(c => {
                    return (
                        <Card key={c.id} cardData={c} title={c.title} />
                    )
                }) : loading ? <Loader color={"gray"} /> : <p>אין נתונים</p>}
            </section>

        </div>
    )
}



