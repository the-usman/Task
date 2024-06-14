import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Loader from './Loader';

const ImageUploader = () => {
    const [imageList, setImageList] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const refer = localStorage.getItem("user") || "image/"
    const imageListRef = ref(storage, refer);

    const uploadFile = (file) => {
        const fileRef = ref(storage, `${refer}/${v4()}.${file.name.split(".").pop()}`);
        setIsLoading(true); 
        uploadBytes(fileRef, file).then(() => {
            alert("Uploaded file successfully");
            setIsChange(!isChange);
        }).catch(err => {
            alert("Error uploading");
        }).finally(() => {
            setIsLoading(false); 
        });
    }

    const handleInputChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert("No file selected");
            return;
        }
        uploadFile(file);
    }

    useEffect(() => {
        const getImages = async () => {
            setIsLoading(true); 
            const images = await listAll(imageListRef);
            const urls = await Promise.all(images.items.map(item => getDownloadURL(item)));
            setImageList(urls);
            setIsLoading(false); 
        }
        getImages();
    }, [isChange]);

    return (
        <div className='imageUploader'>
            <div className="heroSection relative min-h-[100vh] bg-black flex  items-center flex-col">
                <Navbar />
                <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500 text-5xl m-5 font-bold'>
                    Task Build Image Uploader
                </h1>
                <div>
                    <br /><br />
                    <input
                        type="file"
                        accept="image/*"
                        name="file"
                        id="inputfile"
                        className=''
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
                    />
                    <label
                        htmlFor="inputfile"
                        className='bg-gradient-to-r from-green-600 to-yellow-500 border-0 p-2 lg:text-3xl xl:text-3xl rounded-full lg:px-16 xl:px-16  font-semibold text-white my-20 transition-transform transform hover:scale-125 m-3  px-3 text-xl'
                    >
                        Upload from Gallery
                    </label>
                    <Link to={'/camera'}>
                        <div
                            className='bg-gradient-to-r from-green-600 to-yellow-500 border-0 p-2 lg:text-3xl xl:text-3xl rounded-full lg:px-16 xl:px-16  font-semibold text-white my-20 transition-transform transform hover:scale-105 m-3  px-3 text-xl'
                        >
                            Capture from Camera
                        </div>
                    </Link>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="images flex flex-wrap m-auto">
                    {imageList.map((image, index) => (
                        <div key={index} className="image p-2 border-2 m-2 border-green-600 rounded-xl">
                            <img src={image} alt={`Uploaded ${index}`} className='w-[300px] h-[200px] rounded-xl' />
                            <div className=" w-[300px] bg-gradient-to-r from-green-600  to-yellow-500 text-white p-1 rounded-3xl mt-3">
                                <a href={image} download>
                                    <button className="text-center font-semibold w-[100%] bg-white rounded-[calc(1.5rem-3px)] p-[10px] text-xl hover:bg-transparent text-black hover:text-white">
                                        View Full Page
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageUploader;
