import React, { useEffect, useState } from 'react'
import Cards from './components/cards/Cards'
import { useParams } from 'react-router-dom'
import { token } from './App'
import { MagnifyingGlass } from 'react-loader-spinner'
import "././style/SearchPage.css"

export default function SearchPage() {
    const { query } = useParams()
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                setCards(data.filter(card => card.title.includes(query)));
                setLoading(false)
            })
            .catch(err => console.log(err))

    }, [query])


    return (
        <div className='SearchPage'>
            <h1>תוצאות חיפוש עבור "<b>{query}</b>": </h1>

            {cards.length ? <Cards array={cards.map(c => c.id)} /> :

                loading ? <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor='#c0efff'
                    color='#e15b64'
                />
                    : <p> לא נמצאו תוצאות שמתאימות לערך <b>"{query}"</b></p>
            }


        </div>
    )
}