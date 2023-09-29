import React, { useContext, useEffect, useState } from 'react'
import { token, generalContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { avatarImage } from '../AppBar'
import joi from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"
import "./style/EditUser.css"

export default function EditUser() {
    const { user, setUser } = useContext(generalContext)
    const [formData, setFormData] = useState({})
    const Navigate = useNavigate()
    const [IsValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});

    const structure = [
        { id: "firstName", type: "text", label: "שם פרטי" },
        { id: "middleName", type: "text", label: "שם אמצעי" },
        { id: "lastName", type: "text", label: "שם משפחה" },
        { id: "phone", type: "tel", label: "טלפון" },
        { id: "imgUrl", type: "text", label: "תמונה" },
        { id: "imgAlt", type: "text", label: "imgAlt" },
        { id: "state", type: "text", label: "מחוז" },
        { id: "country", type: "text", label: "מדינה" },
        { id: "city", type: "text", label: "עיר" },
        { id: "street", type: "text", label: "רחוב" },
        { id: "houseNumber", type: "number", label: "בית" },
        { id: "zip", type: "number", label: "מיקוד" },
    ]

    const editUserSchema = joi.object({
        firstName: joi.string().min(3).max(12).required(),
        middleName: joi.string().min(3).max(12).required(),
        lastName: joi.string().min(3).max(20).required(),
        phone: joi.string().regex(/[0-9]{7,10}$/).messages({ 'string.pattern.base': "מספר טלפון לא תקין" }).min(7).max(20).required(),
        imgUrl: joi.string().min(8).required(),
        imgAlt: joi.string().required(),
        country: joi.string().min(3).max(15).required(),
        city: joi.string().max(15).required(),
        houseNumber: joi.number().required(),
        zip: joi.number().required(),
    })

    useEffect(() => {
        setFormData({
            ...user
        })
    }, [user])


    function handleInput(ev) {
        const { id, value } = ev.target;

        const updateFormData = ({
            ...formData,
            [id]: value
        })

        const schema = editUserSchema.validate(updateFormData, { abortEarly: false, allowUnknown: true, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
        const errors = {};
        if (schema.error) {

            for (const e of schema.error.details) {
                errors[e.context.key] = e.message;
            };

            setIsValid(false)

        } else {
            setIsValid(true)
        }
        setFormData(updateFormData);
        setErrors(errors)
    }

    //UPDATE
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
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='EditUser'>
            <div>
                <div className='head'>
                    <img alt={formData.imgAlt} onError={() => setFormData({ ...user, imgUrl: avatarImage })}
                        src={formData.imgUrl || avatarImage}></img>
                    <h3>{user.fullName}</h3>
                </div>

                <div>
                    <form onSubmit={update}>
                        {structure
                            .map(s => {
                                return (
                                    <div className='inputField' key={s.id}>
                                        <label>{s.label}</label>
                                        <input
                                            id={s.id}
                                            type={s.type}
                                            defaultValue={formData[s.id]}
                                            onInput={handleInput}
                                        >
                                        </input>
                                        <p className='validationError'>{errors ? errors[s.id] : ""}</p>

                                    </div>
                                )
                            })}
                        <button disabled={!IsValid}>עדכן</button>
                        <button type='button' onClick={() => Navigate(-1)}>ביטול </button>

                    </form>
                </div>
            </div>
        </div>
    )
}