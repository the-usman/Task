import React, { useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || 'Failed to sign up');
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            if (data.success) {
                alert("Signup successful")
                navigate("/");
                localStorage.setItem("user", data.user);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Signup error:', error.message);
            alert("Signup error:", error.message);
            setIsLoading(false);
        }
    };


    return (
        <div>
            <div className="bg-black h-[100vh]  flex justify-center items-center text-white flex-col">
                <div className="cirle h-[70px] w-[70px] bg-gradient-to-r from-green-600  to-yellow-500 rounded-full "></div>
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-green-600  to-yellow-500 font-black text-2xl m-5">
                    Welcome to Task Build
                </h3>
                <div className="m-10">
                    <input
                        type="text"
                        className="bg-transparent border-2  border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30 outline-yellow-500 focus:border-yellow-500"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br /><br />
                    <input
                        type="text"
                        className="bg-transparent border-2  border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30 outline-yellow-500 focus:border-yellow-500"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <br /><br />
                    <p className="text-xl">Login Details: </p>
                    <br />
                    <input
                        type="email"
                        className="bg-transparent border-2  border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30 outline-yellow-500 focus:border-yellow-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30  outline-yellow-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />
                    <br />
                    <div className=" w-[300px] bg-gradient-to-r from-green-600  to-yellow-500 text-white p-px rounded-3xl">
                        <button className="text-center font-black w-[100%] bg-black rounded-[calc(1.5rem-1px)] p-[10px] text-xl hover:bg-gradient-to-r from-green-600  to-yellow-500 text-white "
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Signup"}
                        </button>
                    </div>
                    <Link to={'/login'} className="text-white text-lg text-center  mt-4 hover:text-blue-600 hover:cursor-pointer hover:underline">
                        Already Have a Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
