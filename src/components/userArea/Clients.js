import React, { useContext, useEffect, useState } from 'react'
import { token, generalContext } from '../../App'
import { avatarImage } from '../AppBar';
import { HiMinusCircle } from 'react-icons/hi';
import "./style/clients.css"

export default function Clients() {

    const { snackbar, isLogged } = useContext(generalContext)
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

    //GET ALL CLIENTS
    useEffect(() => {
        fetch(`https://api.shipap.co.il/admin/clients?token=${token}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setClients(data)
            })
            .catch(err => console.log(err));

    }, [clients.length, isLogged])


    //DELETE CLIENT
    function removeClient(itemId) {

        if (!window.confirm("אתה בטוח שברצונך למחוק את המשתמש?")) {
            return;
        }

        fetch(`https://api.shipap.co.il/admin/clients/${itemId}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setClients([...clients.filter(clients => clients.id !== itemId)])
            })
            .catch(err => console.log(err));
    }

    //SAVE CHANGES
    function changeStaus(ev, client) {
        const status = JSON.parse(ev.target.value);
        const obj = { ...client, id: 4, business: status }

        if (!window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?")) {
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
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='Clients' >
            <div className='clientList'>
                <h1> ניהול משתמשים</h1>

                {!clients.length ? <p>אין נתונים</p> :
                    <div className='tableFrame' >
                        <table>
                            <thead>
                                <tr>
                                    <th>שם מלא</th>
                                    <th>ID</th>
                                    <th>מייל</th>
                                    <th>הרשאה</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {clients.map(c => {
                                    return (
                                        <tr key={c.id} className='clientItem'>
                                            <td>
                                                <img onError={e => { e.target.src = avatarImage }} alt={c.imgAlt} src={c.imgUrl}></img>
                                                <p> {c.firstName} {c.lastName}</p>
                                            </td>
                                            <td>  {c.id}</td>
                                            <td>  {c.email}</td>
                                            <td>
                                                <select defaultValue={c.business ? true : false} onChange={ev => changeStaus(ev, c)}>
                                                    <option value={false}>רגיל</option>
                                                    <option value={true}>עסקי</option>
                                                </select>
                                                {isShow && <button>החל</button>}
                                            </td>
                                            <td>
                                                <button className='deleteUser' title='מחק' onClick={() => removeClient(c.id)}>
                                                    <HiMinusCircle />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div >
    )
}