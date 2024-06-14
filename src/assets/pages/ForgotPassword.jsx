import React, { useState } from 'react';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage(data.message);
            } else {
                setMessage('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-[100vh] flex items-center justify-center bg-black text-white">
            <div className="bg-gray-700 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default ForgetPassword;
