import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import joi, { func } from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"

export default function Signup() {

    const [IsValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState([]);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*-_*])/;


    const SignupSchema = joi.object({
        firstName: joi.string().min(3).max(12).required(),
        middleName: joi.string().min(3).max(12),
        lastName: joi.string().alphanum().min(3).max(20).required(),
        phone: joi.string().alphanum().min(5).max(30).required(),
        email: joi.string().alphanum().min(5).max(30).required(),
        password: joi.string().pattern(passwordRegex).messages({
            'string.pattern.base': 'הסיסמה חייבת לכלול לפחות אות אחת גדולה, אות אחת קטנה באנגלית, לפחות 4 מספרים, וסימן מיוחד מתוך !@, ולהיות לפחות באורך של 8 תווים.',
        }).min(8).max(30).required(),
        imgUrl: joi.string().alphanum(),
        imgAlt: joi.string().alphanum(),
        state: joi.string().alphanum().min(3).max(10),
        country: joi.string().alphanum().min(3).max(10),
        city: joi.string().alphanum().min(3).max(10),
        street: joi.string().alphanum().min(3).max(10),
        houseNumber: joi.string().alphanum().min(5).max(30),
        zip: joi.string().alphanum(),
        business: joi.boolean(),
    })

    const Navigate = useNavigate();
    const structure = [
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
        { id: "business", type: "checkbox", label: "עסקי", },
    ]


    function HandleInput(ev) {

        const { id, value, type, checked } = ev.target;
        const newValue = type === "checkbox" ? checked : value;

        //create a new variable to live render a Joi validation
        const newFormData = {
            ...formData,
            [id]: newValue
        }
        setFormData(newFormData)
        console.log(formData);

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
        // console.log(formData);
    }


    function signup(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/clients/signup?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err.message);
            });
        Navigate("/login")

    }


    return (
        <div className='signup'>
            {/* {isLogged && */}
            <form onSubmit={signup}>
                <h2>הרשמה</h2>
                {structure.map((s, i) => {
                    return (
                        <>


                            <div key={s.id} className={s.type === "checkbox" ? "inputField form-control" : "inputField"}>
                                <label>{s.label}: </label>
                                <input id={s.id} type={s.type} placeholder={s.placeholder} onChange={HandleInput} />
                                <p className={'validationError'}>{errors ? errors[s.id] : ""}</p>

                            </div>

                        </>
                    )
                })}
                <button>הירשם</button>
                <Link to={"/login"}>נרשמת? לחץ כאן</Link>
            </form>
            {/* } */}

        </div>)
}



// {
//     "firstName": "",
//     "middleName": "",
//     "lastName": "",
//     "phone": "",
//     "email": "",
//     "password": "",
//     "imgUrl": "",
//     "imgAlt": "",
//     "state": "",
//     "country": "",
//     "city": "",
//     "street": "",
//     "houseNumber": 0,
//     "zip": 0,
//     "business": false
// }