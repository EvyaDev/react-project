import { useState } from "react"
import "./Card.css"
import { useNavigate } from "react-router-dom";

export default function AddCard() {

    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "subtitle": "",
        "phone": "",
        "email": "",
        "web": "",
        "imgUrl": "",
        "imgAlt": "",
        "state": "",
        "country": "",
        "city": "",
        "street": "",
        "houseNumber": "",
        "zip": ""
    })


    function handleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })
    }


    function addNew(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/business/cards?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(data => {
                Navigate("/");
            });
    }

    return (
        <form onSubmit={addNew}>
            <input type="text" id="title" placeholder="כותרת" onChange={handleInput}></input>
            <input type="text" id="subtitle" placeholder="כותרת משנה" onChange={handleInput}></input>
            <input type="text" id="description" placeholder="תיאור" onChange={handleInput}></input>
            <input type="tel" id="phone" placeholder="טלפון" onChange={handleInput}></input>
            <input type="email" id="email" placeholder="אימייל" onChange={handleInput}></input>
            <input type="text" id="web" placeholder=" אתר" onChange={handleInput}></input>
            <input type="text" id="imgUrl" placeholder="תמונה" onChange={handleInput}></input>
            <input type="text" id="imgAlt" placeholder="תגית תמונה" onChange={handleInput}></input>
            <input type="text" id="state" placeholder="מחוז" onChange={handleInput}></input>
            <input type="text" id="country" placeholder="מדינה" onChange={handleInput}></input>
            <input type="text" id="city" placeholder="עיר" onChange={handleInput}></input>
            <input type="text" id="street" placeholder="רחוב " onChange={handleInput}></input>
            <input type="text" id="houseNumber" placeholder="בית" onChange={handleInput}></input>
            <input type="text" id="zip" placeholder="zip" onChange={handleInput}></input>
            <button>הוסף</button>
        </form>
    )
}