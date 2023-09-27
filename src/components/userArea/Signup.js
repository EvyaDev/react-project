import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import joi from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"
import { token } from '../../App';
import { LuAlertTriangle } from 'react-icons/lu';
import "./style/user.css"

export default function Signup() {

    const [IsValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ business: false });
    const Navigate = useNavigate();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*_-])/;


    const SignupSchema = joi.object({
        firstName: joi.string().min(3).max(12).required(),
        middleName: joi.string().min(3).max(12),
        lastName: joi.string().min(3).max(20).required(),
        phone: joi.string().regex(/[0-9]{7,10}$/).messages({ 'string.pattern.base': "מספר טלפון לא תקין" }).min(7).max(20).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
        password: joi.string().pattern(passwordRegex).messages({
            'string.pattern.base': 'הסיסמה חייבת לכלול אות גדולה, אות קטנה 4 ספרות וסימן מיוחד',
        }).min(8).max(30).required(),
        imgUrl: joi.string().min(8),
        imgAlt: joi.string(),
        state: joi.string().min(3).max(15),
        country: joi.string().min(3).max(15).required(),
        city: joi.string().max(15).required(),
        street: joi.string().min(3).max(20).required(),
        houseNumber: joi.string().alphanum().required(),
        zip: joi.string().alphanum().max(10),
        business: joi.boolean(),
    })

    const structure = [
        { id: "firstName", type: "text", label: "שם פרטי", placeholder: "שם פרטי", require: true },
        { id: "middleName", type: "text", label: "שם אמצעי", placeholder: "שם אמצעי" },
        { id: "lastName", type: "text", label: "שם משפחה", placeholder: "שם משפחה", require: true },
        { id: "phone", type: "tel", label: "טלפון", placeholder: "טלפון", require: true },
        { id: "email", type: "text", label: "אימייל", placeholder: "אימייל", require: true },
        { id: "password", type: "text", label: "סיסמה", placeholder: "סיסמה", require: true },
        { id: "imgUrl", type: "text", label: "תמונה", placeholder: "תמונה" },
        { id: "imgAlt", type: "text", label: "imgAlt", placeholder: "imgAlt" },
        { id: "state", type: "text", label: "מחוז", placeholder: "מחוז" },
        { id: "country", type: "text", label: "מדינה", placeholder: "מדינה", require: true },
        { id: "city", type: "text", label: "עיר", placeholder: "עיר", require: true },
        { id: "street", type: "text", label: "רחוב", placeholder: "רחוב", require: true },
        { id: "houseNumber", type: "number", label: "בית", placeholder: "בית", require: true },
        { id: "zip", type: "number", label: "מיקוד", placeholder: "מיקוד" },
        { id: "business", type: "checkbox", label: " לקוח עסקי? ", },
    ]


    function handleInput(ev) {

        const { id, value, type, checked } = ev.target;
        const newValue = type === "checkbox" ? checked : value;

        //create a new variable to live render a Joi validation
        const newFormData = {
            ...formData,
            [id]: newValue
        }
        setFormData(newFormData)

        const schema = SignupSchema.validate(newFormData, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
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


    function signup(ev) {
        ev.preventDefault();
        console.log(formData);

        fetch(`https://api.shipap.co.il/clients/signup?token=${token}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    res.text().then(x => {
                        setErrors({ ...errors, auth: x })
                    })
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                console.log(data);
                Navigate("/login")
            })
            .catch(err => {
                console.log(err.message);
            });

    }


    return (
        <div className='signup'>
            <form onSubmit={signup}>

                <h2>הרשמה</h2>
                {structure.map((s, i) => {
                    return (

                        <div key={s.id} className="inputField" >
                            {errors[s.id] && <LuAlertTriangle className='iconError' />}
                            {s.type !== "checkbox" && <label>{s.require && <span>* </span>}{s.label}: </label>}
                            {s.type === "checkbox" && <p>{s.label}</p>}
                            <input
                                className={s.type === "checkbox" ? "checkbox" : ""}
                                id={s.id}
                                required={s.require}
                                type={s.type}
                                placeholder={s.placeholder}
                                onChange={handleInput}
                            />
                            <p className='validationError'>{errors ? errors[s.id] : ""}</p>
                        </div>

                    )
                })}
                <button disabled={!IsValid}>הירשם</button>
                <p className='validationError'>{errors ? errors.auth : ""}</p>
                <Link to={"/login"}>נרשמת? לחץ כאן</Link>
            </form>
        </div>
    )
}