import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

export default function Logout() {
    const { setUser, isLogged, setIsLogged } = useContext(userContext)
    const Navigate = useNavigate();

    useEffect(() => {
        if (!window.confirm("אתה בטוח שברצונך לצאת מהמערכת?")) {
            Navigate(-1)
            return;
        }

        fetch(`https://api.shipap.co.il/logout`, {
            credentials: 'include',
        })
            .then(() => {
                setIsLogged(false)
                setUser("")
            })

        Navigate(-1)

    }, [])


}

