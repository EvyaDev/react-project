import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { RoleTypes, token, userContext } from '../../App';
import { BsTrash3 } from 'react-icons/bs';
import "../../components/userArea/admin.css"
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';


export default function CardsList() {

    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const { snackbar, userRole } = useContext(userContext)

    //get all cards
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setCards(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [cards.length])

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
                setCards([...cards.filter(c => c.id != itemId)])
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='CardsList'>

            <h1> ניהול מתכונים</h1>
            <Link to={"/addcard"}>
                <button className='addCardBtn'> <MdOutlineAddCircleOutline /> מתכון חדש</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        {userRole === RoleTypes.ADMIN && <th>מזהה משתמש</th>}
                        <th>כותרת</th>
                        <th>כותרת משנה</th>
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
                                <td> <p>{c.subtitle.slice(0, 30)}...</p> </td>
                                <td> <p>{c.imgUrl.slice(0, 50)}...</p> </td>
                                <td className='actions'>
                                    <BsTrash3 onClick={() => remove(c.id)} />
                                    <Link to={`/editCard/${c.id}`}><FiEdit /></Link>
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
    )
}
