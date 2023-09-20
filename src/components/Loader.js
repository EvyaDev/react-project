import React from 'react'
import { Oval } from "react-loader-spinner"
import "./loader.css"
export default function Loader({ color, secondaryColor, width }) {
    return (
        <div className='loader'>
            <Oval
                height={width || "70"}
                width={width || "70"}
                color={color || "white"}
                secondaryColor={secondaryColor || "silver"}
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>

    )
}
