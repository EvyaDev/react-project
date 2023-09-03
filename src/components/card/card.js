import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import "./Card.css"

export default function Card({ title, cardData }) {

    return (
        <div className="Card" style={{ backgroundImage: `url(${cardData && cardData.imgUrl})` }}>

            <div className="cardFrame" >
                <h2>{title}</h2>
                <p>{cardData && cardData.subtitle.slice(0, 30)}...</p>
                <div className="actions">
                    <AiOutlineHeart className='heart' />
                </div>
            </div>
        </div>
    )
}
