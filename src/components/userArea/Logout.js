import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { RoleTypes, userContext } from '../../App';

export default function Logout() {
    const { setUser, isLogged, setUserRole, setIsLogged } = useContext(userContext)
    const Navigate = useNavigate();

    useEffect(() => {
        if (!window.confirm("אתה בטוח שברצונך לצאת מהמערכת?")) {
            Navigate(-1)
            return;
        }

        fetch(`https://api.shipap.co.il/clients/logout`, {
            credentials: 'include',
        })
            .then(() => {
                setIsLogged(false)
                setUser("")
                setUserRole(RoleTypes.NONE)
            })

        Navigate(-1)

    }, [])


}

