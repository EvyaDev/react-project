import { useContext, useEffect, useState } from "react";
import ToggleColorMode from "../style/ToggleThemeMode";
import { RoleTypes, checkPermission, generalContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri"
import { LuUsers } from "react-icons/lu"
import { BiFoodMenu } from "react-icons/bi"
import { RxHamburgerMenu } from "react-icons/rx"
import "././style/AppBar.css"
import "././style/AppBarProfile.css"

export const avatarImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AppBar() {
    const Navigate = useNavigate()

    const { userRole, user, isLogged } = useContext(generalContext)
    const [profileOpen, setProfileOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [text, setText] = useState("");
    const linkStructure = [
        { title: "בית", route: "/" },
        { title: "הכרטיסים שלי", route: "/cards", rolesAllow: [RoleTypes.ADMIN, RoleTypes.BUSINESS] },
        { title: "המועדפים שלי", route: "/my-favorite", rolesAllow: Object.values(RoleTypes) },
        { title: "אודות", route: "/about" },
    ];

    const close = () => { setProfileOpen(false) }
    const open = () => { setProfileOpen(true) }

    function searchInput(ev) {

        const newText = ev.target.value;
        setText(newText)
        if (newText !== "") {
            Navigate(`/search-page/${newText}`)
        } else {
            Navigate("/")
        }
    }

    useEffect(() => {
        if (window.location.pathname.split("/")[1] !== "search-page") {
            setText("")
        }
    }, [window.location.pathname])


    function handleMenu() {
        setMenuOpen(!menuOpen)
    }

    function handleResize() {
        setWidth(window.innerWidth);
        width >= 767 && setMenuOpen(false)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <nav>
            <div className="userArea">
                <div onMouseLeave={close} onMouseOver={open} className="avatar">
                    {isLogged ?
                        `${user.fullName.slice(0, 1)}${user.lastName ?
                            user.lastName.slice(0, 1) : ""}` :
                        <img alt="avatar" className="img-avatar" src={avatarImage} />}
                </div>

                {profileOpen &&
                    <div onMouseLeave={close} onMouseOver={open} className="profile-open">
                        <a>
                            <div className="avatar">
                                {isLogged ? `${user.fullName.slice(0, 1)}${user.lastName ? user.lastName.slice(0, 1) : ""}` : <img alt="avatar" className="img-avatar" src={avatarImage} />}
                            </div>
                            <div>{isLogged ? user.fullName : "אינך מחובר"}</div>
                            {isLogged && <span className="permissionTag"> {user.admin ? "מנהל" : user.business ? "לקוח עסקי" : "רגיל"}</span>}
                        </a>


                        <ul>
                            {!isLogged && <Link to={"/login"}><li onClick={close}> כניסה </li></Link>}
                            {!isLogged && <Link to={"/signup"}><li> הרשמה </li></Link>}
                            {(isLogged && userRole !== RoleTypes.ADMIN) && <Link to={"/edituser"}><RiUserSettingsLine /><li onClick={close}> הגדרות חשבון</li></Link>}
                            {(isLogged && userRole === RoleTypes.ADMIN || userRole === RoleTypes.BUSINESS) && <Link to={"/cardlist"}><BiFoodMenu /><li>  ניהול מתכונים</li></Link>}
                            {(isLogged && userRole === RoleTypes.ADMIN) && <Link to={"/clients"}><LuUsers />  עריכת משתמשים </Link>}

                        </ul>

                        {isLogged &&
                            <ul>
                                <li onClick={() => { Navigate("/logout"); close() }}>
                                    <a className="logoutBtn"> התנתק </a>
                                </li>
                            </ul>
                        }
                    </div>
                }
            </div>

            <div className={menuOpen ? "navigator showMenu" : "navigator"}>
                <ul>
                    {(width < 767) && <ToggleColorMode />}
                    {linkStructure.filter(l => !l.rolesAllow || checkPermission(l.rolesAllow, userRole)).map(l => {
                        return (
                            <li key={l.title} onClick={() => setMenuOpen(false)} >
                                <Link className={l.route === window.location.pathname ? "currentPage" : ""} to={l.route}><span>{l.title}</span></Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="leftSide">
                <input className="searchInput" onChange={searchInput} value={text} type="text" placeholder="חיפוש מתכון..."></input>
                <RxHamburgerMenu className="menuToggle" onClick={handleMenu} />
                {width > 767 && <ToggleColorMode />}
            </div>
        </nav>
    );
}