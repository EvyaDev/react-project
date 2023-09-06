import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { BsTrash3 } from "react-icons/bs"
import { Link } from 'react-router-dom';
import "./Card.css"
import EditCard from './EditCard';
import { userContext } from '../../App';

export default function Card({ title, cardData }) {
    const { user } = useContext(userContext)

    function remove(itemId) {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק?')) {
            return;
        }

        fetch(`https://api.shipap.co.il/business/cards/${itemId}?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => { });
    }


    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame" >
                <Link to={`/card-single-page/${cardData.id}`}> <h2>{title}</h2></Link>
                <p>{cardData && cardData.subtitle.slice(0, 70)}...</p>

                <div className="actions" >
                    <AiOutlineHeart className='heart' />
                    {user.id === cardData.clientId && <Link to={`/editCard/${cardData.id}`}><FiEdit className='heart' /></Link>}
                    {user.id === 506 && cardData.id && <BsTrash3 onClick={() => remove(cardData.id)} className='heart' />}
                </div>

            </div>
        </div>
    )
}
