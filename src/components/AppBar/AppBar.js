import { useContext, useEffect, useState } from "react";
import ToggleColorMode from "../../style/ToggleColorMode";
import "./AppBar.css"
import { RoleTypes, checkPermission, userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { required } from "joi";

export default function AppBar({ handleLogout }) {
    const Navigate = useNavigate()

    const { permission, user, isLogged } = useContext(userContext)
    const [profileOpen, setProfileOpen] = useState(false);
    const linkStructure = [
        { title: "בית", route: "/", permission: Object.values(RoleTypes) },
        { title: "כרטיסים", route: "/cards", permission: [RoleTypes.admin] },
        { title: "ניהול כרטיסים", route: "/cardlist", },
    ];

    function open() {
        setProfileOpen(true)
    }
    function close() {
        setProfileOpen(false)
    }


    return (
        <nav >
            <div className="userArea">
                <div onMouseLeave={close} onMouseOver={open} className="avatar">
                    {user ? user.fullName.slice(0, 1) : <img alt="avatar" className="img-avatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />}
                </div>

                {profileOpen &&
                    <div onMouseLeave={close} onMouseOver={open} className="profile-open">
                        <a>
                            <div className="avatar">
                                {user ? user.fullName.slice(0, 1) : <img alt="avatar" className="img-avatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />}
                            </div>
                            <div>{user ? user.fullName : "אינך מחובר"}</div>
                            {user && <span className="permissionTag"> {user.admin ? "מנהל" : user.business ? "לקוח עסקי" : "אין"}</span>}
                        </a>


                        <ul>
                            {!isLogged && <Link to={"/login"}><li> כניסה </li></Link>}
                            {!isLogged && <Link to={"/signup"}><li> הרשמה </li></Link>}

                        </ul>

                        {isLogged && <ul>
                            <li onClick={() => Navigate("/logout")}> <a className="logoutBtn" >
                                התנתק
                            </a></li>
                        </ul>}
                    </div>
                }
            </div>

            <div className="navigator">
                <ul>
                    {linkStructure.filter(l => !l.permission || checkPermission(l.permission, permission)).map(l => {
                        return (
                            <li key={l.title}>
                                <Link to={l.route}>{l.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <ToggleColorMode />
        </nav>
    );
}