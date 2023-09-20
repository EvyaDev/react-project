import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Card from "./Card"
import { token, userContext } from '../../App'
import "./Card.css"


export default function EditCard() {

    const Navigate = useNavigate()
    const { snackbar } = useContext(userContext)
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        subtitle: "",
        imgUrl: "",
        imgAlt: "",
        web: "",
        description: "",
    })

    //get my cards
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards?token=${token}`)
            .then(res => res.json())
            .then(data => {
                setItem(data.filter(d => d.id == id)[0])
            })
            .catch(err => console.log(err));

        if (item.id) {
            setFormData({
                ...formData,
                id: item.id,
                title: item.title,
                subtitle: item.subtitle || "",
                imgUrl: item.imgUrl,
                imgAlt: item.imgAlt,
                web: item.web,
                description: item.description,
            })
        }
    }, [item.length])

    function handleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })
    }

    function save(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/business/cards/${id}?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(() => {
                snackbar("השינויים נשמרו בהצלחה!")
                Navigate(-1);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="editCard">

            <div className="form">
                <form onSubmit={save}>
                    <h2>עריכת מתכון </h2>

                    <label>כותרת</label>
                    <input type="text" id="title" defaultValue={formData.title} placeholder="כותרת" onChange={handleInput}></input>

                    <label>כותרת משנה</label>
                    <input type="text" id="subtitle" value={formData.subtitle} placeholder="כותרת משנה" onChange={handleInput}></input>

                    <label>תמונה</label>
                    <input type="text" id="imgUrl" value={formData.imgUrl} placeholder="תמונה" onChange={handleInput}></input>

                    <label>alt</label>
                    <input type="text" id="imgAlt" value={formData.imgAlt} placeholder="alt image" onChange={handleInput}></input>

                    <label>קישור חיצוני</label>
                    <input type="text" id="web" value={formData.web} placeholder="URL" onChange={handleInput}></input>

                    <label> תוכן</label>
                    <textarea id="description" value={formData.description} lang="1000" rows={10} onChange={handleInput}></textarea>

                    <button>שמור שינויים</button>
                </form>
            </div>
            <div className="display" >

                <p>תצוגה מקדימה</p>
                <Card title={formData.title} cardData={formData} />
            </div>
        </div>
    )
}