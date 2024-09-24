import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userName === "h2n" && password === "h2n") {
      setError("");
      Cookies.set("userName", userName, { expires: 1 });
      Cookies.set("password", password, { expires: 1 });
      navigate("/mis-data");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-700 to-black px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Sign in</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-4 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-4 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-4 text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded shadow-lg transition duration-200"
            type="submit"
          >
            Sign in
          </button>
          {error && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
