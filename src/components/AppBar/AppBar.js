import { useContext, useState } from "react";
import ToggleColorMode from "../../style/ToggleColorMode";
import "./AppBar.css"
import { userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

export default function AppBar({ handleLogout }) {
    const Navigate = useNavigate()

    const { user, isLogged } = useContext(userContext)
    const [profileOpen, setProfileOpen] = useState(false);
    const linkStructure = [
        { title: "בית", route: "/", },
        { title: "כרטיסים", route: "/cards", },
        { title: "מועדפים", route: "/", },
    ];

    function open() {
        setProfileOpen(true)
    }
    function close() {
        setProfileOpen(false)
    }



    return (



        <nav>
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
                            {user && <div>הרשאות: {user.admin ? "מנהל" : user.business ? "עסקי" : "אין"}</div>}
                        </a>
                        {!isLogged &&
                            <ul>
                                <Link to={"/login"}><li> כניסה </li></Link>
                                <Link to={"/signup"}><li> הרשמה </li></Link>
                            </ul>}
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
                    {linkStructure.map(l => {
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

