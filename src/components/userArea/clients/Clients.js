import React, { useContext, useEffect, useState } from 'react'
import { RoleTypes, token, userContext } from '../../../App'
import { avatarImage } from '../../AppBar/AppBar';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import "./clients.css"

export default function Clients() {

    const { snackbar, isLogged } = useContext(userContext)
    const [clients, setClients] = useState([])
    const [isShow, setIsShow] = useState(false)

    const Arr = [
        { id: "firstName", type: "text", label: "שם פרטי", placeholder: "שם פרטי" },
        { id: "middleName", type: "text", label: "שם אמצעי", placeholder: "שם אמצעי" },
        { id: "lastName", type: "text", label: "שם משפחה", placeholder: "שם משפחה" },
        { id: "phone", type: "tel", label: "טלפון", placeholder: "טלפון" },
        { id: "email", type: "text", label: "אימייל", placeholder: "אימייל" },
        { id: "password", type: "text", label: "סיסמה", placeholder: "סיסמה" },
        { id: "imgUrl", type: "text", label: "תמונה", placeholder: "תמונה" },
        { id: "imgAlt", type: "text", label: "imgAlt", placeholder: "imgAlt" },
        { id: "state", type: "text", label: "מחוז", placeholder: "מחוז" },
        { id: "country", type: "text", label: "מדינה", placeholder: "מדינה" },
        { id: "city", type: "text", label: "עיר", placeholder: "עיר" },
        { id: "street", type: "text", label: "רחוב", placeholder: "רחוב" },
        { id: "houseNumber", type: "number", label: "בית", placeholder: "בית" },
        { id: "zip", type: "number", label: "מיקוד", placeholder: "מיקוד" },
        { id: "business", type: "checkbox", label: " לקוח עסקי? ", },
    ]

    //get all clients
    useEffect(() => {
        fetch(`https://api.shipap.co.il/admin/clients?token=${token}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setClients(data)
            })
            .catch(err => console.log("error is: ", err));

    }, [clients.length, isLogged])


    //remove client
    function removeClient(itemId) {
        if (!window.confirm("Are you sure you want to remove?")) {
            return;
        }

        fetch(`https://api.shipap.co.il/admin/clients/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setClients([...clients.filter(clients => clients.id !== itemId)])
            });
    }

    //change premission status of client
    function changeStaus(ev, client) {
        const status = JSON.parse(ev.target.value);
        const obj = { ...client, id: 4, business: status }

        if (!window.confirm("Are you sure you want to change this?")) {
            return;
        }

        fetch(`https://api.shipap.co.il/admin/clients/${client.id}?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj),
        })
            .then(() => {
                snackbar(`ההרשאות השתנו למשתמש ${status ? "עסקי" : "רגיל"}`)
            });
    }

    return (
        <div className='Clients' >
            <div className='clientList'>
                <h1> ניהול משתמשים</h1>
                {!clients.length ? <p>אין נתונים</p> : <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>שם פרטי</th>
                            <th>שם משפחה</th>
                            <th>מייל</th>
                            <th>הרשאה</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {clients.map(c => {
                            return (
                                <tr key={c.id} className='clientItem'>
                                    <td><img onError={e => { e.target.src = avatarImage }} alt={c.imgAlt} src={c.imgUrl}></img></td>
                                    <td>  {c.id}</td>
                                    <td>  {c.firstName}</td>
                                    <td>  {c.lastName}</td>
                                    <td>  {c.email}</td>
                                    <td>
                                        <select defaultValue={c.business ? true : false} onChange={ev => changeStaus(ev, c)}>
                                            <option value={false}>רגיל</option>
                                            <option value={true}>עסקי</option>
                                        </select>
                                        {isShow && <button>החל</button>}
                                    </td>
                                    <td>
                                        <ul>
                                            <li title='מחק' onClick={() => removeClient(c.id)}>
                                                <FaTrash />
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>

        </div>
    )
}