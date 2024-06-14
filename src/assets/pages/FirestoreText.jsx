import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const FirestoreText = () => {
    const [text, setText] = useState('');
    const [texts, setTexts] = useState([]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async () => {
        if (text.trim() !== '') {
            try {
                console.log(await addDoc(collection(db, 'usman'), { text }));
                setText('');
            } catch (err) {
                console.error("Error adding document: ", err);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'usman'), (snapshot) => {
            const newTexts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTexts(newTexts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="">

            <div className="flex justify-start items-center h-[100vh] bg-black flex-col">
                <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500 text-5xl m-5 font-bold mt-20'>
                    Task Build Snap Message Sender
                </h1>
                <div className='flex justify-start items-center flex-col'>

                    <div className='flex mt-20 flex-wrap justify-evenly w-[100vw]'>
                        <div className='flex justify-center items-center'>
                            <div >
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleChange}
                                    className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30  outline-yellow-500 text-white mr-6"
                                    placeholder='Enter message text'
                                />
                            </div>
                            <div>
                                <div className=" w-[100px] bg-gradient-to-r from-green-600  to-yellow-500 text-white p-px rounded-3xl">
                                    <button className="text-center font-black w-[100%] bg-black rounded-[calc(1.5rem-1px)] p-[10px] text-xl hover:bg-transparent text-white ">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 w-[350px] text-white">
                            <h2 className="text-2xl font-bold">Texts:</h2>
                            <ul className='flex flex-wrap'>
                                {texts.map((item) => (
                                    <div class="px-3.5 py-2 bg-indigo-600 rounded justify-start  items-center gap-3 inline-flex m-3">
                                        <h5 class=" text-sm font-normal leading-snug text-white">{item.text}</h5>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default FirestoreText;
