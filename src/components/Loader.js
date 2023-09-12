import React from 'react'
import { Oval } from "react-loader-spinner"
import "./loader.css"
export default function Loader({ color, secondaryColor, width }) {
    return (
        <div className='loader'>
            <Oval
                height={width || "80"}
                width={width || "80"}
                color={color}
                secondaryColor={secondaryColor}
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>

    )
}
