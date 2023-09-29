import joi from 'joi';
import { JOI_HEBREW } from "../../joi-hebrew"
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { token, generalContext, LOGO, APP_NAME } from '../../App';
import { RoleTypes } from '../../App';
import { LuAlertTriangle } from 'react-icons/lu';
import "./style/user.css"

export default function LoginClient() {

    const { snackbar, setUserRole, setUser, setIsLogged } = useContext(generalContext);
    const Navigate = useNavigate();
    const [IsValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState([]);

    const LoginSchema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
        password: joi.string().min(5).max(30).required(),
    })

    function HandleInput(ev) {

        const { id, value } = ev.target;

        //create a new variable to live render a Joi validation
        const newFormData = {
            ...formData,
            [id]: value
        }
        setFormData(newFormData)

        const schema = LoginSchema.validate(newFormData, {
            abortEarly: false,
            messages: { he: JOI_HEBREW },
            errors: { language: 'he' }
        });

        const errors = {};
        if (schema.error) {
            for (const e of schema.error.details) {
                errors[e.context.key] = e.message;
            }
            setIsValid(false)
        } else {
            setIsValid(true)
        }
        setErrors(errors)
    }

    //LOGIN
    function login(ev) {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/clients/login?token=${token}`, {
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
                        setErrors({ ...errors, auth: x })
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setUser(data)
                snackbar(`ברוך הבא!`)
                setIsLogged(true)
                if (data.admin) {
                    setUserRole(RoleTypes.ADMIN)
                } else if (data.business) {
                    setUserRole(RoleTypes.BUSINESS)
                } else {
                    setUserRole(RoleTypes.USER)
                }
                Navigate("/")
            })
            .catch(err => {
                console.log(err);
                setIsLogged(false)
                setUserRole(RoleTypes.NONE)
            });
    }

    return (
        <div className='login'>
            <form onSubmit={login}>
                <LOGO width={60} />
                <h3>{APP_NAME}</h3>
                <h1> התחברות </h1>
                <div className='inputField'>
                    <label><span>* </span> אימייל</label>
                    {errors.email && <LuAlertTriangle className='iconError' />}
                    <input id="email" type="email" required placeholder='אימייל' onChange={HandleInput} />
                    <p className={'validationError'}>{errors ? errors.email : ""}</p>
                </div>

                <div className='inputField'>
                    <label> <span>* </span> סיסמה</label>
                    {errors.password && <LuAlertTriangle className='iconError' />}
                    <input id="password" required type="password" placeholder='סיסמה' onChange={HandleInput} />
                    <p className={'validationError'}>{errors ? errors.password : ""}</p>
                </div>

                <button disabled={!IsValid}> התחבר </button>
                <p className={'validationError'}>{errors.auth}</p>

                <Link to={"/signup"}>להרשמה לחץ כאן</Link>
            </form>
        </div>
    );
}