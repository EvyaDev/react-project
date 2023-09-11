import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { BsTrash3 } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { RoleTypes, token, userContext } from '../../App';
import "./Card.css"


export default function Card({ title, cardData }) {

    const { userRole, user, permission, isLogged } = useContext(userContext)
    const [favoriteList, setFavoriteList] = useState([])
    const [like, setLike] = useState()


    function remove(itemId) {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            return;
        }
        fetch(`https://api.shipap.co.il/admin/cards/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {

            });
    }

    useEffect(() => {

        fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setFavoriteList(data.map(x => x.id))
                if (favoriteList.includes(cardData.id)) {
                    setLike(true)
                } else {
                    setLike(false)
                }

            })
            .catch(err => console.log(err));
    }, [like])


    function likeCard(cardId) {

        if (!isLogged) {

            //get likes array from local storage
            const getLocalLikes = localStorage.getItem("cardLike");

            //format PARSE localStorage array
            const parseLikes = getLocalLikes ? JSON.parse(getLocalLikes) : [];

            parseLikes.push(cardId);

            //save to local storage in STRINGIFY format
            localStorage.setItem("cardLike", JSON.stringify(parseLikes))
            setLike(true)

        } else {
            fetch(`https://api.shipap.co.il/cards/${cardId}/favorite?token=${token}`, {
                method: "PUT",
                credentials: "include",
            })
                .then(() => {
                    setLike(true)
                })
        }


    }

    function unlikeCard(cardId) {


        if (!isLogged) {

            //get likes array from local storage
            const getLocalLikes = localStorage.getItem("cardLike");

            //format PARSE localStorage array
            const parseLikes = getLocalLikes ? JSON.parse(getLocalLikes) : [];

            // parseLikes.filter(x => x != cardId);
            // console.log(parseLikes);

            //save to local storage in STRINGIFY format
            localStorage.setItem("cardLike", JSON.stringify(parseLikes))
            setLike(false)

        } else {

            fetch(`https://api.shipap.co.il/cards/${cardId}/unfavorite?token=${token}`, {
                method: "PUT",
                credentials: "include",
            })
                .then(() => {
                    setLike(false)
                })
        }
    }


    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame" >
                <Link to={`/card-single-page/${cardData.id}`}> <h2>{title}</h2></Link>
                <p>{cardData && cardData.subtitle}</p>

                <div className="actions" >

                    {/* UN/LIKE btn */}
                    {like ?
                        <AiFillHeart onClick={() => unlikeCard(cardData.id)} className='heart' /> :
                        <AiOutlineHeart onClick={() => likeCard(cardData.id)} className='heart' />
                    }

                    {/* EDIT btn */}
                    {((userRole === RoleTypes.ADMIN && cardData.clientId === 0) || user.id === cardData.clientId) &&
                        <Link to={`/editCard/${cardData.id}`}><FiEdit className='edit' /></Link>}

                    {/* DELETE btn */}
                    {(userRole === RoleTypes.ADMIN || user.id === cardData.clientId) &&
                        <BsTrash3 onClick={() => remove(cardData.id)} className='heart' />}
                </div>
            </div>
        </div>
    )
}
