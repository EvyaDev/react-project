import { useContext, useEffect, useState } from "react";
import ToggleColorMode from "../../style/ToggleColorMode";
import "./AppBar.css"
import { RoleTypes, checkPermission, userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { required } from "joi";
import { RiUserSettingsLine } from "react-icons/ri"
import { LuUsers } from "react-icons/lu"
import { BiFoodMenu } from "react-icons/bi"

export const avatarImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AppBar({ handleLogout }) {
    const Navigate = useNavigate()

    const { userRole, user, isLogged } = useContext(userContext)
    const [profileOpen, setProfileOpen] = useState(false);
    const linkStructure = [
        { title: "בית", route: "/", permission: Object.values(RoleTypes) },
        { title: "כרטיסים", route: "/cards", permission: [RoleTypes.ADMIN] },
        { title: "מועדפים", route: "/my-favorite", permission: Object.values(RoleTypes) },
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
                    {user ? user.fullName.slice(0, 1) : <img alt="avatar" className="img-avatar" src={avatarImage} />}
                </div>

                {profileOpen &&
                    <div onMouseLeave={close} onMouseOver={open} className="profile-open">
                        <a>
                            <div className="avatar">
                                {user ? user.fullName.slice(0, 1) : <img alt="avatar" className="img-avatar" src={avatarImage} />}
                            </div>
                            <div>{user ? user.fullName : "אינך מחובר"}</div>
                            {user && <span className="permissionTag"> {user.admin ? "מנהל" : user.business ? "לקוח עסקי" : "רגיל"}</span>}
                        </a>


                        <ul>
                            {!isLogged && <Link to={"/login"}><li> כניסה </li></Link>}
                            {!isLogged && <Link to={"/signup"}><li> הרשמה </li></Link>}
                            {isLogged && <Link to={"/edituser"}><RiUserSettingsLine /><li> הגדרות חשבון</li></Link>}
                            {isLogged && <Link to={"/cardlist"}><BiFoodMenu /><li>  ניהול מתכונים</li></Link>}
                            {(isLogged && userRole === RoleTypes.ADMIN) && <Link to={"/clients"}><LuUsers />  עריכת משתמשים </Link>}

                        </ul>

                        {isLogged && <ul>
                            <li onClick={() => Navigate("/logout")}>
                                <a className="logoutBtn" > התנתק </a>
                            </li>
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