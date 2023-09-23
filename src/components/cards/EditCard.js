import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { token, userContext } from '../../App'
import { JOI_HEBREW } from "../../joi-hebrew"
import joi from 'joi'
import { LuAlertTriangle } from 'react-icons/lu'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { BsTrash3 } from 'react-icons/bs'
import "././style/Add-EditCard.css"


export default function EditCard() {

    const Navigate = useNavigate()
    const { snackbar } = useContext(userContext)
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [IsValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        subtitle: "",
        imgUrl: "",
        imgAlt: "",
        web: "",
        description: "",
    })
    const editCardSchema = joi.object({
        title: joi.string().min(3).max(30).required(),
        subtitle: joi.string().min(3).max(30).required(),
        imgUrl: joi.string().min(3).max(30).required(),
        imgAlt: joi.string().min(3).max(30).required(),
        web: joi.string().min(3).max(30).required(),
        description: joi.string().min(3).max(30).required(),
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

        const schema = editCardSchema.validate(formData, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
        const errors = {};
        if (schema.error) {

            for (const e of schema.error.details) {
                errors[e.context.key] = e.message;
            };
            setIsValid(false)

        } else {
            setIsValid(true)
        }
        setErrors(errors)
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
        <div className="EditCard">

            <div className="form">
                <form onSubmit={save}>
                    <h2>עריכת מתכון </h2>

                    <label>כותרת</label>
                    {errors.title && <LuAlertTriangle className='iconError' />}
                    <input type="text" id="title" defaultValue={formData.title} placeholder="כותרת" onChange={handleInput}></input>

                    <label>כותרת משנה</label>
                    {errors.subtitle && <LuAlertTriangle className='iconError' />}
                    <input type="text" id="subtitle" value={formData.subtitle} placeholder="כותרת משנה" onChange={handleInput}></input>

                    <label>תמונה</label>
                    {errors.imgUrl && <LuAlertTriangle className='iconError' />}
                    <input type="text" id="imgUrl" value={formData.imgUrl} placeholder="תמונה" onChange={handleInput}></input>

                    <label>alt</label>
                    {errors.imgAlt && <LuAlertTriangle className='iconError' />}
                    <input type="text" id="imgAlt" value={formData.imgAlt} placeholder="alt image" onChange={handleInput}></input>

                    <label>קישור חיצוני</label>
                    {errors.web && <LuAlertTriangle className='iconError' />}
                    <input type="text" id="web" value={formData.web} placeholder="URL" onChange={handleInput}></input>

                    <label> תוכן</label>
                    {errors.description && <LuAlertTriangle className='iconError' />}
                    <textarea id="description" value={formData.description} lang="1000" rows={10} onChange={handleInput}></textarea>

                    <button>שמור שינויים</button>
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