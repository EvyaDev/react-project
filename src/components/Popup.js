import React, { useEffect, useState } from 'react'
import "./popup.css"

export default function Popup({ structure }) {

    const [data, setData] = useState([])

    useEffect(() => {

        const newArr = Object.values([...structure])
        setData(newArr)

    }, [])

    // console.log(data);

    return (
        <div className='Popup'>

            {data.map((s, i) => {
                return (
                    <>

                        <p>{Object.keys(s)}</p>
                        <p className='name'> {Object.keys(s)[i]}</p>
                    </>
                )
            })}

        </div>
    )
}
