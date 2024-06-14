import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    // const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/change-pass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, password })
            });

            const data = await response.json();
            setIsLoading(false);

            if (data.success) {
                setMessage('Password changed successfully.');
                navigate('/login');
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setIsLoading(false);
            setMessage('An error occurred while changing the password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-2 border-gray-600 p-2 w-full rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500"
                            required
                            placeholder='Enter new Password'
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </div>
                </form>
                {message && <p className="text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
