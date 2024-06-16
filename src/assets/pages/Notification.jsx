import React, { useEffect } from 'react';
import Navbar from './Navbar';

const NotificationButton = () => {
    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        } else {
            alert('Notification permission is not granted.');
        }
    }

    useEffect(() => {
        if (!("Notification" in window)) {
            alert('This browser does not support desktop notifications.');
        } else if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    alert('Please enable notifications for this site in your browser settings.');
                }
            });
        }
    }, []);

    const handleClick = () => {
        if ("Notification" in window) {
            if (Notification.permission === 'granted') {
                showNotification('Button Clicked', 'You have clicked the big red button!');
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
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
