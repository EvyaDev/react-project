import React from 'react'
import "./snackbar.css"
import { TbAlertCircleFilled } from "react-icons/tb"

export default function Snackbar({ text, show }) {

    return (
        <div className={show ? "Snackbar show" : "Snackbar"}>
            <TbAlertCircleFilled />
            <p>{text}</p>
        </div>
    )
}
