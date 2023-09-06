import React, { useEffect, useState } from 'react'
import Card from './card';
import Loader from '../Loader';
import "./Card.css"
import { Link } from 'react-router-dom';
import { token } from '../../App';

export default function Cards() {

    const [cards, setCards] = useState([])

    //get all cards
    useEffect(() => {

        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                setCards(data)
            })
            .catch(err => console.log(err));
    }, [cards.length])

    return (
        <div className='Cards'>

            <h1>הכרטיסים שלי</h1>
            <Link to={"/addcard"}><button className='addCardBtn'>+</button></Link>

            <section className='cardsList'>
                {cards.length ? cards.map(x => {
                    return (
                        <Card key={x.id} cardData={x} title={x.title} />
                    )
                }) : <Loader color={"gray"} />}
            </section>

        </div>
    )
}
