import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const NotificationButton = () => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const showNotification = (title, body) => {
        if (isPermissionGranted) {
            new Notification(title, { body });
        } else {
            alert('Notification permission is not granted.');
        }
    }

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isMobile = /Mobi|Android/i.test(userAgent);
        setIsDesktop(!isMobile);

        if (!("Notification" in window)) {
            alert('This browser does not support desktop notifications.');
        } else if (!isMobile && Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    setIsPermissionGranted(true);
                } else {
                    alert('Please enable notifications for this site in your browser settings.');
                }
            });
        } else if (isMobile) {
            alert('Notifications are only supported on desktop.');
        }
    }, []);

    const handleClick = () => {
        if (!isDesktop) {
            alert('Notifications are only supported on desktop.');
            return;
        }

        if ("Notification" in window) {
            if (isPermissionGranted) {
                showNotification('Button Clicked', 'You have clicked the big red button!');
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        setIsPermissionGranted(true);
                        showNotification('Button Clicked', 'You have clicked the big red button!');
                    } else {
                        alert('Please enable notifications for this site in your browser settings.');
                    }
                });
            } else {
                alert('Notifications are blocked. Please enable them in your browser settings.');
            }
        } else {
            alert('This browser does not support desktop notifications.');
        }
    }

    return (
        <>
            <div className="notificationButtonContainer" style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'black', flexDirection: "column" }}>
                <Navbar />
                <button
                    onClick={handleClick}
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '20px 40px',
                        fontSize: '24px',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        marginTop: "100px"
                    }}
                >
                    Click Me
                </button>
            </div>
        </>
    );
}

export default NotificationButton;
