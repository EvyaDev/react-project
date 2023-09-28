import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { RoleTypes, token, generalContext } from '../../App'
import { JOI_HEBREW } from "../../joi-hebrew"
import joi from 'joi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { BsTrash3 } from 'react-icons/bs'
import "././style/Add-EditCard.css"
import Loader from '../Loader'


export default function EditCard() {

    const Navigate = useNavigate()
    const { userRole, user, snackbar } = useContext(generalContext)
    const { id } = useParams();
    const [IsValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
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
        title: joi.string().min(3).max(50).required(),
        subtitle: joi.string().max(200).required(),
        imgUrl: joi.string().required(),
        imgAlt: joi.string().required(),
        description: joi.string().min(10).max(3000).required(),
    })

    const fields = [
        { id: "title", label: "כותרת", type: "text", placeholder: "כותרת", },
        { id: "subtitle", label: "כותרת משנה", type: "text", placeholder: "כותרת משנה", },
        { id: "imgUrl", label: "תמונה", type: "text", placeholder: "תמונה", },
        { id: "imgAlt", label: "alt", type: "text", placeholder: "alt image", },
        { id: "web", label: "קישור חיצוני", type: "text", placeholder: "URL", },
        { id: "description", label: "תוכן", type: "textarea", placeholder: "תוכן", },
    ];

    //get one card
    useEffect(() => {
        setLoading(true)

        fetch(`https://api.shipap.co.il/cards/${id}?token=${token}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if ((user.id === data.clientId && userRole === RoleTypes.BUSINESS) || (userRole === RoleTypes.ADMIN && data.clientId === 0)) {
                    return setFormData(data);
                } else {
                    Navigate("/errorPage")
                }
            })
            .catch(err => {
                console.log(err);
                Navigate("/errorPage");
            })
            .finally(() => setLoading(false))
    }, [Navigate, id])


    function handleInput(ev) {
        const { id, value } = ev.target;

        const updateFormData = ({
            ...formData,
            [id]: value
        })

        const schema = editCardSchema.validate(updateFormData, { abortEarly: false, allowUnknown: true, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });

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
        loading ? <Loader /> :
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