import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {

    const structure = [
        { id: "firstName", type: "text", label: "firstName", placeholder: "firstName" },
        { id: "middleName", type: "text", label: "middleName", placeholder: "middleName" },
        { id: "lastName", type: "text", label: "lastName", placeholder: "lastName" },
        { id: "phone", type: "text", label: "phone", placeholder: "phone" },
        { id: "email", type: "text", label: "email", placeholder: "email" },
        { id: "password", type: "text", label: "password", placeholder: "password" },
        { id: "imgUrl", type: "text", label: "imgUrl", placeholder: "imgUrl" },
        { id: "imgAlt", type: "text", label: "imgAlt", placeholder: "imgAlt" },
        { id: "state", type: "text", label: "state", placeholder: "state" },
        { id: "country", type: "text", label: "country", placeholder: "country" },
        { id: "city", type: "text", label: "city", placeholder: "city" },
        { id: "street", type: "text", label: "street", placeholder: "street" },
        { id: "houseNumber", type: "number", label: "houseNumber", placeholder: "houseNumber" },
        { id: "zip", type: "number", label: "zip", placeholder: "zip" },
        { id: "business", type: "text", label: "business", placeholder: "business" },
    ]

    const [formData, setFormData] = useState({
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "password": "",
        "imgUrl": "",
        "imgAlt": "",
        "state": "",
        "country": "",
        "city": "",
        "street": "",
        "houseNumber": 0,
        "zip": 0,
        "business": false
    });

    function HandleInput(ev) {
        const { id, value } = ev.target;

        setFormData({
            ...formData,
            [id]: value
        })

        console.log(formData);
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
    }

    return (
        <div>
            {/* {isLogged && */}
            <h2>הרשמה</h2>
            <form onSubmit={signup}>
                {structure.map(s => {
                    return (
                        <div key={s.id}>
                            <label>{s.label}: </label>
                            <input id={s.id} type={s.type} placeholder={s.placeholder} onChange={HandleInput} />
                        </div>
                    )
                })}
                <button>הירשם</button>

                {/* <p style={{ textAlign: "center" }} className={'validationError'}>{loginError ? loginError : ""}</p> */}

                <Link to={"/login"}>נרשמת? לחץ כאן</Link>
            </form>
            {/* } */}

        </div>)
}
