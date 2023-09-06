import React, { useEffect, useState } from 'react'
import { token } from '../../App';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import Skeleton from '@mui/material/Skeleton';

import { SlOptions } from "react-icons/sl"
export default function CardPage({ cardData }) {
    const { id } = useParams("");
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false)

    //get my cards
    useEffect(() => {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                setItem(data.filter(d => d.id == id)[0])
                setLoading(false)

            })
            .catch(err => console.log(err));

    }, [item.length])

    const { title, description, subtitle, imgUrl } = item;

    return (
        <div className='CardPage' >

            {loading ? <Loader /> :
                <>
                    <div className='frmae' style={{ backgroundImage: `linear-gradient(#ffffff00, #000), url(${imgUrl})` }}>
                        <div className='options'>
                            <SlOptions />
                        </div>
                        <div className='textHeader'>
                            <h1>{title}</h1>
                            <hr />
                            <p>{subtitle}</p>
                        </div>

                    </div>
                    <div className='content'>
                        <p>{description}</p>
                    </div> </>

            }
        </div >
    )
}
