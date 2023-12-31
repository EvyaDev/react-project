import React, { useContext, useEffect, useState } from 'react'
import { RoleTypes, token, generalContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { ImWhatsapp, ImPrinter } from 'react-icons/im';
import { FiEdit } from 'react-icons/fi';
import "./style/SinglePageCard.css"

export default function CardPage() {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { userRole, user } = useContext(generalContext)

    //GET MY CARDS
    useEffect(() => {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if (data.map(d => d.id).includes(+id)) {
                    setItem(data.filter(d => d.id === +id)[0])
                } else {
                    Navigate("/errorPage")
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [item.length, Navigate, id])

    const { title, description, subtitle, imgUrl } = item;

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
                            {
                                ((userRole === RoleTypes.ADMIN && item.clientId === 0) || user.id === item.clientId) &&
                                <Link to={`/editCard/${id}`}>
                                    <button> <FiEdit /> עריכת מתכון זה </button>
                                </Link>
                            }
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
        </div >
    )
}
