import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { token, generalContext } from '../../App';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import "././style/Cards.css"

export default function Cards({ array, addBtnShow }) {
    const { cardChanged } = useContext(generalContext)
    const [cards, setCards] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false)

    if (!array) {
        array = cards.map(x => x.id)
    }

    function handleLike() {
        setLiked(!liked)
    }

    useEffect(() => {
        setLoading(true)

        Promise.all([

            fetch(`https://api.shipap.co.il/cards?token=${token}`, { credentials: "include" })
                .then(res => res.json())
                .catch(err => console.log(err)),

            fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, { credentials: "include" })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(res.status)
                    }
                })
                .catch(err => console.log(err))

        ]).then(data => {
            const [cards, favorite] = data;
            setLoading(false)
            setCards(cards);

            if (data[1]) {
                setFavoriteList(favorite);
            }
        })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [cardChanged])


    return (
        <div className='Cards listLayout'>

            {addBtnShow &&
                <Link to={"/addcard"}>
                    <button className='addCardBtn'> <MdOutlineAddCircleOutline /> מתכון חדש</button>
                </Link>
            }

            <section className='cardsList'>
                {(loading && !cards.length) ? <Loader color={"gray"} /> :
                    cards.length ? cards.filter(x => array.includes(x.id)).map(c => {
                        return (
                            <Card
                                isLiked={favoriteList.map(f => f.id).includes(c.id)}
                                key={c.id}
                                cardData={c}
                                onlike={handleLike}
                            />
                        )
                    })
                        :
                        <p>אין נתונים</p>
                }
            </section>
        </div>
    )
}