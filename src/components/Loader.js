import React from 'react'
import { Rings } from "react-loader-spinner"
import "./loader.css"
export default function Loader({ color }) {
    return (
        <div className='loader'>
            <Rings
                height="80"
                width="80"
                color={color}
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>
    )
}
