import React from "react";

const SignUp = () => {
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
            />
            <br /><br />
                    <input
                        type="text"
                        className="bg-transparent border-2  border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30 outline-yellow-500 focus:border-yellow-500"
                        placeholder="Enter your last name"
            />
            <br /><br />
            <p className="text-xl">Login Details: </p>
            <br />
                    <input
                        type="email"
                        className="bg-transparent border-2  border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30 outline-yellow-500 focus:border-yellow-500"
                        placeholder="Enter your email"
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder:opacity-30  outline-yellow-500"
                        placeholder="Enter your name"
                    />
                    
                    <br />
                    <br />
                    <div className=" w-[300px] bg-gradient-to-r from-green-600  to-yellow-500 text-white p-px rounded-3xl">
                        <button className="text-center font-black w-[100%] bg-black rounded-[calc(1.5rem-1px)] p-[10px] text-xl hover:bg-gradient-to-r from-green-600  to-yellow-500 text-white ">
                            Signup
                        </button>
                    </div>
                    <p className="text-white text-lg text-center  mt-4 hover:text-blue-600 hover:cursor-pointer hover:underline">
            Already Have a Account
          </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
