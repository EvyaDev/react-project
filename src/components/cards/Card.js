import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { BsTrash3 } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { RoleTypes, token, userContext } from '../../App';
import "././style/Card.css"
import Loader from '../Loader';


export default function Card({ cardData, isLiked, onlike }) {

    const { isLogged, snackbar, userRole, user } = useContext(userContext)
    const [loading, setLoading] = useState(false);

    //remove card
    function remove(itemId) {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            snackbar("המחיקה התבטלה!")
            return;
        }
        fetch(`https://api.shipap.co.il/admin/cards/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                snackbar("הכרטיס נמחק בהצלחה!")
            })
            .catch(err => console.log(err))
    }


    function likeCard(cardId) {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards/${cardId}/favorite?token=${token}`, {
            method: "PUT",
            credentials: "include",
        })
            .then(() => {
                setLoading(false)
                onlike();

                snackbar(isLogged ? " התווסף למועדפים!" : "התחבר כדי להוסיף")
            })
            .catch(err => console.log(err))
    }


    function disLikeCard(cardId) {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards/${cardId}/unfavorite?token=${token}`, {
            method: "PUT",
            credentials: "include",
        })
            .then(() => {
                setLoading(false)
                onlike();
                snackbar(`הוסר מהמועדפים!`)
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame" >
                <Link to={`/card-single-page/${cardData.id}`}> <h2>{cardData.title}</h2></Link>
                <p>{cardData && cardData.subtitle}</p>

                <div className="actions" >

                    {/* UN/LIKE btn */}
                    {isLiked ?
                        loading ? <Loader width={20} color={"white"} secondaryColor={"silver"} /> : <a> <AiFillHeart onClick={() => disLikeCard(cardData.id)} className='heart' /></a> :
                        loading ? <Loader width={20} color={"white"} secondaryColor={"silver"} /> : <a><AiOutlineHeart onClick={() => likeCard(cardData.id)} className='heart' /></a>
                    }

                    {/* EDIT btn */}
                    {((userRole === RoleTypes.ADMIN && cardData.clientId === 0) || user.id === cardData.clientId) &&
                        <Link to={`/editCard/${cardData.id}`}><FiEdit className='edit' /></Link>}

                    {/* DELETE btn */}
                    {(userRole === RoleTypes.ADMIN || user.id === cardData.clientId) &&
                        <a><BsTrash3 onClick={() => remove(cardData.id)} className='trash' /></a>}
                </div>
            </div>
        </div >
    )
}