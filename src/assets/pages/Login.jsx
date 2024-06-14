import React, { useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        return alert(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("Login Successful:", data);
      alert("Login Successful");
      localStorage.setItem("user", data.user.id);
      navigate('/');
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login Error:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black h-[100vh] flex justify-center items-center text-white flex-col">
      <div className="circle h-[70px] w-[70px] bg-gradient-to-r from-green-600 to-yellow-500 rounded-full "></div>
      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500 font-black text-2xl m-5">
        Welcome to Task Build
      </h3>
      <form className="m-10" onSubmit={handleLogin}>
        <input
          type="email"
          className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500 focus:border-yellow-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          className="bg-transparent border-2 border-gray-600 p-2 w-[300px] rounded-md placeholder:text-white placeholder-opacity-30 outline-yellow-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <Link to={"/forgot-password"} className="text-white text-sm float-left mt-4 hover:text-red-600 hover:cursor-pointer hover:underline">
            Forgot Password?
          </Link>
        </div>
        <br />
        <br />
        <br />
        <div className="w-[300px] bg-gradient-to-r from-green-600 to-yellow-500 text-white p-px rounded-3xl">
          <button
            type="submit"
            className="text-center font-black w-[100%] bg-black rounded-[calc(1.5rem-1px)] p-[10px] text-xl hover:bg-gradient-to-r from-green-600 to-yellow-500 text-white "
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </div>
      </form>
      <Link to={'/signup'} className="text-white text-lg text-center mt-4 hover:text-blue-600 hover:cursor-pointer hover:underline">
        Create Account
      </Link>
    </div>
  );
};

export default Login;
