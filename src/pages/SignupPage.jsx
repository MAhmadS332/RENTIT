import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    avatar: "1",
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  const avatars = ["1", "2", "3", "4", "5"];
  const roles = ["host", "guest"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        formData
      );
      authContext.login(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      toast.error("Error during signup. Please try again.");
    }
  };

  return (
    <div className="max-w-lg w-auto p-2 mx-auto bg-white shadow-sm rounded-md">
      <Toaster />
      <h1 className="text-2xl font-bold text-center text-sky-500 mb-6">
        Your Journey to the Perfect Stay Begins Here
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Avatar:</label>
          <div className="flex gap-4 mt-2 justify-center">
            {avatars.map((avatar) => (
              <label key={avatar} className="flex flex-col items-center">
                <input
                  type="radio"
                  name="avatar"
                  value={avatar}
                  checked={formData.avatar === avatar}
                  onChange={handleChange}
                  className="hidden"
                />
                <img
                  src={`/imgs/avatars/avatar${avatar}.jpg`}
                  alt={`Avatar ${avatar}`}
                  className={`w-16 rounded-full  border-[3px] cursor-pointer transition-all ${
                    formData.avatar === avatar
                      ? "border-sky-500"
                      : "border-gray-300"
                  }`}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-sky-500 text-white rounded-md font-medium hover:bg-sky-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
