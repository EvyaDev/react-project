import { useContext, useEffect, useState } from "react";
import ToggleColorMode from "../../style/ToggleColorMode";
import "./AppBar.css"
import { RoleTypes, checkPermission, userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { func, required } from "joi";
import { RiUserSettingsLine } from "react-icons/ri"
import { LuUsers } from "react-icons/lu"
import { BiFoodMenu } from "react-icons/bi"
import { BsSearch } from "react-icons/bs";

export const avatarImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AppBar() {
    const Navigate = useNavigate()

    const { userRole, user, setUser, isLogged } = useContext(userContext)
    const [profileOpen, setProfileOpen] = useState(false);
    const linkStructure = [
        { title: "בית", route: "/", rolesAllow: Object.values(RoleTypes) },
        { title: "הכרטיסים שלי", route: "/cards", rolesAllow: [RoleTypes.ADMIN, RoleTypes.BUSINESS] },
        { title: "המועדפים שלי", route: "/my-favorite", rolesAllow: Object.values(RoleTypes) },
    ];

    function open() {
        setProfileOpen(true)
    }

    function close() {
        setProfileOpen(false)
    }

    function searchInput(ev) {
        const text = ev.target.value;
        if (text === "") {
            return Navigate("/")
        }
        Navigate(`/search-page/${text}`)
    }

    return (
        <nav>
            <div className="userArea">
                <div onMouseLeave={close} onMouseOver={open} className="avatar">
                    {user ? `${user.fullName.slice(0, 1)}${user.lastName ? user.lastName.slice(0, 1) : ""}` :
                        <img alt="avatar" className="img-avatar" src={avatarImage} />}
                </div>

                {profileOpen &&
                    <div onMouseLeave={close} onMouseOver={open} className="profile-open">
                        <a>
                            <div className="avatar">
                                {user ? `${user.fullName.slice(0, 1)}${user.lastName ? user.lastName.slice(0, 1) : ""}` : <img alt="avatar" className="img-avatar" src={avatarImage} />}
                            </div>
                            <div>{user ? user.fullName : "אינך מחובר"}</div>
                            {user && <span className="permissionTag"> {user.admin ? "מנהל" : user.business ? "לקוח עסקי" : "רגיל"}</span>}
                        </a>


                        <ul>
                            {!isLogged && <Link to={"/login"}><li> כניסה </li></Link>}
                            {!isLogged && <Link to={"/signup"}><li> הרשמה </li></Link>}
                            {isLogged && <Link to={"/edituser"}><RiUserSettingsLine /><li> הגדרות חשבון</li></Link>}
                            {(isLogged && userRole === RoleTypes.ADMIN || userRole === RoleTypes.BUSINESS) && <Link to={"/cardlist"}><BiFoodMenu /><li>  ניהול מתכונים</li></Link>}
                            {(isLogged && userRole === RoleTypes.ADMIN) && <Link to={"/clients"}><LuUsers />  עריכת משתמשים </Link>}

                        </ul>

                        {isLogged &&
                            <ul>
                                <li onClick={() => Navigate("/logout")}>
                                    <a className="logoutBtn" > התנתק </a>
                                </li>
                            </ul>
                        }
                    </div>
                }
            </div>

            <div className="navigator">
                <ul>
                    {linkStructure.filter(l => !l.rolesAllow || checkPermission(l.rolesAllow, userRole)).map(l => {
                        return (
                            <li key={l.title} >
                                <Link className={l.route === window.location.pathname ? "currentPage" : ""} to={l.route}><span>{l.title}</span></Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="leftSide">
                <input className="searchInput" onChange={searchInput} type="text" placeholder=" חיפוש מתכון..."></input>
                <ToggleColorMode />
            </div>
        </nav>
    );
}