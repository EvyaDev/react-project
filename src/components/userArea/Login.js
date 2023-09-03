import './user.css';
import joi from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';


export default function LoginClient() {

    const Navigate = useNavigate();
    const { isLogged, setUser, setIsLogged } = useContext(userContext);
    const [IsValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState([]);

    const LoginSchema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
        password: joi.string().alphanum().min(5).max(30).required(),
    })


    function HandleInput(ev) {

        const { id, value } = ev.target;

        //create a new variable to live render a Joi validation
        const newFormData = {
            ...formData,
            [id]: value
        }
        setFormData(newFormData)

        const schema = LoginSchema.validate(newFormData, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
        const errors = {};
        console.log(formData);
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


    // function on login (send form)
    function login(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/clients/login?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`, {
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
                Navigate(-1)
                setUser(data)
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    return (

        <div className='login'>
            <form onSubmit={login}>
                <h2> התחברות לקוח</h2>
                <div className='inputField'>
                    <label>אימייל</label>
                    <input id="email" type="email" placeholder='אימייל' onChange={HandleInput} />
                    <p style={{ textAlign: "center" }} className={'validationError'}>{errors ? errors.email : ""}</p>
                </div>
                <div className='inputField'>
                    <label>סיסמה</label>
                    <input id="password" type="password" placeholder='סיסמה' onChange={HandleInput} />
                    <p style={{ textAlign: "center" }} className={'validationError'}>{errors ? errors.password : ""}</p>
                </div>

                <button disabled={!IsValid}> התחבר </button>


                <Link to={"/signup"}>להרשמה לחץ כאן</Link>
            </form>

        </div>
    );
}



