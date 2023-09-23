import React, { useContext, useEffect, useState } from 'react'
import { token, userContext } from '../../App';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import "././style/Favorite.css"

export default function Favorite() {
    const [favoriteList, setFavoriteList] = useState([])
    const { isLogged } = useContext(userContext)
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false)

    //get all favorite cards
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setFavoriteList(data)
            })
            .catch(err => console.log(err))
    }, [favoriteList])

    function handleLike() {
        setLiked(!liked)
    }


    return (
        <div className='Cards Favorite'>

            <h1>המועדפים שלי</h1>

            {

                favoriteList.length ?
                    <Cards array={favoriteList.map(x => x.id)} /> :

                    <div className='errorFavorite'>
                        <AiOutlineInfoCircle />
                        <p>
                            {isLogged && !favoriteList.length ? "לא שמרת עדיין כרטיסים ברשימת המועדפים" :
                                <>
                                    <span> "אינך מחובר!"</span>
                                    <Link to={"/login"}> <button className='loginBtn'> התחבר</button></Link>
                                </>
                            }
                        </p>
                    </div>
            }

        </div >
    )
}
