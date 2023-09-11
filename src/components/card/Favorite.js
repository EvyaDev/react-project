import React, { useContext, useEffect, useState } from 'react'
import { token, userContext } from '../../App';
import { Link } from 'react-router-dom';
import Card from './card';
import Loader from '../Loader';


export default function Favorite() {
    const [cards, setCards] = useState([])
    const { isLogged } = useContext(userContext)
    const [loading, setLoading] = useState(false);

    //get all cards
    useEffect(() => {
        // if (!isLogged) {
        //     const list = localStorage.getItem("cardLike")
        //     fetch(`https://api.shipap.co.il/cards?token=${token}`)
        //         .then(res => res.json())
        //         .then(data => {
        //             setCards(data.filter(x => list.includes(x.id)))
        //         })

        // } else {
        fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {

            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setCards(data)
            })
            .catch(err => console.log(err));
        // }
    }, [cards])

    return (

        <div className='Cards'>

            <h1>המועדפים שלי</h1>
            <section className='cardsList'>
                {cards.length ? cards.map(c => {
                    return (
                        <Card key={c.id} cardData={c} title={c.title} />
                    )
                }) : loading ?
                    <Loader color={"gray"} /> :
                    <p>{isLogged ? "לא שמרת כלום כאן עדיין" : "אינך מחובר, התחבר על מנת לצפות בכרטיסיות המועדפות שלך"}</p>
                }
            </section>

        </div>

    )

}
