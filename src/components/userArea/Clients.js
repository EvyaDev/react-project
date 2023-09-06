import React, { useEffect, useState } from 'react'

export default function Clients() {

    const [clients, setClients] = useState([])

    useEffect(() => {

        fetch(`https://api.shipap.co.il/admin/clients?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`)
            .then(res => res.json())
            .then(data => {
                setClients(data)
            });

    }, [])

    return (
        <div>
            {clients.map(c => {
                return (
                    <p key={c.id}>
                        {c.firstName}
                    </p>
                )
            })}
        </div>
    )
}
