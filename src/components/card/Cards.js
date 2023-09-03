import React, { useEffect, useState } from 'react'
import Card from './card';
import Loader from '../Loader';
import "./Card.css"

export default function Cards() {

    const [cards, setCards] = useState([])

    //get all cards
    useEffect(() => {

        fetch(`https://api.shipap.co.il/cards?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`)
            .then(res => res.json())
            .then(data => {
                setCards(data)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <div className='Cards'>
            <h1>הכרטיסים שלי</h1>
            <button className='addCard'>+</button>
            <section className='cards'>
                {cards.length ? cards.map(x => {
                    return (
                        <Card key={x.id} cardData={x} title={x.title} />
                    )
                }) : <Loader color={"gray"} />}
            </section>
            <section className='cards'>

                {cards.map(x => {
                    return (
                        <Card key={x.id} cardData={x} title={x.title} />
                    )
                })}
            </section>
        </div>
    )
}
