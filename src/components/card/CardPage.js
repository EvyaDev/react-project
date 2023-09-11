import React, { useContext, useEffect, useState } from 'react'
import { token, userContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { ImWhatsapp, ImPrinter } from 'react-icons/im';
import { FiEdit } from 'react-icons/fi';

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

    const { title, description, subtitle, imgUrl, clientId } = item;

    return (
        <div className='CardPage' >

            {loading ? <Loader color={"white"} /> :
                <>
                    <div className='frmae' style={{ backgroundImage: `linear-gradient(#ffffff00, #000), url(${imgUrl})` }}>

                        <div className='textHeader'>
                            <h1>{title}</h1>
                            <hr />
                            <p>{subtitle}</p>
                        </div>

                    </div>
                    <div className='content'>

                        <div className='contentHeader'>

                            <Link to={`/editCard/${id}`}>
                                <button> <FiEdit /> עריכת מתכון זה </button>
                            </Link>

                            <div className='share'>
                                <p> שיתוף:  </p>
                                <Link to={`https://api.whatsapp.com/send?text=${window.location.href}`}> <ImWhatsapp /></Link>
                                <a><ImPrinter onClick={() => window.print()} /></a>
                            </div>
                        </div>

                        <div className='contentBody'>
                            <p>{description}</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
