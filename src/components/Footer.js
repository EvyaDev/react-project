import { GoHome } from "react-icons/go"
import { AiFillHeart } from "react-icons/ai"
import { BsFolder2Open } from "react-icons/bs"
import { Link } from "react-router-dom"
import "./style/Footer.css"

export default function Footer() {
    return (
        <div className='Footer'>
            <ul>
                <div>
                    <Link to={"/"}> <li>{<GoHome />}</li></Link>
                    <p>בית</p>
                </div>
                <div>
                    <Link to={"/my-favorite"}> <li>{<AiFillHeart />}</li></Link>
                    <p>מועדפים</p>
                </div>
                <div>
                    <Link to={"/cards"}> <li>{<BsFolder2Open />}</li></Link>
                    <p>הכרטיסים שלי</p>
                </div>

            </ul>
        </div>
    )
}
