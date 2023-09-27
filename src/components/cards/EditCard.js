import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { token, userContext } from '../../App'
import { JOI_HEBREW } from "../../joi-hebrew"
import joi from 'joi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { BsTrash3 } from 'react-icons/bs'
import "././style/Add-EditCard.css"


export default function EditCard() {

    const Navigate = useNavigate()
    const { snackbar } = useContext(userContext)
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [IsValid, setIsValid] = useState(true);
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
        id: joi.any(),
        title: joi.string().min(3).max(30).required(),
        subtitle: joi.string().max(200).required(),
        imgUrl: joi.string().required(),
        imgAlt: joi.string().required(),
        web: joi.any(),
        description: joi.string().min(10).max(2000).required(),
    })

    const fields = [
        { id: "title", label: "כותרת", type: "text", placeholder: "כותרת", },
        { id: "subtitle", label: "כותרת משנה", type: "text", placeholder: "כותרת משנה", },
        { id: "imgUrl", label: "תמונה", type: "text", placeholder: "תמונה", },
        { id: "imgAlt", label: "alt", type: "text", placeholder: "alt image", },
        { id: "web", label: "קישור חיצוני", type: "text", placeholder: "URL", },
        { id: "description", label: "תוכן", type: "textarea", placeholder: "תוכן", },
    ];

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
    }, [item.id])


    function handleInput(ev) {
        const { id, value } = ev.target;

        const updateFormData = ({
            ...formData,
            [id]: value
        })

        const schema = editCardSchema.validate(updateFormData, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });

        const errors = {};
        if (schema.error) {
            for (const e of schema.error.details) {
                errors[e.context.key] = e.message;
            };
            setIsValid(false)
        } else {
            setIsValid(true)
        }
        setFormData(updateFormData)
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
                    {fields.map(f => {
                        return (
                            <div key={f.id}>
                                <label>{f.label}</label>
                                {f.type === "textarea" ?
                                    <textarea
                                        id={f.id}
                                        defaultValue={formData[f.id]}
                                        lang={2000}
                                        rows={10}
                                        onChange={handleInput}
                                    ></textarea> :
                                    <input id={f.id} type={f.type} defaultValue={formData[f.id]} placeholder={f.placeholder} onChange={handleInput} />
                                }
                                <p className='validationError'>{errors[f.id] && errors[f.id]}</p>
                            </div>
                        )
                    })}
                    <button disabled={!IsValid}>שמור שינויים</button>
                    <button type='button' onClick={() => Navigate(-1)}>ביטול </button>
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