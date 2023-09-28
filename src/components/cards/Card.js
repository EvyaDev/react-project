import React, { useContext, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { BsTrash3 } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { RoleTypes, token, generalContext } from '../../App';
import "././style/Card.css"
import Loader from '../Loader';


export default function Card({ cardData, isLiked, onlike }) {
    const { cardChanged, setCardChanged, isLogged, snackbar, userRole, user } = useContext(generalContext)
    const [loading, setLoading] = useState(false);

    //remove card
    function remove(itemId) {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            snackbar("המחיקה התבטלה!")
            return;
        }

        fetch(`https://api.shipap.co.il/${userRole === RoleTypes.ADMIN ? "admin" : "business"}/cards/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    snackbar("הכרטיס נמחק בהצלחה!")
                } else {
                    snackbar("המחיקה התבטלה!")
                    throw new Error("error on delete");
                }
            })
            .then(() => setCardChanged(cardChanged + 1))
            .catch(err => console.log(err))
    }


    function likeCard(cardId) {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards/${cardId}/favorite?token=${token}`, {
            method: "PUT",
            credentials: "include",
        })
            .then(() => {
                onlike();
                snackbar(isLogged ? " התווסף למועדפים!" : " התחבר כדי להוסיף למועדפים!")
                setLoading(false)
                setCardChanged(cardChanged + 1)
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
                setCardChanged(cardChanged - 1)
                snackbar(`הוסר מהמועדפים!`)
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame">
                <Link to={`/card-single-page/${cardData.id}`}> <h2>{cardData.title}</h2></Link>
                <p>{cardData && cardData.subtitle}</p>
                <div className="actions" >

                    {/* UN/LIKE btn */}
                    {isLiked ?
                        loading ? <Loader width={20} color={"white"} secondaryColor={"silver"} /> : <button ><AiFillHeart onClick={() => disLikeCard(cardData.id)} /></button> :
                        loading ? <Loader width={20} color={"white"} secondaryColor={"silver"} /> : <button ><AiOutlineHeart onClick={() => likeCard(cardData.id)} /></button>
                    }

                    {/* EDIT btn */}
                    {(((user.id === cardData.clientId && userRole === RoleTypes.BUSINESS) || (userRole === RoleTypes.ADMIN && cardData.clientId === 0)) && isLogged) &&
                        <Link to={`/editCard/${cardData.id}`}><FiEdit /></Link>}

                    {/* DELETE btn */}
                    {(((user.id === cardData.clientId && userRole === RoleTypes.BUSINESS) || userRole === RoleTypes.ADMIN) && isLogged) &&
                        <button ><BsTrash3 onClick={() => remove(cardData.id)} /></button>}
                </div>
            </div>
        </div>
    )
}