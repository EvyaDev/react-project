import Cards from './Cards';
import React, { useContext, useEffect, useState } from 'react'
import { token, generalContext } from '../../App';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "././style/Favorite.css"


export default function Favorite() {

    const [favoriteList, setFavoriteList] = useState([]);
    const { cardChanged, isLogged } = useContext(generalContext);

    //get all favorite cards
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {
            credentials: "include",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.status)
                }
            })
            .then(data => {
                setFavoriteList(data)
            })
            .catch(err => console.log(err))
    }, [cardChanged])


    return (
        <div className='Cards Favorite'>
            <h1>המועדפים שלי</h1>
            {
                favoriteList.length ?
                    <section className='cardsList'>

                        <Cards array={favoriteList.map(x => x.id)} />
                    </section>
                    :
                    <div className='errorFavorite'>
                        <AiOutlineInfoCircle />
                        <p>
                            {isLogged && !favoriteList.length ? "לא שמרת עדיין כרטיסים ברשימת המועדפים" :
                                <>
                                    <span>  אינך מחובר, על מנת לצפות ברשימת הכרטיסים המועדפים שלך יש להתחבר תחילה!</span>
                                    <Link to={"/login"}> <button className='loginBtn'> התחבר</button></Link>
                                </>
                            }
                        </p>
                    </div>
            }
        </div >
    )
}