import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { BsTrash3 } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import "./Card.css"
import { SlOptions } from 'react-icons/sl';

export default function Card({ title, cardData }) {
    const { user, permission } = useContext(userContext)
    console.log(permission);

    function remove(itemId) {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            return;
        }
        fetch(`https://api.shipap.co.il/admin/cards/${itemId}?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {

            });
    }


    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame" >
                <Link to={`/card-single-page/${cardData.id}`}> <h2>{title}</h2></Link>
                <p>{cardData && cardData.subtitle}</p>
                <div className='options'>
                    <SlOptions />
                </div>
                <div className="actions" >
                    <AiOutlineHeart className='heart' />

                    {((permission === 3 && cardData.clientId === 0) || user.id === cardData.clientId) &&
                        <Link to={`/editCard/${cardData.id}`}><FiEdit className='heart' /></Link>}

                    {(permission === 3 || user.id === cardData.clientId) &&
                        <BsTrash3 onClick={() => remove(cardData.id)} className='heart' />}
                </div>

            </div>
        </div>
    )
}
