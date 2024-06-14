import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import { storage } from '../../firebase'; // Adjust the path as necessary
import { ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const CameraComponent = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const savePhoto = async () => {
        if (webcamRef.current && webcamRef.current.video) {
            const canvas = await html2canvas(webcamRef.current.video, { useCORS: true });
            const imgData = canvas.toDataURL('image/png');

            const fileName = `photo-${uuidv4()}.png`;

            const storageRef = ref(storage, `image/${fileName}`);

            try {
                await uploadString(storageRef, imgData, 'data_url');
                alert('Photo uploaded successfully!');
            } catch (error) {
                console.error('Error uploading photo:', error);
                alert('Error uploading photo');
            }
        }
    };

    return (
        <div className='flex flex-col container m-auto'>

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                width="100%"
                height="auto"
                mirrored={true}
            />
            <div className=" bg-gradient-to-r from-green-600  to-yellow-500 text-white p-1 rounded-3xl mt-3">
                <button onClick={capture} className="text-center font-semibold w-[100%] bg-white rounded-[calc(1.5rem-3px)] p-[10px] text-xl hover:bg-transparent text-black hover:text-white">Capture Photo</button>
                </div>
            {imgSrc && (
                <>
                    <img src={imgSrc} alt="Captured" className="mt-4" />
                    <button onClick={savePhoto} className="bg-green-500 text-white p-2 rounded mt-4">Save Photo</button>
                </>
            )}
        </div>
    );
};

export default CameraComponent;
