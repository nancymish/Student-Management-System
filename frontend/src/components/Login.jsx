import React from "react";
import image from "../assets/images/authpage.jpg";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      alert(res.data.message);
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src={image}
            alt="Auth"
            className="min-w-2/3 mih-2/3 object-cover"
          />
          <div className="absolute inset-0" />
          <div className="relative bottom-6 left-6 text-green-800">
            <h3 className="text-2xl font-bold">Welcome Back</h3>
            <p className="text-sm opacity-90">
              Manage students securely and efficiently
            </p>
          </div>
        </div>

        {/* Forms Section */}
        <div className="p-6 sm:p-8 md:p-10 space-y-10">
          {/* Login */}
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Login
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-6">
              New User?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-medium hover:underline"
              >
                Register Here
              </Link>
            </p>
          </div>

          <hr className="border-gray-200" />
        </div>
      </div>
    </section>
  );
};

export default Login;
