import { useContext, useEffect, useRef, useState } from "react";
import ToggleColorMode from "../style/ToggleThemeMode";
import { APP_NAME, LOGO, RoleTypes, checkPermission, colorsPalette, generalContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri"
import { LuUsers } from "react-icons/lu"
import { BiFoodMenu } from "react-icons/bi"
import { RxHamburgerMenu } from "react-icons/rx"
import "././style/AppBar.css"
import "././style/AppBarProfile.css"

export const avatarImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AppBar() {
    const myRef = useRef()
    const Navigate = useNavigate()
    const { setColorPalette, userRole, user, isLogged } = useContext(generalContext)
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

    //USER PROFILE TOGGLE
    const close = () => { setProfileOpen(false) }
    const open = () => { setProfileOpen(true) }


    function handleSearch(ev) {

        const newText = ev.target.value;
        setText(newText)
        if (newText !== "") {
            Navigate(`/search-page/${newText}`)
        } else {
            Navigate("/")
        }
    }

    //CLEAR SEARCH INPUT ON CHANGE URL
    useEffect(() => {
        if (window.location.pathname.split("/")[1] !== "search-page") {
            setText("")
        }
        /* eslint-disable-next-line */
    }, [window.location.pathname])


    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (myRef.current && !myRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("click", handleDocumentClick);

        return () => {
            window.removeEventListener("click", handleDocumentClick);
        };
    }, []);


    //HIDE MENU ON CHANGE SCREEN WIDTH
    function handleResize() {
        setWidth(window.innerWidth);
        width >= 767 && setMenuOpen(false)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
        /* eslint-disable-next-line */
    }, [])

    //SAVE GLOBAL COLOR PLATTE
    function setColor(color) {
        setColorPalette(color)
        localStorage.colorPlatte = JSON.stringify(color);
    }

    return (
        <nav>
            <div className="logoArea">
                <Link to={"/"}><LOGO /></Link>
                <p>{APP_NAME}</p>
            </div>

            <div className={menuOpen ? "navigator showMenu" : "navigator"}>
                <ul onClick={() => setMenuOpen(true)}>
                    {(width < 767) && <ToggleColorMode />}
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
                <input className="searchInput" onChange={handleSearch} value={text} type="text" placeholder="חיפוש מתכון..."></input>
                <div ref={myRef} className="menuToggle" onClick={toggleMenu} >
                    <RxHamburgerMenu />
                </div>

                {width > 767 && <ToggleColorMode />}

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
                                {(isLogged && (userRole === RoleTypes.ADMIN || userRole === RoleTypes.BUSINESS)) && <Link to={"/cardlist"}><BiFoodMenu /><li>  ניהול מתכונים</li></Link>}
                                {(isLogged && userRole === RoleTypes.ADMIN) && <Link to={"/clients"}><LuUsers /> <li>עריכת משתמשים </li> </Link>}
                            </ul>

                            <div className="palette">
                                <p>ערכת נושא</p>
                                <ToggleColorMode />
                                <ul className="colorPalette" >
                                    <li><div className="colorIcon blue " onClick={() => setColor(colorsPalette.BLUE)}></div></li>
                                    <li><div className="colorIcon red " onClick={() => setColor(colorsPalette.RED)}></div></li>
                                    <li><div className="colorIcon yellow " onClick={() => setColor(colorsPalette.YELLOW)}></div></li>
                                    <li><div className="colorIcon green " onClick={() => setColor(colorsPalette.GREEN)}></div></li>
                                </ul>
                            </div>

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
            </div>
        </nav>
    );
}