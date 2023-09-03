import React, { useEffect, useState } from 'react';
import "./network.css"

function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className='network'>
            {isOnline ? (
                <p className='online'>הרשת מחוברת</p>
            ) : (
                <p className='offline'>הרשת מנותקת</p>
            )}
        </div>
    );
}

export default NetworkStatus;
