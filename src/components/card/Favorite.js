import React, { useContext, useEffect, useState } from 'react'
import { token, userContext } from '../../App';
import Card from './card';
import Loader from '../Loader';

export default function Favorite() {
    const [favorite, setFavorite] = useState([])
    const { isLogged } = useContext(userContext)
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false)
    const [favoriteList, setFavoriteList] = useState([])

    //get all favorite cards
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setFavorite(data)
            })
            .catch(err => console.log(err));
    }, [favorite])

    function handleLike() {
        setLiked(!liked)
    }

    return (
        <div className='Cards'>

            <h1>המועדפים שלי</h1>

            <section className='cardsList'>
                {
                    favorite.length ? favorite.map(c => {
                        return (
                            <Card
                                isLiked={true}
                                key={c.id} cardData={c}
                                title={c.title}
                                onlike={handleLike}
                            />
                        )
                    }) :
                        loading ?
                            <Loader color={"gray"} /> :
                            isLogged ?
                                <p>אין נתונים</p> :
                                <p>אינך מחובר!</p>
                }
            </section>
        </div>
    )
}
