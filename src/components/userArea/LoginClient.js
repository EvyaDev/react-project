import './user.css';
import joi from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"
import React, { useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
// import Signup from './Signup';



//main function
export default function LoginClient() {

    const Navigate = useNavigate();
    const { isLogged, setIsLogged } = useContext(userContext);
    const [loginError, setLoginError] = useState();
    const [IsValid, setIsValid] = useState();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState([]);

    const LoginSchema = joi.object({
        email: joi.string().min(5).max(30).required(),
        password: joi.string().alphanum().min(5).max(30).required(),
    })


    function HandleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })

        console.log(formData);
        const schema = LoginSchema.validate(formData, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
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
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    return (

        <div>
            {/* {isLogged && */}
            <h2> התחברות לקוח</h2>
            <form onSubmit={login}>

                <input id="email" type="text" placeholder='אימייל' onChange={HandleInput} />
                <input id="password" type="text" placeholder='סיסמה' onChange={HandleInput} />
                <button> התחבר </button>

                {/* <p style={{ textAlign: "center" }} className={'validationError'}>{loginError ? loginError : ""}</p> */}

                <Link to={"/signup"}>להרשמה לחץ כאן</Link>
            </form>
            {/* } */}

        </div>
    );
}



