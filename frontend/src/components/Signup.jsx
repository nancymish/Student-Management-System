import React from "react";
import image from "../assets/images/authpage.jpg";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Sent:", formData);
    try {
      const res = await API.post("/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log("Error:", err.response);
      alert(err.response?.data?.message || "Registration failed");
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
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Register
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleChange}
              />

              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                
              >
                Register
              </button>
            </form>
            <p className="mt-6">Existing User? <Link
                                to="/login"
                            
                            className="text-green-600 font-medium hover:underline"
                            >
                            Login Here
                            </Link></p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Signup;
