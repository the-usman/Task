import React, { useState } from 'react';
import Navbar from './Navbar';

const Operation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [operation, setOperation] = useState("None");
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleResult = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/operation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ num1, num2, operation: operation.toLowerCase() })
            });

            const data = await response.json();
            if (data.success) {
                setResult(data.result);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className='h-[100vh] bg-black flex flex-col items-center'>
            <Navbar />
            <div className='flex justify-center items-center mt-10 flex-wrap'>
                <input 
                    type="number" 
                    value={num1} 
                    onChange={(e) => setNum1(parseFloat(e.target.value))} 
                    className="bg-transparent border-2 border-gray-600 p-2 w-[100px] rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500 text-white m-4"
                    placeholder="Num 1"
                    
                />
                <input 
                    type="number" 
                    value={num2} 
                    onChange={(e) => setNum2(parseFloat(e.target.value))} 
                    className="bg-transparent border-2 border-gray-600 p-2 w-[100px] rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500 text-white m-4"
                    placeholder="Num 2"
                />
                <div className='relative'>
                    <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdown}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4"
                        type="button"
                    >
                        {operation}
                        <svg
                            className={`w-2.5 h-2.5 ms-3 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div
                            id="dropdown"
                            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-1"
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    onClick={() => { setOperation("Sum"); setIsOpen(false); }}
                                >Sum</li>
                                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    onClick={() => { setOperation("Substraction"); setIsOpen(false); }}
                                >Substraction</li>
                                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    onClick={() => { setOperation("Multiplication"); setIsOpen(false); }}
                                >Multiplication</li>
                            </ul>
                        </div>
                    )}
                </div>

                
                
                
            </div>
            <br /><br />
            <button 
                    onClick={handleResult} 
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
                >
                    Calculate
            </button>
            <br /><br />
            {isLoading && <p className="text-white mt-4">Loading...</p>}
                {result !== null && <div className="result text-5xl font-black text-white mt-4">{result}</div>}
        </div>
    );
};

export default Operation;
