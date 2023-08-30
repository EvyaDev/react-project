import React, { useEffect, useState } from 'react'
import "./RecipesCard.css"
export default function Cards({ title }) {

    const [cards, setCards] = useState([])

    useEffect(() => {

        fetch(`https://api.shipap.co.il/cards?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`)
            .then(res => res.json())
            .then(data => {
                setCards(data)
            });
    }, [])

    return (
        <div>
            {cards.map(c => {
                return (
                    <p key={c.id}>
                        {c.title}
                    </p>
                )
            })}
        </div>
    )
}
