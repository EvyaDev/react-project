import React, { createContext, useContext, useEffect, useState } from 'react'
import Card from './Card';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { RoleTypes, token, userContext } from '../../App';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import "././style/Cards.css"

export default function Cards({ array, addBtnShow }) {
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
            fetch(`https://api.shipap.co.il/cards?token=${token}`).then(res => res.json()),
            fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, { credentials: "include" })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })

        ]).then(data => {
            setLoading(false)
            const [cards, favorite] = data;

            setCards(cards);

            if (data[1]) {
                setFavoriteList(favorite);
            }
        })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [cards.length, liked])


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



