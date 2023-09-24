import React, { useContext, useEffect, useState } from 'react'
import { token, userContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { avatarImage } from '../AppBar'
import "./style/EditUser.css"

export default function EditUser() {
    const { isLogged, user, setUser } = useContext(userContext)
    const [formData, setFormData] = useState({})
    const Navigate = useNavigate()

    useEffect(() => {
        setFormData({
            ...user
        })
    }, [])

    const structure = [
        { id: "firstName", type: "text", label: "שם פרטי" },
        { id: "middleName", type: "text", label: "שם אמצעי" },
        { id: "lastName", type: "text", label: "שם משפחה" },
        { id: "phone", type: "tel", label: "טלפון" },
        { id: "email", type: "text", label: "אימייל" },
        { id: "imgUrl", type: "text", label: "תמונה" },
        { id: "imgAlt", type: "text", label: "imgAlt" },
        { id: "state", type: "text", label: "מחוז" },
        { id: "country", type: "text", label: "מדינה" },
        { id: "city", type: "text", label: "עיר" },
        { id: "street", type: "text", label: "רחוב" },
        { id: "houseNumber", type: "number", label: "בית" },
        { id: "zip", type: "number", label: "מיקוד" },
    ]


    function handleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })
    }


    //UPDATE function
    function update(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/clients/update?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(() => {
                setUser(formData)
                Navigate(-1)
            });
    }


    return (
        <div className='EditUser'>
            <div>
                <div className='head'>
                    <img onError={() => setFormData({ ...user, imgUrl: avatarImage })}
                        src={formData.imgUrl}></img>
                    <h3>{user.fullName}</h3>
                </div>

                <div>
                    <form onSubmit={update}>
                        {structure
                            // .filter(x => formData[x.id])
                            .map((s, i) => {
                                return (
                                    <div className='inputField' key={s.id}>
                                        <label>{s.label}</label>
                                        <input
                                            id={s.id}
                                            type={s.type}
                                            defaultValue={formData[s.id]}
                                            onChange={handleInput}
                                        >
                                        </input>
                                    </div>
                                )
                            })}
                        <button >עדכן</button>

                    </form>
                </div>
            </div>

        </div>
    )
}