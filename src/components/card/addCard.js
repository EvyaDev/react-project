import { useState } from "react"
import "./Card.css"
import { useNavigate } from "react-router-dom";
import Card from "./card";
import { token } from "../../App";
import { AiOutlineHeart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";

export default function AddCard() {

    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        "title": "כותרת לדוגמה",
        "subtitle": "כותרת משנה לדוגמה",
        "description": "",
        "phone": "undefined",
        "email": "undefined",
        "web": "undefined",
        "imgUrl": "https://theme-assets.getbento.com/sensei/a42cf8c.sensei/assets/images/catering-item-placeholder-704x520.png",
        "imgAlt": "undefined",
        "state": "undefined",
        "country": "undefined",
        "city": "undefined",
        "street": "undefined",
        "houseNumber": "null",
        "zip": "undefined"
    })

    function handleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })
        console.log(formData);
    }

    function addNew(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
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
        <div className="addCard">

            <div className="form">
                <form onSubmit={addNew}>
                    <h2>הוספת מתכון חדש</h2>
                    <label>כותרת</label>
                    <input type="text" id="title" placeholder="כותרת" onChange={handleInput}></input>

                    <label>כותרת משנה</label>
                    <input type="text" id="subtitle" placeholder="כותרת משנה" onChange={handleInput}></input>

                    <label>תמונה</label>
                    <input type="text" id="imgUrl" placeholder="תמונה" onChange={handleInput}></input>

                    <label>alt</label>
                    <input type="text" id="imgAlt" placeholder="alt image" onChange={handleInput}></input>

                    <label>קישור חיצוני</label>
                    <input type="text" id="web" placeholder="URL" onChange={handleInput}></input>

                    <label> תוכן</label>
                    <textarea id="description" lang="1000" rows={10} onChange={handleInput}></textarea>

                    <button>הוסף</button>
                </form>
            </div>
            <div className="display" >

                <p>תצוגה מקדימה</p>
                <div className="Card" style={{ backgroundImage: `url(${formData.imgUrl && formData.imgUrl})` }}>
                    <div className="cardFrame" >
                        <h2>{formData.title}</h2>
                        <p>{formData && formData.subtitle.slice(0, 70)}...</p>

                        <div className="actions" >
                            <AiOutlineHeart className='heart' />
                            <FiEdit className='heart' />
                            <BsTrash3 className='heart' />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}