import React, { createContext, useContext, useEffect, useState } from 'react'
import Card from './card';
import Loader from '../Loader';
import "./Card.css"
import { Link } from 'react-router-dom';
import { RoleTypes, token, userContext } from '../../App';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { searchText } from '../AppBar/AppBar';

export default function Cards() {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false);
    const { userRole } = useContext(userContext)
    const [favoriteList, setFavoriteList] = useState([])
    const [liked, setLiked] = useState(false)



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

            const [cards, favorite] = data;

            setCards(cards);
            setLoading(false)

            if (data[1]) {
                setFavoriteList(favorite);
            }

        })
            .catch(err => console.log(err))

    }, [cards.length, liked])


    return (
        <div className='Cards'>

            <h1>הכרטיסים שלי</h1>
            {
                [RoleTypes.BUSINESS, RoleTypes.ADMIN].includes(userRole) &&
                <Link to={"/addcard"}>
                    <button className='addCardBtn'> <MdOutlineAddCircleOutline /> מתכון חדש</button>
                </Link>
            }

            <section className='cardsList'>
                {
                    cards.length ? cards.map(c => {
                        return (
                            <Card
                                isLiked={favoriteList.map(f => f.id).includes(c.id)}
                                key={c.id} cardData={c}
                                title={c.title}
                                onlike={handleLike}
                            />
                        )
                    })
                        :
                        loading ?
                            <Loader color={"gray"} /> :
                            <p>אין נתונים</p>
                }
            </section>
        </div>
    )
}



