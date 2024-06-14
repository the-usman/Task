// src/components/CameraComponent.js

import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

const CameraComponent = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const savePhoto = () => {
        // Use html2canvas to convert the webcam feed to an image file
        html2canvas(webcamRef.current.video, { useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'photo.png';
            link.href = imgData;
            link.click();
        });
    };

    return (
        <div>
            <h1 className='text-5xl'>Camera Page</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                width="100%"
                height="auto"
                mirrored={true}
            />
            <button onClick={capture}>Capture Photo</button>
            {imgSrc && (
                <>
                    <img src={imgSrc} alt="Captured" />
                    <button onClick={savePhoto}>Save Photo</button>
                </>
            )}
        </div>
    );
};

export default CameraComponent;
