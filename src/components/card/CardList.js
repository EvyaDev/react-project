import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { token, userContext } from '../../App';
import { BsTrash3 } from 'react-icons/bs';
import "../adminArea/admin.css"

export default function Cards() {

    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(userContext)

    //get all cards
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.shipap.co.il/cards?token=${token}`)
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
        fetch(`https://api.shipap.co.il/business/cards/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setCards([...cards.filter(c => c.id != itemId)])
            });
    }
    return (
        <div className='CardsList'>

            <h1> ניהול מתכונים</h1>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>מזהה משתמש</th>
                        <th>כותרת</th>
                        <th>כותרת משנה</th>
                        <th>תוכן</th>
                        <th>תמונה</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {!cards.length ? <td colSpan={8} style={{ textAlign: "center", display: "table-cell" }}> {loading ? <Loader width={30} /> : "אין נתונים"}</td> :
                        cards.filter(x => x.clientId === user.id).map((c, i) => {
                            return (
                                <tr key={c.id}>
                                    <td> <p>{i + 1}</p> </td>
                                    <td> <p>{c.id}</p> </td>
                                    <td> <p>#{c.clientId}</p> </td>
                                    <td> <p>{c.title}</p> </td>
                                    <td> <p>{c.subtitle.slice(0, 30)}...</p> </td>
                                    <td> <p>{c.description.slice(0, 50)}...</p> </td>
                                    <td> <p>{c.imgUrl.slice(0, 50)}...</p> </td>
                                    <td> <BsTrash3 onClick={() => remove(c.id)} /> </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>


        </div>
    )
}