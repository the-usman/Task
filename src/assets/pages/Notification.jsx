import React, { useEffect } from 'react';

const NotificationButton = () => {
    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    }

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const handleClick = () => {
        showNotification('Button Clicked', 'You have clicked the big red button!');
    }

    return (
        <div className="notificationButtonContainer" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
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
                    
                }}
            >
                Click Me
            </button>
        </div>
    );
}

export default NotificationButton;
