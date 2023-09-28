import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { RoleTypes, generalContext } from '../../App';

export default function Logout() {
    const { setUser, snackbar, setUserRole, setIsLogged } = useContext(generalContext)
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
                setUser("")
                setIsLogged(false)
                setUserRole(RoleTypes.NONE)
                snackbar(" התנתקת בהצלחה")
            })
            .catch(err => console.log(err))
            .finally(() => Navigate("/login"))
    }, [])
}