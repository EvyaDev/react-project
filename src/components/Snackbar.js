import React from 'react'
import { TbAlertCircleFilled } from "react-icons/tb"
import "././style/Snackbar.css"

export default function Snackbar({ text, show }) {

    return (
        <div className={show ? "Snackbar show" : "Snackbar"}>
            <TbAlertCircleFilled />
            <p>{text}</p>
        </div>
    )
}
