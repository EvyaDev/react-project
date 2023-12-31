import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { RoleTypes, token, generalContext } from '../../App';
import { HiMinusCircle } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import "./style/CardsList.css"


export default function CardsList() {

    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const { snackbar, userRole } = useContext(generalContext)

    //get all cards
    useEffect(() => {
        setLoading(true);
        const isAdmin = userRole === RoleTypes.ADMIN;
        fetch(`https://api.shipap.co.il/${isAdmin ? "" : "business/"}cards?token=${token}`, {
            credentials: "include"
        })

            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
        console.log(cards);
    }, [cards.length])

    //REMOVE CARD
    function remove(itemId) {
        if (!window.confirm("אתה בטוח שברצונך למחוק את המתכון הזה?")) {
            snackbar("המחיקה התבטלה!");
            return;
        }

        fetch(`https://api.shipap.co.il/business/cards/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                snackbar("המתכון נמחק בהצלחה!");
                setCards([...cards.filter(c => c.id !== itemId)])
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='CardsList'>

            <h1> ניהול מתכונים</h1>
            <Link to={"/addcard"}>
                <button className='addCardBtn'> <MdOutlineAddCircleOutline /> מתכון חדש</button>
            </Link>

            {!cards.length ? <p>אין נתונים</p> :
                <div className='tableFrame'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                {userRole === RoleTypes.ADMIN && <th>מזהה משתמש</th>}
                                <th>כותרת</th>
                                <th>תמונה</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {cards.length ? (
                                cards.map((c, i) => (
                                    <tr key={c.id}>
                                        <td> <p>{i + 1}</p> </td>
                                        <td> <p>{c.id}</p> </td>
                                        {userRole === RoleTypes.ADMIN && <td> <p>#{c.clientId}</p> </td>}
                                        <td> <p>{c.title}</p> </td>
                                        <td> <img alt={c.imgAlt} src={c.imgUrl}></img> </td>
                                        <td>
                                            <div className='actions'>
                                                <HiMinusCircle className='remove' onClick={() => remove(c.id)} />
                                                {(userRole === RoleTypes.BUSINESS || c.clientId === 0) && <Link to={`/editCard/${c.id}`}><FiEdit /></Link>}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: "center", display: "table-cell" }}>
                                        {loading ? <Loader width={30} /> : "אין נתונים"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}